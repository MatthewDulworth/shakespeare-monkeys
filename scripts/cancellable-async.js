export default class CancellableAsync {
   constructor(generator) {
      console.log("yeet2");
      this.generator = this.makeSingle(generator);
      this.takeoverSymbol = Symbol('takeover');
      this.terminationSymbol = Symbol('termination');
      this.isRunning = false;
      this.quit = false;
      this.h = "h";
   }

   // modified from source: https://gist.github.com/samthor/8f72127e3cf44bca1fc6527ce7e47023
   makeSingle(generator) {
      let globalNonce;
      return async function (...args) {
         const localNonce = globalNonce = new Object();

         const iter = generator(...args);
         let resumeValue;

         for (; ;) {
            const n = iter.next(resumeValue)
            if (n.done) {
               this.isRunning = false;
               console.log('completion');
               return n.value;
            }

            resumeValue = await n.value;
            if (localNonce !== globalNonce) {
               console.log('takeover');
               return this.takeoverSymbol;
            }

            if(this.quit){
               this.isRunning = false;
               console.log('termination');
               return this.terminationSymbol;
            }
         }
      }
   }

   terminate()
   {
      if(this.isRunning && !this.quit){
         this.quit = true;
      }
   }

   run(...args) {
      this.isRunning = true;
      this.quit = false;
      this.generator(...args);
   }
}