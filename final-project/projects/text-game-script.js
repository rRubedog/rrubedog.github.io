const storyText = document.getElementById("story-text");
const choiceButtons = document.getElementsByClassName("choice-btn");
let health = 50;
let xp = 0;
let hillsWalked = 0;

const story = [
  {
    id: 1,
    text: "You find yourself in a dark cave. There are 3 items in front of you.",
    choices: [
      { text: "Take the pickaxe", nextId: 2 },
      { text: "Take the torch", nextId: 3 },
      { text: "Take the gun", nextId: 4 },
    ],
  },
  {
    id: 4,
    text: "You don't know how to use this thing, plus it's not loaded.",

    choices: [
      { text: "Take the pickaxe", nextId: 2 },
      { text: "Take the torch", nextId: 3 },
    ],
  },

  /* Pickaxe	 */
  {
    id: 2,
    text: "You take the pickaxe. There are three paths in front of you.",
    choices: [
      { text: "Go along the uphill path", nextId: 5 },
      { text: "Go along the stream", nextId: 6 },
      { text: "Go along the tire marked path", nextId: 7 },
    ],
  },
  {
    id: 32,
    text: "There are three paths in front of you.",
    choices: [
      { text: "Go along the uphill path", nextId: 5 },
      { text: "Go along the stream", nextId: 6 },
      { text: "Go along the tire marked path", nextId: 7 },
    ],
  },
  {
    id: 5,
    text: "You go along the uphill path for a while, but then it turns into a downhill path.",
    choices: [
      { text: "Keep going", nextId: 13 },
      { text: "Go back", nextId: 32 },
    ],
  },
  {
    id: 13,
    text: "You go along the downhill path for a while, but then it turns into an uphill path.",
    choices: [
      { text: "Keep going", nextId: 5 },
      { text: "Go back", nextId: 32 },
    ],
  },
  {
    id: 6,
    text: "You go along the stream for a while. You find a lot of water.",
    choices: [
      { text: "C'mon, do something", nextId: 14 },
      { text: "Drink some", nextId: 15 },
    ],
  },
  {
    id: 14,
    text: "Yep.. Just more water. *cough*..",
    choices: [
      { text: "Go back", nextId: 32 },
      { text: "Drink some", nextId: 15 },
    ],
  },
  {
    id: 15,
    text: "You drink some of the water. `ew.. why did I do that?  I don't know why drinking random puddles of water in a cave sounded logical a second ago but now I feel really stupid.`",
    choices: [{ text: "Go back", nextId: 32 }],
  },
  {
    id: 7,
    text: "You go along the tire marked path. But as you go you see what looks like a mine, and it sounds like theres something in there.",
    choices: [
      { text: "Stop and listen", nextId: 10 },
      { text: "Keep going", nextId: 11 },
    ],
  },
  /* Torch	 */
  {
    id: 3,
    text: "You take the torch. After waving it around the light reveals a small mine a little deeper in the cave.",
    choices: [
      { text: "Go toward the small mine", nextId: 8 },
      { text: "Go away from the small mine", nextId: 32 },
    ],
  },
  {
    id: 8,
    text: "While approaching the mine you hear something. You can't tell what it is but theres definately something there.",
    choices: [
      { text: "Stop and listen", nextId: 10 },
      { text: "Keep going", nextId: 11 },
    ],
  },
  {
    id: 10,
    text: "You stop to listen, but you accedentaly broke a twig when you stoped. You hear the noises in the cave stop and the sound of footsteps start and they are getting louder and louder.",
    choices: [
      { text: "QUICK HIDE!", nextId: 19 },
      { text: "Wait for them to find you", nextId: 20 },
    ],
  },
  {
    id: 19,
    text: "You make a mad dash for a nearby boulder to hide behind. But right as you get behind it one of them yell,'OVER THERE!'",
    choices: [
      { text: "RUN!", nextId: 21 },
      { text: "ATTACK!", nextId: 22 },
    ],
  },
  {
    id: 21,
    text: "You try to run away but right when you leave your hiding spot you feel a sharp pain in your spine and you collapse.",
    choices: [
      {
        text: "Well it looks like your dead, you probably shouldn't make any sudden movements when you are dealing with an unkown noise.",
        nextId: 1,
      },
    ],
  },
  {
    id: 22,
    text: "You jump out of your hiding spot to attack the mistery foe!.. But as soon as you jump out you see a pickaxe implanted in your chest...",
    choices: [
      {
        text: "Well it looks like your dead, you probably shouldn't make any sudden movements when you are dealing with a mysterie foe.",
        nextId: 1,
      },
    ],
  },
  {
    id: 20,
    text: "You wait for them to find you. Or you are frozen in fear. Either way you look really stupid right now.",
    choices: [{ text: "Continue", nextId: 23 }],
  },
  {
    id: 23,
    text: "They find you and, turns out, there dwarves! Such peacefull creatures. When looking at you for the first time one of them stops and says,'FALSE ALARM GUYS, THIS ONE IS DEFINATELY NOT A THREAT' and they all head back to the mine.  You wonder if you should feel insulted or releived",
    choices: [{ text: "Go ask what they are doing", nextId: 24 }],
  },
  {
    id: 24,
    text: "You ask what the dwarves are doing in their mine. 'WHAT DO YA THINK? EXPLORING?'says one of the dwarves sounding almost offended that you didn't think he looked like a miner.",
    choices: [{ text: "Wha- I'm sorry I was just curi-", nextId: 25 }],
  },
  {
    id: 25,
    text: "'WHO ARE YOU ANYWAY?'one of them asks.",
    choices: [{ text: "Just a lost.. human?", nextId: 26 }],
  },
  {
    id: 26,
    text: "'NO I MEAN WHATS YOUR NAME?'",
    choices: [
      { text: "I'm actually not sure now that I think about it", nextId: 16 },
    ],
  },
  {
    id: 11,
    text: "You ignore the noise and continue into the mine.",
    choices: [{ text: "Continue", nextId: 12 }],
  },
  {
    id: 12,
    text: "You see the mine is occupied by busy dwarves, they all glance over at you and quickly return to their work.  One of them leisurely walks over to you and grumbles `NAME?`",
    choices: [
      { text: "What?", nextId: 16 },
      { text: "I don't know", nextId: 16 },
      { text: "Whats it to ya'? Huh?", nextId: 18 },
    ],
  },
  {
    id: 16,
    text: "'WELL THEN, I GUESS YOURE ONE OF US NOW.' Uh-oh, you really shouldn't have said that, you feel something.. your legs are.. shrinking?? Your not sure what is happening to you but its happening fast and everything is growing around you like invasive plants!",
    choices: [{ text: "Continue", nextId: 27 }],
  },
  {
    id: 27,
    text: "Suddenly you lose control of your limbs and voice.  Against your will you start to walk further into the mine and start mining with the dwarves.",
    choices: [{ text: "Continue", nextId: 28 }],
  },
  {
    id: 28,
    text: "Some time later- could be months, weeks, hours, it's hard to tell in the cave- you hear a man stumbling around, when he finally rounds the corner and spots you he waves you down like a taxi.",
    choices: [{ text: "Walk to him", nextId: 29 }],
  },
  {
    id: 29,
    text: "The man, with deep worry in his voice, says, 'Hello sir, you must know how to get out of here right? I mean, how would you get in here and not know how??'",
    choices: [{ text: "WHATS YOUR NAME, SIR?", nextId: 30 }],
  },
  {
    id: 30,
    text: "'I.. I don't know.. I feel like I should know, but I don't.'",
    choices: [{ text: "WELL THEN, I GUESS YOUR ONE OF US NOW.", nextId: 31 }],
  },
  {
    id: 31,
    text: "You see him suddenly shrink into a dwarf, and you both go off into the mine and pick at the walls.  All over again.",
    choices: [
      {
        text: "Well crap. You got captured in the confused dwarf spell and will now mine in a cave that dosen't even have any materials forever. Another try?",
        nextId: 1,
      },
    ],
  },
];

