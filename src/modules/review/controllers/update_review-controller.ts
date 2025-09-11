import { Request, Response } from "express"
import UpdateReviewService from "../services/update_review-service"

class UpdateReviewController {

    static async updateReview(req: Request, res: Response): Promise<void>{
       const data = req.body;
       
       try{
            const service = new UpdateReviewService()
            
            const review = await service.updateReview(data);

            if(review){
                res.status(201).json(review);
            }
            else{
                res.status(400).json({ message: "Erro ao atualizar review" });
            }
        } catch (error){
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor "});
        }
    }
}

export default UpdateReviewController;