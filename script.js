//HTML Selectors
const CONTAINER = document.querySelector('.container');
const CHARGEN = document.querySelector('#charGen');
const CHARHOLDER = document.querySelector('#charHolder');

//Attribute Score Selectors
const STRSCORE = document.querySelector('#strScore');
const DEXSCORE = document.querySelector('#dexScore')
const CONSCORE = document.querySelector('#conScore')
const INTSCORE = document.querySelector('#intScore')
const WISSCORE = document.querySelector('#wisScore')
const CHASCORE = document.querySelector('#chaScore')

//Basic Functions
const ROLLER = function(num) {
    return (Math.floor(Math.random()*num));
};

const DUPECHECK = function(val, reference, arr) {
    let holder = val;
    while (reference, arr.indexOf(holder) >= 0) {
        holder = Object.keys(arr)[ROLLER(Object.keys(arr).length)];
    };
    return holder;
};

const APPENDTOLIST = function(val, targetElement, targetArray) {
    let newItem = document.createElement('li');
    newItem.appendChild(document.createTextNode(val));
    targetElement.appendChild(newItem);
    targetArray.push(val);
};

const ADDTEXTTOSPANS = function(val, targetSpan) {
    let holder = document.querySelectorAll(targetSpan);
    for (let i = 0; i < holder.length; i++) {
        holder[i].innerHTML = val;
    };
};

//D&D Information
const SKILLS = {"Athletics": "Str", "Acrobatics": "Dex", "Sleight of Hand": "Dex", "Stealth": "Dex", "Arcana": "Int", "History": "Int", "Investigation": "Int", "Nature": "Int", "Religion": "Int", "Animal Handling": "Wis", "Insight": "Wis", "Medicine": "Wis", "Perception": "Wis", "Survival": "Wis", "Deception": "Cha", "Intimidation": "Cha", "Performance": "Cha", "Persuasion": "Cha"};

