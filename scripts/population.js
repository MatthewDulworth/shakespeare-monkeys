import Monkey from "./monkey.js";

// ----------- Population ----------- //
// the set of monkeys
export default class Population {
   constructor(size, target) {
      this.generation = 1;
      this.size = size;
      this.target = target;
      this.monkeys = this.initialPopulation(size, target);
   }

   // generates a random initial population
   initialPopulation(size, target) {
      let monkeys = [];
      for (let i = 0; i < size; i++) {
         monkeys.push(new Monkey(target));
      }
      return monkeys;
   }

   // finds 
   findFittest(num) {
      let tempArray = this.monkeys.concat();
      let bestArray = [];
      let bestMonkey;

      for (let i = 0; i < num; i++) {
         bestMonkey = this.findMin(tempArray);
         bestArray.push(bestMonkey);

         let index = tempArray.indexOf(bestMonkey);
         if (index != -1) {
            tempArray.splice(index, 1);
         }
      }
      return bestArray;
   }

   findMin(monkeys) {
      let min = Infinity, l = monkeys.length, bestMonkey;
      for (let i = 0; i < l; i++) {
         if (monkeys[i].fitness < min) {
            bestMonkey = monkeys[i];
            min = bestMonkey.fitness;
         }
      }
      return bestMonkey;
   }
}