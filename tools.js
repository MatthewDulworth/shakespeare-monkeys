export function analyzeString(str, chars) {
   let data = {
      charCounts: [],
      words: [],
   };
   data.words = getWords(str);
   data.charCounts = getCharCounts(str, chars);
   return data;
}

export function getWords(str) {
   return str.split(' ');
}

export function getCharCounts(str, chars) {
   let counts = [];
   for (let i = 0; i < chars.length; i++) {
      let count = countChar(str, chars.charAt(i));
      counts.push(count);
   }
   return counts;
}

export function countChar(str, c) {
   let result = 0;
   for (let i = 0; i < str.length; i++) {
      if (str[i] == c) {
         result++;
      }
   }
   return result;
}