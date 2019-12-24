// ----------- Monkey ----------- //
// each monkey has a genome and a fitness score
export default class Monkey {

   constructor(genome) {
      this.genome = genome;
   }

   // randomizes the genome of the monkey
   randomizeGenome(length) {
      this.genome = "";
      for (let i = 0; i < length; i++) {
         this.genome += Monkey.getRandomNucleotide();
      }
   }

   // calculates the fitness of the monkey
   calculateFitness(target) {
      let i = 0, l = this.genome.length;
      this.fitness = 0;

      for (i; i < l; i++) {
         if (this.genome.charAt(i) != target.charAt(i)) {
            this.fitness++;
         }
      }
      return this.fitness;
   }

   // returns the offspring of the two monkeys
   static mate(monkey1, monkey2, genome_length) {
      let offspring = new Monkey(target);

      for (let i = 0; i < genome_length; i++) {
         let parent1 = Math.random < 0.5;

         if (Math.random() < this.mutation_chance) {
            offspring.genome += Monkey.getRandomNucleotide();
         }
         else if (parent1) {
            offspring.genome += monkey1.genome.charAt(i);
         }
         else if (!parent1) {
            offspring.genome += monkey2.genome.charAt(i);
         }
      }

      offspring.calculateFitness();
      return offspring;
   }

   // compare two monkeys based on fitness
   static compare(a, b) {
      if (a.fitness < b.fitness) {
         return 1;
      }
      else if (a.fitness > b.fitness) {
         return -1;
      }
      else {
         return 0;
      }
   }

   // returns a random nucleotide
   static getRandomNucleotide() {
      let nucleotides = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]|~`!@#$%^&*()-_=+<>, .?/:;\'\"\\";
      let index = Math.floor(Math.random() * nucleotides.length);
      return nucleotides.charAt(index);
   }
}