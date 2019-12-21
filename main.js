const shakespeare = "this is a test";

// ----------- Genome ----------- //
// holds the genetic information of each monkey
class Genome {

   constructor(length) {
      this.length = length;
      this.string = generateRandomString(length);
   }

   // generates a random string of charecters up to length
   generateRandomString(length) {
      let str = "";
      for (let i = 0; i < length; i++) {
         str += this.generateRandomChar();
      }
      return str;
   }

   // generates a random charecter from between ascii codes 32 & 126, inclusive
   generateRandomChar() {
      let num = Math.floor(Math.random() * (32 - 126 + 1)) + 32;
      return String.fromCharCode(num);
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
   calculateFitness()
   {
      let fitness = 0;
      return fitness;
   }
}

// ----------- Population ----------- //
// the set of monkeys and the methods to evolve them
class Population {
   constructor() {
      this.monkeys = initialPopulation();
   }

   initialPopulation() {
      
   }
}


// ----------- Main ----------- //
// execution starts here
