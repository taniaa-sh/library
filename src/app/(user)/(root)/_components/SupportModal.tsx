"use client"

import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

interface PropsType {
    setShowSopportModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface Message {
    sender: "user" | "ai"
    text: string
}

const SupportModal = ({ setShowSopportModal }: PropsType) => {
    const [isClosing, setIsClosing] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: "ai",
            text: "Hi! I'm Library Support. How can I help you today?"
        }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setShowSopportModal(false)
            setIsClosing(false)
        }, 500)
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = { sender: "user", text: input }
        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsTyping(true)

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input })
            })
            console.log("RES STATUS:", res.status)

            const data = await res.json()
            console.log("API RESPONSE:", data)
            const aiMessage: Message = { sender: "ai", text: data.answer }
            setMessages(prev => [...prev, aiMessage])
        } catch {
            setMessages(prev => [
                ...prev,
                { sender: "ai", text: "❌ Sorry, something went wrong." }
            ])
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <div
            className={`z-[1001] flex flex-col rounded-lg border border-gray-300 dark:border-gray-500 bg-gray-50 fixed left-20 bottom-10 
                        md:right-20 md:bottom-4 w-full h-full md:w-[360px] md:h-[600px]
                        shadow-xl custom-scrollbar1
                        ${isClosing ? "animate-closeModal" : "animate-openModal"}`}
        >

            {/* Header */}
            <div className="w-full flex px-5 py-2 rounded-none md:rounded-t-lg bg-gold100 dark:bg-gold600 select-none shadow-sm">
                <div className="flex items-center gap-2 w-full">
                    <Image
                        src={imagesAddresses.icons.support}
                        width={40}
                        height={40}
                        alt="Support"
                        className="dark:hidden"
                    />
                    <Image
                        src={imagesAddresses.icons.supportIconWhite}
                        width={40}
                        height={40}
                        alt="Support"
                        className="hidden dark:block"
                    />
                    <div className="flex flex-col">
                        <p className="text-base font-semibold leading-8 dark:text-white">Library Support</p>
                        {isTyping && (
                            <p className="text-xs font-normal text-gray-600 dark:text-white leading-6">
                                Typing...
                            </p>
                        )}
                    </div>
                </div>
                <Image
                    src={imagesAddresses.icons.modalClose}
                    width={22}
                    height={22}
                    alt="close"
                    className="cursor-pointer hover:scale-105 transition dark:hidden"
                    onClick={handleClose}
                />
                <Image
                    src={imagesAddresses.icons.modalCloseWhite}
                    width={22}
                    height={22}
                    alt="close"
                    className="cursor-pointer hover:scale-105 transition hidden dark:block"
                    onClick={handleClose}
                />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 dark:bg-[url('/images/supportBackGround.png')] bg-[url('/images/supportBackGroundDark.png')] bg-center bg-cover">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[75%] p-2 rounded-xl text-sm leading-6 shadow-sm
                                        ${msg.sender === "user"
                                    ? "bg-gold400 text-white rounded-br-none"
                                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                <div ref={messagesEndRef} />
            </div>

            {/* Input section */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-300 bg-gold100 dark:bg-gold600">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    placeholder="Type your question..."
                    className="flex-1 px-3 py-2 border border-gray-400 rounded-lg 
                              focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:text-gray-700"
                />

                <button
                    onClick={handleSend}
                    className="px-2 py-2 rounded-full bg-gold200 hover:bg-gold100 dark:bg-gold200 dark:hover:bg-gold200 dark:text-gray-900
                               transition shadow cursor-pointer"
                >
                    <Image
                        src={imagesAddresses.icons.plain}
                        width={22}
                        height={22}
                        alt="send"
                        className="dark:hidden"
                    />
                    <Image
                        src={imagesAddresses.icons.plainWhite}
                        width={22}
                        height={22}
                        alt="send"
                        className="hidden dark:block"
                    />
                </button>
            </div>
        </div>
    )
}

export default SupportModal
