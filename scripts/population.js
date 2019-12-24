import Monkey from "./monkey.js";

// ----------- Population ----------- //
// the set of monkeys
export default class Population {
   constructor(size, target, mutation_chance, mating_chance, mating_percentage) {
      this.generation = 1;
      this.size = size;
      this.target = target;
      this.monkeys = this.initialPopulation(size, target);

      this.mutation_chance = mutation_chance;
      this.mating_percentage = mating_percentage;
      this.mating_chance = mating_chance;
      this.mating_population = this.calculateMatingPopulation(size, mating_percentage);
   }

   // generates a random initial population
   initialPopulation(size, target) {
      let monkeys = [];
      for (let i = 0; i < size; i++) {
         let monkey = new Monkey(target);
         monkey.randomizeGenome(target.length);
         monkey.calculateFitness(target);
         monkeys.push(monkey);
      }
      return this.sortMonkeys(monkeys);
   }

   // creates a new generation of monkeys from the last one
   newGeneration() {
      let new_generation = [];
      let selected_monkeys = this.selectMatingMonkeys();

      while (selected_monkeys.length > 0) {
         let monkey1 = this.getRandomMonkey(selected_monkeys);
         this.removeMonkey(monkey1, selected_monkeys);

         let monkey2 = this.getRandomMonkey(selected_monkeys);
         this.removeMonkey(monkey2, selected_monkeys);

         new_generation.push(Monkey.mateMonkeys(monkey1, monkey2, this.target.length));
      }

      return this.sortMonkeys(new_generation);
   }

   // selects the monkeys that will mate
   selectMatingMonkeys() {
      let selected_monkeys = [];

      for (let i = 0; i < this.size; i++) {
         if (Math.random() < this.mating_chance) {
            selected_monkeys.push(this.monkeys[i]);
         }
         if (selected_monkeys.length == this.mating_population) {
            return selected_monkeys;
         }
      }

      // if not enough moneys are selected, reselect
      if (selected_monkeys.length != this.mating_population) {
         return this.selectMatingMonkeys();
      }
   }

   // removes a given monkey from a given array, returns true if successful
   removeMonkey(monkey, monkeys) {
      let i = 0, l = monkeys.length;
      for (i; i < l; i++) {
         if (monkey == monkeys[i]) {
            monkeys.splice(i, 1);
            return true;
         }
      }
      return false;
   }

   // gets a random monkey from a given array
   getRandomMonkey(monkeys) {
      let index = Math.floor(Math.random() * monkeys.length);
      return monkeys[index];
   }

   // sorts the population by fitness
   sortMonkeys(monkeys) {
      let sorted = monkeys.concat();
      sorted.sort(Monkey.compare);
      sorted.reverse();
      return sorted;
   }

   // calculates the number of monkeys in a generation that will mate
   calculateMatingPopulation(size, percentage) {
      let mating_pop = 2 * Math.round(size * percentage / 2);
      if (mating_pop > 2) {
         return mating_pop;
      } else {
         return 2;
      }
   }
}