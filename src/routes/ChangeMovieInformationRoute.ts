import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class ChangeMovieInformationRoute implements Route {
    handle(req: any, res: any) {
        TicketShopImplementation.getSingleton()
            .changeMovieInformation(parseInt(req.params.id), req.api.json.name, req.api.json.duration)
            .then((movie) => {
                res.api.data({
                    id: movie.getId(),
                    name: movie.getName(),
                    duration: movie.getDuration(),
                });
            })
            .catch((err) => {
                res.api.error(500, "Internal server error");
            });
    }
}
