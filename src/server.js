import express from "express";
import v1Router from "./routers/v1/index.js";
import { serverConfig } from "./config/index.js"
import { appErrorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware.js";
import logger from "./config/logger.config.js";

const app = express();

app.use(express.json())


/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router)

app.get("/", (req, res) => {
    console.log("---")
    res.json({
        data: "working"
    })
})


/**
 * Add the error handler middleware
 */

app.use(notFoundHandler)
app.use(appErrorHandler)


app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
})