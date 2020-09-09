import { Route } from "./Route";
import { Movie } from "com.cinecar.objects";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class GetMoviesRoute implements Route {
    async handle(req: any, res: any) {
        const movies: Array<Movie> = await TicketShopImplementation.getSingleton().getMovies();
        const response = [];

        movies.forEach((movie: Movie) => {
            const movieScreenings = [];

            movie.getMovieScreenings().forEach((movieScreening) => {
                movieScreenings.push({
                    id: movieScreening.getId(),
                    datetime: movieScreening.getDatetime(),
                });
            });

            response.push({
                id: movie.getId(),
                name: movie.getName(),
                duration: movie.getDuration(),
                movieScreenings: movieScreenings,
            });
        });

        res.api.data(response);
    }
}
