// ----------- Imports ----------- //
import * as StringTools from "./tools.js";
import {Population, Genome} from "./genetics.js";

// ----------- Constants ----------- //
const goal = "Hello There! general Kenobi!";


// ----------- Main ----------- //
// execution starts here
let goalData = StringTools.analyzeString(goal, Genome.nucleotides());
let population = new Population(1, goal);