const Resource = Object.freeze({
    GRASS: 'grass',
    MUD: 'mud',
    POLLEN: 'pollen',
    STONE: 'stone',
    WATER: 'water',
    WOOD: 'wood',
});


class Cost {
    constructor({grass=0, mud=0, pollen=0, stone=0, water=0, wood=0, neocash=0}) {
        this.cost = {};
        this.nonzero = [];
        this.cost.grass = grass;
        this.cost.mud = mud;
        this.cost.pollen = pollen;
        this.cost.stone = stone;
        this.cost.water = water;
        this.cost.wood = wood;
        this.cost.neocash = neocash;
        Object.values(Resource).forEach((resource) => {
            console.assert(this.cost[resource] >= 0 && this.cost[resource] <= 2500, `${resource} cost ${this.cost[resource]} is invalid`);
            if(this.cost[resource] > 0) this.nonzero.push(resource);
        });
        console.assert(this.cost.neocash >= 0 && this.cost.neocash <= 250, `neocash cost ${this.cost.neocash} is invalid`);
        if(this.cost.neocash > 0) this.nonzero.push("neocash");
    }

    toString() {
        return this.nonzero.map((r) => `${r}=${this.cost[r]}`).join(", ")
    }
}


class Item {
    constructor(name, description, cost) {
        this.name = name;
        this.description = description;
        this.cost = new Cost(cost);
    }

    toString() {
        return `Name: ${this.name} | Description: ${this.description} | Cost: ${this.cost.toString()}`
    }
}

var temp = new Item("name", "desc", {pollen: 15, neocash: 12})
console.log(temp.toString())