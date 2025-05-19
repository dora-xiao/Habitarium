const ResourceEnum = Object.freeze({
    GRASS: 'grass',
    MUD: 'mud',
    POLLEN: 'pollen',
    STONE: 'stone',
    WATER: 'water',
    WOOD: 'wood',
});


class Price {
    constructor({grass=0, mud=0, pollen=0, stone=0, water=0, wood=0, neocash=0}) {
        if(grass == 0 && mud == 0 && pollen == 0 && stone == 0 && water == 0 && wood == 0 && neocash == 0) {
            this.price_type = "N/A";
        } else {
            this.price_type = "cost";
        }
        this.price = {};
        this.nonzero = [];
        this.price.grass = grass;
        this.price.mud = mud;
        this.price.pollen = pollen;
        this.price.stone = stone;
        this.price.water = water;
        this.price.wood = wood;
        this.price.neocash = neocash;
        Object.values(ResourceEnum).forEach((resource) => {
            console.assert(this.price[resource] >= 0 && this.price[resource] <= 2500, `${resource} price ${this.price[resource]} is invalid`);
            if(this.price[resource] > 0) this.nonzero.push(resource);
        });
        console.assert(this.price.neocash >= 0 && this.price.neocash <= 250, `neocash price ${this.price.neocash} is invalid`);
        if(this.price.neocash > 0) this.nonzero.push("neocash");
    }

    toString() {
        return this.price_type == "N/A" ? "N/A" : this.nonzero.map((r) => `${r}=${this.price[r]}`).join(", ")
    }
}


class Item {
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = new Price(price);
    }

    toString() {
        return `Name: ${this.name} | Description: ${this.description} | Price: ${this.price.toString()}`
    }
}


class Ink extends Item {
    constructor(name, description, price, uses) {
        super(name, description, price);
        this.uses = uses;
    }

    toString() {
        return super.toString() + ` | Uses: ${this.uses}`;
    }
}


class Bottle extends Ink { // Building
    static options = {
        "blue": {
            name: "Blue Ink Bottle",
            description: "This bottle of ink will alter structures to have a blue appearance.",
            price: {water: 450, grass: 300, pollen: 650},
            uses: 5
        },
        "red": {
            name: "Red Ink Bottle",
            description: "This bottle of ink will alter structures to have a red appearance.",
            price: {water: 450, grass: 300, pollen: 650},
            uses: 5
        },
        "yellow": {
            name: "Yellow Ink Bottle",
            description: "This bottle of ink will alter structures to have a yellow appearance.",
            price: {water: 450, grass: 300, pollen: 650},
            uses: 5
        },
        "faerie": {
            name: "Faerie Ink Bottle",
            description: "There is something enchanting about this Ink Bottle (This will give your structures a Faerie-like appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 200},
            uses: 10
        },
        "pirate": {
            name: "Pirate Ink Bottle",
            description: "Be careful where ye go. (This bottle of ink will give your structures a piratey appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 200},
            uses: 10
        },
        "snow": {
            name: "Snow Ink Bottle",
            description: "*shiver* Sweaters may be needed. (This bottle of ink will give your structures a snowy appearance in your Habitarium; 10 drops) Note: This item is not giftable.",
            price: {neocash: 200},
            uses: 10
        },
        "larnikin": {
            name: "Larnikin Ink Bottle",
            description: "Now that is a lot of legs. (This will give your structures a Larnikin-like appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 200},
            uses: 10
        },
        "mootix": {
            name: "Mootix Ink Bottle",
            description: "This could be good camouflage for your Mootix. (This will give your structures a Mootix-like appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 200},
            uses: 10
        },
        "pinchit": {
            name: "Pinchit Ink Bottle",
            description: "This bottle shouldnt pinch. (This will give your structures a Pinchit-like appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 200},
            uses: 10
        },
        "chocolate": {
            name: "Chocolate Ink Bottle",
            description: "Even better with sprinkles and whipped creme. (This bottle of ink will give your structures a chocolate appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 200},
            uses: 10
        },
    }

