import express from "express";

const app = express();
const port = 3000;

export function logger(req, res, next) {
  const now = new Date().toLocaleString();
  console.log(`[${now}]\t ${req.method}\t ${req.url}`);
  next();
}

export function checkAPIKey(req, res, next) {
  const APIKey = req.header("x-api-key");
  console.log("Header received:", APIKey);
  if (APIKey !== "12345") {
    return res.status(404).json({
      error: "API key is incorrect",
    });
  }

  next();
}


