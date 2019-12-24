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

   // creates a new generation of monkeys from the last one
   newGeneration() {
      let new_generation = this.mateMonkeys(this.selectMatingMonkeys());
      return this.sortMonkeys(new_generation);
   }

   // selects the monkeys that will mate
   selectMatingMonkeys() {
      let selected_monkeys = [];

      for (let i = 0; i < this.mating_population; i++) {

      }
      return selected_monkeys;
   }

   // mates the selected monkeys
   mateMonkeys() {

   }

   // sorts the population by fitness
   sortMonkeys(monkeys) {
      let sorted = monkeys.concat();
      sorted.sort(Monkey.compare);
      sorted.reverse();
      return sorted;
   }

   // generates a random initial population
   initialPopulation(size, target) {
      let monkeys = [];
      for (let i = 0; i < size; i++) {
         monkeys.push(new Monkey(target));
      }
      return this.sortMonkeys(monkeys);
   }

   // finds monkeys with the best fitness scores
   getFittest(num) {
      let fittest = [];
      for (let i = 0; i < num; i++) {
         fittest.push(this.monkeys[i])
      }
      return fittest;
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