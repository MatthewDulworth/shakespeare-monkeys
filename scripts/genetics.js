// ----------- Imports ----------- //
import * as StringTools from "./string-tools.js"


// ----------- Genome ----------- //
// holds the genetic information of each monkey
export class Genome {
   constructor(length) {
      this.str = this.generateRandomGenome(length);
      this.length = length;
      this.charCounts = StringTools.getCharCounts(this.str, Genome.nucleotides());
      this.words = StringTools.getWords(this.str);
      this.wordCount = this.words.size;
   }

   // sets the genome to a specific pattern
   setTo(str) {
      this.str = str;
      this.length = str.length;
      this.charCounts = StringTools.getCharCounts(this.str, Genome.nucleotides());
      this.words = StringTools.getWords(this.str);
      this.wordCount = this.words.size;
   }

   // generates a random string of nucleotides up to length
   generateRandomGenome(length) {
      let str = "";
      for (let i = 0; i < length; i++) {
         str += this.getRandomNucleotide();
      }
      return str;
   }

   // get a random charecter from the nucleotide string
   getRandomNucleotide() {
      let index = Math.floor(Math.random() * Genome.nucleotides().length);
      return Genome.nucleotides().charAt(index);
   }

   // the possible nucleotides that make up the genome, includes all standerd qwerty charecters
   static nucleotides() {
      let nucs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]|~`!@#$%^&*()-_=+<>, .?/:;\'\"\\"
      return nucs;
   }

}

// ----------- Monkey ----------- //
// each monkey has a genome and a fitness score
class Monkey {

   constructor(goal) {
      this.genome = new Genome(goal.length);
      this.fitness = this.calculateFitness(goal);
   }

   // each correct letter in the correct place is +1 fitness
   calculateFitness(goal) {
      let fitness = 0;

      return fitness;
   }
}

// ----------- Population ----------- //
// the set of monkeys and the methods to evolve them
export class Population {
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