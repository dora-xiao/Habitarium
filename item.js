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
            console.assert(this.price[resource] >= 0 && this.price[resource] <= 5000, `${resource} price ${this.price[resource]} is invalid`);
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
    static options = {
        "grarrl_tooth": {
            name: "Grarrl Tooth",
            price: {stone: 350, mud: 50},
            description: "This giant tooth is too heavy to use as a weapon.",
        },
        "twig_fence": {
            name: "Twig Fence",
            price: {stone: 100, wood: 35, mud: 40},
            description: "This rustic fence will look great around buildings.",
        },
        "pine_cone_shard_fence": {
            name: "Pine Cone Shard Fence",
            price: {stone: 50, wood: 350, mud: 150},
            description: "These sharp pine cone shards will keep out unwanted guests.",
        },
        "mossy_twig": {
            name: "Mossy Twig",
            price: {wood: 450, mud: 150},
            description: "This twig is topped with super soft moss.",
        },
        "dandelion_fluff_seed": {
            name: "Dandelion Fluff Seed",
            price: {stone: 100, wood: 400, mud: 200},
            description: "Anchor down this seed so it doesnt blow in the wind!",
        },
        "glowing_ember": {
            name: "Glowing Ember",
            price: {stone: 700, wood: 100, mud: 50},
            description: "Embers provide the perfect ambient lighting without being too bright.",
        },
        "seedpod": {
            name: "Seedpod",
            price: {stone: 50, wood: 300, mud: 350},
            description: "The seedpod makes a natural and intriguing decoration.",
        },
        "pearl": {
            name: "Pearl",
            price: {stone: 350, wood: 50, mud: 700},
            description: "This shining pearl is great as a centrepiece for your habitarium.",
        },
        "single_die": {
            name: "Single Die",
            price: {stone: 900, wood: 350, mud: 200},
            description: "Too heavy for your Petpetpets to roll but it makes for a nifty piece for your habitarium!",
        },
        "large_mossy_twig": {
            name: "Large Mossy Twig",
            price: {stone: 150, wood: 1250, mud: 400},
            description: "This large twig as a decoration is sure to make quite a statement.",
        },
        "piece_of_a_scratch_card": {
            name: "Piece of a Scratch Card",
            price: {stone: 450, wood: 900, mud: 450},
            description: "Feeling lucky? You wont win anything with just a piece, though.",
        },
        "seashell": {
            name: "Seashell",
            price: {stone: 1300, wood: 200, mud: 800},
            description: "This beautiful Sea shell is the perfect decorative item.",
        },
        "ancient_monument": {
            name: "Ancient Monument",
            price: {stone: 1900, wood: 300, mud: 350},
            description: "Add a touch of history to your Habitarium with this monument.",
        },
        "lovely_gazebo": {
            name: "Lovely Gazebo",
            price: {stone: 400, wood: 2100, mud: 200},
            description: "This gazebo adds a little shade and charm to any Habitarium.",
        },
        "treasure_chest": {
            name: "Treasure Chest",
            price: {stone: 1600, wood: 1050, mud: 250},
            description: "If P3s could be rich, they definitely would be with this much treasure.",
        },
        "crashed_spaceship": {
            name: "Crashed Spaceship",
            price: {stone: 2700, wood: 1500, mud: 900},
            description: "What? Spaceships can be this small. You dont think all aliens are Neopet-sized, do you?",
        },
        "lucky_four-leaf_clover_patch": {
            name: "Lucky Four-leaf Clover Patch",
            price: {stone: 100, wood: 600, mud: 800},
            description: "Any clover patch you can find a four-leaf clover in is considered incredibly lucky!",
        },
        "happy_little_mootix_gnome": {
            name: "Happy Little Mootix Gnome",
            price: {stone: 50, wood: 1250, mud: 500},
            description: "This little Mootix looks all too happy to be in your Habitarium!",
        },
        "rusty_ship_anchor": {
            name: "Rusty Ship Anchor",
            price: {stone: 1300, wood: 250, mud: 600},
            description: "One can only imagine what manner of ship this anchor once belonged to...",
        },
        "pirate_ship_wheel": {
            name: "Pirate Ship Wheel",
            price: {stone: 600, wood: 1900, mud: 950},
            description: "What happened to the rest of the ship?",
        },
        "palm_tree": {
            name: "Palm Tree",
            price: {stone: 100, wood: 1750, mud: 300},
            description: "This miniature palm tree will provide your habitarium with some much-needed shade.",
        },
        "tiki_hut": {
            name: "Tiki Hut",
            price: {stone: 200, wood: 2500, mud: 500},
            description: "This relaxing hut may be a bit too tempting for your hard-working P3s.",
        },
        "pot_of_neopoints": {
            name: "Pot of Neopoints",
            price: {stone: 3200, wood: 800, mud: 1350},
            description: "A pot full of Neopoints and you didnt even have to get to the end of the rainbow to find it.",
        },
        "pirate_flag": {
            name: "Pirate Flag",
            price: {neocash: 100},
            description: "This flag will bring fear into the hearts of your foes! (to be used in your Habitarium). Note: this item is not giftable.",
        },
        "crystal_fountain_ball": {
            name: "Crystal Fountain Ball",
            price: {neocash: 125},
            description: "Thankfully, the water in this lovely fountain never runs out (to be used in your Habitarium). Note: this item is not giftable.",
        },
        "reed_cannon": {
            name: "Reed Cannon",
            price: {neocash: 125},
            description: "This cannon can be used to scare enemies but cannot be used as a weapon (to be used in your Habitarium). Note: this item is not giftable.",
        },
        "rainbow_spring": {
            name: "Rainbow Spring",
            price: {neocash: 150},
            description: "A relaxing little place for your Petpetpet to hang out in (to be used in your Habitarium). Note: this item is not giftable.",
        },
        "frozen_ice_crystals": {
            name: "Frozen Ice Crystals",
            price: {neocash: 100},
            description: "A natural spring froze to form these sparkling crystals. *gleam* (to be used in your Habitarium) Note: This item is not giftable.",
        },
        "snow_petpet": {
            name: "Snow Petpet",
            price: {neocash: 100},
            description: "Lets hope he doesnt melt come Spring! (to be used in your Habitarium) Note: This item is not giftable.",
        },
        "chocolate_fountain": {
            name: "Chocolate Fountain",
            price: {neocash: 125},
            description: "The chocolate just keeps flowing! (to be used in your Habitarium) Note: this item is not giftable.",
        },
        "chocolate_bridge": {
            name: "Chocolate Bridge",
            price: {neocash: 150},
            description: "Sculpted from chocolate and decorated with candies and frosting (to be used in your Habitarium). Note: this item is not giftable.",
        },
        "pot_of_flowers": {
            name: "Pot of Flowers",
            price: {neocash: 100},
            description: "Not only are they nice to look at, these flowers are quite fragrant and will fill your Habitarium with their fresh scent. Note: this item is not giftable.",
        },
        "sweet_candy_topiary": {
            name: "Sweet Candy Topiary",
            price: {neocash: 100},
            description: "A dazzling topiary that will brighten up any area you wish in your Habitarium. Note: this item is not giftable.",
        },
        "stone_larnikin_waterfall": {
            name: "Stone Larnikin Waterfall",
            price: {neocash: 125},
            description: "This peaceful fountain should make a welcoming addition to your Habitarium. Note: this item is not giftable.",
        }
        // TODO: check non-documented items: tar pit
    }

    constructor(name) {
        let selected = Decoration.options[name];
        super(selected.name, selected.description, selected.price);
    }

    toString() {
        return super.toString()
    }
}


