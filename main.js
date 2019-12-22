// ----------- Constants ----------- //
const goal = "AABkljfoa;ijkjalwkjerfhlkajwelLHA:S\\\ \"/>?FJNA:KJBlbALKJDFK:OEUF:W";

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

   // the possible nucleotides that make up the genome, includes all standerd qwerty charecters
   static nucleotides() {
      let nucs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]|~`!@#$%^&*()-_=+<>, .?/:;\'\"\\"
      return nucs;
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

      for (let i = 0; i < goal.length; i++) {
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

   display() {
      console.log(`Goal: ${goal}`);
      console.log(`***** Generation: ${this.generation} *****`);
      this.monkeys.forEach(m => {
         console.log(`Genome: {{${m.genome.string}}} Fitness: ${m.fitness}`);
      });
   }
}


// ----------- Main ----------- //
// execution starts here

let goalData = analyzeGoal(goal, Genome.nucleotides());

let population = new Population(1, goal.length);



// ----------- Functions ----------- //
function analyzeGoal(str, chars) {

   let data = {
      charCounts: [],
   };

   data.charCounts = getCharCounts(str, chars);

   return data;
}

function getCharCounts(str, chars)
{
   let counts = [];
   for (let i = 0; i < chars.length; i++) {
      let count = countChar(str, chars.charAt(i));
      console.log(chars.charAt(i), count);

      counts.push(count);
   }
   return counts;
}

function countChar(str, c) {
   let result = 0;
   for (let i = 0; i < str.length; i++) {
      if (str[i] == c) {
         result++;
      }
   }
   return result;
};