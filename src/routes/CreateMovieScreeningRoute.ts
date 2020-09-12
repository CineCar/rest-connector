import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class CreateMovieScreeningRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .createMovieScreening(parseInt(req.params.id), new Date(req.api.json.datetime))
            .then((movieScreening) => {
                res.api.data(movieScreening.toJSON(true));
            })
            .catch((err) => {
                console.log(err);
                res.api.error(500, "Internal server error");
            });
    }
}
