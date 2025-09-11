//import { User } from "../../user/entities/user-entity"
import { Review } from "../entities/review-entity"

interface IDeleteReview {
    user_uid: string;
    movie_id: string;
}

class DeleteReviewService {

    async deleteReview(data: IDeleteReview): Promise<boolean>{
        try{
            const review = await Review.findOneAndDelete({user_uid: data.user_uid, movie_id: data.movie_id});

            if(review){
                return true;
            }
            else{
                return false;
            }
        } catch (error){
            console.error(error);
            return false;
        }
    }
}

export default DeleteReviewService;