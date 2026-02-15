"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type QuestionType = "rating" | "radio" | "text";

type Question = {
    id: string;
    type: QuestionType;
    questionKey: string;
    options?: string[];
};

const QUESTIONS: Question[] = [
    { id: "q1", type: "rating", questionKey: "q1" },
    { id: "q2", type: "radio", questionKey: "q2", options: ["q2_opt1", "q2_opt2", "q2_opt3", "q2_opt4"] },
    { id: "q3", type: "rating", questionKey: "q3" },
    { id: "q4", type: "radio", questionKey: "q4", options: ["q4_opt1", "q4_opt2", "q4_opt3"] },
    { id: "q5", type: "text", questionKey: "q5" },
];

export default function OnlineQuestionnaire() {
    const t = useTranslations("questionnaire");
    const [answers, setAnswers] = useState<Record<string, string | number>>({});
    const [submitted, setSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const setAnswer = (id: string, value: string | number) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-2xl rounded-2xl border-2 border-[#E8DDB8] bg-gradient-to-b from-[#FFFEF7] to-white p-10 text-center shadow-xl"
            >
                <motion.span
                    className="inline-block text-6xl"
                    animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                >
                    🎉
                </motion.span>
                <h3 className="mt-4 text-2xl font-bold text-[#1a1510]">{t("thanks_title")}</h3>
                <p className="mt-2 text-[#5c4a3a]">{t("thanks_text")}</p>
            </motion.div>
        );
    }

    const q = QUESTIONS[currentStep];
    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    return (
        <div className="mx-auto max-w-2xl">
            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-[#5c4a3a] mb-2">
                    <span>{t("step")} {currentStep + 1} / {QUESTIONS.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8DDB8]">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#e8b86d] to-[#F79A19] rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="rounded-2xl border-2 border-[#E8DDB8] bg-gradient-to-b from-[#FFFEF7] to-white p-8 shadow-lg"
            >
                <h3 className="text-lg font-bold text-[#1a1510]">{t(q.questionKey)}</h3>

                <div className="mt-6">
                    {q.type === "rating" && (
                        <div className="flex gap-2 justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setAnswer(q.id, star)}
                                    className="transition-transform hover:scale-125"
                                >
                                    <svg
                                        className={`h-10 w-10 ${(answers[q.id] as number) >= star ? "text-[#F79A19]" : "text-[#E8DDB8]"
                                            } transition-colors`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    )}

                    {q.type === "radio" && q.options && (
                        <div className="space-y-3">
                            {q.options.map((opt) => (
                                <label
                                    key={opt}
                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-5 py-3 transition-all ${answers[q.id] === opt
                                            ? "border-[#e8b86d] bg-[#FFF8E1]"
                                            : "border-[#E8DDB8] hover:border-[#e8b86d]/50"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={opt}
                                        checked={answers[q.id] === opt}
                                        onChange={() => setAnswer(q.id, opt)}
                                        className="sr-only"
                                    />
                                    <span
                                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${answers[q.id] === opt ? "border-[#e8b86d] bg-[#e8b86d]" : "border-[#E8DDB8]"
                                            }`}
                                    >
                                        {answers[q.id] === opt && <span className="h-2 w-2 rounded-full bg-white" />}
                                    </span>
                                    <span className="text-sm text-[#1a1510]">{t(opt)}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {q.type === "text" && (
                        <textarea
                            value={(answers[q.id] as string) || ""}
                            onChange={(e) => setAnswer(q.id, e.target.value)}
                            placeholder={t("text_placeholder")}
                            rows={4}
                            className="w-full rounded-xl border-2 border-[#E8DDB8] bg-[#FFFEF7] px-4 py-3 text-sm text-[#1a1510] placeholder-[#5c4a3a]/40 outline-none focus:border-[#e8b86d] focus:ring-2 focus:ring-[#e8b86d]/30"
                        />
                    )}
                </div>

                <div className="mt-8 flex justify-between">
                    <button
                        type="button"
                        onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                        disabled={currentStep === 0}
                        className="rounded-xl border border-[#E8DDB8] px-6 py-2.5 text-sm font-medium text-[#5c4a3a] hover:bg-[#F7E396]/20 disabled:opacity-30"
                    >
                        ← {t("prev")}
                    </button>
                    {currentStep < QUESTIONS.length - 1 ? (
                        <button
                            type="button"
                            onClick={() => setCurrentStep((s) => Math.min(QUESTIONS.length - 1, s + 1))}
                            className="rounded-xl bg-gradient-to-r from-[#e8b86d] to-[#F79A19] px-6 py-2.5 text-sm font-semibold text-[#1a1510] shadow-lg hover:shadow-xl"
                        >
                            {t("next")} →
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl"
                        >
                            {t("submit")} ✓
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
