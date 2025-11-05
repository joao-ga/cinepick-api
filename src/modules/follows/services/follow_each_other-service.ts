import { Follow } from "../entities/follow-entity";
import { User } from "../../user/entities/user-entity";

export class FollowEachOtherService {
    static async followEachOther(userId1: string, userId2: string): Promise<boolean> {

        const [user1, user2] = await Promise.all([
            User.findOne({ uid: userId1, active: true }).select("uid").lean(),
            User.findOne({ uid: userId2, active: true }).select("uid").lean(),
        ]);

        if (!user1 || !user2) {
            return false;
        }

        const [follow1to2, follow2to1] = await Promise.all([
            Follow.findOne({ 
                follower_id: userId1, 
                followee_id: userId2 
            }).lean(),
            Follow.findOne({ 
                follower_id: userId2, 
                followee_id: userId1 
            }).lean(),
        ]);

        return !!(follow1to2 && follow2to1);
    }
}

export default FollowEachOtherService;