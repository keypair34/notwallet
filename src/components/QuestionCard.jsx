import React, { useState } from "react";

export default function QuestionCard({ lesson, lang, t, onBack }) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [animateBtn, setAnimateBtn] = useState(-1);

  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const align = isRTL ? "text-right" : "text-left";

  const question = lesson.questions[step];

  function handleChoice(idx) {
    setAnimateBtn(idx);
    setTimeout(() => setAnimateBtn(-1), 200);
    const correct = idx === question.answer;
    setResult(correct);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setResult(null);
      if (step < lesson.questions.length - 1) {
        setStep((s) => s + 1);
      }
    }, 950);
  }

  return (
    <div
      dir={dir}
      className={`bg-white/80 rounded-xl shadow-lg p-6 mb-4 flex flex-col gap-3 ${align}`}
    >
      <div className="flex items-center justify-between mb-2">
        <button className="text-fuchsia-600 hover:underline" onClick={onBack}>
          {t.back}
        </button>
        <div className="text-slate-400 text-xs">
          {lesson.title[lang]} • {t.question} {step + 1} {t.of}{" "}
          {lesson.questions.length}
        </div>
      </div>
      <div className="font-bold text-lg text-fuchsia-800 mb-2">
        {question.q[lang]}
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {question.choices.map((choice, idx) => (
          <button
            key={idx}
            className={`border px-4 py-2 rounded-lg transition-all duration-200 ${align} text-slate-700
              ${animateBtn === idx ? "wiggle" : ""}
              ${showResult && idx === question.answer ? "bg-green-200 border-green-400 font-bold" : ""}
              ${showResult && idx !== question.answer && idx === animateBtn ? "bg-red-200 border-red-400" : ""}
              hover:bg-fuchsia-100
            `}
            disabled={showResult}
            onClick={() => handleChoice(idx)}
          >
            {choice[lang]}
          </button>
        ))}
      </div>
      {showResult && (
        <div
          className={`mt-4 font-semibold text-lg transition-all
          ${result ? "text-green-700" : "text-red-600"}`}
        >
          {result ? t.correct : t.incorrect}
        </div>
      )}
      {!showResult &&
        step === lesson.questions.length - 1 &&
        result === null && (
          <div className="mt-6 text-slate-400 text-sm">{t.afterChoice}</div>
        )}
      {step === lesson.questions.length - 1 && showResult && (
        <div className="mt-6 text-center">
          <span className="inline-block bg-fuchsia-200 text-fuchsia-900 px-4 py-2 rounded-xl animate-bounce shadow">
            {t.lessonCompleted}
          </span>
        </div>
      )}
    </div>
  );
}
