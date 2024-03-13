const express = require('express');
const db = require('./db'); 

const app = express();
app.use(express.json()); 

app.get("/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.status(200).json({ status: "success", data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO students (name, address) VALUES ($1, $2) RETURNING *",
      [name, address]
    );
    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "Data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const result = await db.query(
      "UPDATE students SET name = $1, address = $2 WHERE id = $3 RETURNING *",
      [name, address, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ status: "error", message: "Student not found" });
    }
    res.status(200).json({
      status: "success",
      data: result.rows[0],
      message: "Student updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM students WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: "error", message: "Student not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Student deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM students WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ status: "error", message: "Student not found" });
    }
    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});