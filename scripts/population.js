import Monkey from "./monkey.js";

// ----------- Population ----------- //
// the set of monkeys and the methods to evolve them
export default class Population {
   constructor(size, goal) {
      this.generation = 1;
      this.size = size;
      this.goal = goal;
      this.monkeys = this.initialPopulation(size, goal);
   }

   initialPopulation(size, goal) {
      let monkeys = [];
      for (let i = 0; i < size; i++) {
         monkeys.push(new Monkey(goal));
      }
      return monkeys;
   }

   display() {
      console.log(`Goal: ${this.goal}`);
      console.log(`***** Generation: ${this.generation} *****`);
      this.monkeys.forEach(m => {
         console.log(`Genome: { ${m.genome.str} } Fitness: ${m.fitness}`);
      });
   }

   displayFittest(num) {
      console.log("Fittest");
      let best = this.findFittest(num);
      best.forEach(m => {
         console.log(`Genome: { ${m.genome.str} } Fitness: ${m.fitness}`);
      });
   }

   findFittest(num) {
      let tempArray = this.monkeys.concat();
      let bestArray = [];
      let bestMonkey;

      for (let i = 0; i < num; i++) {
         bestMonkey = this.findMax(tempArray);
         bestArray.push(bestMonkey);

         let index = tempArray.indexOf(bestMonkey);
         if (index != -1) {
            tempArray.splice(index, 1);
         }
      }
      return bestArray;
   }

   findMax(monkeys) {
      let max = -Infinity, l = monkeys.length, bestMonkey;
      for (let i = 0; i < l; i++) {
         if (monkeys[i].fitness > max) {
            bestMonkey = monkeys[i];
            max = bestMonkey.fitness;
         }
      }
      return bestMonkey;
   }
}