    constructor(name) {
        let selected = Bottle.options[name];
        super(selected.name, selected.description, selected.price, selected.uses);
    }

    toString() {
        return super.toString();
    }
}


class Dropper extends Ink { // Pet
    static options = {
        "larnikin_faerie": {
            name: "Larnikin Faerie Ink Dropper",
            description: "This extraordinary Habitarium item will cause your Larnikin to take on a faerie appearance! (10 drops) Note: this item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "mootix_faerie": {
            name: "Mootix Faerie Ink Dropper",
            description: "This extraordinary Habitarium item will cause your Mootix to take on a faerie appearance! (10 drops) Note: this item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "pinchit_faerie": {
            name: "Pinchit Faerie Ink Dropper",
            description: "This extraordinary Habitarium item will cause your Pinchit to take on a faerie appearance! (10 drops) Note: this item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "larnikin_pirate": {
            name: "Larnikin Pirate Ink Dropper",
            description: "Arrr... ye be getting into pirate territory. (Use this to change your Larnikin to take on a pirate appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "mootix_pirate": {
            name: "Mootix Pirate Ink Dropper",
            description: "Arrr... ye be getting into pirate territory. (Use this to change your Mootix to take on a pirate appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "pinchit_pirate": {
            name: "Pinchit Pirate Ink Dropper",
            description: "Arrr... ye be getting into pirate territory. (Use this to change your Pinchit to take on a pirate appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "larnikin_snow": {
            name: "Larnikin Snow Ink Dropper",
            description: "Brrr... This looks like it could be a bit frosty.. (Use this to change your Larnikin to take on a snowy appearance in your Habitarium) (10 uses). Note: This item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "mootix_snow": {
            name: "Mootix Snow Ink Dropper",
            description: "Brrr... This looks like it could be a bit frosty.. (Use this to change your Mootix to take on a snowy appearance in your Habitarium) (10 uses). Note: This item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "pinchit_snow": {
            name: "Pinchit Snow Ink Dropper",
            description: "Brrr... This looks like it could be a bit frosty.. (Use this to change your Pinchit to take on a snowy appearance in your Habitarium) (10 uses). Note: This item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "larnikin_chocolate": {
            name: "Larnikin Chocolate Ink Dropper",
            description: "Yikes, please dont eat me! (Use this to change your Larnikin to take on a chocolate appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "mootix_chocolate": {
            name: "Mootix Chocolate Ink Dropper",
            description: "Yikes, please dont eat me! (Use this to change your Mootix to take on a chocolate appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 100},
            uses: 10
        },
        "pinchit_chocolate": {
            name: "Pinchit Chocolate Ink Dropper",
            description: "Yikes, please dont eat me! (Use this to change your Pinchit to take on a chocolate appearance in your Habitarium; 10 drops) Note: this item is not giftable.",
            price: {neocash: 100},
            uses: 10
        }
    }

    constructor(name) {
        let selected = Dropper.options[name];
        super(selected.name, selected.description, selected.price, selected.uses);
    }

    toString() {
        return super.toString();
    }
}


