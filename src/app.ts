import * as express from "express";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Movie } from "com.cinecar.objects";
import { Middleware } from "./middleware";

const ticketShop: TicketShopImplementation = new TicketShopImplementation();

const app = express();

app.use(Middleware.use);

app.get("/movies/", async (req, res) => {
    const movies: Array<Movie> = await ticketShop.getMovies();
    const response = [];

    movies.forEach((movie) => {
        const movieScreenings = [];

        movie.getMovieScreenings().forEach((movieScreening) => {
            movieScreenings.push({
                id: movieScreening.getId(),
                datetime: movieScreening.getDatetime(),
            });
        });

        response.push({
            id: movie.getId(),
            name: movie.getName(),
            duration: movie.getDuration(),
            movieScreenings: movieScreenings,
        });
    });

    res.api.json(response);
});

app.get("/movies/:id", async (req, res) => {
    ticketShop
        .getMovie(req.params.id)
        .then((movie: Movie) => {
            const movieScreenings = [];

            movie.getMovieScreenings().forEach((movieScreening) => {
                movieScreenings.push({
                    id: movieScreening.getId(),
                    datetime: movieScreening.getDatetime(),
                });
            });

            res.api.json({
                id: movie.getId(),
                name: movie.getName(),
                duration: movie.getDuration(),
                movieScreenings: movieScreenings,
            });
        })
        .catch((err) => {
            res.api.error(404, "Movie not found");
        });
});

app.get("/*", (req, res) => {
    res.api.error(400, "Route does not exist");
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});
