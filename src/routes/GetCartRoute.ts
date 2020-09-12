import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Ticket } from "com.cinecar.objects";

export class GetCartRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .getCart(parseInt(req.params.id))
            .then((cart) => {
                res.api.data(cart.toJSON());
            })
            .catch(() => {
                res.api.error(404, "Cart does not exist");
            });
    }
}
