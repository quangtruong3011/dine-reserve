import cors from "cors";
import { Request } from "express";

// const allowlist = process.env.ALLOWED_ORIGINS?.split(",");
const allowlist = ["http://localhost:3000",];

let corsOptions: any = {
    origin: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

const corsOptionsDelegate = function (req: Request, callback: any) {
    if (allowlist.indexOf(req.header("Origin")!) !== -1) {
        corsOptions = {
            origin: true,
            ...corsOptions,
        };
    } else {
        corsOptions = {
            origin: false,
            ...corsOptions,
        };
    }
    callback(null, corsOptions);
}

export const corsMiddleware = cors(corsOptionsDelegate);
