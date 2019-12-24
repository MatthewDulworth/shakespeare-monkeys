import Population from "./population.js";

// ----------- Main ----------- //
let target = "Hello There! General Kenobi!";

let population = new Population(5, target, 0.10, 0.95, 0.5);
console.log(population);