import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import session from "express-session";

export function mountMiddlewares(app) {
  let redisClient = createClient({
    url: process.env.REDIS_CONNECTION_STRING,
  });
  redisClient.connect().catch(console.error);

  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "eShop:",
  });

  const __dirname = new URL(".", import.meta.url).pathname;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "../public")));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true },
    })
  );

  // Expose data to locals (all view templates)
  app.use(function(req, res, next) {
    res.locals.cart = req.session.cart;
    next();
});

  app.use(errorHandler);

  function errorHandler(err, req, res, nex) {
    console.error(err);
    res.send(err.toString());
  }
}
