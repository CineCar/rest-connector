import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Ticket } from "com.cinecar.objects";

export class CheckoutCartRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .checkoutCart(parseInt(req.params.id), req.api.json.firstname, req.api.json.lastname)
            .then((booking) => {
                res.api.data(booking.toJSON());
            })
            .catch((err) => {
                console.log(err);
                res.api.error(400, "Missing information");
            });
    }
}
