// splits a string into an array of words
export function getWords(str) {
   return str.split(/\s+/g);
}

// return the totals of each charcter from the chars string that are present in the str string
export function getCharCounts(str, chars) {
   let counts = [];
   for (let i = 0; i < chars.length; i++) {
      let count = countChar(str, chars.charAt(i));
      counts.push(count);
   }
   return counts;
}

// returns the total times a single charecter shows up in a string
export function countChar(str, c) {
   let result = 0;
   for (let i = 0; i < str.length; i++) {
      if (str[i] == c) {
         result++;
      }
   }
   return result;
}

// returns the distance ebetween two values
export function distance(target, source) {
   return Math.abs(target - source);
}

// returns the number of intersections between two arrays
export function intersections(target, source) {
   return source.filter(value => target.includes(value)).length;
}

// returns the number of charecters that are in the same position in both strings
export function matchingChars(target, source) {
   let matches = 0;
   for (let i = 0; i < source.length; i++) {
      if (source.charAt(i) == target.charAt(i)) {
         matches++;
      }
   }
   return matches;
}