import express from "express";
import appRouter from "../Routes";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { errorMiddleWare } from "./middlewares";
// import { errorMiddleWare } from "./middlewares";

export function makeServer() {
    const app = express();

    app.use(cors())

    app.use(helmet())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    // app.use(bodyParser.json())

    app.use((req, _, next) => {
        console.log("[->] ", req.method, req.url);
        next();
    })

    app.use(appRouter);
    app.use(errorMiddleWare);

    // app.use(
    //     "/docs",
    //     swaggerUi.serve,
    //     swaggerUi.setup(undefined, {
    //         swaggerOptions: {
    //             url: "/swagger.json",
    //             explorer: true
    //         },
    //     })
    // );

    return app;
}