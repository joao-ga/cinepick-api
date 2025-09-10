import { User } from "../../user/entities/user-entity";
import { Review } from "../entities/review-entity";
import { Document } from "mongoose";

interface IReview {
   user_uid: string;
   movie_id: string;
   rating: number;
   comment: string;
}

class CreateReviewService {
    async createReview(data: IReview): Promise<Document | null> {
        try {
            const userExists = await this.getIfUserExists(data.user_uid);
            if(!userExists) {
                console.error("Usuário não encontrado");
                return null;
            }

            const userAlreadyReviewed = await this.getIfUserAlreadyReviewed(data.user_uid, data.movie_id);
            if(userAlreadyReviewed) {
                console.error("Usuário já avaliou este filme");
                return null;
            }

            const review = await Review.create(data);
            return review;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private async getIfUserExists(user_uid: string): Promise<boolean> {
        try {
            const user = await User.findOne({ uid: user_uid });
            if(user) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }

    }

    private async getIfUserAlreadyReviewed(user_uid: string, movie_id: string): Promise<boolean> {
        try {
            const review = await Review.findOne({ user_uid, movie_id });
            if(review) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
        
    }
}

export default CreateReviewService;