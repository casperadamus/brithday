/*
  ✿ Edit everything on the site from this one file ✿

  Photos: drop your pictures into the "photos" folder and list them below.
  Any photo that's missing shows a soft placeholder, so nothing ever looks broken.
*/

const CONTENT = {
  // Shown in the big heading ("Wszystkiego najlepszego, ___") and the letter ("Kochana ___,")
  momName: "Mamo",

  // Your name, used to sign the letter
  fromName: "Casper",

  // Small line under the heading
  tagline: "Dla kobiety, która sprawia, że każdy mój dzień jest odrobinę piękniejszy.",

  // The letter. Each item is one paragraph.
  letter: [
    "Wszystkiego najlepszego dla najcierpliwszej, najcieplejszej i po cichu niesamowitej osoby, jaką znam.",
    "Dziękuję Ci za każdy wczesny poranek, każdą późną noc, każdy przytulas wtedy, gdy był mi potrzebny, i każdą radę – nawet tę, której niby nie słucham (a jednak zawsze słucham).",
    "Mam nadzieję, że ten rok odda Ci choć odrobinę miłości, którą dajesz wszystkim wokół. Zasługujesz na nią całą – i na jeszcze więcej.",
  ],

  // Your photos together. "caption" is optional.
  // "focus" is optional: which part of the photo stays in the frame
  // ("left right%  top bottom%"), handy for wide or very tall photos.
  photos: [
    { src: "photos/1.jpg", caption: "dzień pierwszy" },
    { src: "photos/2.jpg", caption: "przytulasy w kukurydzy", focus: "50% 30%" },
    { src: "photos/3.jpg", caption: "pierwsze dni na plaży", focus: "10% 50%" },
    { src: "photos/4.jpg", caption: "świąteczne przytulanie" },
    { src: "photos/5.jpg", caption: "mali wędrowcy", focus: "50% 80%" },
    { src: "photos/6.jpg", caption: "wietrzne spacery brzegiem", focus: "50% 60%" },
    { src: "photos/7.jpg", caption: "na mecie!", focus: "50% 40%" },
    { src: "photos/8.jpg", caption: "bardzo poważna sesja zdjęciowa", focus: "35% 50%" },
    { src: "photos/9.jpg", caption: "świątecznie i elegancko" },
    { src: "photos/10.jpg", caption: "przygoda w dżungli", focus: "50% 30%" },
    { src: "photos/11.jpg", caption: "letnie popołudnia", focus: "50% 30%" },
    { src: "photos/12.jpg", caption: "policzek przy policzku", focus: "62% 50%" },
    { src: "photos/13.jpg", caption: "złota godzina", focus: "55% 50%" },
    { src: "photos/14.jpg", caption: "spacery o zachodzie słońca", focus: "61% 50%" },
    { src: "photos/15.jpg", caption: "dni na plaży", focus: "50% 10%" },
    { src: "photos/16.jpg", caption: "wyspiarski czas" },
    { src: "photos/17.jpg", caption: "trzy pokolenia", focus: "75% 50%" },
    { src: "photos/18.jpg", caption: "ekipa w trasie" },
  ],

  // "Things I love about you"
  reasons: [
    { title: "Twój śmiech", text: "Wypełnia cały pokój i jakimś cudem naprawia wszystko." },
    { title: "Twoja dobroć", text: "Każdego traktujesz tak, jakby był ważny, bo dla Ciebie naprawdę jest." },
    { title: "Twoja siła", text: "Dźwigasz tak wiele, a mimo to robisz to z taką łagodnością." },
    { title: "Twoje przytulasy", text: "Wciąż najbezpieczniejsze miejsce na świecie." },
    { title: "Twoje rady", text: "Irytująco zawsze trafne." },
    { title: "Ty", text: "Po prostu cała Ty. Mam ogromne szczęście, że jesteś moją mamą." },
  ],

  // The message revealed by the button at the bottom
  surprise: "Kocham Cię bardzo, Mamo. 💗",
};
