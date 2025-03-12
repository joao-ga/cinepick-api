import { Request, Response} from "express";
import AddGenresService from "../services/add_genres-service";

class AddGenresController {
    static async handleGenres(req: Request, res: Response): Promise<void>{
        try {
            const data: any = req.body;
            const service = new AddGenresService();
            const userWithGenres = await service.handleGenres(data);

            if(userWithGenres){
                res.status(201).json(userWithGenres);
                return;
            }else{
                res.status(400).json({message: "Erro ao adicionar gêneros"});
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
}

export default AddGenresController;