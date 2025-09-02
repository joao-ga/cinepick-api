import mongoose from "mongoose";
import { Follow } from "../entities/follow-entity";
import { User } from "../../user/entities/user-entity";

export class UnfollowService {
  /**
   * Deixar de seguir usuário (sem transação)
   * - Verifica existência de usuários (por uid)
   * - Remove relação em `Follow`
   * - Decrementa contadores; em falha, tenta rollback recriando a relação
   */
  static async unfollowUser(followerId: string, followeeId: string) {
    if (followerId === followeeId) {
      console.log("Can't unfollow yourself");
    }

    // Garantir que usuários existem/ativos (por uid)
    const [follower, followee] = await Promise.all([
      User.findOne({ uid: followerId, active: true }).select("uid").lean(),
      User.findOne({ uid: followeeId, active: true }).select("uid").lean(),
    ]);
    if (!follower || !followee) {
      console.log("User not found or inactive");
    }

    // Verificar se já segue
    const existingFollow = await Follow.findOne({
      follower_id: followerId,
      followee_id: followeeId,
    }).lean();

    if (!existingFollow) {
      console.log("Not following");
      return { success: true };
    }

    // Remover a relação de follow
    try {
      const deleteResult = await Follow.deleteOne({
        follower_id: followerId,
        followee_id: followeeId,
      });
      if (!deleteResult || deleteResult.deletedCount === 0) {
        console.log("Nothing deleted (already not following)");
        return { success: true };
      }
    } catch (err) {
      console.log("Failed to delete follow edge", err);
    }

    // Decrementar contadores; se falhar, recriar a relação (rollback)
    try {
      await Promise.all([
        User.updateOne({ uid: followerId }, { $inc: { followingCount: -1 } }),
        User.updateOne({ uid: followeeId }, { $inc: { followersCount: -1 } }),
      ]);
    } catch (err: any) {
      // Rollback: recriar follow
      try {
        await Follow.create({ follower_id: followerId, followee_id: followeeId });
      } catch (rollbackErr) {
        console.error("Erro ao recriar relação no rollback:", rollbackErr);
      }
      console.log("Failed to update user counters", err);
    }

    return { success: true };
  }
}

export default UnfollowService;
