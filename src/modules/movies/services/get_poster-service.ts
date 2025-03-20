import { Movie } from "../entities/movie-entity";
import fetch from "node-fetch";

interface OmdbResponse {
    Poster: string;
    Title: string;
    Year: string;
    [key: string]: any; 
}

class GetPoster {
    async getPoster(movieName: string) {
        try {
            const fetch = require('node-fetch');
            const movie = await Movie.findOne({ title: movieName });

            if (!movie) {
                return { message: "Filme não encontrado no banco de dados" };
            }

            if (movie.poster) {
                return { poster: movie.poster };
            }

            const response = await fetch(`http://www.omdbapi.com/?apikey=2f33522&t=${encodeURIComponent(movieName)}`);
            const data = await response.json() as OmdbResponse;

            if (data.Poster) {
                console.log("Pôster encontrado na OMDb:", data.Poster);

                const posterUrl = data.Poster;
                movie.poster = posterUrl;
                await movie.save();

                return { poster: posterUrl };
            } else {
                return { message: "Filme não encontrado ou sem pôster" };
            }
        } catch (error) {
            console.error("Erro no serviço de buscar pôster:", error);  
            return { message: "Ocorreu um erro ao buscar ou atualizar o pôster", error };
        }
    }
}

export default GetPoster;