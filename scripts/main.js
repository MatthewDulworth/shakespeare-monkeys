import Population from "./population.js";

// ----------- Main ----------- //
let target = "Hello There! General Kenobi!";

let population = new Population(100, target, 0.1, 0.95, 0.5);
console.log("gen1");
console.log(population);

population.createNewGeneration();
console.log("gen2");
console.log(population);


//evolveMonkeys(population);

async function evolveMonkeys(pop) {
   do {
      pop.createNewGeneration();

      await new Promise(r => setTimeout(r, 100));
   } while (pop.getBestMonkey().fitness != 0);
}