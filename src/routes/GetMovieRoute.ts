import { Session, Movie } from "com.cinecar.objects";
import { TicketShopImplementation } from "com.cinecar.ticketshop";
import { Route } from "./Route";

export class GetMovieRoute implements Route {
    public handle(req, res) {
        TicketShopImplementation.getSingleton()
            .getMovie(req.params.id)
            .then((movie: Movie) => {
                const movieScreenings = [];

                movie.getMovieScreenings().forEach((movieScreening) => {
                    movieScreenings.push({
                        id: movieScreening.getId(),
                        datetime: movieScreening.getDatetime(),
                    });
                });

                res.api.data({
                    id: movie.getId(),
                    name: movie.getName(),
                    duration: movie.getDuration(),
                    price: movie.getPrice(),
                    imageUrl: movie.getImageUrl(),
                    movieScreenings: movieScreenings,
                });
            })
            .catch((err) => {
                res.api.error(404, "Movie not found");
            });
    }
}
