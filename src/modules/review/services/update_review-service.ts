import { User } from "../../user/entities/user-entity";
import { Review } from "../entities/review-entity";
import { Document } from "mongoose";

interface IReview {
    user_uid: string;
    movie_id: string;
    rating: number;
    comment: string;
}

class UpdateReviewService {

    async updateReview(data: IReview): Promise<Document | null>{
        try{
            const userExists = await this.getIfUserExists(data.user_uid);
            if(!userExists){
                console.error("Usuário não encontrado");
                return null;
            }

            const updateReview = await Review.findOneAndUpdate(
                { 
                    user_uid: data.user_uid, movie_id: data.movie_id},
                {
                    rating: data.rating, 
                    comment: data.comment,
                    updated_at: new Date()
                },
                { new: true }    
                );
            return updateReview
        }
        catch (error){
            console.log(error);
            return null;
        }
    }

    private async getIfUserExists(user_uid: string): Promise<boolean> {
        try{
            const user = await User.findOne({ uid: user_uid });
            if(user){
                return true;
            }
            else{
                return false;
            }
        }
        catch (error){
            console.error(error);
            return false;
        }
    }
}

export default UpdateReviewService;