const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://Merci:GameOn@gameon-shard-00-00.xxqwr.mongodb.net:27017,gameon-shard-00-01.xxqwr.mongodb.net:27017,gameon-shard-00-02.xxqwr.mongodb.net:27017/characters?replicaSet=atlas-11lxty-shard-0&ssl=true");
        
// Define Mongoose Schema
const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Character = mongoose.model("Character", CharacterSchema);

// API Endpoint to Create Character
app.post("/api/characters", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const newCharacter = new Character({ name });
    await newCharacter.save();

    res.status(201).json({ message: "Character created successfully", character: newCharacter });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
