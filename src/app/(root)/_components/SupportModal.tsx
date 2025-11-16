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

const SupportModal = (props: PropsType) => {
    const [isClosing, setIsClosing] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            props.setShowSopportModal(false)
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

            const data = await res.json()
            const aiMessage: Message = { sender: "ai", text: data.answer }
            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            const errorMessage: Message = {
                sender: "ai",
                text: "Sorry, something went wrong."
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <div
            className={`z-[1000] flex flex-col rounded-lg border border-gray-300 bg-gray-200 fixed right-0 bottom-0 md:right-60 md:bottom-4 w-full h-full md:w-[360px] md:h-[600px]
                       ${isClosing ? "animate-closeModal" : "animate-openModal"}
                    `}
        >
            {/* Header */}
            <div className="w-full flex px-5 py-1.5 rounded-none md:rounded-t-lg bg-light-200 select-none">
                <div className="flex items-center gap-2 w-full">
                    <Image
                        src={imagesAddresses.icons.support}
                        width={40}
                        height={40}
                        alt="Support"
                    />
                    <div className="flex flex-col">
                        <p className="text-base font-semibold leading-8">Library Support</p>
                        {isTyping && <p className="text-xs font-normal leading-6">Typing...</p>}
                    </div>
                </div>
                <Image
                    src={imagesAddresses.icons.modalClose}
                    width={24}
                    height={24}
                    alt="close"
                    className="cursor-pointer"
                    onClick={handleClose}
                />
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                <p>How can we help you?</p>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[70%] p-2 rounded-lg ${msg.sender === "user"
                                ? "bg-blue-500 text-white rounded-br-none"
                                : "bg-gray-300 text-gray-900 rounded-bl-none"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/*send area */}
            <div className="flex items-center px-4 py-2 border-t border-gray-300 bg-gray-100">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    placeholder="Type your question..."
                    className="flex-1 px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={handleSend}
                    className="ml-2 px-4 py-2 bg-light-200 rounded-lg cursor-pointer hover:bg-[#E6C499]"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default SupportModal