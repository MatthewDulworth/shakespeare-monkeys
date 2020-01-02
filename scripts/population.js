import Monkey from "./monkey.js";

// ----------- Population ----------- //
// the set of monkeys
export default class Population {
   constructor(size, target, mating_pool, reproduction_chance, mutation_chance) {
      this.generation = 1;
      this.size = size;
      this.target = target;
      this.monkeys = this.initialPopulation(this.size, this.target);

      this.mutation_chance = mutation_chance;
      this.reproduction_chance = reproduction_chance;
      this.mating_pool = mating_pool;
   }

   // generates a random initial population
   initialPopulation(size, target) {
      let monkeys = [];
      for (let i = 0; i < size; i++) {
         let monkey = new Monkey();
         monkey.randomizeGenome(target.length);
         monkey.calculateFitness(target);
         monkeys.push(monkey);
      }
      return this.sortMonkeys(monkeys);
   }

   // creates a new generation of monkeys from the last one
   createNewGeneration() {
      let new_generation = [];
      let selected_monkeys = this.selectMatingMonkeys();

      while (new_generation.length < this.size) {
         let mating_list = selected_monkeys.slice(0);

         if (new_generation.length === 1) {
            throw new RangeError("single-monkey");
         }

         while (mating_list.length > 1) {
            let parents = this.selectMatingPair(mating_list);
            let offspring = Monkey.mate(parents[0], parents[1], this.mutation_chance, this.target);
            new_generation.push(offspring);

            if (new_generation.length === this.size) {
               break;
            }
         }
      }

      this.generation++;
      this.monkeys = this.sortMonkeys(new_generation);
   }

   selectMatingPair(monkeys) {
      let parent1 = this.getRandomMonkey(monkeys);
      this.removeMonkey(parent1, monkeys);

      let parent2 = this.getRandomMonkey(monkeys);
      this.removeMonkey(parent2, monkeys);

      return [parent1, parent2];
   }

   // selects the monkeys that will mate
   selectMatingMonkeys() {
      let selected_monkeys = [];
      let unselected_monkeys = this.monkeys.slice(0);

      // loop until enough monkeys have been selected
      while (selected_monkeys.length !== this.mating_pool) {
         if (unselected_monkeys.length <= 0) {
            console.error("cannot select more mating monkeys than exist in the population");
            return null;
         }

         // loop through the set of all unselected monkeys
         for (let i = 0; i < unselected_monkeys.length; i++) {

            // if monkey is selected, add it to selected, remove it from unselected
            if (Math.random() < this.reproduction_chance) {
               let monkey = unselected_monkeys[i];
               selected_monkeys.push(monkey);
               this.removeMonkey(monkey, unselected_monkeys);
            }

            // if enough monkeys are selected
            if (selected_monkeys.length === this.mating_pool) {
               return selected_monkeys;
            }
         }
      }
   }

   // removes first instance of a given monkey from a given array, returns true if successful
   removeMonkey(monkey, monkeys) {
      let i = 0, l = monkeys.length;
      for (i; i < l; i++) {
         if (monkey === monkeys[i]) {
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

   // returns the monkey with the best fitness
   getBestMonkey() {
      return this.monkeys[0];
   }
}