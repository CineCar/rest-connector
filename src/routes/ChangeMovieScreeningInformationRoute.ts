import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { MovieScreening } from "com.cinecar.objects";

export class ChangeMovieScreeningInformationRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .changeMovieScreeningInformation(req.params.id, new Date(req.api.json.datetime))
            .then((movieScreening: MovieScreening) => {
                res.api.data(movieScreening.toJSON(true));
            })
            .catch(() => {
                res.api.error(500, "Internal server error");
            });
    }
}
