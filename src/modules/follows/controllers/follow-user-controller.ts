import { Request, Response } from "express";
import { FollowService } from "../services/follow-user-service";

export class FollowUserController {
  static async follow(req: Request, res: Response) {
    try {
      const followerId = req.body.follower_id;
      const followeeId = req.body.followee_id;
      await FollowService.followUser(followerId, followeeId);
      res.status(201).json({ message: "Followed" });
    } catch (err: any) {
      if (err.message === "Already following" || err.code === 11000) {
        res.status(409).json({ message: "Already following" });
      }
      if (err.message === "Can't follow yourself") {
        res.status(400).json({ message: err.message });
      }
      if (err.message?.includes("Invalid user id")) {
        res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default FollowUserController;