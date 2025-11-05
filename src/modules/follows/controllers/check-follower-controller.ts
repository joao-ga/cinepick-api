import { Request, Response } from "express";
import { CheckFollowerService } from "../services/check-follower-service";

export class CheckFollowerController {
    static async checkFollower(req: Request, res: Response) {
        const follower_id =  req.body.follower_id;
        const followee_id = req.body.followee_id;

        try {
            const response = CheckFollowerService.checkFollower(follower_id, followee_id);

            res.status(201).json({ isFollowing:  response});

        } catch (e) {
            console.log('error', e)
            res.status(500).json({ message: "Internal server error" });
        }

    }
}

export default CheckFollowerController;