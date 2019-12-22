// ----------- Imports ----------- //
import * as StringTools from "./string-tools.js";
import {Population, Genome} from "./genetics.js";

// ----------- Constants ----------- //
const goal = "Hello There! General Kenobi!";

// ----------- Main ----------- //
// execution starts here
let goalData = StringTools.analyzeString(goal, Genome.nucleotides());
let population = new Population(5, goal);

population.display();