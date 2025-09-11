import { Request, Response } from "express"
import DeleteReviewService from "../services/delete_review-service"

class DeleteReviewController{

    static async deleteReview(req: Request, res: Response): Promise<void> {
        const data = req.body;

        try{
            const service = new DeleteReviewService();

            const review = await service.deleteReview(data);

            if(review){
                res.status(200).json(review)
            }
            else{
                res.status(400).json({ message: "Erro ao excluir review" });
            }
        }
        catch (error){
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export default DeleteReviewController;