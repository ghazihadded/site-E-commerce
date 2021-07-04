const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processpayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: { integration_check: "succes_a_payment" },
    });

    res.status(200).json({
      succes: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json([{ msg: "server error" }]);
  }
};

exports.sendStripeApi = async (req, res, next) => {
  try {
    res.status(200).json({
      stripeapikey: process.env.STRIPE_API_KEY,
    });
  } catch (err) {
    res.status(500).json([{ msg: "server error" }]);
  }
};
