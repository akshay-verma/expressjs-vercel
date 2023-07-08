import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import morgan from "morgan";
import { z } from "zod";

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getUser: t.procedure.query(() => {
    return { name: "Bilbo" };
  }),
});

const app = express();

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000);
