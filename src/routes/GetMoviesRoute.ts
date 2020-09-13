import { Route } from "./Route";
import { Movie } from "com.cinecar.objects";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class GetMoviesRoute implements Route {
    async handle(req: any, res: any) {
        let movies: Array<Movie>;
        const json = [];

        if (req.query.search != null) {
            movies = await TicketShopImplementation.getSingleton().searchMovies(req.query.search);
        } else {
            movies = await TicketShopImplementation.getSingleton().getMovies();
        }

        movies.forEach((movie: Movie) => {
            json.push(movie.toJSON(true));
        });

        res.api.data(json);
    }
}
