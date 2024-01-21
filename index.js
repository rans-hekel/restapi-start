const path = require("path");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.render("getpost");
// });

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("_method"));
// agar memparsing data untuk format .json
app.use(express.json());
// ini untuk midlewaree agar tidak undefind karena default post adalah undefined
app.use(express.urlencoded({ extended: true }));
// ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuidv4(),
    // id: 1,
    username: "Michael",
    text: `Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way`,
  },
  {
    id: uuidv4(),
    // id: 2,
    username: "Kelly",
    text: `I talk a lot, so I’ve learned to tune myself out`,
  },
  {
    id: uuidv4(),
    // id: 3,
    username: "Kevin",
    text: `I JUST WANT TO LIE ON THE BEACH AND EAT HOT DOGS.`,
  },
  {
    id: uuidv4(),
    // id: 4,
    username: "Dwight",
    text: `IDENTITY THEFT IS NOT A JOKE, JIM! MILLIONS OF FAMILIES SUFFER EVERY YEAR.`,
  },
  {
    id: uuidv4(),
    // id: 5,
    username: "Ryan",
    text: `I’M SUCH A PERFECTIONIST THAT I'D KINDA RATHER NOT DO IT AT ALL THAN DO A CRAPPY VERSION.`,
  },
  {
    id: uuidv4(),
    // id: 6,
    username: "Jim",
    text: `EVERYTHING I HAVE I OWE TO THIS JOB… THIS STUPID, WONDERFUL, BORING, AMAZING JOB.`,
  },
];

app.get("/coments", (req, res) => {
  res.render("index", { comments });
});

app.get("/coments/create", (req, res) => {
  res.render("create");
});

app.post("/coments", (req, res) => {
  const { username, text } = req.body;
  comments.push({ username, text, id: uuidv4() });
  res.redirect("/coments");
});

app.get("/coments/:id", (req, res) => {
  const { id } = req.params;
  const coment = comments.find((c) => c.id === id);
  res.render("show", { coment });
});

app.get("/coments/:id/edit", (req, res) => {
  const { id } = req.params;
  const coment = comments.find((c) => c.id === id);
  res.render("edit", { coment });
});

app.patch("/coments/:id", (req, res) => {
  const { id } = req.params;
  const newComent = req.body.text;
  const foundComent = comments.find((c) => c.id === id);
  foundComent.text = newComent;
  res.redirect("/coments");
});

app.delete("/coments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/coments");
});

app.get("/orders", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/orders", (req, res) => {
  const { barang, harga } = req.body;
  res.send(`barang anda adalah ${barang} dan harganya adalah : ${harga}`);
});

app.listen(port, () => {
  console.log(`Server Running in http://localhost:${port}`);
});
