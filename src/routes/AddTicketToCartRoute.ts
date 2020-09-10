import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Ticket, Cart } from "com.cinecar.objects";

export class AddTicketToCartRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .addTicketToCart(
                parseInt(req.params.id),
                parseInt(req.api.json.movieScreeningId),
                parseInt(req.api.json.row)
            )
            .then((cart: Cart) => {
                const json = {
                    id: cart.getId(),
                    creationDate: cart.getCreationDate(),
                    tickets: [],
                };

                cart.getTickets().forEach((ticket: Ticket) => {
                    json.tickets.push({
                        id: ticket.getId(),
                        movieScreening: {
                            id: ticket.getMovieScreening().getId(),
                            datetime: ticket.getMovieScreening().getDatetime(),
                            movie: {
                                id: ticket.getMovieScreening().getMovie().getId(),
                                name: ticket.getMovieScreening().getMovie().getName(),
                                duration: ticket.getMovieScreening().getMovie().getDuration(),
                            },
                        },
                    });
                });

                res.api.data(json);
            })
            .catch((err) => {
                console.log(err);
                res.api.error(404, "MovieScreening or Cart does not exist");
            });
    }
}