class Background extends Item {
    static options = {
        "faerie_cloud": {
            name: "Faerie Cloud Background",
            price: {neocash: 250},
            description: "Its like floating on air… Wait. It IS floating on air! (to be used in your Habitarium). Note: this item is not giftable.",
        },
        "waterfront": {
            name: "Waterfront Background",
            price: {neocash: 250},
            description: "Arrr... there be treasure on this Island (to be used in your Habitarium). Note: this item is not giftable.",
        },
        "snow_wonderland": {
            name: "Snow Wonderland Background",
            price: {neocash: 250},
            description: "Brrr... dont forget your coat! (to be used in your Habitarium) Note: This item is not giftable.",
        }
    }

    constructor(name) {
        let selected = Background.options[name];
        super(selected.name, selected.description, selected.price);
    }

    toString() {
        return super.toString()
    }
}


class Building extends Item {
    static conditions = ["Perfect", "A bit shabby", "Tattered", "Broken"]
    static options = {
        "nest": {
            name: "Nest",
            price: [
                {wood: 800, mud: 950, stone: 650},
                {wood: 800, mud: 850, stone: 1050},
                {wood: 900, mud: 950, stone: 1300},
                {wood: 900, mud: 950, stone: 1300},
            ],
            description: "This cozy structure is a wonderful place where Petpetpet eggs can be nurtured.",
            effect: {
                unlock: [2, 17, 40, 63],
                speed: [120, 80, 50, 30]
            }
        },
        "house": {
            name: "House",
            price: [
                {wood: 1200, mud: 1200, stone: 950},
                {wood: 950, mud: 600, stone: 1300},
                {wood: 1150, mud: 850, stone: 2200},
                {wood: 1150, mud: 850, stone: 2200}
            ],
            description: "The perfect place to be for Petpetpets that need a rest.",
            unlock: [2, 13, 36, 59],
            effect: {
                capacity: [3, 5, 7, 9],
                speed: [1, 2, 2, 2]
            }
        },
        "storage": {
            name: "Storage",
            price: [
                {wood: 1850, mud: 1550, stone: 1450},
                {wood: 3400, mud: 1250, stone: 1800},
                {wood: 3800, mud: 1300, stone: 1850},
                {wood: 3800, mud: 1300, stone: 1850}
            ],
            description: "Resources gathered by Petpetpets are stored in this structure.",
            unlock: [1, 21, 44, 67],
            effect: {
                capacity: [2500, 3500, 4500, 5500]
            }
        },
        "hospital": {
            name: "Hospital",
            price: [
                {wood: 2450, mud: 1800, stone: 6750},
                {wood: 3900, mud: 2100, stone: 4800},
                {wood: 4400, mud: 2100, stone: 5250},
                {wood: 4400, mud: 2100, stone: 5250}
            ],
            description: "Staying in this restful place allows Petpetpets to regain lost health.",
            unlock: [15, 25, 48, 71],
            effect: {
                capacity: [2, 3, 4, 5],
                speed: [2, 2, 2, 2]
            }
        },
        "barracks": {
            name: "Barracks",
            price: [
                {wood: 2550, mud: 4250, stone: 6800},
                {wood: 2800, mud: 4150, stone: 6200},
                {wood: 2800, mud: 4150, stone: 6200}
            ],
            description: "This defensive building houses soldier Petpetpets.",
            unlock: [25, 29, 52],
            effect: {
                capacity: [3, 5, 7],
                speed: [1, 2, 2]
            }
        },
        "lookout_tower": {
            name: "Lookout Tower",
            price: [{neocash: 150}],
            description: "Setting up a sentry in this tower will alert you of incoming raids. (This makes Neofriends raid 10-50% less effective in your Habitarium) Note: This item is not giftable.",
            unlock: [1],
            effect: {
                alert_raid: [true]
            }
        },
    }

