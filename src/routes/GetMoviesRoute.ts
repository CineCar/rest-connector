import { Route } from "./Route";
import { Movie } from "com.cinecar.objects";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class GetMoviesRoute implements Route {
    async handle(req: any, res: any) {
        const movies: Array<Movie> = await TicketShopImplementation.getSingleton().getMovies();
        const json = [];

        movies.forEach((movie: Movie) => {
            json.push(movie.toJSON(true));
        });

        res.api.data(json);
    }
}
