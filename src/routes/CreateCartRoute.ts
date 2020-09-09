import { Route } from "./Route";
import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class CreateCartRoute implements Route {
    handle(req: any, res: any): void {
        TicketShopImplementation.getSingleton()
            .createCart()
            .then((cart) => {
                res.api.data({
                    id: cart.getId(),
                    creationDate: cart.getCreationDate(),
                });
            });
    }
}
