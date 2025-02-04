let char;
let level;
let xp = 0;
let gold = 50;
let health = 100;

const CreateButton = document.querySelector("#create");
const LoadButton = document.querySelector("#load");
const Popup = document.querySelector("#popup");

CreateButton.onclick = function(){
  Popup.style.display = "block";
};

LoadButton.onclick = LoadCharacter;
