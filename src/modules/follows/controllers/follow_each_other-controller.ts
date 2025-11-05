import { Request, Response } from "express";
import FollowEachOtherService from "../services/follow_each_other-service";

export class FollowEachOtherController {
    static async followEachOther(req: Request, res: Response) {
        try {
            const userId1 = req.query.userId1 as string;
            const userId2 = req.query.userId2 as string;
            const result = await FollowEachOtherService.followEachOther(userId1, userId2);
            res.status(200).json({ followEachOther: result });
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

export default FollowEachOtherController;