"use client";

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface PropsType {
    setShowSopportModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Message {
    sender: "user" | "ai";
    text: string;
}

const SupportModal = ({ setShowSopportModal }: PropsType) => {
    const [isClosing, setIsClosing] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: "ai",
            text: "Hi! I'm Library Support. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        if (isClosing) return;

        setIsClosing(true);

        setTimeout(() => {
            setShowSopportModal(false);
            setIsClosing(false);
        }, 400);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, isTyping]);

    const handleSend = async () => {
        const message = input.trim();

        if (!message || isTyping || isClosing) return;

        setMessages((prev) => [...prev, { sender: "user", text: message }]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (!res.ok) {
                throw new Error("Failed to get support response");
            }

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text:
                        typeof data.answer === "string" && data.answer.trim()
                            ? data.answer
                            : "I couldn't find an answer right now. Please try again.",
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Something went wrong. Please try again in a moment.",
                },
            ]);
        } finally {
            setIsTyping(false);
            inputRef.current?.focus();
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={handleClose}
                aria-hidden="true"
                className={`fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"
                    }`}
            />

            {/* Chat window */}
            <section
                role="dialog"
                aria-modal="true"
                aria-label="Library Support Chat"
                onClick={(e) => e.stopPropagation()}
                className={`fixed left-0 top-0 z-[1004] flex h-[100dvh] w-full flex-col overflow-hidden rounded-none border border-[#E7C9A5]/20 bg-[#0D0D0C] text-white shadow-[0_24px_80px_rgba(0,0,0,0.3)] transition-colors duration-500 dark:border-[#B88A4B]/30 dark:bg-[#F8F2E6] dark:text-[#17130F] md:bottom-5 md:left-auto md:right-6 md:top-auto md:h-[min(650px,calc(100dvh-40px))] md:w-[390px] md:rounded-[28px] ${isClosing ? "animate-closeModal" : "animate-openModal"
                    }`}
            >
                {/* Decorative background */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(231,201,165,0.12),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_90%_10%,rgba(184,138,75,0.15),transparent_45%)]" />

                    <div className="absolute -right-20 -top-24 size-60 rounded-full bg-[#E7C9A5]/[0.07] blur-[70px] dark:bg-[#B88A4B]/10" />

                    <div className="absolute -bottom-24 -left-20 size-56 rounded-full bg-[#A87938]/10 blur-[80px] dark:bg-[#E7C9A5]/30" />

                    <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(231,201,165,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(231,201,165,0.6)_1px,transparent_1px)] [background-size:30px_30px] dark:opacity-[0.04]" />
                </div>

                {/* Header */}
                <header className="relative z-10 shrink-0 border-b border-[#E7C9A5]/30 bg-[#0D0D0C]/95 px-5 py-4 backdrop-blur-xl dark:border-[#B88A4B]/30 dark:bg-[#F8F2E6]/95">
                    <div className="flex items-center gap-3">
                        <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#E7C9A5]/40 bg-[#E7C9A5]/10 dark:border-[#B88A4B]/40 dark:bg-[#B88A4B]/10">
                            <Image
                                src={imagesAddresses.icons.supportIconWhite}
                                width={30}
                                height={30}
                                alt=""
                                className="dark:hidden"
                            />

                            <Image
                                src={imagesAddresses.icons.support}
                                width={30}
                                height={30}
                                alt=""
                                className="hidden dark:block"
                            />

                            <span className="absolute -bottom-1 -right-1 size-3.5 rounded-full border-[3px] border-[#0D0D0C] bg-emerald-500 dark:border-[#F8F2E6]" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="text-base font-bold tracking-tight text-white dark:text-[#17130F]">
                                Library Support
                            </h2>

                            <div className="mt-1 flex items-center gap-1.5">
                                <span className="size-1.5 rounded-full bg-emerald-500" />

                                <p className="text-xs text-stone-400 dark:text-[#75634E]">
                                    {isTyping
                                        ? "Finding an answer..."
                                        : "Here to help you"}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleClose}
                            aria-label="Close support chat"
                            className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#E7C9A5]/30 bg-white/[0.03] transition hover:rotate-90 hover:border-[#E7C9A5] hover:bg-[#E7C9A5]/10 dark:border-[#B88A4B]/30 dark:bg-white/50 dark:hover:border-[#B88A4B] dark:hover:bg-[#B88A4B]/15"
                        >
                            <Image
                                src={imagesAddresses.icons.modalCloseWhite}
                                width={17}
                                height={17}
                                alt=""
                                className="dark:hidden"
                            />

                            <Image
                                src={imagesAddresses.icons.modalClose}
                                width={17}
                                height={17}
                                alt=""
                                className="hidden dark:block"
                            />
                        </button>
                    </div>
                </header>

                {/* Welcome banner */}
                <div className="relative z-10 shrink-0 px-4 pt-4">
                    <div className="relative overflow-hidden rounded-2xl border border-[#E7C9A5]/30 bg-gradient-to-br from-[#1C1A16] via-[#141311] to-[#242016] p-4 dark:border-[#B88A4B]/30 dark:from-[#F0E3D0] dark:via-[#F8F2E6] dark:to-[#EDE0CB]">
                        <div
                            aria-hidden="true"
                            className="absolute -right-5 -top-8 size-24 rounded-full bg-[#E7C9A5]/10 blur-2xl dark:bg-[#B88A4B]/15"
                        />

                        <div className="relative flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#E7C9A5]/10 text-lg text-[#E7C9A5] dark:bg-[#B88A4B]/15 dark:text-[#A87938]">
                                ✦
                            </div>

                            <div>
                                <p className="text-sm font-bold text-white dark:text-[#17130F]">
                                    Your reading companion
                                </p>

                                <p className="mt-1 text-xs leading-5 text-stone-400 dark:text-[#75634E]">
                                    Need help finding a book or using the
                                    library? Just ask away.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div
                    aria-live="polite"
                    aria-relevant="additions"
                    className="relative z-10 flex-1 space-y-5 overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(231,201,165,0.07),transparent_60%)] px-4 py-5 dark:bg-[radial-gradient(ellipse_at_top,rgba(184,138,75,0.12),transparent_60%)]"
                >
                    <div className="flex justify-center">
                        <span className="rounded-full border border-[#E7C9A5]/30 bg-white/[0.03] px-3 py-1 text-[10px] font-medium tracking-wide text-stone-400 dark:border-[#B88A4B]/30 dark:bg-white/60 dark:text-[#75634E]">
                            YOUR LIBRARY ASSISTANT
                        </span>
                    </div>

                    {messages.map((msg, idx) => {
                        const isUser = msg.sender === "user";

                        return (
                            <div
                                key={idx}
                                className={`flex items-end gap-2.5 ${isUser ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {!isUser && (
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-[#E7C9A5]/30 bg-[#E7C9A5]/10 dark:border-[#B88A4B]/30 dark:bg-[#B88A4B]/10">
                                        <Image
                                            src={imagesAddresses.icons.supportIconWhite}
                                            width={21}
                                            height={21}
                                            alt=""
                                            className="dark:hidden"
                                        />

                                        <Image
                                            src={imagesAddresses.icons.support}
                                            width={21}
                                            height={21}
                                            alt=""
                                            className="hidden dark:block"
                                        />
                                    </div>
                                )}

                                <div
                                    className={`flex max-w-[82%] flex-col ${isUser ? "items-end" : "items-start"
                                        }`}
                                >
                                    <span className="mb-1.5 px-1 text-[10px] font-medium text-stone-400 dark:text-[#75634E]">
                                        {isUser ? "You" : "Library Support"}
                                    </span>

                                    <div
                                        className={`whitespace-pre-wrap break-words rounded-2xl px-3.5 py-3 text-[13px] leading-6 shadow-sm ${isUser
                                                ? "rounded-br-md bg-gradient-to-br from-[#D9B17C] to-[#A87938] text-white shadow-[#B88A4B]/10"
                                                : "rounded-bl-md border border-[#E7C9A5]/20 bg-[#191815] text-stone-200 dark:border-[#B88A4B]/25 dark:bg-white dark:text-[#594B3B]"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex items-end gap-2.5">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-[#E7C9A5]/30 bg-[#E7C9A5]/10 dark:border-[#B88A4B]/30 dark:bg-[#B88A4B]/10">
                                <Image
                                    src={imagesAddresses.icons.supportIconWhite}

                                    width={21}
                                    height={21}
                                    alt=""
                                    className="dark:hidden"
                                />

                                <Image
                                    src={imagesAddresses.icons.support}
                                    width={21}
                                    height={21}
                                    alt=""
                                    className="hidden dark:block"
                                />
                            </div>

                            <div className="rounded-2xl rounded-bl-md border border-[#E7C9A5]/20 bg-[#191815] px-4 py-3.5 dark:border-[#B88A4B]/25 dark:bg-white">
                                <div className="flex items-center gap-1.5">
                                    {[0, 1, 2].map((dot) => (
                                        <span
                                            key={dot}
                                            className="size-1.5 animate-bounce rounded-full bg-[#B88A4B] dark:bg-[#A87938]"
                                            style={{
                                                animationDelay: `${dot * 150}ms`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <footer className="relative z-10 shrink-0 border-t border-[#E7C9A5]/30 bg-[#0D0D0C]/95 p-4 backdrop-blur-xl dark:border-[#B88A4B]/30 dark:bg-[#F8F2E6]/95">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            void handleSend();
                        }}
                        className="flex items-center gap-2 rounded-2xl border border-[#E7C9A5]/40 bg-white/[0.03] p-1.5 transition focus-within:border-[#E7C9A5] focus-within:ring-4 focus-within:ring-[#E7C9A5]/10 dark:border-[#B88A4B]/35 dark:bg-white focus-within:dark:border-[#B88A4B] focus-within:dark:ring-[#B88A4B]/10"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask us anything..."
                            aria-label="Your message"
                            autoComplete="off"
                            disabled={isTyping}
                            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-stone-500 disabled:opacity-60 dark:text-[#17130F] dark:placeholder:text-[#897965]"
                        />

                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            aria-label="Send message"
                            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D9B17C] to-[#A87938] text-white shadow-md shadow-[#B88A4B]/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B88A4B]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                        >
                            <Image
                                src={imagesAddresses.icons.plain}
                                width={21}
                                height={21}
                                alt=""
                                className="brightness-0 invert"
                            />
                        </button>
                    </form>

                    <p className="mt-3 text-center text-[10px] text-stone-500 dark:text-[#75634E]">
                        Made for readers, one question at a time.
                    </p>
                </footer>

                {/* Bottom accent line */}
                <div
                    aria-hidden="true"
                    className="relative z-10 h-px w-full shrink-0 bg-gradient-to-r from-transparent via-[#E7C9A5]/80 to-transparent dark:via-[#B88A4B]/70"
                />
            </section>
        </>
    );
};

export default SupportModal;