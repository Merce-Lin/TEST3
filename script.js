let char;
let level;
let xp = 0;
let gold = 50;
let health = 100;

const CreateButton = document.querySelector("#create");
const LoadButton = document.querySelector("#load");
const Popup = document.querySelector("#popup");
const SubmitButton = document.querySelector("#submit");
const CancelButton = document.querySelector("#cancel");
const CharacterNameInput = document.querySelector("#charactername");

CreateButton.onclick = function() {
  Popup.style.display = "block";
};

SubmitButton.onclick = async function() {
  const characterName = CharacterNameInput.value.trim();

  if (!characterName) {
    alert("Please enter a character name.");
    return;
  }

  try {
    const response = await fetch("https://test3-vngm.onrender.com/api/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: characterName }),
    });

    const data = await response.json();
    console.log("Response from server:", data);

    if (response.ok) {
      alert("Character created successfully!");
      Popup.style.display = "none"; 
      CharacterNameInput.value = ""; 
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error sending data:", error);
    alert("Failed to create character. Try again later.");
  }
};

LoadButton.onclick = LoadCharacter;
