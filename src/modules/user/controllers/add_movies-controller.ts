import { Request, Response} from "express";
import AddMoviesService from "../services/add_movies-service";

class AddMoviesController {
    static async handleMovies(req: Request, res: Response): Promise<void>{
        try {
            const data: any = req.body;
            const service = new AddMoviesService();
            const userWithMovies = await service.addMovies(data);

            if(userWithMovies){
                res.status(201).json(userWithMovies);
                return;
            }else{
                res.status(400).json({message: "Erro ao adicionar filmes"});
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
}

export default AddMoviesController;