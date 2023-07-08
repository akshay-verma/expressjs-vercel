import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  get: t.procedure.input(z.number()).query(async (opts) => {
    opts.input; // number
    const user = await primsa.user.findMany({
      where: {
        id: opts.input,
      },
    });
    return user;
  }),
  create: t.procedure
    .input(z.object({ email: z.string(), name: z.string() }))
    .mutation(async (opts) => {
      const output = await primsa.user.create({
        data: {
          email: opts.input.email,
          name: opts.input.name,
        },
      });
      return output;
    }),
});

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000);
