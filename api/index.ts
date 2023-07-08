import express, { Request, Response } from "express";
import morgan from "morgan";

const port = process.env.PORT || 3000;

const app = express();
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello world!");
});

app.get("/api", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.send(`Hello! Shefa`);
});

app.get("/api/item/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;
  res.send(`Item: ${slug}`);
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
