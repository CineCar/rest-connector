import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Booking, Ticket } from "com.cinecar.objects";

export class GetBookingsRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .getBookings()
            .then((bookings) => {
                const json = [];

                bookings.forEach((booking: Booking) => {
                    const jsonBooking = {
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
                        jsonBooking.tickets.push({
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

                    json.push(jsonBooking);
                });

                res.api.data(json);
            })
            .catch(() => {
                res.api.error(500, "Internal server error");
            });
    }
}
