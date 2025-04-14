import axios from 'axios';
import { User } from "../entities/user-entity";

class RecommendMovieService {
    async recommendMovies(userMovies: Array<string>): Promise<any> {
        try {
            const response = await axios.post('http://localhost:8080/recommend', { movies: userMovies });
            return response.data;
        } catch (error) {
            console.error('Error recommending movies:', error);
            throw error;
        }
    }
} 

export default RecommendMovieService;