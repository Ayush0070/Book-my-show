/***
 * SMTP servers = simple mail transfer protocol
 * how smtp servers works
 *  1. writing the email ( composing the letter)
 * 2. sending to SMTP server ( dropping at the post office )
 * 3. routing the email ( post office will route the email to the destination)
 * 4. recipient email serv ( destination post office)
 * 5. email deliver ( mailbox deliver)
 *
 * nodemailer - library to send email using nodejs
 * nodemailer - npm i nodemailer
 */

const bookingRouter = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

// No token
// Secure
// Stripe-recommended
bookingRouter.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise / cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // change to "usd" if needed
      automatic_payment_methods: {
        enabled: true,
      },
      description: "Movie Ticket Booking",
    });

    res.send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

bookingRouter.post("/book-show", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });
    res.send({
      success: true,
      message: "Booking Successful",
      data: newBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

bookingRouter.get(
  "/get-all-bookings/:userId",
  authMiddleware,
  async (req, res) => {
    try {
      const data = await Booking.find({ user: req.params.userId });
      console.log(data);
      const bookings = await Booking.find({ user: req.params.userId })
        .populate("user")
        .populate("show")
        .populate({
          path: "show",
          populate: {
            path: "movie",
            model: "Movie",
          },
        })
        .populate({
          path: "show",
          populate: {
            path: "theatre",
            model: "theatres",
          },
        });
      res.send({
        success: true,
        message: "All bookings fetched",
        data: bookings,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = bookingRouter;
