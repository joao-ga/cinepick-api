import mongoose from "mongoose";
import { Follow } from "../entities/follow-entity";
import { User } from "../../user/entities/user-entity";

export class FollowService {
  /**
   * Seguir usuário
   * - Usa transação se disponível (replica set).
   * - Fallback sem transação (garantido por índice único; pequena chance de race em contadores se crashar entre ops).
   */
  static async followUser(followerId: string, followeeId: string) {
    if (followerId === followeeId){
        throw new Error("Can't follow yourself");
    }

    // Garantir que usuários existem/ativos
    const [follower, followee] = await Promise.all([
      User.findOne({ _id: followerId, active: true }).select("_id").lean(),
      User.findOne({ _id: followeeId, active: true }).select("_id").lean(),
    ]);
    if (!follower || !followee) {
        throw new Error("User not found or inactive");
    }

    // Tenta usar transação
    let session: mongoose.ClientSession | null = null;
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      await Follow.create([{ follower: followerId, followee: followeeId }], { session });

      await User.updateOne({ _id: followerId }, { $inc: { followingCount: 1 } }, { session });
      await User.updateOne({ _id: followeeId }, { $inc: { followersCount: 1 } }, { session });

      await session.commitTransaction();
      session.endSession();
      return { success: true };
    } catch (err: any) {
      if (session) {
        try { await session.abortTransaction(); } catch {}
        session.endSession();
      }
      // Se falhou por não ter replica set, ou sessão não suportada, tenta fallback
      if (err && (String(err).includes("Transaction") || String(err).includes("replica set"))) {
        return this.followUserNoTxn(followerId, followeeId);
      }
      if (err && err.code === 11000) throw new Error("Already following");
      throw err;
    }
  }

  // Fallback sem transação (mantém consistência via índice único + updates separados)
  private static async followUserNoTxn(followerId: string, followeeId: string) {
    try {
      await Follow.create({ follower: followerId, followee: followeeId });
    } catch (err: any) {
      if (err && err.code === 11000) throw new Error("Already following");
      throw err;
    }
    // Atualiza contadores
    await Promise.all([
      User.updateOne({ _id: followerId }, { $inc: { followingCount: 1 } }),
      User.updateOne({ _id: followeeId }, { $inc: { followersCount: 1 } }),
    ]);
    return { success: true };
  }
}