import { Session } from "com.cinecar.objects";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Route } from "./Route";

export class LoginRoute implements Route {
    public handle(req, res) {
        TicketShopImplementation.getSingleton()
            .loginUser(req.api.json.id, req.api.json.password)
            .then((session: Session) => {
                res.api.data({
                    id: session.getId(),
                    token: session.getToken(),
                });
            })
            .catch((err) => {
                res.api.error(401, "Username or password is invalid");
            });
    }
}