    constructor(name, grade=0) {
        let selected = Building.options[name];
        super(selected.name, selected.description, selected.price[grade]);
        this.id = name;
        this.unlock = selected.unlock[grade];
        this.effect = {}
        for (const key in selected.effect) {
            this.effect[key] = selected.effect[key][grade];
        }
        this.condition = Building.conditions[0];
        this.grade = grade;
    }

    nextUnlock() {
        if(this.grade >= Building.options[this.id].unlock.length) return {}
        let next_effect = {}
        for (const key in Building.options[this.id].effect) {
            next_effect[key] = Building.options[this.id].effect[key][this.grade];
        }
        return {
            level: Building.options[this.id].unlock[this.grade + 1],
            price: Building.options[this.id].price[this.grade + 1],
            effect: next_effect
        }
    }

    toString() {
        return super.toString() + ` | Unlock: ${this.unlock} | Condition: ${this.condition} | Effect: ${JSON.stringify(this.effect)} | Next Upgrade: ${JSON.stringify(this.nextUnlock())}`
    }

    
}


var temp = new Food("speck_of_cheese")
console.log(temp.toString())

temp = new Tool("seed_hammer")
console.log(temp.toString())

temp = new Bottle("mootix")
console.log(temp.toString())

temp = new Dropper("mootix_faerie")
console.log(temp.toString())

temp = new Decoration("large_mossy_twig")
console.log(temp.toString())

temp = new Background("snow_wonderland")
console.log(temp.toString())

temp = new Building("lookout_tower")
console.log(temp.toString())

temp = new Building("storage")
console.log(temp.toString())