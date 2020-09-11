import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class CreateMovieScreeningRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .createMovieScreening(parseInt(req.params.id), new Date(req.api.json.datetime))
            .then((movieScreening) => {
                res.api.data({
                    id: movieScreening.getId(),
                    datetime: movieScreening.getDatetime(),
                    movie: {
                        id: movieScreening.getMovie().getId(),
                        name: movieScreening.getMovie().getName(),
                        duration: movieScreening.getMovie().getDuration(),
                        price: movieScreening.getMovie().getPrice(),
                        imageUrl: movieScreening.getMovie().getImageUrl(),
                    },
                });
            })
            .catch((err) => {
                console.log(err);
                res.api.error(500, "Internal server error");
            });
    }
}
