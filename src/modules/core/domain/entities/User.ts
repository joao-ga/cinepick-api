export interface IUser {
    name: string;
    gender: string;
    email: string;
    birth: string;
    phone: string;
    uid?: string;
    movieGender?: string[];
    movies?: string[];
    active: boolean;
}

export class User implements IUser {
    name: string;
    gender: string;
    email: string;
    birth: string;
    phone: string;
    uid?: string;
    movieGender?: string[];
    movies?: string[];
    active: boolean;

    constructor(data: IUser) {
        this.name = data.name;
        this.gender = data.gender;
        this.email = data.email;
        this.birth = data.birth;
        this.phone = data.phone;
        this.uid = data.uid;
        this.movieGender = data.movieGender || [];
        this.movies = data.movies || [];
        this.active = data.active;
    }

    isValid(): boolean {
        return (
            this.name !== undefined &&
            this.gender !== undefined &&
            this.email !== undefined &&
            this.birth !== undefined &&
            this.phone !== undefined
        );
    }

    deactivate(): void {
        this.active = false;
    }

    addMovies(movies: string[]): void {
        this.movies = movies;
    }

    addGenres(genres: string[]): void {
        this.movieGender = genres;
    }
} 