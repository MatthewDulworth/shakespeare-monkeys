// ----------- Imports ----------- //
import { Population, Genome } from "./genetics.js";

// ----------- Main ----------- //
let goal = new Genome();
goal.setTo("Hello There! General Kenobi!");
console.log(goal);

let population = new Population(5, goal);
population.display();