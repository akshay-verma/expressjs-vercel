import express, { Request, Response } from "express";

const port = process.env.PORT || 3000;

const app = express();

app.get("/api", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Shefa`);
});

app.get("/api/item/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
