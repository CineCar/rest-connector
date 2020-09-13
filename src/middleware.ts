import { TicketShopImplementation } from "com.cinecar.ticketshop";

export class Middleware {
    public static use(req, res, next): void {
        // Bypass CORS
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Headers", "*");

        res.api = {
            data: (data) => {
                res.json({
                    data: data,
                });
            },
            error: (code: number, message: string) => {
                res.status(code);

                res.json({
                    error: {
                        code: code,
                        message: message,
                    },
                });
            },
        };

        if (req.method == "POST") {
            req.api = {
                data: "",
                json: {},
            };

            req.on("data", (chunk) => {
                req.api.data += chunk;
            });

            req.on("end", () => {
                try {
                    req.api.json = JSON.parse(req.api.data);
                    next();
                } catch (err) {
                    res.api.error(400, "Invalid JSON");
                }
            });
        } else next();
    }

    public static async verifySession(req, res, next) {
        const authorizationHeader = req.get("Authorization");

        if (authorizationHeader != null) {
            try {
                const authorizationHeaderParts = authorizationHeader.split(":");
                TicketShopImplementation.getSingleton()
                    .verifySession(parseInt(authorizationHeaderParts[0]), authorizationHeaderParts[1])
                    .then(() => {
                        next();
                    })
                    .catch((err) => {
                        res.api.error(401, "Wrong session");
                    });
            } catch (err) {
                res.api.error(500, "Internal server error");
            }
        } else res.api.error(400, "Missing Authorization header");
    }
}
