import {makeSingle} from "./cancellable-async.js";
import Population from "./population.js";

// ----------- Vars ----------- //
let quitEvolution = false;
let evolutionRunning = false;

// ----------- DOM Elements ----------- //
let evolveButton = document.querySelector("#evolve"),
   messageBox = document.querySelector("#message"),
   outputBox = document.querySelector("#output"),
   inputBox = document.querySelector("#input"),
   popNumber = document.querySelector("#controls-wrapper input:nth-of-type(1)"),
   popRange = document.querySelector("#controls-wrapper input:nth-of-type(2)"),
   mateNumber = document.querySelector("#controls-wrapper input:nth-of-type(3)"),
   mateRange = document.querySelector("#controls-wrapper input:nth-of-type(4)"),
   reproNumber = document.querySelector("#controls-wrapper input:nth-of-type(5)"),
   reproRange = document.querySelector("#controls-wrapper input:nth-of-type(6)"),
   mutationNumber = document.querySelector("#controls-wrapper input:nth-of-type(7)"),
   mutationRange = document.querySelector("#controls-wrapper input:nth-of-type(8)");

// ----------- Control Inputs ----------- //
popNumber.addEventListener('input', e => popRange.value = e.target.value);
popRange.addEventListener('input', e => popNumber.value = e.target.value);
mateNumber.addEventListener('input', e => mateRange.value = e.target.value);
mateRange.addEventListener('input', e => mateNumber.value = e.target.value);
reproNumber.addEventListener('input', e => reproRange.value = e.target.value);
reproRange.addEventListener('input', e => reproNumber.value = e.target.value );
mutationNumber.addEventListener('input', e => mutationRange.value = e.target.value);
mutationRange.addEventListener('input', e => mutationNumber.value = e.target.value);

// ----------- Text Boxes ----------- //
function displayMessage(message){
   messageBox.textContent = message;
}

function displayOutput(output){
   outputBox.textContent = output;
}

// ----------- Evolution ----------- //
function* evolve(population_size, target, mutation_chance, mating_chance, mating_percent, ms) {
   let population = new Population(population_size, target, mutation_chance, mating_chance, mating_percent);

   while (population.getBestMonkey().fitness > 0) {
      population.createNewGeneration();

      if (population.getBestMonkey().fitness === 0) {
         return true;
      }
      yield new Promise(r => setTimeout(r, ms));
   }
}
evolve = makeSingle(evolve);

evolveButton.addEventListener('click', function (e) 
{
   evolve(10, "hello there general kenobi", 0, 0.9, 0.5, 0);
});