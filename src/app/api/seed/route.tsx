import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("library");
    const books = [
      {
        bookTitle: "The Great Reclamation: A Novel",
        author: "Rachel Heng",
        genre: "Fantasy",
        dateCreated: "Dec 19 2023",
      },
      {
        bookTitle: "Inside Evil: Book 1",
        author: "Rachel Heng",
        genre: "Thriller, Mystery",
        dateCreated: "Jan 5 2024",
        action: '',
      },
      {
        bookTitle: "Jayne Castle - People in Glass Houses",
        author: "Jayne Castle",
        genre: "Adventure",
        dateCreated: "Mar 2 2024",
        action: '',
      },
      {
        bookTitle: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Psychological Thriller",
        dateCreated: "Feb 15 2024",
        action: '',
      },
    ];

    await db.collection("books").deleteMany({});
    await db.collection("books").insertMany(books);

    return NextResponse.json({ message: "Sample books inserted successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to insert sample data" }, { status: 500 });
  }
}
