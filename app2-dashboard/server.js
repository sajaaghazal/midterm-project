const express = require("express");
const redis = require("redis");
const path = require("path");

const app = express();

// Create Redis client for dashboard monitoring system
const client = redis.createClient({
    url: "redis://redis:6379"
});

client.connect();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {

    // Fetch total number of page visits from Redis
    const visits = await client.get("visits") || 0;

    // Count total stored messages from Redis list
    const messages = await client.lLen("messages") || 0;

    // Send live Redis statistics to dashboard page
    res.render("dashboard", {
        visits,
        messages
    });
});

app.listen(4000, () => {
    console.log("Dashboard running on port 4000");
});