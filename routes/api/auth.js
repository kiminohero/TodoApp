const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  try {
    app.get(
      "/auth/google/callback",
      passport.authenticate("google"),
      (req, res) => {
        res.redirect("/todos");
      }
    );
  } catch (e) {
    console.log(e);
  }

  app.get("/api/logout", (req, res) => {
    req.logout(); // kills the cookie
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send({
      currentUser: req.user || ""
    });
  });
};
