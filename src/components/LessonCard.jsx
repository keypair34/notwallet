import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useLang } from "../LanguageContext";

export default function LessonCard({ title, description, onStart }) {
  const { t, lang } = useLang();
  const isRTL = lang === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const align = isRTL ? "text-right" : "text-left";
  return (
    <div
      dir={dir}
      className={`bg-white shadow rounded-xl p-6 flex flex-col gap-2 border hover:scale-105 transition-transform duration-200 ${align}`}
    >
      <h3 className="font-bold text-lg text-fuchsia-700">{title}</h3>
      <p className="text-slate-600">{description}</p>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            className="mt-2 self-end bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-4 py-1.5 rounded-lg font-medium transition-all focus:ring-2 focus:ring-fuchsia-300"
            onClick={onStart}
          >
            {t.startLesson}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content className="text-xs bg-white border px-2 py-1 rounded shadow">
          {t.startThisLesson}
        </Tooltip.Content>
      </Tooltip.Root>
    </div>
  );
}
