import { Session, Movie } from "com.cinecar.objects";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Route } from "./Route";

export class GetMovieRoute implements Route {
    public handle(req, res) {
        TicketShopImplementation.getSingleton()
            .getMovie(req.params.id)
            .then((movie: Movie) => {
                res.api.data(movie.toJSON(true));
            })
            .catch((err) => {
                res.api.error(404, "Movie not found");
            });
    }
}
