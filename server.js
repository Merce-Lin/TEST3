const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Merci:GameOn@gameon.xxqwr.mongodb.net/characters?retryWrites=true&w=majority");
        
// Define Mongoose Schema
const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gold: { type: Number, required: true },      
});

const Character = mongoose.model("Character", CharacterSchema);

// API Endpoint to Create Character
app.post("/api/characters", async (req, res) => {
  try {
    const { name, gold } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const newCharacter = new Character({ name, gold });
    await newCharacter.save();

    res.status(201).json({ message: "Character created successfully", character: newCharacter });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
