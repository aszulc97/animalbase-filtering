"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");
  document.querySelector("button[data-filter='cat']").addEventListener("click", function () {
    displayFiltered("cat");
  });
  document.querySelector("button[data-filter='dog']").addEventListener("click", function () {
    displayFiltered("dog");
  });
  document.querySelector("button[data-filter='*']").addEventListener("click", function () {
    displayFiltered("");
  });
  // TODO: Add event-listeners to filter and sort buttons
  loadJSON();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();
  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function filtering(animalType) {
  let filteredData = allAnimals.filter((animal) => animal.type === animalType);
  if (!filteredData.length) {
    filteredData = allAnimals;
  }
  return filteredData;
}

function displayFiltered(animalType) {
  let filtered = filtering(animalType);
  displayList(filtered);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);
  displayFiltered("");
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
