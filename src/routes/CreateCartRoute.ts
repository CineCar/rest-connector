import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class CreateCartRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .createCart()
            .then((cart) => {
                res.api.data(cart.toJSON());
            })
            .catch(() => {
                res.api.error(500, "Internal server error");
            });
    }
}
