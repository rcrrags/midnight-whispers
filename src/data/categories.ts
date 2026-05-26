export type CategoryId =
  | "soft"
  | "flirty"
  | "spicy"
  | "extreme"
  | "romantic"
  | "truth-dare"
  | "late-night"
  | "mystery"
  | "date-night"
  | "story";

export interface Category {
  id: CategoryId;
  label: string;
  tagline: string;
  emoji: string;
  hue: number; // for hsl glow
  unlockAt: number; // chemistry required
  tasks: string[];
}

const soft = [
  "Look into each other's eyes for 30 seconds without speaking.",
  "Hold hands and share one thing you love about today.",
  "Trace a slow heart on your partner's palm.",
  "Whisper your favorite memory of them into their ear.",
  "Lean your forehead against theirs and breathe together for a minute.",
  "Tuck a strand of their hair behind their ear.",
  "Give a gentle 60-second shoulder rub.",
  "Tell them three things you noticed about them today.",
];

const flirty = [
  "Bite your lip while making eye contact for 10 seconds.",
  "Send your partner a flirty text from across the room — read it aloud after.",
  "Slow-dance to one song with no music.",
  "Whisper something that makes them blush.",
  "Walk your fingers up their arm and stop wherever they say.",
  "Compliment three things about how they look right now.",
  "Take a flirty selfie together — winner picks the pose.",
  "Trade one secret you've never told them.",
];

const spicy = [
  "Kiss your partner somewhere you've never kissed before.",
  "Describe in detail your perfect night together.",
  "Whisper your favorite thing they do — and ask them to do it.",
  "Let your partner choose where you kiss them next.",
  "Slow kiss for 20 seconds — no breaks.",
  "Pin your partner's hands gently for a 10-second kiss.",
  "Trade clothing items for the rest of the round.",
  "Sit on their lap and tell them what you want next.",
];

const extreme = [
  "Lights off — let your hands do the talking for 60 seconds.",
  "Blindfold your partner and feed them something sweet.",
  "Slow-dance in dim light — barely touching.",
  "Take turns describing a fantasy in three sentences.",
  "Trade three rules for the next hour.",
  "Pick a song. Move to it together however you want.",
  "Write a dare on paper. Trade. Both must do.",
  "10 seconds of eye contact — no smiling — closer than ever.",
];

const romantic = [
  "Recreate your first date in three sentences.",
  "Write a one-line love note and hand it to them.",
  "Slow waltz to a song that means something to you.",
  "Say 'I love you' in three different ways.",
  "Plan your dream vacation in 60 seconds — together.",
  "Share the moment you knew this was real.",
  "Promise one small thing for the week ahead.",
  "Kiss them like it's the first time.",
];

const truthDare = [
  "TRUTH: What's something you've fantasized about lately?",
  "DARE: Kiss your partner for as long as this card stays up.",
  "TRUTH: What's the most attractive thing I do without realizing?",
  "DARE: Whisper your wildest thought into my ear.",
  "TRUTH: When did you first feel butterflies for me?",
  "DARE: Hold eye contact and don't blink first.",
  "TRUTH: One thing you've been too shy to ask for?",
  "DARE: Slow-dance with me, no music, right now.",
];

const lateNight = [
  "Dim the lights. Trade three confessions.",
  "Lay back-to-back and share your day in whispers.",
  "Trace constellations on each other's skin.",
  "One slow kiss. No talking after.",
  "Read your partner's last 3 messages out loud — dramatically.",
  "Make a midnight wish together.",
  "Tell each other the dream you'd love to share tonight.",
  "Pick a song and slow-sway under low light.",
];

const mystery = [
  "Hide a small surprise nearby. Give 3 clues. They have 60 seconds.",
  "Write a secret on a slip and slip it into their pocket.",
  "Pick a number. Whoever's closer to your secret guess wins a kiss.",
  "Two truths and a flirty lie — guess the lie.",
  "Lock eyes. Whoever smiles first owes the other a wish.",
  "Whisper a question only they can answer.",
  "Hide a tiny love note — they'll find it later.",
  "Trade riddles. Loser does the next dare.",
];

const dateNight = [
  "Plan a 3-course imaginary dinner. Each pick one course.",
  "Recreate a movie scene — together.",
  "Trade phones. Pick a song for each other.",
  "Slow walk around the room arm-in-arm — describe a city you'd visit.",
  "Make a fake reservation for a fancy place — bow and seat each other.",
  "Cheers an imaginary drink and toast your future.",
  "Take a couples-style polaroid pose — hold for 5 seconds.",
  "Trade one compliment per minute for 3 minutes.",
];

const story = [
  "🌃 NEON CITY: You're lost in a glowing city — one wrong turn leads to a hidden rooftop. Describe what you find there together.",
  "🏨 LUXURY HOTEL: Room 707. A note on the pillow says 'meet me on the balcony in 5'. Roleplay the moment.",
  "🌧 RAINY DRIVE: Just you two on an empty highway at midnight. Pick the song. Tell each other the secret you'd only confess in the rain.",
  "🌅 SECRET ROOFTOP: Skyline below, just you above. Share one promise you've never said aloud.",
  "✈️ VACATION ESCAPE: 24 hours, anywhere, no rules. Plan it together in 3 lines each.",
  "💫 FANTASY DREAM: Close your eyes. Describe meeting your partner in a dream — what are they wearing, what do they say?",
  "🎭 MASQUERADE: You don't know each other at this ball. How do you flirt first?",
  "🌊 MIDNIGHT BEACH: Salt air, no signal, one fire. What do you talk about until sunrise?",
];

export const CATEGORIES: Category[] = [
  { id: "soft", label: "Soft & Cute", tagline: "Gentle warmth", emoji: "🤍", hue: 340, unlockAt: 0, tasks: soft },
  { id: "flirty", label: "Flirty", tagline: "A little tease", emoji: "💋", hue: 320, unlockAt: 0, tasks: flirty },
  { id: "romantic", label: "Romantic", tagline: "Heart on display", emoji: "🌹", hue: 0, unlockAt: 0, tasks: romantic },
  { id: "truth-dare", label: "Truth or Dare", tagline: "Reveal or risk", emoji: "🎲", hue: 270, unlockAt: 0, tasks: truthDare },
  { id: "date-night", label: "Date Night", tagline: "Cinematic moments", emoji: "🍷", hue: 20, unlockAt: 10, tasks: dateNight },
  { id: "mystery", label: "Mystery Mode", tagline: "Whispers & secrets", emoji: "🗝️", hue: 250, unlockAt: 15, tasks: mystery },
  { id: "spicy", label: "Spicy", tagline: "Turn up the heat", emoji: "🔥", hue: 14, unlockAt: 20, tasks: spicy },
  { id: "late-night", label: "Late Night", tagline: "After midnight", emoji: "🌙", hue: 230, unlockAt: 30, tasks: lateNight },
  { id: "story", label: "Story Mode", tagline: "Cinematic chapters", emoji: "🎬", hue: 290, unlockAt: 40, tasks: story },
  { id: "extreme", label: "Extreme", tagline: "Only the bold", emoji: "⚡", hue: 350, unlockAt: 60, tasks: extreme },
];
