require("dotenv").config();
const express = require("express");
const db = require('./db')
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json())


// Get a restaurant
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants");

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Get a single restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const id = req.params.id
        const results = await db.query(`SELECT * FROM restaurants WHERE id= $1`, [id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
    } catch (error) {
        console.log(error)
    }
  
});

// Create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }
    });
});

// Edit a restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }
    });
});

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "success"
    });
});








const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
});