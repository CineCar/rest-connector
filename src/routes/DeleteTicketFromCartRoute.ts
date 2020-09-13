import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Route } from "./Route";

export class DeleteTicketFromCartRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .deleteTicketFromCart(parseInt(req.params.cartId), parseInt(req.params.ticketId))
            .then((cart) => {
                res.api.data(cart.toJSON());
            })
            .catch((err) => {
                res.api.error(400, err.toString());
            });
    }
}