const FEATS = {
    'Alert': 'Always on the lookout for danger, you gain the following benefits:<br><span class="bold">Initiative Proficiency.</span> When you roll Initiative, you can add your Proficiency Bonus to the roll.<br><span class="bold">Initiative Swap.</span> Immediately after you roll Initiative, you can swap your Initiative with the Initiative of one willing ally in the same combat. You can\'t make this swap if you or the ally is incapacitated.<br>',
    'Crafter': 'You are adept at crafting things and bargaining with merchants, granting you the following benefits:<br><span class="bold">Tool Proficiency.</span> You gain Tool Proficiency with threee different Artisan\'s Tools of your choice.<br><span class="bold">Discount</span> Whenever you buy a nonmagical item, you receive a 20% discount on it.<br><span class="bold">Faster Crafting</span> When you craft an item using a tool with which you have Tool Proficiency, the required crafting time is reduced by 20%.<br>',
    'Healer': 'You have the training and intuition to administer first aid and other care effectively, granting you the following benefits:<br><span class="bold">Battle Medic.</span> If you have a Healer\'s Kit, you can expend one use of it an tend to a creature within 5 feet of you as an Action. That creature can expend one of its Hit Dice, and you then roll that die. The creature regains a number of Hit Points equal to the roll plus your Proficiency Bonus.<br><span class="bold">Healing Rerolls.</span> Whenever you roll a die to determine the number of Hit Points you restore with a spell or with this feat\'s Battle Medic benefit, you can reroll the die if it rolls a 1, and you must use the new roll.<br>',
    'Lucky': 'You have inexplicable luck that can kick in at just the right moment, granting you the following benefits:<br><span class="bold">Luck Points.</span> You have a number of Luck Points equal to your Proficiency Bonus. You can spend the points on the benefits below, and you regain your expended Luck Points when you finish a Long Rest.<br><span class="bold">Advantage.</span> Immediately after you roll a d20 for a d20 Test, you can spend 1 Luck Point to give yourself Advantage to the roll.<br><span class="bold">Disadvantage.</span> When a creature rolls a d20 for an attack roll against you, you can spend 1 Luck Point to import Disadvantage on that roll.',
    'Magic Initiate': 'You have learned the basics of a particular magical tradition. Choose one Spell list: Arcane, Divine, or Primal. You can the following benefits related to that choice.<br><span class="bold">Two Cantrips.</span> You learn two cantrips of your choice from the spell list.<br><span class="bold">1st-Level Spell.</span> Choose one 1st-level Spell from the spell list. You always have that Spell prepared. You can case it once without a Spell Slot, and you regain the ability to cast it in that way when you finish a Long Rest. You can also cast the Spell using any Spell Slots you have.<br> Int, Wis, and Cha is your spellcasting ability for these Spells (choose when you select this Feat). Consult the <span class="italic">Player\'s Handbook</span> for the rules on spellcasting.<br>Whenever you gain a new level, you can replace one of the Spells you chose for this Feat with a different Spell of the same level from the chosen Spell list.',
    'Musician': 'You are a practiced musician, granting you the following benefits:<br><span class="bold">Instrument Training.</span> You gain Tool Prodiciency with three Musical Instruments of your choice.<br><span class="bold">Inspiring Song.</span> As you finish a Short Rest or a Long Rest, you can play a song on a Musical Instrument with which you have Tool Proficiency and give you Inspiration to allies who hear the song. The number of allies you can affect in this way equals your Proficiency Bonus.',
    'Savage Attacker': 'You have trained to dealer particularly damaging strikes. When you take the Attack Action and hit a target with a Weapon as part of that Action, you can roll the Weapon\'s damage dice twice and use either roll against the target. You can use this benefit only once per turn.',
    'Skilled': 'You have exceptionally broad learning. Choose three Skills in which you lack Proficiency. You gain Proficiency in those Skills.',
    'Tavern Brawler': 'Accustomed to brawling, you gain the following benefits:<br><span class="bold">Enhanced Unarmed Strike.</span> When you hit with your Unarmed Strike and deal damage, you can deal Bludgeoning Damage equal to 1d4 + your Str modifier, instead of the normal damage of an Unarmed Strike.<br><span class="bold">Damage Rerolls.</span> Whenever you roll a damage die for your Unarmed Strike, you can reroll the die if it rolls a 1, and you must use the new roll.<br><span class="bold">Shove.</span> When you hit a creature with an Unarmed Strike as part of the Attack Action on your turn, you can deal damage to the target and also push it 5 feet away. You can use this benefir only once per turn.<br><span class="bold">Furniture as Weapons.</span> You can wield furniture as a Weapon, using the rules of the Greatclub for Small or Medium furniture and the fules of the Club for Tiny furniture.',
    'Tough': 'Your Hit Point Maximum increases by an amount equal to twice your character level when you gain this Feat. Whenever you gain a level thereafter, your Hit Point Maximum increases by an additional 2 Hit Points.'
};

const SPELLS = {
    'Arcane': {
        cantrip: ['Acid Splash','Blade Ward','Chill Touch','Dancing Lights','Fire Bolt','Friends','Light','Mage Hand','Mending','Message','Minor Illusion','Poison Spray','Prestidigitation','Ray of Frost','Shocking Grasp','True Strike','Vicious Mockery'],
        lvl1: ['Alarm','Armor of Agathys','Arms of Hadar','Burning Hands','Charm Person','Chromatic Orb','Color Spray','Comprehend Languages','Detect Magic','Disguise Self','Dissonant Whispers','Expeditious Retreat','False Life','Feather Fall','Find Familiar','Fog Cloud','Grease','Hellish Rebuke','Hex','Identify','Illusory Script','Jump','Longstrider','Mage Armor','Magic Missle','Protection from Evil and Good','Ray of Sickness','Shield','Silent Image','Sleep','Tasha\'s Hideous Laughter','Tenser\'s Floating Disk','Thunderwave','Unseen Servant','Witch Bolt']
}, 'Divine': {
        cantrip: ['Guidance','Light','Resistance','Sacred Flame','Spare the Dying','Thaumaturgy'],
        lvl1: ['Bane','Bless','Command','Compelled Duel','Cure Wounds','Detect Evil and Good','Detect Magic','Detect Poison and Disease','Divine Favor','Guiding Bolt','Healing Word','Heroism','Inflict Wounds','Protection from Evil and Good','Purify Food and Drink','Sanctuary','Searing Strike','Shield of Faith','Thunderous Smite','Wrathful Smite']
}, 'Primal': {
        cantrip: ['Druidcraft','Guidance','Mending','Message','Poison Spray','Produce Flame','Resistance','Shillelagh','Spare the Dying','Thorn Whip'],
        lvl1: ['Animal Friendship','Create or Destory Water','Cure Wounds','Detect Magic','Detect Poison and Disease','Ensnaring Strike','Entangle','Faerie Fire','Fog Cloud','Goodberry','Hail of Thorns','Healing Word','Hunter\'s Mark','Jump','Longstrider','Purift Food and Drink','Speak with Animals','Thunderwave']
}};

