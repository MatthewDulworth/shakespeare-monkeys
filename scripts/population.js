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
}