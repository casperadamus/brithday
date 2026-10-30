/*
  ✿ Edit everything on the site from this one file ✿

  Photos: drop your pictures into the "photos" folder and list them below.
  Any photo that's missing shows a soft placeholder, so nothing ever looks broken.
*/

const CONTENT = {
  // Shown in the big heading: "Happy Birthday, ___"
  momName: "Mom",

  // Your name, used to sign the letter
  fromName: "Casper",

  // Small line under the heading
  tagline: "To the woman who made every day of my life a little softer.",

  // The letter. Each item is one paragraph.
  letter: [
    "Happy birthday to the most patient, warm, and quietly incredible person I know.",
    "Thank you for every early morning, every late night, every hug when I needed one and every word of advice I pretended not to hear (but always did).",
    "I hope this year gives back even a fraction of the love you give everyone around you. You deserve all of it, and more.",
  ],

  // Your photos together. "caption" is optional.
  photos: [
    { src: "photos/1.jpg", caption: "us, always" },
    { src: "photos/2.jpg", caption: "my favorite day" },
    { src: "photos/3.jpg", caption: "sunday mornings" },
    { src: "photos/4.jpg", caption: "that trip" },
    { src: "photos/5.jpg", caption: "laughing at nothing" },
    { src: "photos/6.jpg", caption: "little me & you" },
  ],

  // "Things I love about you"
  reasons: [
    { title: "Your laugh", text: "It fills the whole room, and somehow fixes everything." },
    { title: "Your kindness", text: "You treat everyone like they matter, because to you they do." },
    { title: "Your strength", text: "You carry so much and still make it look gentle." },
    { title: "Your hugs", text: "Still the safest place in the world." },
    { title: "Your advice", text: "Annoyingly, always right." },
    { title: "You", text: "Just all of you. I'm so lucky you're my mom." },
  ],

  // The message revealed by the button at the bottom
  surprise: "I love you more than words (or websites) can say. 💗",
};
