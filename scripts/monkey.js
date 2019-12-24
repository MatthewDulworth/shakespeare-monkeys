// ----------- Monkey ----------- //
// each monkey has a genome and a fitness score
export default class Monkey {

   constructor(target) {
      this.genome = Monkey.generateRandomGenome(target.length);
      this.fitness = Monkey.calculateFitness(target, this.genome);
   }

   static generateRandomGenome(length) {
      let str = "";
      for (let i = 0; i < length; i++) {
         str += Monkey.getRandomNucleotide();
      }
      return str;
   }

   static getRandomNucleotide() {
      let nucleotides = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]|~`!@#$%^&*()-_=+<>, .?/:;\'\"\\";
      let index = Math.floor(Math.random() * nucleotides.length);
      return nucleotides.charAt(index);
   }

   static calculateFitness(target, genome) {
      let fitness = 0, l = genome.length;

      for (let i = 0; i < l; i++) {
         if (genome.charAt(i) != target.charAt(i)) {
            fitness++;
         }
      }
      return fitness;
   }
}