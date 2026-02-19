"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData, FAQItem } from "@/lib/faq-data";

interface ContactButtonProps {
  className?: string;
  lang?: string;
}

interface ChatEntry {
  id: string;
  question: FAQItem;
  answered: boolean;
}

export function ContactButton({ className, lang = "en" }: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState<ChatEntry[]>([]);
  const [answering, setAnswering] = useState<string | null>(null); // id of question being "typed"
  const bottomRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === "ar";

  // Reset chat on close
  useEffect(() => {
    if (!isOpen) {
      setChat([]);
      setAnswering(null);
    }
  }, [isOpen]);

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, answering]);

  const handleQuestionClick = (item: FAQItem) => {
    // Prevent clicking the same question twice while answering
    if (answering) return;

    const entryId = `${item.id}-${Date.now()}`;
    // Add question bubble immediately
    setChat((prev) => [
      ...prev,
      { id: entryId, question: item, answered: false },
    ]);
    setAnswering(entryId);

    // Simulate bot typing delay then reveal answer
    setTimeout(() => {
      setChat((prev) =>
        prev.map((e) => (e.id === entryId ? { ...e, answered: true } : e)),
      );
      setAnswering(null);
    }, 700);
  };

  return (
    <>
      <button
        className={`flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform duration-300 w-[52px] h-[52px] relative z-50 overflow-hidden ${className}`}
        aria-label={isRtl ? "مساعد الدردشة" : "Chat Assistant"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image
          src="/icons/chat.svg"
          alt="Chatbot"
          width={52}
          height={52}
          className="object-contain"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            dir={isRtl ? "rtl" : "ltr"}
            className={`fixed bottom-12 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[80vh]  rounded-2xl  z-100 flex flex-col font-sans border border-gray-100/50 ${
              isRtl ? "left-1 sm:left-20" : "right-1 sm:right-20"
            }`}
            style={{ boxShadow: "0 10px 40px -10px rgba(0,0,0,0.25)" }}
          >
            {/* ── Header ── */}
            <div
              className="text-white p-4 rounded-t-2xl flex items-center justify-between shrink-0 relative overflow-hidden"
              style={{
                background: "linear-gradient(to right, #008DC3, #004268)",
              }}
            >
              <div
                className={`absolute -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none ${isRtl ? "-left-10" : "-right-10"}`}
              />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">
                    {isRtl ? "الأسئلة الشائعة" : "FAQ Chat"}
                  </h3>
                  <p className="text-xs text-white/80">
                    {isRtl
                      ? "اختر سؤالاً للحصول على إجابة"
                      : "Tap a question for an answer"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Chat Thread ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {/* Welcome bubble */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <div
                  className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(to right, #008DC3, #004268)",
                  }}
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div
                  className={`max-w-[80%] bg-white rounded-2xl ${isRtl ? "rounded-br-none" : "rounded-bl-none"} px-4 py-2.5 shadow-sm border border-gray-100 text-sm text-gray-700 leading-relaxed`}
                >
                  {isRtl
                    ? "مرحباً! اختر أحد الأسئلة أدناه وسأجيبك فوراً."
                    : "Hello! Pick a question below and I'll answer right away."}
                </div>
              </motion.div>

              {/* Answered Q&A pairs */}
              {chat.map((entry) => (
                <div key={entry.id} className="space-y-3">
                  {/* User question bubble */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isRtl ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${isRtl ? "rounded-bl-none" : "rounded-br-none"} text-sm text-white font-medium leading-relaxed`}
                      style={{
                        background:
                          "linear-gradient(to right, #008DC3, #004268)",
                      }}
                    >
                      {isRtl
                        ? entry.question.question.ar
                        : entry.question.question.en}
                    </div>
                  </motion.div>

                  {/* Bot answer bubble or typing indicator */}
                  <AnimatePresence>
                    {answering === entry.id ? (
                      /* Typing dots */
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-end gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(to right, #008DC3, #004268)",
                          }}
                        >
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <div
                          className={`bg-white rounded-2xl ${isRtl ? "rounded-br-none" : "rounded-bl-none"} px-4 py-3 shadow-sm border border-gray-100 flex gap-1 items-center`}
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-[#008DC3]"
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.6,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ) : entry.answered ? (
                      /* Answer bubble */
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-end gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(to right, #008DC3, #004268)",
                          }}
                        >
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <div
                          className={`max-w-[80%] bg-white rounded-2xl ${isRtl ? "rounded-br-none" : "rounded-bl-none"} px-4 py-2.5 shadow-sm border border-gray-100 text-sm text-gray-700 leading-relaxed whitespace-pre-line`}
                        >
                          {isRtl
                            ? entry.question.answer.ar
                            : entry.question.answer.en}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ))}

              <div ref={bottomRef} />
            </div>

            {/* ── FAQ Question Buttons ── */}
            <div className="p-3 bg-white border-t rounded-b-2xl border-gray-100 max-h-[220px] overflow-y-auto shrink-0">
              <p className="text-[10px] font-semibold text-gray-400 mb-2 px-1 uppercase tracking-wider">
                {isRtl ? "اختر سؤالاً" : "Choose a question"}
              </p>
              <div className="space-y-1.5">
                {faqData.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleQuestionClick(item)}
                    disabled={!!answering}
                    className="w-full text-start px-3 py-2 rounded-xl text-sm font-medium text-[#004268] bg-gray-50 hover:bg-[#008DC3]/8 border border-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRtl ? item.question.ar : item.question.en}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
