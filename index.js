const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const expressRoutes = require("./routes/expressRoutes");
const fs = require("fs");

app.engine("perscholas", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("view engine", "perscholas");
//CONNECTION TO DB

//MIDDLEWARE
app.use(cookieParser()); //third party middleware
const logReq = function (req, res, next) {
  console.log(" request received");
  next();
};
app.use(logReq);
app.use("/user", userRoutes);
app.use("/express", expressRoutes);

//ROUTES
// app.get("/", (req, res) => {
//   console.log("Cookies: ", req.cookies);
//   console.log("Signed Cookies: ", req.signedCookies);
//   res.send("I use cookies. Check the console");
// });

//TEMPLATE ENGING EXAMPLE

app.get("/", (req, res) => {
  const options = {
    title: "Rendering Views with Express",
    content:
      "Here, we've created a basic template engine using <code>app.engine()</code> \
      and the <code>fs</code> module, then used <code>res.render</code> to \
      render this page using custom content within the template.<br><br> \
      Generally, you won't want to create your own view engines, \
      but it important to understand how they work behind the scenes. \
      For a look at some popular view engines, check out the documentation for \
      <a href='https://pugjs.org/api/getting-started.html'>Pug</a>, \
      <a href='https://www.npmjs.com/package/mustache'>Mustache</a>, or \
      <a href='https://www.npmjs.com/package/ejs'>EJS</a>. \
      More complete front-end libraries like React, Angular, and Vue \
      also have Express integrations.",
  };
  res.render("index", options);
});

//PORT
app.listen(port, () => {
  console.log(`The server is listening on port: ${port}`);
});
