import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Ticket } from "com.cinecar.objects";

export class CancelBookingRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .cancelBooking(req.params.id)
            .then((booking) => {
                res.api.data(booking.toJSON());
            })
            .catch(() => {
                res.api.error(500, "Internal server error");
            });
    }
}
