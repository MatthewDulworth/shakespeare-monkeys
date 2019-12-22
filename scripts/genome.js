import * as Tools from './tools.js';

// ----------- Genome ----------- //
// holds the genetic information of each monkey
export default class Genome {
   constructor(length) {
      this.str = this.generateRandomGenome(length);
      this.length = length;
      this.charCounts = this.getCharCounts(this.str, Genome.nucleotides());
      this.words = this.getWords(this.str);
      this.wordCount = this.words.length;
   }

   // sets the genome to a specific pattern
   setTo(str) {
      this.str = str;
      this.length = str.length;
      this.charCounts = this.getCharCounts(this.str, Genome.nucleotides());
      this.words = this.getWords(this.str);
      this.wordCount = this.words.length;
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

   // splits a string into an array of words
   getWords(str) {
      return str.split(/\s+/g);
   }

   // return the totals of each charcter from the chars string that are present in the str string
   getCharCounts(str, chars) {
      let counts = [];
      for (let i = 0; i < chars.length; i++) {
         let count = this.countChar(str, chars.charAt(i));
         counts.push(count);
      }
      return counts;
   }

   // returns the total times a single charecter shows up in a string
   countChar(str, c) {
      let result = 0;
      for (let i = 0; i < str.length; i++) {
         if (str[i] == c) {
            result++;
         }
      }
      return result;
   }

   // the possible nucleotides that make up the genome, includes all standerd qwerty charecters
   static nucleotides() {
      let nucs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]|~`!@#$%^&*()-_=+<>, .?/:;\'\"\\"
      return nucs;
   }
}