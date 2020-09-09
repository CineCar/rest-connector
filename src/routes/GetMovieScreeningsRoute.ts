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
                    json.push({
                        id: movieScreening.getId(),
                        datetime: movieScreening.getDatetime(),
                        movie: {
                            id: movieScreening.getMovie().getId(),
                            name: movieScreening.getMovie().getName(),
                            duration: movieScreening.getMovie().getDuration(),
                        },
                    });
                });

                res.api.data(json);
            });
    }
}
