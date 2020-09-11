import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { MovieScreening } from "com.cinecar.objects";

export class ChangeMovieScreeningInformationRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .changeMovieScreeningInformation(req.params.id, new Date(req.api.json.datetime))
            .then((movieScreening: MovieScreening) => {
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
            .catch(() => {
                res.api.error(500, "Internal server error");
            });
    }
}
