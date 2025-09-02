import { Request, Response } from "express";
import { UnfollowService } from "../services/unfollow-user-service";

export class UnfollowUserController {
  static async unfollow(req: Request, res: Response) {
    try {
      const followerId = req.body.follower_id;
      const followeeId = req.body.followee_id;
      await UnfollowService.unfollowUser(followerId, followeeId);
      res.status(200).json({ message: "Unfollowed" });
    } catch (err: any) {
      if (err.message === "Not following" || err.message === "User already do not follow.") {
        return res.status(409).json({ message: "Not following" });
      }
      if (err.message === "Can't unfollow yourself") {
        return res.status(400).json({ message: err.message });
      }
      if (err.message?.includes("Invalid user id")) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UnfollowUserController;