import Population from "./population.js";
import Genome from "./genome.js";

// ----------- Main ----------- //
let goal = new Genome();
goal.setTo("Hello There! General Kenobi!");
console.log(goal);

let population = new Population(5, goal);
population.display();