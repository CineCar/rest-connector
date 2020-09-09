import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class CreateMovieScreeningRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .createMovieScreening(req.params.movieId, new Date(req.api.json.datetime))
            .then(() => {
                res.api.data();
            })
            .catch(() => {
                res.api.error(500, "Internal server error");
            });
    }
}
