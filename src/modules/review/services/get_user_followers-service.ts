import { Document } from "mongoose";
import { Review } from "../entities/review-entity";
import { User } from "../../user/entities/user-entity";
import { Follow } from "../../follows/entities/follow-entity";

interface IUserFollowersReview {
    uid: string;
}

class GetUserFollowersReviewService {
    async getUserFollowersReview(data: IUserFollowersReview): Promise<Document[] | null> {
        const uid = data.uid;
        try {
            const userExists = await this.getIfUserExists(uid);
            if(!userExists) {
                console.error("Usuário não encontrado");
                return null;
            }

            const userHasReview = await this.getIfUserHasReview(uid);
            if(!userHasReview) {
                console.error("Usuário não tem avaliação");
                return null;
            }

            const userHasFollowees = await this.getIfUserHasFollowees(uid);
            if(!userHasFollowees) {
                console.error("Usuário não segue ninguém");
                return null;
            }

            const followees = await this.getUserFollowees(uid);

            const reviews = await Review.find({ user_uid: { $in: followees.map((followee: any) => followee.followee_id) } });
            return reviews;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private async getIfUserExists(uid: string): Promise<boolean> {
        const user = await User.findOne({ uid: uid });
        if(user) {
            return true;
        }
        return false;
    }

    private async getIfUserHasReview(uid: string): Promise<boolean> {
        const review = await Review.findOne({ user_uid: uid });
        if(review) {
            return true;
        }
        return false;
    }

    private async getIfUserHasFollowees(uid: string): Promise<boolean> {
        const followees = await Follow.find({ follower_id: uid });
        if(followees.length > 0) {
            return true;
        }
        return false;
    }

    private async getUserFollowees(uid: string): Promise<Document[]> {
        const followees = await Follow.find({ follower_id: uid });
        return followees;
    }
}

export default GetUserFollowersReviewService;