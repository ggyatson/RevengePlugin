import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

const Messages = findByProps("sendMessage", "editMessage");

const prefixes = [
"meow","nya","mrrp","purrr","uwu","owo","rawr","eepy","silly","goober",
"chaotic","mysterious","legendary","tiny","smol","certified","maximum","ultra","mega","turbo",
"absolutely","definitely","probably","allegedly","respectfully","unfortunately","fortunately","secretly","honestly","truly",
"fish-approved","cat-approved","creature-approved","goblin","wizard","cosmic","galactic","forbidden","enchanted","sparkly"
];

const middles = [
"creature","cat","goober","goblin","wizard","penguin","frog","duck","shrimp","fish",
"potato","cookie","pancake","bagel","muffin","hamster","raccoon","seal","otter","bee",
"moment","energy","vibes","behavior","activity","event","incident","experience","adventure","journey",
"chaos","whimsy","nonsense","tomfoolery","goofiness","silliness","shenanigans","magic","mischief","wonder"
];

const suffixes = [
"activated","detected","approved","certified","engaged","unlocked","obtained","achieved","discovered","encountered",
"in progress","online","loading","spotted","summoned","manifested","awakened","evolved","enhanced","maxed"
];

const emojis = [
"🐱","🐈","🐾","😺","😸","😹","✨","🌸","💖","💜",
"⭐","🌟","💫","🎀","🫶","💕","💞","💗","🤍","🩷",
"🐟","🐸","🦆","🦝","🦭","🐧","🦔","🦋","🐝","🍀",
"🌻","🌺","🌷","🌼","🍓","🍞","🧀","🍪","☕","🧁"
];

function pick(arr: string[]) {
return arr[Math.floor(Math.random() * arr.length)];
}

function randomAddon() {
return "${pick(prefixes)} ${pick(middles)} ${pick(suffixes)} ${pick(emojis)}";
}

function transform(text: string) {
const addon = randomAddon();

if (Math.random() < 0.5) {
    return `${addon} ${text}`;
}

return `${text} ${addon}`;

}

function handleMessage(msg: any) {
if (!msg?.content || typeof msg.content !== "string") return;
msg.content = transform(msg.content);
}

export default function() {
const patches = [
before("sendMessage", Messages, args => {
handleMessage(args[1]);
}),
before("editMessage", Messages, args => {
handleMessage(args[2]);
})
];

return () => {
    for (const patch of patches) patch();
};

}