const HUMAN = {name: "human", features: ['<span class="bold italic">Resourceful</span>. You gain Inspiration whenever you finish a Long Rest', '<span class="bold italic">Skillful</span>. You gain Proficiency in one Skill of your choice', '<span class="bold italic">Versatile</span>. You gain a 1st-level Feat of your choice.']};
const ARDLING = {name: 'ardling', sub:[
    {name: 'exalted', spell: ['Thaumaturgy'], animals: 'Cat, eagle, goat, mule', align: 'Chaotic Good'},
    {name: 'heavenly', spell: ['Light'], animals: 'Elephant, owl, pig, stork', align: 'Lawful Good'},
    {name: 'idyllic', spell: ['Guidance'], animals: 'Bear, dog, raven, toad', align: 'Neutral Good'}], 
features: ['<span class="bold italic">Angelic Flight.</span> As a Bonus Action, you sprout spectral wings for a moment and fly up to a number of feet equal to your Speed.  If you are in the air at the end of this movement, you fall if nothing is holding you aloft.<br>You can use this Bonus Action a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest.','<span class="bold italic">Celestial Legacy.</span> You are the recipient of a celetial legacy that grants you magical abilities. Your legacy is that of the <span class="ardlingLegacy"></span>, which are associated with <span class="ardlingAlign"></span> planes. You gain the initial benefit of the chosen legacy: a cantrip that you learn (listed under your spell list). You also choose the animal you most closely resemble (example for this legacy are: <span class="ardlingAnimals"></span>).<br>Intelligence, Wisdom, and Charisma is your spellcasting ability for the spells you cast with this trait (choose the ability when you select the legacy).','<span class="bold italic">Damage Resistance.</span> You have Resistance to radiant damage.']}
const DRAGONBORN = {name: "dragonborn", sub: [
    {name: 'black', type: 'acid'},
    {name: 'blue', type: 'lightning'},
    {name: 'brass', type: 'fire'},
	{name: 'bronze', type: 'lightning'},
	{name: 'copper', type: 'acid'},
	{name: 'gold', type: 'fire'},
	{name: 'green', type: 'poison'},
	{name: 'red', type: 'red'},
	{name: 'silver', type: 'cold'},
	{name: 'white', type: 'cold'}], 
features: ['<span class="bold italic">Draconic Ancestry.</span> Somewhere in your lineage, your ancestor was a <span class="dragonbornColor"></span> dragon, which is associated with <span class="dragonbornElement"></span>.', '<span class="bold italic">Breath Weapon.</span> As an action, you exhale destructive energy in a 15-foot cone. Each creature in that area must make a Dex saving throw against a DC of 8 + your Con mod + your Proficiency Bonus. On a failed save, a creature takes 1d10 + your character level in <span class="dragonbornElement"></span> damage. On a successful save, a creature takes half as much damage. You can use this Breath Weapon a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest.', '<span class="bold italic">Damage Resistance.</span> You have Resistance to <span class="dragonbornElement"></span> damage.', '<span class="bold italic">Darkvision.</span> You have Darkvision witha  range of 60 feet.', '<span class="bold italic">Draconic Language.</span> You instinctively know the language of dragons.  You can therefore speak, read, and write Draconic.']};
const DWARF = {name: 'dwarf', features: ['<span class="bold italic">Darkvision.</span> You have Darkvision with a range of 60 feet.', '<span class="bold italic">Dwarven Resilience.</span> You have Resistance to Poison Damage. You also have Advantage on saving throws you make to avoid/end the Poisoned Condition on yourself.', '<span class="bold italic">Dwarven Toughness.</span> Your Hit Point Maximum increases by your current level, and it increases by 1 again whenever you gain a level.', '<span class="bold italic">Forge Wise.</span> Your divine creator gave you an uncanny affinity for working with stone or metal.  You gain Tool Proficiency with two of the following options of your choice: Jeweler\'s Tools, Mason\'s Tools, Smith\'s Tools, or Tinker\'s Tools.', '<span class="bold italic">Stonecunning.</span> As a bonus action, you gain Tremorsense with a range of 60 feet for 10 minutes.  You must be on a stone surface or touching such a surface to use this ability. The stone can be natural or worked. <br>You can use this Bonus Action a number of times equal to your proficiency Bonus, and you regain all expended uses when you finish a Long Rest.'], racetools: ['Jeweler\'s Tools', 'Mason\'s Tools', 'Smith\'s Tools', 'Tinker\'s Tools']};
const ELF = {name: 'elf', sub: [
    {name: 'drow', spell: ['Dancing Lights'], darkvision: 120, feature: 'The range of your Darkvision increases to 120 feet. You also know the Dancing Lights cantrip.'},
    {name: 'high', spell: ['Prestidigitation'], darkvision: 60, feature: 'You know the Prestidigitation cantrip. Whenever you finish a Long Rest, you can replace that cantrip with a different cantrip from the Arcane Spell List.'},
    {name: 'wood', spell: ['Druidcraft'], darkvision: 60, feature: 'Your Speed increases to 35 feet. You also know the Druidcraft cantrip.'}
], features: ['<span class="bold italic">Darkvision.</span> You have Darkvision with a range of <span class="elfDarkvision"></span> feet.', '<span class="bold italic">Elven Lineage.</span> You are part of an elven lineage that grants you supernatural abilities. You are either a Drow, the linerage of the Underdark, a High Elf, the lineage of fey crossings and other magical locations, or a Wood Elf, the lineage of primeval forests. You gain the 1st level benefits of that lineage: <span class="elfLineage"></span><br>Intelligence, Wisdom, or Charisma is your spellcasting ability for the Spells you case with this trait (choose the ability when you select the lineage).', '<span class="bold italic">Fey Ancestry.</span> You have Advantage on saving throws you make to avoid or end the Charmed Condition on yourself.', '<span class="bold italic">Keen Senses.</span> You have Proficiency in the Perception skill.', '<span class="bold italic">Trance.</span> You don\'t need to sleep, and magic can\'t put you to sleep. You can finish a Long Rest in 4 hours if you spend those hours in a trancelike meditation, during which you retain consciousness.'], skill: 'Perception'};
const GNOME = {name: 'gnome', sub: [
    {name: 'forest', spell: ['Minor Illusion'], feature: 'You know the Minor Illusion cantrip.<br>You can also cast the Speak with Animals spell with this trait. You can cast it a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest. You can also use any Spell Slots you have to cast the spell.'},
    {name: 'rock', spell: ['Mending', 'Prestidigitation'], feature: 'You know the Mending and Prestidigitation cantrips<br>In addition, you can spend 10 minutes casting Prestidigitation to create a Tiny clockwork device (AC 5, 1 HP), such as a toy, a fire starter, or a music box. Casting the spell in this way consumes 10 GP worth of raw material (string, gears, and the like), which you provice during the casting.<br>When you create the device, you determine its function by choosing one effect from Prestidigitation; the device produces that effect whenever you or another creature takes a Bonus Action to touch the device and activate it. If the chosen effect has options within it, you choose one of those options for the device when you create it.  For example, if you choose the spell\'s ignite-extinguish effect, you determine whether the device ignites or extinguishes first; the device doesn\'t do both.<br>You can have three such devices in existence at a time, and each one dismantles itself 8 hours after its creation. You can also touch one of your devices and dismantle it as an Action. After a device is dismantled, yhe 10 GP of materials used to create it can be reclaimed.'}
], features: ['<span class="bold italic">Darkvision.</span> You have Darkvision with a range of 60 feet.', '<span class="bold italic">Gnomish Cunning.</span> You have Advantage on Intelligence, Wisdom, and Charisma saving throws.', '<span class="bold italic">Gnomish Lineage.</span> You are part of a gnomish lineage that grants you supernatural abilities.  You are either a forest gnome, the lineage of magic-filled forest, or a rock gnome, the lineage of pimeval mountains. You gain the following benefits from your lineage:<br><span class="gnomeLineage"></span><br>Intelligence, Wisdom, or Charisma is your spellcasting ability for the Spells you cast with this trait (choose the ability when you select the lineage).']};
const HALFLING = {name: 'halfling', features: ['<span class="bold italic">Brave.</span> You have Advantage on saving throws you make to avoid/end the Frightened Condition on yourself.', '<span class="bold italic">Halfling Nimbleness.</span> You can move thorugh the space of any creature that is of a Size larger than yours, but you can\'t stop there.', '<span class="bold italic">Luck.</span> When you roll a 1 during a d20 Test, you can reroll the die, and you must use the new roll.', '<span class="bold italic">Naturally Stealthy.</span> You have Proficiency in the Stealth skill.'], skill: "Stealth"};
const ORC = {name: 'orc', features: ['<span class="bold italic">Adrenaline Rush.</span> You can take the Dash Action as a Bonus Action. When you do so, you gain a number of Temporary Hit Points equal to your Proficiency Bonus.<br>You can use this trait a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest.', '<span class="bold italic">Darkvision.</span> You have Darkvision with a range of 60 feet.', '<span class="bold italic">Powerful Build.</span> You count as one Size larger when determining your carrying capacity and the weight you can push, drag, or lift.', '<span class="bold italic">Relentless Endurance.</span> When you are reduced to 0 Hit Points but not killed outright, you can drop to 1 Hit Point instead. Once you use this trait, you can\'t do so again until you finish a Long Rest.']};
const TIEFLING = {name: 'tiefling', sub: [
    {name: 'abyssal', spell: ['Poison Spray', 'Thaumaturgy'], type: 'poison', align: 'Chaotic Evil'},
    {name: 'chthonic', spell: ['Chill Touch', 'Thaumaturgy'], type: 'necrotic', align: 'Neutral Evil'},
    {name: 'infernal', spell: ['Fire Bolt', 'Thaumaturgy'], type: 'fire', align: 'Lawful Evil'},
], features: ['<span class="bold italic">Darkvision.</span> You have Darkvision with a range of 60 feet.', '<span class="bold italic">Fiendish Legacy.</span> You are a recipient of a fiendish legacy that grants you supernatural abilities. Your legacy is of the <span class="tieflingLegacy"></span>, which is associated with <span class="tieflingAlign"></span> planes. You gain the 1st level benefir of that legacy: You have Resistance to <span class="tieflingElement"></span> damage. You also know the <span class="tieflingSpell"></span> cantrip.<br>Intelligence, Wisdom, or Charisma is your spellcasting ability for the spells you cast with this trait (choose the ability when you select the lineage).', '<span class="bold italic">Otherworldly Presence.</span> You know the Thaumaturgy cantrip. When you cast it with this trait, the spell uses the same spellcasting ability you use for your Fiendish Legacy trait.']}

