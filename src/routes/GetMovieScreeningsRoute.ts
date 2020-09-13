import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { MovieScreening } from "com.cinecar.objects";

export class GetMovieScreeningsRoute implements Route {
    handle(req: any, res: any): void {
        if (req.query.nextWeeks) {
            let today = new Date();

            let lastDay = new Date();
            lastDay.setHours(24 * 7 * 4);

            TicketShopImplementation.getSingleton()
                .filterMovieScreenings(today, lastDay)
                .then((movieScreenings) => {
                    const json = [];

                    movieScreenings.forEach((movieScreening: MovieScreening) => {
                        json.push(movieScreening.toJSON(true));
                    });

                    res.api.data(json);
                });
        } else {
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
}
