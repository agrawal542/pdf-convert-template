import { InternalServerError } from "../utils/errors/app.error.js";


export const pingHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Pong!" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong while executing the ping handler."));
    }
}