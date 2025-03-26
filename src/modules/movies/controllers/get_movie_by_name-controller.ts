import { Request, Response} from "express";
import GetMovieByNameService from "../services/get_movie_by_name-service";

class GetMovieByNameController{

    static async getMovieByName(req:Request, res:Response): Promise<void>{

        const title = req.query.title?.toString() as string;

        try{
            const service = new GetMovieByNameService;
            const movie = await service.getMovieByName(title);

            if (movie && movie.length > 0) {
                res.status(200).json(movie);
            }
            else {
                res.status(404).json({ message: "Filme não encontrado" });
            }
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
}

export default GetMovieByNameController