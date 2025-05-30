import { Document } from "mongoose";

export interface IUserRepository {
    create(data: any): Promise<Document | null>;
    findByUid(uid: string): Promise<Document | null>;
    update(uid: string, data: any): Promise<Document | null>;
    delete(uid: string): Promise<Document | null>;
    addMovies(uid: string, movies: string[]): Promise<Document | null>;
    getMovies(uid: string): Promise<Document | null>;
    addGenres(uid: string, genres: string[]): Promise<Document | null>;
} 