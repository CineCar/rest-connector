import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Ticket } from "com.cinecar.objects";

export class GetCartRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .getCart(parseInt(req.params.id))
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
                                price: ticket.getMovieScreening().getMovie().getPrice(),
                                imageUrl: ticket.getMovieScreening().getMovie().getImageUrl(),
                            },
                        },
                    });
                });

                res.api.data(json);
            })
            .catch(() => {
                res.api.error(404, "Cart does not exist");
            });
    }
}
