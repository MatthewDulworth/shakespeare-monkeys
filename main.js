// ----------- Constants ----------- //
const goal = "a";

// ----------- Genome ----------- //
// holds the genetic information of each monkey
class Genome {
   constructor(length) {
      this.length = length;
      this.string = this.generateRandomGenome(length);
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

   // the possible nucleotides that make up the genome 
   static nucleotides() {
      let nuc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]|~`!@#$%^&*()-_=+<>, .?/:;\'\"\\"
      return "a";
   }
}

// ----------- Monkey ----------- //
// each monkey has a genome and a fitness score
class Monkey {

   constructor(genomeLength) {
      this.genome = new Genome(genomeLength);
      this.fitness = this.calculateFitness();
   }

   // each correct letter in the correct place is +1 fitness
   calculateFitness() {
      let fitness = 0;

      for (let i = 0; i < goal.size; i++) {
         if (this.genome.string.charAt(i) == goal.charAt(i)) {
            fitness = fitness + 1;
         }
      }

      return fitness;
   }
}

// ----------- Population ----------- //
// the set of monkeys and the methods to evolve them
class Population {
   constructor(size, genomeLength) {
      this.generation = 1;
      this.size = size;
      this.monkeys = this.initialPopulation(size, genomeLength);
   }

   initialPopulation(size, genomeLength) {
      let monkeys = [];
      for (let i = 0; i < size; i++) {
         monkeys.push(new Monkey(genomeLength));
      }
      return monkeys;
   }

   display()
   {
      console.log(`Goal: ${goal}`);
      console.log(`***** Generation: ${this.generation} *****`);
      this.monkeys.forEach(m => {
         console.log(`Genome: {{${m.genome.string}}} Fitness: ${m.fitness}`);
      });
   }
}


// ----------- Main ----------- //
// execution starts here
let population = new Population(1, goal.length);
population.display();