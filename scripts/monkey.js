import Genome from './genome.js';

// ----------- Monkey ----------- //
// each monkey has a genome and a fitness score
export default class Monkey {

   constructor(goal) {
      this.genome = new Genome(goal.length);
      this.fitness = this.calculateFitness(goal);
   }

   // calculates the fitness of the monkey
   // * matching charecters increase, non-matching decrease
   // * number of charecters correct increase
   // * correct number of words increase
   // * correct words increase
   calculateFitness(goal) {
      let fitness = 0;

      if (this.genome.str == goal.str) {
         return Infinity;
      }

      let char_totals = this.totalDistance(goal.charCounts, this.genome.charCounts);
      let correct_chars = this.matchingChars(goal.str, this.genome.str);
      let common_words = this.intersections(goal.words, this.genome.words);
      let word_count_diff = this.distance(goal.wordCount, this.genome.wordCount);

      fitness = correct_chars + common_words - word_count_diff - char_totals;
      return fitness;
   }

   // returns the distance ebetween two values
   distance(target, source) {
      return Math.abs(target - source);
   }

   // returns the number of intersections between two arrays
   intersections(target, source) {
      return source.filter(value => target.includes(value)).length;
   }

   // returns the difference between the numbers charecters that match and those that do not
   matchingChars(target, source) {
      let matches = 0;
      for (let i = 0; i < source.length; i++) {
         if (source.charAt(i) == target.charAt(i)) {
            matches++;
         }
         else {
            matches--;
         }
      }
      return matches;
   }

   // returns a number equal to the sum of the distances between the values of two arrays 
   totalDistance(target, source) {
      let total = 0;
      for (let i = 0; i < source; i++) {
         total += this.distance(source[i], target[i]);
      }
      return total;
   }
}