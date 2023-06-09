const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: path.join(__dirname, "../.env") });

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

// To be handled in the  near future. PS: Strict CSP is safer than allowlist CSP
// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "script-src 'self' https://apis.google.com https://js.stripe.com https://www.googletagmanager.com;"
//   );
//   next();
// });

app.use(express.static(path.join(__dirname, "../build")));

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: req.body.currency,
      amount: req.body.amount,
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

// wildcard path MUST be last otherwise you can't access paths defined in the backend!!!
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(3000, () => {
  console.log("Server is live on http://localhost:3000");
});
