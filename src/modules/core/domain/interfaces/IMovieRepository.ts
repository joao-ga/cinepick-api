import { Document } from "mongoose";

export interface IMovieRepository {
    findByGenres(genres: string[], page: number, limit: number): Promise<Document[] | null>;
    findByTitle(title: string): Promise<Document[] | null>;
    getAllGenres(): Promise<string[] | null>;
} 