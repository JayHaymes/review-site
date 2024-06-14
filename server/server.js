require("dotenv").config();
const express = require("express");
const db = require('./db')
const morgan = require("morgan");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json())


// Get a restaurant
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        // const results = await db.query("SELECT * FROM restaurants");
        const restaurantRatingData = await db.query("SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
        res.status(200).json({
            status: "success",
            results: restaurantRatingData.rows.length,
            data: {
                restaurants: restaurantRatingData.rows
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
        const restaurant = await db.query(`SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1;`, [id]);
        const reviews = await db.query(`SELECT * FROM reviews WHERE restaurant_id= $1`, [id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (error) {
        console.log(error)
    }

});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) RETURNING *", [
            req.body.name,
            req.body.location,
            req.body.price_range
        ]);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
    }

});

// Edit a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name= $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [
            req.body.name,
            req.body.location,
            req.body.price_range,
            req.params.id
        ]);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
});

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
            req.params.id
        ]);
        res.status(204).json({
            status: 'success'
        });
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1,$2,$3,$4) returning *",[
            req.params.id,
            req.body.name,
            req.body.review,
            req.body.rating
        ]);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
})






const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
});