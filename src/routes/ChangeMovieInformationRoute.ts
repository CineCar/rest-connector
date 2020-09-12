import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class ChangeMovieInformationRoute implements Route {
    handle(req: any, res: any) {
        TicketShopImplementation.getSingleton()
            .changeMovieInformation(
                parseInt(req.params.id),
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
