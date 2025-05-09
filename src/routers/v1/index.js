import exprss from "express";
import pingRouter from "./ping.router.js";
import conversionRouter from "./conversion.router.js";
import modifyRouter from "./modify.router.js";

const v1Router = exprss.Router();


v1Router.use('/ping', pingRouter)
v1Router.use('/conversion', conversionRouter)
v1Router.use('/modify', modifyRouter)



export default v1Router;


