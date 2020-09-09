import * as express from "express";
import { Middleware } from "./middleware";

import { LoginRoute } from "./routes/LoginRoute";
import { CreateMovieRoute } from "./routes/CreateMovieRoute";
import { DeleteMovieRoute } from "./routes/DeleteMovieRoute";
import { ChangeMovieInformationRoute } from "./routes/ChangeMovieInformationRoute";
import { GetMovieRoute } from "./routes/GetMovieRoute";
import { GetMoviesRoute } from "./routes/GetMoviesRoute";
import { NotFoundRoute } from "./routes/NotFoundRoute";
import { CreateCartRoute } from "./routes/CreateCartRoute";
import { GetCartRoute } from "./routes/GetCartRoute";
import { AddTicketToCartRoute } from "./routes/AddTicketToCartRoute";
import { CheckoutCartRoute } from "./routes/CheckoutCartRoute";
import { GetMovieScreeningsRoute } from "./routes/GetMovieScreeningsRoute";
import { CreateMovieScreeningRoute } from "./routes/CreateMovieScreeningRoute";
import { GetBookingsRoute } from "./routes/GetBookingsRoute";
import { CancelBookingRoute } from "./routes/CancelBookingRoute";
import { DeleteMovieScreeningRoute } from "./routes/DeleteMovieScreeningRoute";
import { ChangeMovieScreeningInformationRoute } from "./routes/ChangeMovieScreeningInformationRoute";

const app = express();

app.use(Middleware.use);

/* --- login route --- */

app.post("/login", new LoginRoute().handle);

/* --- authorization required routes --- */

app.post("/movies", Middleware.verifySession, new CreateMovieRoute().handle);
app.post("/movies/:id", Middleware.verifySession, new ChangeMovieInformationRoute().handle);
app.delete("/movies/:id", Middleware.verifySession, new DeleteMovieRoute().handle);

app.post("/movies/:id/movie-screenings", Middleware.verifySession, new CreateMovieScreeningRoute().handle);
app.post("/movie-screenings/:id", Middleware.verifySession, new ChangeMovieScreeningInformationRoute().handle);
app.delete("/movie-screenings/:id", Middleware.verifySession, new DeleteMovieScreeningRoute().handle);

app.get("/bookings", Middleware.verifySession, new GetBookingsRoute().handle);
app.delete("/bookings/:id", Middleware.verifySession, new CancelBookingRoute().handle);

/* --- public routes --- */

app.get("/movies", new GetMoviesRoute().handle);
app.get("/movies/:id", new GetMovieRoute().handle);

app.post("/movie-screenings", Middleware.verifySession, new GetMovieScreeningsRoute().handle);

app.post("/carts", new CreateCartRoute().handle);
app.get("/carts/:id", new GetCartRoute().handle);
app.post("/carts/:id", new AddTicketToCartRoute().handle);

app.post("/carts/:id/checkout", new CheckoutCartRoute().handle);

app.get("/*", new NotFoundRoute().handle);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});
