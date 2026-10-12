const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");



router.get("/", (req, res) => {
    res.render("auth/login");
});
// =========================
// Show Signup Page
// =========================
router.get("/signup", (req, res) => {
    res.render("auth/signup");
});

// =========================
// Register User
// =========================
router.post("/signup", async (req, res, next) => {
    try {
        const { email, username, password, role } = req.body;

        const user = new User({
            email,
            username,
            role,
        });

        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash("success", "Registration successful! Welcome to ShopEase.");
            res.redirect("/products");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
});

// =========================
// Show Login Page
// =========================
router.get("/login", (req, res) => {
    res.render("auth/login");
});

// =========================
// Login User
// =========================
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome back!");
        res.redirect("/products");
    }
);

// =========================
// Logout User
// =========================
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.flash("success", "Logged out successfully.");
        res.redirect("/login");
    });
});

module.exports = router;