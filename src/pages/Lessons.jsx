import React, { useState } from "react";
import LessonCard from "../components/LessonCard";
import QuestionCard from "../components/QuestionCard";
import { useLang } from "../LanguageContext";

// Multilingual lesson data with Swedish (sv) translations
const LESSONS = [
  {
    id: 1,
    title: {
      fa: "سلام و احوال‌پرسی",
      en: "Greetings and Introductions",
      sv: "Hälsningar och introduktioner",
    },
    description: {
      fa: "کلمات و عبارات ابتدایی برای سلام، خداحافظی و معرفی.",
      en: "Basic words and phrases for greeting, farewell, and introduction.",
      sv: "Grundläggande ord och fraser för hälsning, avsked och introduktion.",
    },
    questions: [
      {
        q: {
          fa: "سلام به فارسی چیست؟",
          en: 'What is "Hello" in Persian?',
          sv: 'Vad är "Hej" på persiska?',
        },
        choices: [
          { fa: "سلام", en: "Salam", sv: "Salam" },
          { fa: "خداحافظ", en: "Goodbye", sv: "Adjö" },
          { fa: "ممنون", en: "Thank you", sv: "Tack" },
        ],
        answer: 0,
      },
      {
        q: {
          fa: "خداحافظ به فارسی چیست؟",
          en: 'What is "Goodbye" in Persian?',
          sv: 'Vad är "Adjö" på persiska?',
        },
        choices: [
          { fa: "متشکرم", en: "Thank you", sv: "Tack" },
          { fa: "خداحافظ", en: "Khodahafez", sv: "Khodahafez" },
          { fa: "بله", en: "Yes", sv: "Ja" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    title: {
      fa: "اعداد",
      en: "Numbers",
      sv: "Siffror",
    },
    description: {
      fa: "یادگیری اعداد ۱ تا ۱۰ به فارسی.",
      en: "Learning numbers 1 to 10 in Persian.",
      sv: "Lär dig siffrorna 1 till 10 på persiska.",
    },
    questions: [
      {
        q: {
          fa: "عدد 3 به فارسی چیست؟",
          en: "What is the number 3 in Persian?",
          sv: "Vad är siffran 3 på persiska?",
        },
        choices: [
          { fa: "سه", en: "Se", sv: "Se" },
          { fa: "چهار", en: "Chahar", sv: "Chahar" },
          { fa: "دو", en: "Do", sv: "Do" },
        ],
        answer: 0,
      },
      {
        q: {
          fa: "عدد ۵ به فارسی چیست؟",
          en: "What is the number 5 in Persian?",
          sv: "Vad är siffran 5 på persiska?",
        },
        choices: [
          { fa: "نه", en: "Noh", sv: "Noh" },
          { fa: "پنج", en: "Panj", sv: "Panj" },
          { fa: "هشت", en: "Hasht", sv: "Hasht" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 3,
    title: {
      fa: "رنگ‌ها",
      en: "Colors",
      sv: "Färger",
    },
    description: {
      fa: "کلمات مربوط به رنگ‌های اصلی.",
      en: "Words for basic colors.",
      sv: "Ord för grundläggande färger.",
    },
    questions: [
      {
        q: {
          fa: "رنگ آبی به فارسی چیست؟",
          en: 'What is "blue" in Persian?',
          sv: 'Vad är "blå" på persiska?',
        },
        choices: [
          { fa: "آبی", en: "Abi", sv: "Abi" },
          { fa: "قرمز", en: "Ghermez", sv: "Ghermez" },
          { fa: "سبز", en: "Sabz", sv: "Sabz" },
        ],
        answer: 0,
      },
      {
        q: {
          fa: "رنگ قرمز به فارسی چیست؟",
          en: 'What is "red" in Persian?',
          sv: 'Vad är "röd" på persiska?',
        },
        choices: [
          { fa: "زرد", en: "Zard", sv: "Zard" },
          { fa: "قرمز", en: "Ghermez", sv: "Ghermez" },
          { fa: "آبی", en: "Abi", sv: "Abi" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 4,
    title: {
      fa: "روزهای هفته",
      en: "Days of the Week",
      sv: "Veckans dagar",
    },
    description: {
      fa: "نام روزهای هفته به فارسی.",
      en: "Names of the days of the week in Persian.",
      sv: "Namnen på veckans dagar på persiska.",
    },
    questions: [
      {
        q: {
          fa: "شنبه اولین روز هفته به فارسی است. درست یا غلط؟",
          en: 'Is "Shanbeh" the first day of the week in Persian? True or False?',
          sv: 'Är "Shanbeh" den första dagen i veckan på persiska? Sant eller falskt?',
        },
        choices: [
          { fa: "درست", en: "True", sv: "Sant" },
          { fa: "غلط", en: "False", sv: "Falskt" },
        ],
        answer: 0,
      },
      {
        q: {
          fa: "کدام یک روز سه‌شنبه است؟",
          en: "Which one is Tuesday?",
          sv: "Vilken dag är tisdag?",
        },
        choices: [
          { fa: "دوشنبه", en: "Doshanbeh", sv: "Doshanbeh" },
          { fa: "سه‌شنبه", en: "Seshanbeh", sv: "Seshanbeh" },
          { fa: "چهارشنبه", en: "Chaharshanbeh", sv: "Chaharshanbeh" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 5,
    title: {
      fa: "میوه‌ها",
      en: "Fruits",
      sv: "Frukter",
    },
    description: {
      fa: "نام میوه‌های رایج به فارسی.",
      en: "Names of common fruits in Persian.",
      sv: "Namn på vanliga frukter på persiska.",
    },
    questions: [
      {
        q: {
          fa: "سیب به انگلیسی چیست؟",
          en: 'What is "Sib" in English?',
          sv: 'Vad är "Sib" på engelska?',
        },
        choices: [
          { fa: "Apple", en: "Apple", sv: "Äpple" },
          { fa: "Banana", en: "Banana", sv: "Banan" },
          { fa: "Orange", en: "Orange", sv: "Apelsin" },
        ],
        answer: 0,
      },
      {
        q: {
          fa: 'کدام یک معنی "Banana" است؟',
          en: 'Which one means "Banana"?',
          sv: 'Vilken betyder "Banan"?',
        },
        choices: [
          { fa: "سیب", en: "Sib", sv: "Sib" },
          { fa: "پرتقال", en: "Porteghal", sv: "Porteghal" },
          { fa: "موز", en: "Mooz", sv: "Mooz" },
        ],
        answer: 2,
      },
    ],
  },
  {
    id: 6,
    title: {
      fa: "اعضای خانواده",
      en: "Family Members",
      sv: "Familjemedlemmar",
    },
    description: {
      fa: "نام اعضای خانواده به فارسی.",
      en: "Names of family members in Persian.",
      sv: "Namn på familjemedlemmar på persiska.",
    },
    questions: [
      {
        q: {
          fa: "پدر به انگلیسی چیست؟",
          en: 'What is "Pedar" in English?',
          sv: 'Vad är "Pedar" på engelska?',
        },
        choices: [
          { fa: "Father", en: "Father", sv: "Far" },
          { fa: "Mother", en: "Mother", sv: "Mor" },
          { fa: "Brother", en: "Brother", sv: "Bror" },
        ],
        answer: 0,
      },
      {
        q: {
          fa: 'کدام یک معنی "Mother" است؟',
          en: 'Which one means "Mother"?',
          sv: 'Vilken betyder "Mor"?',
        },
        choices: [
          { fa: "پدر", en: "Pedar", sv: "Pedar" },
          { fa: "مادر", en: "Madar", sv: "Madar" },
          { fa: "خواهر", en: "Khahar", sv: "Khahar" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 7,
    title: {
      fa: "حیوانات",
      en: "Animals",
      sv: "Djur",
    },
    description: {
      fa: "نام حیوانات معمولی به فارسی.",
      en: "Names of common animals in Persian.",
      sv: "Namn på vanliga djur på persiska.",
    },
    questions: [
      {
        q: {
          fa: "سگ به انگلیسی چیست؟",
          en: 'What is "Sag" in English?',
          sv: 'Vad är "Sag" på engelska?',
        },
        choices: [
          { fa: "Dog", en: "Dog", sv: "Hund" },
          { fa: "Cat", en: "Cat", sv: "Katt" },
          { fa: "Bird", en: "Bird", sv: "Fågel" },
        ],
        answer: 0,
      },
      {
        q: {
          fa: 'کدام یک معنی "Cat" است؟',
          en: 'Which one means "Cat"?',
          sv: 'Vilken betyder "Katt"?',
        },
        choices: [
          { fa: "سگ", en: "Sag", sv: "Sag" },
          { fa: "گربه", en: "Gorbeh", sv: "Gorbeh" },
          { fa: "اسب", en: "Asb", sv: "Asb" },
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 8,
    title: {
      fa: "ضمیرها",
      en: "Pronouns",
      sv: "Pronomen",
    },
    description: {
      fa: "ضمیرهای پایه در فارسی.",
      en: "Basic pronouns in Persian.",
      sv: "Grundläggande pronomen på persiska.",
    },
    questions: [
      {
        q: {
          fa: '"من" به انگلیسی چیست؟',
          en: 'What is "man" in English?',
          sv: 'Vad är "man" på engelska?',
        },
        choices: [
          { fa: "I", en: "I", sv: "Jag" },
          { fa: "You", en: "You", sv: "Du" },
          { fa: "He", en: "He", sv: "Han" },
        ],
        answer: 0,
      },
      {
        q: {
          fa: '"او" به انگلیسی چیست؟',
          en: 'What is "ou" in English?',
          sv: 'Vad är "ou" på engelska?',
        },
        choices: [
          { fa: "We", en: "We", sv: "Vi" },
          { fa: "They", en: "They", sv: "De" },
          { fa: "He/She", en: "He/She", sv: "Han/Hon" },
        ],
        answer: 2,
      },
    ],
  },
];

export default function Lessons() {
  const [activeLesson, setActiveLesson] = useState(null);
  const { t, lang } = useLang();
  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const align = isRTL ? "text-right" : "text-left";

  return (
    <section dir={dir} className={`pb-12 ` + align}>
      <h2 className="text-2xl font-bold mb-2 text-fuchsia-700">{t.lessons}</h2>
      {!activeLesson ? (
        <div className="grid gap-4">
          {LESSONS.map((lesson) => (
            <LessonCard
              key={lesson.id}
              title={lesson.title[lang]}
              description={lesson.description[lang]}
              onStart={() => setActiveLesson(lesson)}
            />
          ))}
        </div>
      ) : (
        <QuestionCard
          lesson={activeLesson}
          lang={lang}
          t={t}
          onBack={() => setActiveLesson(null)}
        />
      )}
    </section>
  );
}
