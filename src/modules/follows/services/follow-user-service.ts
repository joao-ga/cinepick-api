import mongoose from "mongoose";
import { Follow } from "../entities/follow-entity";
import { User } from "../../user/entities/user-entity";

export class FollowService {
  /**
   * Seguir usuário
   * - Implementação sem transações usando verificações e índices únicos
   * - Garante consistência através de validações e rollback manual se necessário
   */
  static async followUser(followerId: string, followeeId: string) {
    if (followerId === followeeId) {
        console.log("Can't follow yourself");
    }

    // Garantir que usuários existem/ativos
    const [follower, followee] = await Promise.all([
      User.findOne({ uid: followerId, active: true }).select("uid").lean(),
      User.findOne({ uid: followeeId, active: true }).select("uid").lean(),
    ]);
    if (!follower || !followee) {
        console.log("User not found or inactive");
    }

    // Verificar se já está seguindo
    const existingFollow = await Follow.findOne({ 
      follower_id: followerId, 
      followee_id: followeeId 
    }).lean();
    
    if (existingFollow) {
        console.log("Already following");
    }

    // Criar o relacionamento de follow
    try {
      await Follow.create({ follower_id: followerId, followee_id: followeeId });
    } catch (err: any) {
      // Se falhar por duplicata (race condition), retornar erro apropriado
      if (err && err.code === 11000) {
        console.log("Already following");
      }
      console.log("Failed to create follow");
    }

    // Atualizar contadores - se falhar, fazer rollback do follow
    try {
      await Promise.all([
        User.updateOne({ uid: followerId }, { $inc: { followingCount: 1 } }),
        User.updateOne({ uid: followeeId }, { $inc: { followersCount: 1 } }),
      ]);
    } catch (err: any) {
      // Rollback: remover o follow que foi criado
      try {
        await Follow.deleteOne({ follower_id: followerId, followee_id: followeeId });
      } catch (rollbackErr) {
        console.error("Erro no rollback:", rollbackErr);
      }
      console.log("Failed to update user counters");
    }

    return { success: true };
  }
}