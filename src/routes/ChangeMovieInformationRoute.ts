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
                res.api.data({
                    id: movie.getId(),
                    name: movie.getName(),
                    duration: movie.getDuration(),
                    price: movie.getPrice(),
                    imageUrl: movie.getImageUrl(),
                });
            })
            .catch((err) => {
                res.api.error(500, "Internal server error");
            });
    }
}
