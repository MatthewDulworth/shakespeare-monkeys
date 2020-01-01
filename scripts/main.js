import Population from "./population.js";

// ----------- DOM Elements ----------- //
let evolveButton = document.querySelector("#evolve"),
   popNumber = document.querySelector("#controls-wrapper input:nth-of-type(1)"),
   popRange = document.querySelector("#controls-wrapper input:nth-of-type(2)"),
   mateNumber = document.querySelector("#controls-wrapper input:nth-of-type(3)"),
   mateRange = document.querySelector("#controls-wrapper input:nth-of-type(4)"),
   reproNumber = document.querySelector("#controls-wrapper input:nth-of-type(5)"),
   reproRange = document.querySelector("#controls-wrapper input:nth-of-type(6)"),
   mutationNumber = document.querySelector("#controls-wrapper input:nth-of-type(7)"),
   mutationRange = document.querySelector("#controls-wrapper input:nth-of-type(8)");

// ----------- Input Listeners ----------- //
popNumber.addEventListener('input', e => popRange.value = e.target.value);
popRange.addEventListener('input', e => popNumber.value = e.target.value);
mateNumber.addEventListener('input', e => mateRange.value = e.target.value);
mateRange.addEventListener('input', e => mateNumber.value = e.target.value);
reproNumber.addEventListener('input', e => reproRange.value = e.target.value);
reproRange.addEventListener('input', e => reproNumber.value = e.target.value );
mutationNumber.addEventListener('input', e => mutationRange.value = e.target.value);
mutationRange.addEventListener('input', e => mutationNumber.value = e.target.value);

evolveButton.addEventListener('click', function (e) {
   
});

// ----------- Main ----------- //
//let population = new Population(500, target, 0.01, 0.95, 0.01);
// evolve(population);


// ----------- Evolve ----------- //
async function evolve(population) 
{
   while (population.getBestMonkey().fitness > 0) 
   {
      population.createNewGeneration();
      console.log(population.getBestMonkey());

      if (population.getBestMonkey().fitness === 0) 
      {
         console.log(`goal reached in ${population.generation} generations`);
      }
      await new Promise(r => setTimeout(r, 0));
   }
}