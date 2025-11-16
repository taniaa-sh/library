import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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
    - Our library has over 50,000 books, including fiction, non-fiction, and reference books.
    - Members can borrow up to 5 books for 2 weeks. Late returns incur a small fee.
    - We offer eBooks and audiobooks through our digital library platform.
    - The library is open from 8 AM to 8 PM, Monday to Saturday.
    - We host weekly events, reading rooms, and workshops for children and adults.
    - Library membership is free; you can sign up online or at the desk.
    - Our staff can assist with catalog searches, research help, and book recommendations.
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `You are a helpful library assistant who only answers questions based on the following information about City Central Library. 
                          Do not answer unrelated questions. Never make up information.
                          --- START OF LIBRARY INFO ---
                          ${libraryInfo}
                          --- END OF LIBRARY INFO ---`
            },
            { role: "user", content: message }
        ],
        max_tokens: 300,
    });

    const answer = response.choices[0].message?.content;

    return NextResponse.json({ answer });
}
