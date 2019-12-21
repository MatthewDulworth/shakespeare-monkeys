// ----------- Constants ----------- //
const shakespeare = "this is a test";

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
   getRandomNucleotide()
   {
      let index = Math.floor(Math.random() * Genome.nucleotides().length);
      return Genome.nucleotides().charAt(index);
   }

   // the possible nucleotides that make up the genome 
   static nucleotides()
   {
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]|~`!@#$%^&*()-_=+<>, .?/:;\'\"\\";
   }
}

// ----------- Monkey ----------- //
// each monkey has a genome and a fitness score
class Monkey {

   constructor(genomeLength) {
      this.genome = new Genome(genomeLength);
      this.fitness = this.calculateFitness;
   }

   // each correct letter is +1 fitness, each correct word is +2 fitness
   calculateFitness() {
      let fitness = 0;
      return fitness;
   }
}

// ----------- Population ----------- //
// the set of monkeys and the methods to evolve them
class Population {
   constructor(size, genomeLength) {
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
}


// ----------- Main ----------- //
// execution starts here
let population = new Population(5, 100);

population.monkeys.forEach(monkey => {
   console.log(monkey.genome.string);
});