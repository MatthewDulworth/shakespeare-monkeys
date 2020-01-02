import CancellableAsync from "./cancellable-async.js";
import Population from "./population.js";
import Monkey from "./monkey.js";

// ----------- Vars ----------- //
let evolution = null;

// ----------- DOM Elements ----------- //
let evolveButton = document.querySelector("#evolve"),
   messageBox = document.querySelector("#message"),
   outputBox = document.querySelector("#output"),
   inputBox = document.querySelector("#input");

let popNumber = document.querySelector("#controls-wrapper input:nth-of-type(1)"),
   popRange = document.querySelector("#controls-wrapper input:nth-of-type(2)"),
   mateNumber = document.querySelector("#controls-wrapper input:nth-of-type(3)"),
   mateRange = document.querySelector("#controls-wrapper input:nth-of-type(4)"),
   reproNumber = document.querySelector("#controls-wrapper input:nth-of-type(5)"),
   reproRange = document.querySelector("#controls-wrapper input:nth-of-type(6)"),
   mutationNumber = document.querySelector("#controls-wrapper input:nth-of-type(7)"),
   mutationRange = document.querySelector("#controls-wrapper input:nth-of-type(8)");


// ----------- On load ----------- //
window.onload = function () {
   handleMatingPoolMax(popNumber);
   handleMatingPoolMax(popRange);
   evolution = new CancellableAsync(evolve);
}

// ----------- Control Inputs ----------- //
popNumber.addEventListener('input', e => popRange.value = e.target.value);
popRange.addEventListener('input', e => popNumber.value = e.target.value);
mateNumber.addEventListener('input', e => mateRange.value = e.target.value);
mateRange.addEventListener('input', e => mateNumber.value = e.target.value);
reproNumber.addEventListener('input', e => reproRange.value = e.target.value);
reproRange.addEventListener('input', e => reproNumber.value = e.target.value);
mutationNumber.addEventListener('input', e => mutationRange.value = e.target.value);
mutationRange.addEventListener('input', e => mutationNumber.value = e.target.value);

popNumber.addEventListener('input', e => handleMatingPoolMax(e.target));
popRange.addEventListener('mouseup', e => handleMatingPoolMax(e.target));

// ----------- Functions ----------- //
function displayMessage(message) {
   messageBox.textContent = message;
}

function displayOutput(output) {
   outputBox.textContent = output;
}

function handleMatingPoolMax(inputElement) {
   sanitizeNumberInput(inputElement);
   let val = inputElement.value;

   if (mateNumber.value > val || mateRange.value > val) {
      mateNumber.value = val;
      mateRange.value = val;
   }
   mateNumber.max = val;
   mateRange.max = val;

   sanitizeNumberInput(mateNumber);
   sanitizeNumberInput(mateRange);
}

function sanitizeNumberInput(inputElement) {
   if (inputElement.value === undefined || inputElement.value === "" || inputElement.value === null) {
      inputElement.value = 0;
   }
   else {
      inputElement.value = clamp(inputElement.value, inputElement.min, inputElement.max);
   }
   return inputElement.value;
}

function getSanitizedInput() {
   let input = {};
   input.pop_size = sanitizeNumberInput(popNumber);
   input.target = sanitizeTargetString(inputBox);
   input.mating_pool = sanitizeNumberInput(mateNumber);
   input.reproduction_chance = sanitizeNumberInput(reproNumber);
   input.mutation_chance = sanitizeNumberInput(mutationNumber);

   return input;
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