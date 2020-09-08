export class Middleware {
    static use(req, res, next) {
        res.api = {
            json: (data) => {
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

        next();
    }
}
