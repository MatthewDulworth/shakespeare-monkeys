// source: https://gist.github.com/samthor/8f72127e3cf44bca1fc6527ce7e47023
// cancellable async functions
export const takeoverSymbol = Symbol('takeover');

export function makeSingle(generator) {
   let globalNonce;
   return async function (...args) {
      const localNonce = globalNonce = new Object();

      const iter = generator(...args);
      let resumeValue;

      for (; ;) {
         const n = iter.next(resumeValue)
         if (n.done) {
            return n.value;
         }

         resumeValue = await n.value;
         if (localNonce !== globalNonce) {
            console.log('terminated');
            return takeoverSymbol;
         }
      }
   }
}