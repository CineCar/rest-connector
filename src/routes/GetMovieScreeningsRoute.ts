import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { MovieScreening } from "com.cinecar.objects";

export class GetMovieScreeningsRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .getMovieScreenings()
            .then((movieScreenings) => {
                const json = [];

                movieScreenings.forEach((movieScreening: MovieScreening) => {
                    json.push(movieScreening.toJSON(true));
                });

                res.api.data(json);
            });
    }
}
