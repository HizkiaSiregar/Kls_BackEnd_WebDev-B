const express = require("express");
const morgan = require("morgan");
const users = require("./users");

const app = express();

app.use(morgan("dev"));

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:name", (req, res) => {
  const { name } = req.params;
  const lowercaseName = name.toLowerCase();
  const user = users.find((user) => user.name.toLowerCase() === lowercaseName);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "Data user tidak ditemukan",
    });
  }

  res.json(user);
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "terjadi kesalahan pada server",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
