import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class DeleteMovieRoute implements Route {
    handle(req: any, res: any) {
        TicketShopImplementation.getSingleton()
            .deleteMovie(parseInt(req.params.id))
            .then((movie) => {
                res.api.data();
            })
            .catch((err) => {
                res.api.error(500, "Internal server error");
            });
    }
}
