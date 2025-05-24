import { Document } from "mongoose";
import { IMovieRepository } from "../../core/domain/interfaces/IMovieRepository";
import { MongoMovieRepository } from "../../infrastructure/repositories/MongoMovieRepository";

// Factory Pattern for creating Movie Repository instances
export class MovieRepositoryFactory {
    static createRepository(): IMovieRepository {
        return new MongoMovieRepository();
    }
}

// Strategy Pattern for different movie filtering strategies
interface MovieFilterStrategy {
    filter(movies: Document[]): Document[];
}

class RatingBasedFilter implements MovieFilterStrategy {
    filter(movies: Document[]): Document[] {
        return movies.filter((movie: any) => 
            movie.imdb?.rating >= 5 && 
            movie.imdb?.votes >= 300
        );
    }
}

class AwardBasedFilter implements MovieFilterStrategy {
    filter(movies: Document[]): Document[] {
        return movies.filter((movie: any) => 
            movie.awards?.wins >= 1
        );
    }
}

export { RatingBasedFilter, AwardBasedFilter };

export class MovieService {
    private repository: IMovieRepository;


    constructor() {
        this.repository = MovieRepositoryFactory.createRepository();
    }

    async getMoviesByGenres(genres: string[], page: number): Promise<Document[] | null> {
        try {
            const limit = 20;
            const movies = await this.repository.findByGenres(genres, page, limit);
            if (!movies) return null;
            return movies;
        } catch (error) {
            console.error("Error in getMoviesByGenres:", error);
            return null;
        }
    }

    async getMovieByTitle(title: string): Promise<Document[] | null> {
        try {
            return await this.repository.findByTitle(title);
        } catch (error) {
            console.error("Error in getMovieByTitle:", error);
            return null;
        }
    }

    async getAllGenres(): Promise<string[] | null> {
        try {
            return await this.repository.getAllGenres();
        } catch (error) {
            console.error("Error in getAllGenres:", error);
            return null;
        }
    }

} 