class Food extends Item {
    static options = {
        "cornmeal": {
            name: "Cornmeal",
            price: {grass: 160, pollen: 40, water: 40},
            description: "This light snack will make Petpetpets a little less hungry.",
        },
        "speck_of_cheese": {
            name: "Speck of Cheese",
            price: {grass: 280, pollen: 80, water: 80},
            description: "This meal will make Petpetpets significantly less hungry.",
        },
        "bacon_crumb": {
            name: "Bacon Crumb",
            price: {grass: 520, pollen: 150, water: 150},
            description: "This feast will make Petpetpets quite full!",
        },
        "magical_meatball": {
            name: "Magical Meatball",
            price: {neocash: 50},
            description: "Mmm, too bad there isnt any sauce for this! (This Habitarium item will gradually reduce your Petpetpets hunger while it is in effect). Note: this item is not giftable.",
        },
        "small_droplet_of_nectar": {
            name: "Small Droplet of Nectar",
            price: {grass: 40, pollen: 160, water: 40},
            description: "A drink from this tiny droplet will help Petpetpets feel better if they are ill or injured.",
        },
        "medium_droplet_of_nectar": {
            name: "Medium Droplet of Nectar",
            price: {grass: 80, pollen: 280, water: 80},
            description: "Drinking from this small droplet will help refresh Petpetpets that are ill or injured.",
        },
        "large_droplet_of_nectar": {
            name: "Large Droplet of Nectar",
            price: {grass: 150, pollen: 520, water: 150},
            description: "This sparkling droplet will significantly revitalize Petpetpets that are ill or injured.",
        },
        "magical_mini_honeycomb": {
            name: "Magical Mini Honeycomb",
            price: {neocash: 50},
            description: "This is one sweet treat. (This Habitarium item will gradually increase your Petpetpets health while it is in effect). Note: this item is not giftable.",
        },
        "apple_bite": {
            name: "Apple Bite",
            price: {grass: 40, pollen: 40, water: 160},
            description: "Eating this snack will make Petpetpets feel a little less tired.",
        },
        "candy_sprinkle": {
            name: "Candy Sprinkle",
            price: {grass: 80, pollen: 80, water: 280},
            description: "This refreshing meal will certainly help Petpetpets feel more awake.",
        },
        "bit_of_berry_jelly": {
            name: "Bit of Berry Jelly",
            price: {grass: 150, pollen: 150, water: 520},
            description: "This big meal will help keep Petpetpets awake for quite some time!",
        },
        "magical_marshmallow": {
            name: "Magical Marshmallow",
            price: {neocash: 50},
            description: "This looks light enough to float into the sky. (This Habitarium item will gradually replenish your Petpetpets energy while it is in effect). Note: this item is not giftable.",
        },
    }

    constructor(name) {
        let selected = Food.options[name];
        super(selected.name, selected.description, selected.price);
    }

    toString() {
        return super.toString()
    }
}

// TODO: what is magical meatball 
class Tool extends Item {
    static options = {
        "pluburb_magical_seeds": {
            name: "Pluburb Magical Seeds",
            price: {neocash: 125},
            description: "Sprinkle these seeds on a structure in your Habitarium and it will restore all of your Petpetpets health, hunger & rest four times faster for 1 hour! (1 use) Note: This item is not giftable and will not restore your structure.",
        },
        "bronze_hourglass": {
            name: "Bronze Hourglass",
            price: {neocash: 150},
            description: "Need a day to escape? (Your Habitarium will maintain current status if left unattended for one day with this hourglass.) Note: This item is not giftable.",
        },
        "silver_hourglass": {
            name: "Silver Hourglass",
            price: {neocash: 250},
            description: "An extended week is what is needed! (Your Habitarium will maintain current status if left unattended for one week with this hourglass.) Note: This item is not giftable.",
        },
        "twig_hammer": {
            name: "Twig Hammer",
            price: {stone: 35, wood: 90, mud: 10},
            description: "This nifty little hammer will remove a level of decay from a structure.",
        },
        "seed_hammer": {
            name: "Seed Hammer",
            price: {stone: 90, wood: 110, mud: 25},
            description: "This useful hammer will remove two levels of decay from a structure.",
        },
        "pebble_hammer": {
            name: "Pebble Hammer",
            price: {neocash: 75},
            description: "This amazing hammer will remove all decay from a structure in your Habitarium (5 uses) Note: this item is not giftable.",
        }
    }

    constructor(name) {
        let selected = Tool.options[name];
        super(selected.name, selected.description, selected.price);
    }

    toString() {
        return super.toString()
    }
}


class Egg extends Item {

}


class Decoration extends Item {

}


class Building extends Item {

}


var temp = new Food("speck_of_cheese")
console.log(temp.toString())

temp = new Tool("seed_hammer")
console.log(temp.toString())

temp = new Bottle("mootix")
console.log(temp.toString())

temp = new Dropper("mootix_faerie")
console.log(temp.toString())