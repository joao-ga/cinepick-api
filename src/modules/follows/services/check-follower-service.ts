import { Follow } from "../entities/follow-entity";

export class CheckFollowerService {
    static async checkFollower(follower_id: string, followee_id: string) {

        try {

            const response = await Follow.findOne({
                follower_id: follower_id,
                followee_id: followee_id
            });

            if(!response) {
                return false
            } else {
                return true
            }

        } catch(e) {
            console.log('erro', e)
        }
    }
}

