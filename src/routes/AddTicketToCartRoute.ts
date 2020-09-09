import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Ticket } from "com.cinecar.objects";

export class AddTicketToCartRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .addTicketToCart(req.params.cartId, req.api.json.movieScreeningId, req.row)
            .then((cart) => {
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
            .catch(() => {
                res.api.error(404, "Cart or MovieScreening does not exist");
            });
    }
}
