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
                    json.push(booking.toJSON());
                });

                res.api.data(json);
            })
            .catch(() => {
                res.api.error(500, "Internal server error");
            });
    }
}
