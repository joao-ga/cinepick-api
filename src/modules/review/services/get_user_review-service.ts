import { Review } from "../entities/review-entity";
import { User } from "../../user/entities/user-entity";
import { Document } from "mongoose";

interface IUserReview {
    uid: string;
}

class GetUserReviewService {
    async getUserReview(data: IUserReview): Promise<Document[] | null> {
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

            const review = await Review.find({ user_uid: uid });
            return review;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private async getIfUserExists(uid: string): Promise<boolean> {
        const user = await User.findOne({ uid: uid });
        if(user) {
            return true;
        } else {
            return false;
        }
    }

    private async getIfUserHasReview(uid: string): Promise<boolean> {
        const review = await Review.findOne({ user_uid: uid });
        if(review) {
            return true;
        } else {
            return false;
        }
    }
}

export default GetUserReviewService;