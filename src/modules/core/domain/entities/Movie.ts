export interface IMovie {
    plot: string;
    genres: string[];
    runtime: number;
    cast: string[];
    poster: string;
    title: string;
    fullplot: string;
    languages: string[];
    released: Date;
    directors: string[];
    rated: string;
    awards: {
        wins?: number;
        nominations?: number;
        text?: string;
    };
    year: number;
    imdb: {
        rating?: number;
        votes?: number;
        id?: number;
    };
    countries: string[];
    type: string;
    tomatoes?: object;
}

export class Movie implements IMovie {
    plot: string;
    genres: string[];
    runtime: number;
    cast: string[];
    poster: string;
    title: string;
    fullplot: string;
    languages: string[];
    released: Date;
    directors: string[];
    rated: string;
    awards: { wins?: number; nominations?: number; text?: string; };
    year: number;
    imdb: { rating?: number; votes?: number; id?: number; };
    countries: string[];
    type: string;
    tomatoes?: object;

    constructor(data: IMovie) {
        this.plot = data.plot;
        this.genres = data.genres;
        this.runtime = data.runtime;
        this.cast = data.cast;
        this.poster = data.poster;
        this.title = data.title;
        this.fullplot = data.fullplot;
        this.languages = data.languages;
        this.released = data.released;
        this.directors = data.directors;
        this.rated = data.rated;
        this.awards = data.awards;
        this.year = data.year;
        this.imdb = data.imdb;
        this.countries = data.countries;
        this.type = data.type;
        this.tomatoes = data.tomatoes;
    }

    isValidMovie(): boolean {
        return (
            this.title !== undefined &&
            this.genres !== undefined &&
            this.runtime !== undefined &&
            this.year >= 1900 &&
            this.type === "movie"
        );
    }

    hasGoodRating(): boolean {
        return (
            (this.imdb?.rating || 0) >= 5 &&
            (this.imdb?.votes || 0) >= 300 &&
            (this.awards?.wins || 0) >= 1
        );
    }
} 