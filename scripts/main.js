import CancellableAsync from "./cancellable-async.js";
import Population from "./population.js";
import Monkey from "./monkey.js";

// ----------- Vars ----------- //
var evolution = null;

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

// ----------- Control Inputs ----------- //
popNumber.addEventListener('input', e => popRange.value = e.target.value);
popRange.addEventListener('input', e => popNumber.value = e.target.value);
mateNumber.addEventListener('input', e => mateRange.value = e.target.value);
mateRange.addEventListener('input', e => mateNumber.value = e.target.value);
reproNumber.addEventListener('input', e => reproRange.value = e.target.value);
reproRange.addEventListener('input', e => reproNumber.value = e.target.value);
mutationNumber.addEventListener('input', e => mutationRange.value = e.target.value);
mutationRange.addEventListener('input', e => mutationNumber.value = e.target.value);

// ----------- Text Boxes ----------- //
function displayMessage(message) {
   messageBox.textContent = message;
}

function displayOutput(output) {
   outputBox.textContent = output;
}

// ----------- Evolution ----------- //
function* evolve(population_size, target, mutation_chance, reproduction_chance, mating_percent, ms) {
   let population = new Population(population_size, target, mutation_chance, reproduction_chance, mating_percent);
   
   try{
      while (population.getBestMonkey().fitness > 0) {
         population.createNewGeneration();
   
         if (population.getBestMonkey().fitness === 0) {
            return true;
         }
        
         yield new Promise(r => setTimeout(r, ms));
      }
   }
   catch(e){
      if(e.message == 'single-monkey'){
         console.log("yeet");
      }
   }
}

function initializeEvolve()
{
   if(evolution === null){
      evolution = new CancellableAsync(evolve);
   }  
}


evolveButton.addEventListener('click', function (e) {
   let target = getSanitizedInput();
   let pop_size = popNumber.value,
      mutation_chance = mutationNumber.value,
      reproduction_chance = reproNumber.value,
      mating_percent = mateNumber.value;

   initializeEvolve();

   evolution.run(pop_size, target, mutation_chance, reproduction_chance, mating_percent);
});

function getSanitizedInput() {
   let input = inputBox.textContent;
   let sanitizedInput = "";

   for (let i = 0; i < input.length; i++) {
      let c = inputBox.textContent.charAt(i);
      if (Monkey.nucleotides().includes(c)) {
         sanitizedInput += c;
      }
   }

   return sanitizedInput;
}

// ----------- Main ----------- //
