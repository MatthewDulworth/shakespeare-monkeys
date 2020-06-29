// ----------- Monkey ----------- //
// each monkey has a genome and a fitness score
class Monkey
{

    constructor(genome)
    {
        this.genome = genome;
    }

    // returns the offspring of the two monkeys
    static mate(monkey1, monkey2, mutation_chance, target)
    {
        let genome = "";
        let i = 0, l = target.length;

        for (i; i < l; i++)
        {
            let parent1_genes_win = Math.random() < 0.5;

            if (Math.random() < mutation_chance)
            {
                genome += Monkey.getRandomNucleotide();
            }
            else if (parent1_genes_win)
            {
                genome += monkey1.genome.charAt(i);
            }
            else if (!parent1_genes_win)
            {
                genome += monkey2.genome.charAt(i);
            }
        }

        let offspring = new Monkey(genome);
        offspring.calculateFitness(target);
        return offspring;
    }

    // compare two monkeys based on fitness
    static compare(a, b)
    {
        if (a.fitness < b.fitness)
        {
            return 1;
        }
        else if (a.fitness > b.fitness)
        {
            return -1;
        }
        else
        {
            return 0;
        }
    }

    // returns a random nucleotide
    static getRandomNucleotide()
    {
        let nucleotides = Monkey.nucleotides;
        let index = Math.floor(Math.random() * nucleotides.length);
        return nucleotides.charAt(index);
    }

    static get nucleotides(){
       return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]|~`!@#$%^&*()-_=+<>, .?/:;\'\"\\\n";
    }

    // randomizes the genome of the monkey
    randomizeGenome(length)
    {
        this.genome = "";
        for (let i = 0; i < length; i++)
        {
            this.genome += Monkey.getRandomNucleotide();
        }
    }

    // calculates the fitness of the monkey
    calculateFitness(target)
    {
        let i = 0, l = target.length;
        this.fitness = 0;

        for (i; i < l; i++)
        {
            if (this.genome.charAt(i) !== target.charAt(i))
            {
                this.fitness++;
            }
        }
        return this.fitness;
    }
}