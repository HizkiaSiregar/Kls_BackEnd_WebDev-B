const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const multer = require("multer");
const upload = multer({ dest: "public" });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    const allStudent = await prisma.students.findMany();
    res.status(200).json({ status: "success", data: allStudent });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    await prisma.students.create({
      data: {
        name: 'Hizkia',
        address: 'Crystal 2',
      },
    });
    res.status(200).json({ status: "success", message: "data berhasil dimasukan" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get student by ID
app.get("/students/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const student = await prisma.students.findUnique({ where: { id: Number(id) } });
      res.status(200).json({ status: "success", data: student });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
});

// Update Student by ID
app.put("/students/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address } = req.body;
      const updatedStudent = await prisma.students.update({
        where: { id: Number(id) },
        data: { name, address },
      });
      res.status(200).json({ status: "success", data: updatedStudent });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
 });

// Delete student by ID
app.delete("/students/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedStudent = await prisma.students.delete({ where: { id: Number(id) } });
      res.status(200).json({ status: "success", data: deletedStudent });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.json({
    status: "success",
    data: {
      username: username,
      password: password,
    },
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    res.send("File berhasil diupload");
  } else {
    res.send("File gagal diupload");
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
