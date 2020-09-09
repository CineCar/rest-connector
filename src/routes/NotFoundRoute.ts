import { Route } from "./Route";

export class NotFoundRoute implements Route {
    handle(req: any, res: any): void {
        res.api.error(404, "Route does not exist");
    }
}
