import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class CreateMovieRoute implements Route {
    handle(req: any, res: any) {
        TicketShopImplementation.getSingleton()
            .createMovie(
                req.api.json.name,
                parseInt(req.api.json.duration),
                parseFloat(req.api.json.price),
                req.api.json.imageUrl
            )
            .then((movie) => {
                res.api.data(movie.toJSON(true));
            })
            .catch((err) => {
                res.api.error(500, "Internal server error");
            });
    }
}
