import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { MovieScreening } from "com.cinecar.objects";

export class DeleteMovieScreeningRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .deleteMovieScreening(req.params.id)
            .then(() => {
                res.api.data();
            })
            .catch(() => {
                res.api.error(500, "Internal server error");
            });
    }
}
