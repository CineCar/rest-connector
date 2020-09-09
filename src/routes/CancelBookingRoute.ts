import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Ticket } from "com.cinecar.objects";

export class CancelBookingRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .cancelBooking(req.params.id)
            .then((booking) => {
                const json = {
                    id: booking.getId(),
                    cancelled: booking.isCancelled(),
                    person: {
                        id: booking.getPerson().getId(),
                        firstname: booking.getPerson().getFirstname(),
                        lastname: booking.getPerson().getLastname(),
                    },
                    tickets: [],
                };

                booking.getTickets().forEach((ticket: Ticket) => {
                    json.tickets.push({
                        id: ticket.getId(),
                        row: ticket.getRow(),
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
            })
            .catch(() => {
                res.api.error(500, "Internal server error");
            });
    }
}