function add(item) {
  let itemDis = document.getElementById(item);
  itemDis.style.display = "block";
}

function showStory() {
  storyText.innerText = currentStory.text;

  for (let i = 0; i < choiceButtons.length; i++) {
    if (currentStory.choices[i]) {
      choiceButtons[i].innerText = currentStory.choices[i].text;
      choiceButtons[i].style.display = "block";
    } else {
      choiceButtons[i].style.display = "none";
    }
  }
}

function selectChoice(choiceIndex) {
  const nextId = currentStory.choices[choiceIndex - 1].nextId;
  currentStory = story.find((storyPart) => storyPart.id === nextId);
  showStory();
  if (nextId === 4) {
    add("gun");
  } else if (nextId === 3) {
    add("torch");
  } else if (nextId === 2) {
    add("pickaxe");
  } else if (nextId === 13) {
    hillsWalked += 1;
    console.log(hillsWalked);
  } else if (nextId === 1) {
    document.getElementById("torch").style.display = "none";
    document.getElementById("pickaxe").style.display = "none";
    document.getElementById("gun").style.display = "none";
    hillsWalked = 0;
  }
  if (hillsWalked >= 3) {
    xp += 1;
    hillsWalked = 0;
  }
}

let currentStory;

function startGame() {
  currentStory = story[0];
  showStory();
}

startGame();


document.getElementById("goback").addEventListener("click", () => {
  history.back();
});