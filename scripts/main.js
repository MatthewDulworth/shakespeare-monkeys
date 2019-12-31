import Population from "./population.js";

// // ----------- Main ----------- //
let target = "Tomorrow, and tomorrow, and tomorrow,\n" +
    "Creeps in this petty pace from day to day,\n" +
    "To the last syllable of recorded time;\n" +
    "And all our yesterdays have lighted fools\n" +
    "The way to dusty death. Out, out, brief candle!\n" +
    "Life's but a walking shadow, a poor player,\n" +
    "That struts and frets his hour upon the stage,\n" +
    "And then is heard no more. It is a tale\n" +
    "Told by an idiot, full of sound and fury,\n" +
    "Signifying nothing.";
let population = new Population(500, target, 0.01, 0.95, 0.01);

evolve(population);

async function evolve(population)
{
    while (population.getBestMonkey().fitness > 0)
    {
        population.createNewGeneration();
        console.log(population.getBestMonkey());

        if(population.getBestMonkey().fitness === 0)
        {
            console.log(`goal reached in ${population.generation} generations`);
        }
        await new Promise(r => setTimeout(r, 0));
    }
}