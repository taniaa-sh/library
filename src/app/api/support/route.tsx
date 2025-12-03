import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

const ipRequestCounts = new Map();
const RATE_LIMIT = 10;
const WINDOW_TIME = 60 * 1000;

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const currentTime = Date.now();
    const userData = ipRequestCounts.get(ip);

    if (userData) {
        if (currentTime - userData.timestamp < WINDOW_TIME) {
            if (userData.count >= RATE_LIMIT) {
                return NextResponse.json(
                    { message: "Too many requests. Please try again later." },
                    { status: 429 }
                );
            } else {
                userData.count += 1;
                ipRequestCounts.set(ip, userData);
            }
        } else {
            ipRequestCounts.set(ip, { count: 1, timestamp: currentTime });
        }
    } else {
        ipRequestCounts.set(ip, { count: 1, timestamp: currentTime });
    }

    const { message } = await req.json();

    const keywords = [
        "library", "book", "books", "catalog", "borrow", "return",
        "membership", "opening hours", "lending", "services",
        "library card", "ebooks", "audiobooks", "events", "reading room"
    ];

    const isAboutLibrary = keywords.some(keyword =>
        message.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!isAboutLibrary) {
        return NextResponse.json({
            answer: "I can only answer questions about this library."
        });
    }

    const libraryInfo = `
    Welcome to City Central Library! 
    - 50,000+ books across multiple genres.
    - Borrow up to 5 books for 2 weeks.
    - Late returns: small fee.
    - eBooks and audiobooks available.
    - Open 8 AM – 8 PM (Mon–Sat).
    - Weekly events & workshops.
    - Free membership registration.
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-3-8b-instruct",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful library assistant. 
                              Only answer questions about this library.
                              --- INFO ---
                              ${libraryInfo}
                              --- END INFO ---`
                },
                { role: "user", content: message }
            ],
            max_tokens: 300,
        });

        const answer = completion.choices[0].message?.content ?? "No response.";

        return NextResponse.json({ answer });

    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json(
            { answer: "❌ OpenAI API Error: Could not generate a response." },
            { status: 500 }
        );
    }
}
