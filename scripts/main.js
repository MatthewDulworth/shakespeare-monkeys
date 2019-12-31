import Population from "./population.js";

// // ----------- Main ----------- //
let target = "Hello There! General Kenobi!";
let population = new Population(11, target, 0.1, 0.95, 0.5);


// while(population.getBestMonkey().fitness != 0)
// {
//    console.log(i);
//    let bm = population.getBestMonkey();
//    population.createNewGeneration();
//    console.log(bm);

//    if(bm.fitness == 0){
//       console.log(bm);
//       break;
//    }
//    i++;
// }

// evolveMonkeys(population);

// async function evolveMonkeys(pop) {
//    do {
//       pop.createNewGeneration();

//       await new Promise(r => setTimeout(r, 100));
//    } while (pop.getBestMonkey().fitness != 0);
// }