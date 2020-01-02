import CancellableAsync from "./cancellable-async.js";
import Population from "./population.js";
import Monkey from "./monkey.js";

// ----------- Vars ----------- //
let evolution;
const POPULATION = 0;
const MATE = 1;
const REPRODUCTION = 2;
const MUTATION = 3;

// ----------- DOM Elements ----------- //
let evolveButton = document.querySelector("#evolve"),
   messageBox = document.querySelector("#message"),
   outputBox = document.querySelector("#output"),
   inputBox = document.querySelector("#input");

let numberInputs = document.querySelectorAll("#controls input:nth-of-type(odd)");
let rangeInputs = document.querySelectorAll("#controls input:nth-of-type(even)")


// ----------- On load ----------- //
window.onload = function () {
   evolution = new CancellableAsync(evolve);
}

// ----------- Control Input Listners ----------- //
for (let i = 0; i < numberInputs.length; i++) {

   // link number value to range value
   numberInputs[i].addEventListener('input', e => {
      sanitizeNumberInput(i);
      rangeInputs[i].value = e.target.value;
   });

   // link range value to number value
   rangeInputs[i].addEventListener('input', e => numberInputs[i].value = e.target.value);
   rangeInputs[i].addEventListener('input', e => sanitizeNumberInput(i));
}
numberInputs[POPULATION].addEventListener('input', e => handleMatingPoolMax(POPULATION));
rangeInputs[POPULATION].addEventListener('input', e => handleMatingPoolMax(POPULATION));


// ----------- Display ----------- //
function displayMessage(message) {
   messageBox.textContent = message;
}

function displayOutput(output) {
   outputBox.textContent = output;
}

function handleMatingPoolMax(index) {
   sanitizeNumberInput(index);
   let val = numberInputs[index].value;

   if (numberInputs[MATE].value > val || rangeInputs[MATE].value > val) {
      numberInputs[MATE].value = val;
      rangeInputs[MATE].value = val;
   }
   numberInputs[MATE].max = val;
   rangeInputs[MATE].max = val;

   sanitizeNumberInput(MATE);
}

// ----------- Sanitization ----------- //
function getSanitizedInput() {
   let input = {};
   input.pop_size = sanitizeNumberInput(POPULATION);
   input.target = sanitizeTargetString(inputBox);
   input.mating_pool = sanitizeNumberInput(MATE);
   input.reproduction_chance = sanitizeNumberInput(REPRODUCTION);
   input.mutation_chance = sanitizeNumberInput(MUTATION);

   return input;
}

function sanitizeNumberInput(index) {
   let number = numberInputs[index];
   let range = rangeInputs[index];

   if (number.value.length == 0 || range.value.length == 0) {
      number.value = number.min;
      range.value = range.min;
   }
   else {
      number.value = clamp(number.value, number.min, number.max);
      range.value = clamp(number.value, number.min, number.max);
   }
   return numberInputs[index].value;
}

function sanitizeTargetString(inputElement) {
   let input = inputElement.textContent;
   let sanitizedInput = "";

   for (let i = 0; i < input.length; i++) {
      let c = inputBox.textContent.charAt(i);
      if (Monkey.nucleotides.includes(c)) {
         sanitizedInput += c;
      }
   }
   inputElement.textContent = sanitizedInput;

   return inputElement.textContent;
}

function clamp(num, min, max) {
   num = parseFloat(num);
   min = parseFloat(min);
   max = parseFloat(max);
   return Math.max(min, Math.min(num, max));
}

// ----------- Evolution ----------- //
function* evolve(pop_size, target, mating_pool, reproduction_chance, mutation_chance, ms) {
   let population = new Population(pop_size, target, mating_pool, reproduction_chance, mutation_chance);

   try {
      while (population.getBestMonkey().fitness > 0) {
         population.createNewGeneration();

         if (population.getBestMonkey().fitness === 0) {
            return true;
         }

         yield new Promise(r => setTimeout(r, ms));
      }
   }
   catch (e) {
      if (e.message == 'single-monkey') {
         console.error("single-monkey");
      }
   }
}

var yeet = true;
evolveButton.addEventListener('click', function (e) {
   if (yeet) {
      let input = getSanitizedInput();
      evolution.run(input.pop_size, input.target, input.mating_pool, input.reproduction_chance, input.mutation_chance, 1000);
      yeet = false;
   }
   else {
      evolution.terminate;
   }
});