const RACES = [HUMAN, DWARF, HALFLING, ORC, DRAGONBORN, ARDLING, GNOME, TIEFLING, ELF];

const TOOLS = ['Alchemist\'s Supplies', 'Brewer\'s Supplies', 'Calligrapher\'s Supplies', 'Carpenter\'s Tools', 'Cartographer\'s Tools', 'Cobbler\'s Tools', 'Cook\'s Utensils', 'Glassblower\'s Tools', 'Jeweler\'s Tools', 'Leatherworker\'s Tools', 'Mason\'s Tools', 'Painter\'s Supplies', 'Potter\'s Tools', 'Smith\'s Tools', 'Tinker\'s Tools', 'Weaver\'s Tools', 'Woodcarver\'s Tools', 'Disguise Kit', 'Forgery Kit', 'Dice Set', 'Dragonchess Set', 'Playing Card Set', 'Three-Dragon Ante Set', 'Herbalism Kit', 'Bagpipes', 'Drum', 'Dulcimer', 'Flute', 'Lute', 'Lyre', 'Horn', 'Pan Flute', "Shawm", 'Viol', 'Navigator\'s Tool', 'Poisoner\'s Kit', 'Thieves\' Tools', 'Land Vehicles', 'Water Vehicles']

//Generate Button
CHARGEN.addEventListener('click', function() {
    //Assigning race and Lineage
    const RACE = RACES[ROLLER(RACES.length)];
    let subraceRoll;
    let subrace = "";
    if (RACE.hasOwnProperty('sub')) {
        subraceRoll = ROLLER(RACE.sub.length);
        subrace = RACE.sub[subraceRoll].name;
    }

    //Assigning arrays for the purposes of checking dupes/futureproofing
    const SKILLARR = [];
    const TOOLARR = [];
    const FEATARR = [];
    const SPELL0ARR = [];
    const SPELL1ARR = [];
    const MAGICARR = [];
    const SPELLDUPEARR = [];

    //Setting the text onto the document
    CHARHOLDER.innerHTML = `You are a ${subrace} ${RACE.name} with the following abilities:

        <div id='raceFeatures'></div>
        
        <div id='skillProfs'>You are proficient in the following skills:
            <ul id='skillList'></ul>
        </div>
        
        <div id='toolProfs'>You are proficient with the following tools:
            <ul id='toolList'></ul>
        </div>
        
        <div id='feats'>You have the following feats:
            <ul id='featList'></ul>
        </div>

        <div id='spells'></div>
        `;

    //Tagetting Generated HTML Elements
    const GENDERSPAN = document.querySelector('#genderSpan');
    const RACEFEATURES = document.querySelector('#raceFeatures');
    const SKILLLIST = document.querySelector('#skillList');
    const TOOLLIST = document.querySelector('#toolList');
    const FEATLIST = document.querySelector('#featList');
    const SPELLDIV = document.querySelector('#spells');

    //Fill In Race Features
    for (let i = 0; i < RACE.features.length; i++) {
        RACEFEATURES.innerHTML += '<div class="raceFeature">' + RACE.features[i] + '</div>';
    };

    //Fill in Subrace Details
    if (RACE.name === "dragonborn") {
        ADDTEXTTOSPANS(subrace, '.dragonbornColor');
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].type, '.dragonbornElement');
    } else if (RACE.name === 'ardling') {
        ADDTEXTTOSPANS(subrace, '.ardlingLegacy');
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].align, '.ardlingAlign');
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].animals, '.ardlingAnimals');
    } else if (RACE.name === 'elf') {
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].darkvision, '.elfDarkvision');
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].feature, '.elfLineage');
    } else if (RACE.name === 'gnome') {
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].feature, '.gnomeLineage');
    } else if (RACE.name === 'tiefling') {
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].name, '.tieflingLegacy');
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].type, '.tieflingElement');
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].align, '.tieflingAlign');
        ADDTEXTTOSPANS(RACE.sub[subraceRoll].spell[0], '.tieflingSpell');
    };
    
    //Fill In Skills
    if (RACE.hasOwnProperty('skill')) {
        APPENDTOLIST(RACE.skill, SKILLLIST, SKILLARR);
    };

    if (RACE.name === 'human') {
        for (let i = 0; i < 3; i++) {
            let skillHolder = Object.keys(SKILLS)[ROLLER(Object.keys(SKILLS).length)];
            while (SKILLARR.indexOf(skillHolder) >= 0) {
                skillHolder = Object.keys(SKILLS)[ROLLER(Object.keys(SKILLS).length)];
            };
            APPENDTOLIST(skillHolder, SKILLLIST, SKILLARR);
        };
    } else {
        for (let i = 0; i < 2; i++) {
            let skillHolder = Object.keys(SKILLS)[ROLLER(Object.keys(SKILLS).length)];
            while (SKILLARR.indexOf(skillHolder) >= 0) {
                skillHolder = Object.keys(SKILLS)[ROLLER(Object.keys(SKILLS).length)];
            };
            APPENDTOLIST(skillHolder, SKILLLIST, SKILLARR);
        };
    }

    //Fill In Tools
    if (RACE.name === 'dwarf') {
        for (let i = 0; i < 2; i++) {
            let dwarfToolHolder = RACE.racetools[ROLLER(RACE.racetools.length)];
            while (TOOLARR.indexOf(dwarfToolHolder) >= 0) {
                dwarfToolHolder = RACE.racetools[ROLLER(RACE.racetools.length)];
            };
            APPENDTOLIST(dwarfToolHolder, TOOLLIST, TOOLARR);
        };
    };

    let toolHolder = TOOLS[ROLLER(TOOLS.length)];
    while (TOOLARR.indexOf(toolHolder) >= 0) {
        toolHolder = TOOLS[ROLLER(TOOLS.length)];
    };
    APPENDTOLIST(toolHolder, TOOLLIST, TOOLARR);
    

    //Fill in Feats
    if (RACE.name === 'human') {
        let featHolder = Object.keys(FEATS)[ROLLER(Object.keys(FEATS).length)];
        while (FEATARR.indexOf(featHolder) >= 0) {
            featHolder = Object.keys(FEATS)[ROLLER(Object.keys(FEATS).length)];
        };
        let newFeat = document.createElement('li');
        newFeat.innerHTML = '<span class="bold italic">' + featHolder + '.</span> ' + FEATS[featHolder];
        FEATLIST.appendChild(newFeat);
        FEATARR.push(featHolder);
    };

    let featHolder = Object.keys(FEATS)[ROLLER(Object.keys(FEATS).length)];
    if (featHolder !== 'Magic Initiate') {
        while (FEATARR.indexOf(featHolder) >= 0) {
        featHolder = Object.keys(FEATS)[ROLLER(Object.keys(FEATS).length)];
        };
    };
    let newFeat = document.createElement('li');
    newFeat.innerHTML = '<span class="bold italic">' + featHolder + '.</span> ' + FEATS[featHolder];
    FEATLIST.appendChild(newFeat);
    FEATARR.push(featHolder);
    
    //Add Tools from Crafter (17 Artisan Tools in total)
    if (FEATARR.indexOf('Crafter') >= 0) {
        for (let i = 0; i < 3; i++) {
            let toolHolder = TOOLS[ROLLER(16)];
            while (TOOLARR.indexOf(toolHolder) >= 0) {
                toolHolder = TOOLS[ROLLER(16)];
            };
        APPENDTOLIST(toolHolder, TOOLLIST, TOOLARR);
        };
    };

    //Add Tools from Musician (Index 24-33 in Tools)
    if (FEATARR.indexOf('Musician') >= 0) {
        for (let i = 0; i < 3; i++) {
            let toolHolder = TOOLS[ROLLER(10)+24];
            while (TOOLARR.indexOf(toolHolder) >= 0) {
                toolHolder = TOOLS[ROLLER(10)+24];
            };
        APPENDTOLIST(toolHolder, TOOLLIST, TOOLARR);
        };
    };
    
    //Add Skills from Skilled
    if (FEATARR.indexOf('Skilled') >= 0) {
        for (let i = 0; i < 3; i++) {
            let skillHolder = Object.keys(SKILLS)[ROLLER(Object.keys(SKILLS).length)];
            while (SKILLARR.indexOf(skillHolder) >= 0) {
                skillHolder = Object.keys(SKILLS)[ROLLER(Object.keys(SKILLS).length)];
            };
            APPENDTOLIST(skillHolder, SKILLLIST, SKILLARR);
        };
    };

    //Add Spells (First add spells to arrays (race, then feat), then add the list elements and their text seperately)
    if (FEATARR.indexOf('Magic Initiate') >= 0 || (RACE.hasOwnProperty('sub') && RACE.sub[subraceRoll].hasOwnProperty('spell'))) {
        SPELLDIV.innerHTML = 'You know the following spells:<div id="spellList"><div id="cantrips"><span class="bold italic">Cantrips</span><ul id="cantripList"></ul></div><div id="lvl1Spells"><span class="bold italic">Level One Spells</span><ul id="lvl1SpellList"></ul></div></div>';
    } else {
        SPELLDIV.innerHTML = '';
    }

    const cantripList = document.querySelector('#cantripList');
    const lvl1SpellList = document.querySelector('#lvl1SpellList');

    //Add in Racial Cantrip
    if (RACE.hasOwnProperty('sub') && RACE.sub[subraceRoll].hasOwnProperty('spell')) {
        for (let i = 0; i < RACE.sub[subraceRoll].spell.length; i++) {
            APPENDTOLIST(RACE.sub[subraceRoll].spell[i] + ' (Racial)', cantripList,SPELL0ARR);
            SPELLDUPEARR.push(RACE.sub[subraceRoll].spell);
        }
    }

    FEATARR.forEach((feat) => {
        if (feat === 'Magic Initiate') {
            let magicType = Object.keys(SPELLS)[ROLLER(Object.keys(SPELLS).length)];
            while (MAGICARR.indexOf(magicType) >= 0) {
                magicType = Object.keys(SPELLS)[ROLLER(Object.keys(SPELLS).length)];
            }
            MAGICARR.push(magicType);

            for (let i = 0; i < 2; i++) {
                let spellHolder = SPELLS[magicType]['cantrip'][ROLLER(SPELLS[magicType]['cantrip'].length)];
                while (SPELLDUPEARR.indexOf(spellHolder) >= 0) {
                    spellHolder = SPELLS[magicType]['cantrip'][ROLLER(SPELLS[magicType]['cantrip'].length)];
                }
                APPENDTOLIST(spellHolder + ' (' + magicType + ')',cantripList,SPELL0ARR);
                SPELLDUPEARR.push(spellHolder);
            }
            
            let spellHolder = SPELLS[magicType]['lvl1'][ROLLER(SPELLS[magicType]['lvl1'].length)];
            APPENDTOLIST(spellHolder + ' (' + magicType + ')', lvl1SpellList, SPELL1ARR);
            SPELLDUPEARR.push(spellHolder);

        }
    })

    //Calculate Attribute Weights
    let strWeight = 0;
    let dexWeight = 0;
    let conWeight = 0;
    let intWeight = 0;
    let wisWeight = 0;
    let chaWeight = 0;
    
    //Apply Weight Based on Skills
    SKILLARR.forEach(x => {
        if (SKILLS[x] == "Str") {
            strWeight += 1;
        } else if (SKILLS[x] == "Dex") {
            dexWeight += 1;
        } else if (SKILLS[x] == "Int") {
            intWeight += 1;
        } else if (SKILLS[x] == "Wis") {
            wisWeight += 1;
        } else if (SKILLS[x] == "Cha") {
            chaWeight += 1;
        }
    });

    //Apply Weight Based on Race
    if (RACE.name == "orc") {
        strWeight += 1;
    } else if (RACE.name == "dwarf" || RACE.name == "dragonborn") {
        conWeight += 1;
    }

    //Apply Weight Based on Feats

    //Sort attributes
    let weightObj = {"Strength": strWeight, "Dexterity": dexWeight, "Constitution": conWeight, "Intelligence": intWeight, "Wisdom": wisWeight, "Charisma": chaWeight};

    //Create an array of arrays, each inner array holding a key/value pair from weightObj, and sort from low to high
    let sortedWeightArr = Object.entries(weightObj).sort(function(a,b) {
        return a[1]-b[1];
    })

    //create a variable that holds the highest weight score
    let highestWeight = sortedWeightArr[5][1];

    let randomizedAtts = [];

    //Iterate from the highestWeight down to 0
    for (let i = highestWeight; i>= 0; i--) {
        //Holds all attributes of weight i
        let holder = [];
        //Iterate over the length of the sortedWeightArr
        for (let j = 0; j <= sortedWeightArr.length-1; j++) {
            //If the weight of the attribute is equal to i, push it into the holder
            if (sortedWeightArr[j][1] == i) {
                holder.push(sortedWeightArr[j][0]);
            }
        }
        //Iterate over the length of the holder, holding all attributes of weight i
        for (let j = 0; j<= holder.length-1; j++) {
            //Pick a random attribute
            let randomAtt = ROLLER(holder.length);
            //Dupe check, keep rerolling until the chosen value isn't already in the randomizedAtts array
            while (randomizedAtts.indexOf(holder[randomAtt]) >= 0) {
                    randomAtt = ROLLER(holder.length)
            }
            //Add attribute to the randomizedAtts array
            randomizedAtts.push(holder[randomAtt]);
        }
    }

    //Assign Attribute scores
    let attArr = [15, 14, 13, 12, 10, 8];

    for (let i = 0; i <= randomizedAtts.length; i++) {
        if (randomizedAtts[i] == "Strength") {
            STRSCORE.innerHTML = attArr[i];
        } else if (randomizedAtts[i] == "Dexterity") {
            DEXSCORE.innerHTML = attArr[i];
        } else if (randomizedAtts[i] == "Constitution") {
            CONSCORE.innerHTML = attArr[i];
        } else if (randomizedAtts[i] == "Intelligence") {
            INTSCORE.innerHTML = attArr[i];
        } else if (randomizedAtts[i] == "Wisdom") {
            WISSCORE.innerHTML = attArr[i];
        } else if (randomizedAtts[i] == "Charisma") {
            CHASCORE.innerHTML = attArr[i];
        }
    }

    console.log('This is the sorted weight array: ' + sortedWeightArr + ' and here is the randomized attributes' + randomizedAtts)
});
