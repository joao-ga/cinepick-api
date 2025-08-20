import { Movie } from "../entities/movie-entity";
import fetch from "node-fetch";

class GetMovieByName {
    async getMovieByName(title: string) {
        try {
            const movie = await Movie.findOne({
                title: { $regex: new RegExp(title, "i") }
            }).select("_id fullplot title poster genres runtime");     

            if (movie){
                return movie
            }

            const response = await fetch(`http://www.omdbapi.com/?apikey=2f33522&t=${encodeURIComponent(title)}`);
            const omdbData = await response.json();

            if (omdbData.Response === "True") {
                
                const newMovie = new Movie({
                    title: omdbData.Title,
                    poster: omdbData.Poster,
                    plot: omdbData.Plot || "",
                    fullplot: omdbData.Plot || "",
                    genres: omdbData.Genre ? omdbData.Genre.split(", ") : [],
                    runtime: omdbData.Runtime ? parseInt(omdbData.Runtime.replace(" min", "")) : 0,
                    rated: omdbData.Rated || "",
                    cast: omdbData.Actors ? omdbData.Actors.split(", ") : [],
                    languages: omdbData.Language ? omdbData.Language.split(", ") : [],
                    released: omdbData.Year ? new Date(omdbData.Year + "-01-01") : new Date(),
                    directors: omdbData.Director ? omdbData.Director.split(", ") : [],
                    writers: omdbData.Writer ? omdbData.Writer.split(", ") : [],
                    awards: {
                        wins: 0,
                        nominations: 0,
                        text: omdbData.Awards || ""
                    },
                    lastupdated: new Date().toISOString(),
                    year: omdbData.Year ? parseInt(omdbData.Year) : 0,
                    imdb: {
                        rating: omdbData.imdbRating ? parseFloat(omdbData.imdbRating) : 0,
                        votes: omdbData.imdbVotes ? parseInt(omdbData.imdbVotes.replace(/,/g, "")) : 0,
                        id: omdbData.imdbID ? parseInt(omdbData.imdbID.replace("tt", "")) : 0
                    },
                    countries: omdbData.Country ? omdbData.Country.split(", ") : [],
                    type: "movie",
                    tomatoes: {},
                    num_mflix_comments: 0
                });

                await newMovie.save();
                
                return {
                    _id: newMovie._id,
                    fullplot: newMovie.fullplot,
                    title: newMovie.title,
                    poster: newMovie.poster,
                    genres: newMovie.genres,
                    runtime: newMovie.runtime
                };
            } else {
                return { message: "Filme não encontrado" };
            }
        } catch (error) {
            console.error("Erro no serviço de buscar filme:", error);  
            return { message: "Ocorreu um erro ao buscar o filme", error };
        }
    }
}

export default GetMovieByName;