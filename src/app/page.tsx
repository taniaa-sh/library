
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SiteUrls from "@/utils/routs";

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    cover: "from-[#E7C9A5] via-[#C9A477] to-[#59402A]",
    ink: "text-[#21180F]",
    symbol: "ATOMIC\nHABITS",
    mark: "01",
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    cover: "from-[#C78B4B] via-[#77452A] to-[#20130D]",
    ink: "text-[#FFF0CE]",
    symbol: "DUNE",
    mark: "02",
  },
  {
    id: 3,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fantasy",
    cover: "from-[#344B65] via-[#192C42] to-[#0A101B]",
    ink: "text-[#F0D9AC]",
    symbol: "THE\nMIDNIGHT\nLIBRARY",
    mark: "03",
  },
  {
    id: 4,
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Sci-Fi",
    cover: "from-[#6D6557] via-[#292820] to-[#10100E]",
    ink: "text-[#F6E7CD]",
    symbol: "PROJECT\nHAIL MARY",
    mark: "04",
  },
  {
    id: 5,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    cover: "from-[#F2E6D4] via-[#D9C4A4] to-[#9C7958]",
    ink: "text-[#713D2A]",
    symbol: "SAPIENS",
    mark: "05",
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    cover: "from-[#A7AD8D] via-[#596448] to-[#242D20]",
    ink: "text-[#F6E8CD]",
    symbol: "THE\nPSYCHOLOGY\nOF MONEY",
    mark: "06",
  },
];

const categories = [
  "All",
  "Self-Help",
  "Science Fiction",
  "Fantasy",
  "Sci-Fi",
  "History",
  "Finance",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

function Icon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "book":
      return (
        <svg {...common}>
          <path d="M12 7v14" />
          <path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13" />
          <path d="M3 18h5a4 4 0 0 1 4 3 4 4 0 0 1 4-3h5" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4 4" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="10" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
      );
    default:
      return null;
  }
}

function BookCover({
  book,
  index,
}: {
  book: (typeof books)[number];
  index: number;
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -7 }}
      className="group min-w-0 rounded-2xl border border-white/[0.09] bg-[#11100F] p-4 transition-colors duration-300 hover:border-primary/50 hover:bg-[#191612]"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-[100px] shrink-0 [perspective:800px]">
          <motion.div
            whileHover={{ rotateY: -10, rotateX: 3, scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className={`relative flex aspect-[3/4.2] w-full flex-col items-center justify-between overflow-hidden rounded-r-md rounded-l-sm bg-gradient-to-br ${book.cover} p-3 shadow-[7px_8px_18px_#0009]`}
          >
            <div className="absolute inset-1.5 border border-current/20" />
            <span className={`relative text-[7px] tracking-[0.2em] ${book.ink}`}>
              BOOKWISE
            </span>
            <span
              className={`relative whitespace-pre-line text-center text-[11px] font-black leading-5 ${book.ink}`}
            >
              {book.symbol}
            </span>
            <span className={`relative text-[7px] ${book.ink}`}>
              SPECIAL EDITION
            </span>
            <div className="absolute inset-y-0 left-0 w-1 bg-black/20" />
          </motion.div>
          <div className="absolute -bottom-2 left-2 right-2 -z-10 h-4 rounded-full bg-primary/15 blur-lg" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start">
          <span className="rounded-full border border-primary/20 bg-primary/[0.07] px-2.5 py-1 text-[10px] text-primary">
            {book.category}
          </span>
          <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-6 text-white">
            {book.title}
          </h3>
          <p className="mt-1 text-xs text-stone-400">{book.author}</p>
          <Link
            href={SiteUrls.signIn}
            aria-label={`Explore ${book.title}`}
            className="mt-4 flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition-all hover:bg-primary hover:text-black"
          >
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const reduceMotion = useReducedMotion();

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        `${book.title} ${book.author} ${book.category}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const floatingTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 5, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <main
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#080808] text-white selection:bg-primary selection:text-black"
    >
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: [0, 35, 0], y: [0, 25, 0], opacity: [0.15, 0.35, 0.15] }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-48 -top-40 h-[520px] w-[520px] rounded-full bg-primary/[0.10] blur-[140px]"
        />
        <motion.div
          animate={
            reduceMotion
              ? {}
              : { x: [0, -30, 0], y: [0, -25, 0], opacity: [0.08, 0.22, 0.08] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-48 top-[35%] h-[500px] w-[500px] rounded-full bg-amber-800/[0.10] blur-[140px]"
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080808]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.08 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-black shadow-lg shadow-primary/10"
            >
              <Icon name="book" size={25} />
            </motion.div>
            <div>
              <div className="text-xl font-black tracking-tight">
                Book<span className="text-primary">Wise</span>
              </div>
              <p className="text-[9px] tracking-[0.22em] text-stone-500">
                MORE THAN JUST BOOKS
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-stone-300 lg:flex">
            <Link href="#home" className="transition hover:text-primary">Home</Link>
            <Link href="#books" className="transition hover:text-primary">Books</Link>
            <Link href="#categories" className="transition hover:text-primary">Categories</Link>
            <Link href="#features" className="transition hover:text-primary">About</Link>
            <Link href="#footer" className="transition hover:text-primary">Contact</Link>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href={SiteUrls.signIn}
              className="whitespace-nowrap rounded-xl bg-primary px-4 py-2.5 text-xs font-bold !text-[#17110B] transition hover:bg-[#F2D9B9] hover:shadow-lg hover:shadow-primary/15"
            >
              Login / Sign Up
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-xl text-primary sm:hidden"
          >
            {mobileMenu ? "×" : "☰"}
          </button>
        </div>

        {mobileMenu && (
          <nav className="flex flex-col gap-1 border-t border-white/10 bg-[#0D0C0A] p-4 sm:hidden">
            {[
              ["Home", "#home"],
              ["Books", "#books"],
              ["Categories", "#categories"],
              ["About", "#features"],
              ["Contact", "#footer"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-4 py-3 text-sm text-stone-300 hover:bg-primary/10 hover:text-primary"
              >
                {label}
              </Link>
            ))}
            <Link
              href={SiteUrls.signIn}
              onClick={() => setMobileMenu(false)}
              className="mt-2 rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-black"
            >
              Login / Sign Up
            </Link>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-16 sm:pt-24 md:grid-cols-2 md:pb-28 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.13 },
            },
          }}
          className="relative z-10"
        >
          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-xl text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Discover New
            <br />
            <span className="gold-shimmer bg-gradient-to-r from-[#C8A77F] via-[#FFF0D8] to-[#E7C9A5] bg-clip-text text-transparent">
              Worlds
            </span>{" "}
            in Every Book
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-sm leading-7 text-stone-400 sm:text-base"
          >
            Explore thousands of books, from timeless classics to modern
            bestsellers. Your next favorite book is just a click away.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#books"
              className="group inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold !text-[#17110B] shadow-xl shadow-primary/10 transition duration-300 hover:-translate-y-1 hover:bg-[#F2D9B9] hover:shadow-primary/20"
            >
              Explore Books
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" size={18} />
              </span>
            </Link>
            <Link
              href={SiteUrls.signIn}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-stone-200 transition hover:border-primary/50 hover:bg-primary/[0.06]"
            >
              ♙ Login
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-4 border-t border-white/[0.08] pt-6 text-xs text-stone-400"
          >
            <div className="flex items-center gap-2">
              <Icon name="book" size={20} />
              <span>Thousands of Books</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="clock" size={20} />
              <span>Read Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg text-primary">✧</span>
              <span>Discover More</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated book illustration */}
        <div className="relative mx-auto flex min-h-[350px] w-full max-w-[520px] items-center justify-center sm:min-h-[440px]">
          <motion.div
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute h-[250px] w-[250px] rounded-full border border-dashed border-primary/20 sm:h-[370px] sm:w-[370px]"
          />
          <motion.div
            animate={reduceMotion ? {} : { rotate: -360 }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            className="absolute h-[200px] w-[200px] rounded-full border border-primary/15 sm:h-[290px] sm:w-[290px]"
          />
          <div className="ambient-glow absolute h-52 w-52 rounded-full bg-primary/20 blur-[80px] sm:h-72 sm:w-72" />

          {[
            { left: "12%", top: "20%", symbol: "✦" },
            { left: "78%", top: "15%", symbol: "✧" },
            { left: "15%", top: "72%", symbol: "✳" },
            { left: "82%", top: "70%", symbol: "✦" },
          ].map((star, index) => (
            <motion.span
              key={`${star.left}-${star.top}`}
              animate={
                reduceMotion
                  ? {}
                  : { y: [0, -12, 0], opacity: [0.4, 1, 0.4] }
              }
              transition={{
                duration: 3,
                delay: index * 0.4,
                repeat: Infinity,
              }}
              style={{ left: star.left, top: star.top }}
              className="absolute text-2xl text-primary"
            >
              {star.symbol}
            </motion.span>
          ))}

          <motion.div
            animate={reduceMotion ? {} : { y: [0, -12, 0], rotate: [-4, -1, -4] }}
            transition={floatingTransition}
            className="absolute left-[7%] top-[19%] hidden h-28 w-20 flex-col justify-between rounded-r-md bg-gradient-to-br from-[#E7C9A5] to-[#725235] p-2 shadow-2xl shadow-black/50 sm:flex"
          >
            <span className="text-[7px] tracking-widest text-black">DREAMS</span>
            <span className="text-center text-2xl text-black">✧</span>
            <span className="text-center text-[7px] text-black">VOL. 01</span>
          </motion.div>

          <motion.div
            animate={reduceMotion ? {} : { y: [0, -10, 0], rotate: [3, 0, 3] }}
            transition={{ ...floatingTransition, delay: 0.8 }}
            className="absolute right-[6%] top-[26%] hidden h-24 w-16 flex-col justify-between rounded-r-md bg-gradient-to-br from-[#7D7569] to-[#25221D] p-2 shadow-xl sm:flex"
          >
            <span className="text-[7px] text-primary">MIND</span>
            <span className="text-center text-xl text-primary">☾</span>
            <span className="text-center text-[7px] text-primary">CHAPTER 7</span>
          </motion.div>

          <motion.div
            animate={reduceMotion ? {} : { y: [0, -8, 0], rotate: [-1, 1, -1] }}
            transition={floatingTransition}
            className="relative z-10 w-[78%] max-w-[360px]"
          >
            <div className="relative rounded-[30px] border border-primary/20 bg-gradient-to-br from-[#201A13] via-[#12100D] to-[#090909] p-5 shadow-[0_0_80px_#E7C9A510] sm:p-8">
              <div className="absolute inset-0 rounded-[30px] bg-gradient-to-tr from-primary/[0.10] via-transparent to-white/[0.02]" />

              <div className="relative flex h-56 flex-col items-center justify-center sm:h-64">
                <motion.div
                  animate={reduceMotion ? {} : { scale: [1, 1.06, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute h-32 w-32 rounded-full bg-primary/15 blur-3xl sm:h-44 sm:w-44"
                />

                <span className="mb-5 text-xs tracking-[0.4em] text-primary">
                  BOOKWise
                </span>

                <div className="relative flex items-end justify-center gap-1.5">
                  <div className="h-24 w-12 -rotate-12 rounded-r-md bg-gradient-to-br from-[#BDA58A] to-[#3C2B20] shadow-lg shadow-black/40 sm:h-32 sm:w-16" />

                  <div className="relative z-10 flex h-32 w-16 flex-col items-center justify-between rounded-r-md bg-gradient-to-br from-[#F3D9B4] via-[#A8875F] to-[#443020] p-2 shadow-xl shadow-black/40 sm:h-40 sm:w-20">
                    <span className="text-[7px] tracking-widest text-[#21180F]">
                      THE ART
                    </span>
                    <span className="text-3xl text-[#21180F]">✧</span>
                    <span className="text-center text-[8px] font-bold text-[#21180F]">
                      OF STORIES
                    </span>
                  </div>

                  <div className="h-28 w-12 rotate-12 rounded-r-md bg-gradient-to-br from-[#8B7962] to-[#29211A] shadow-lg shadow-black/40 sm:h-36 sm:w-16" />
                </div>

                <div className="mt-5 h-1.5 w-48 rounded-full bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-sm" />
              </div>

              <div className="relative mt-2 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-xs font-bold">A Universe of Stories</p>
                  <p className="mt-1 text-[10px] text-stone-500">
                    Your next chapter starts here.
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.08] text-primary">
                  <Icon name="book" size={19} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={reduceMotion ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-[6%] right-0 z-20 rounded-xl border border-primary/15 bg-[#15120E]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:right-2"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-lg text-primary">
                ✦
              </span>
              <div>
                <p className="text-xs font-bold">Find Your Next Favorite</p>
                <p className="mt-1 text-[10px] text-stone-500">
                  One click. New worlds.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="relative scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                EXPLORE YOUR INTERESTS
              </p>
              <h2 className="mt-2 text-xl font-bold">Find Your Genre</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`rounded-full border px-3 py-2 text-xs transition duration-300 ${
                    category === item
                      ? "border-primary bg-primary text-black"
                      : "border-white/10 bg-white/[0.02] text-stone-400 hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular books */}
      <section
        id="books"
        className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-9 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              POPULAR BOOKS
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Most Loved Books
            </h2>
            <p className="mt-3 text-sm text-stone-400">
              Discover the books everyone is reading right now.
            </p>
          </div>

          <span className="text-xs text-stone-500">
            {filteredBooks.length} books found
          </span>
        </motion.div>

        {filteredBooks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((book, index) => (
              <BookCover key={book.id} book={book} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-16 text-center">
            <p className="text-lg font-semibold">No Books Found</p>
            <p className="mt-2 text-sm text-stone-400">
              Try another title or choose a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-black hover:bg-[#F2D9B9]"
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href={SiteUrls.signIn}
            className="inline-flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/[0.05] px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Explore Your Library <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative scroll-mt-24 px-5 py-16 lg:px-8"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-[#1B1711] via-[#100F0D] to-[#0A0A09] p-7 sm:p-10 lg:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                WHY BOOKWISE?
              </span>

              <h2 className="mt-4 text-3xl font-black leading-relaxed sm:text-4xl">
                More Than Books.
                <br />
                <span className="text-primary">
                  A Whole New Universe.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-stone-400">
                Your next great idea, unforgettable story, or life-changing
                lesson is waiting to be discovered. Make every reading moment
                count.
              </p>

              <Link
                href={SiteUrls.signIn}
                className="mt-7 inline-flex items-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-bold !text-black transition hover:-translate-y-0.5 hover:bg-[#F2D9B9]"
              >
                Start Your Journey <Icon name="arrow" size={17} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "10K+", label: "Books to Discover", icon: "book" },
                { value: "50K+", label: "Happy Readers", icon: "users" },
                { value: "24/7", label: "Anytime Access", icon: "clock" },
                { value: "∞", label: "Stories to Explore", icon: "search" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 transition hover:border-primary/30"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={stat.icon} size={21} />
                  </span>
                  <p className="mt-5 text-2xl font-black text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-stone-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative mx-auto max-w-5xl px-5 py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.div
            animate={reduceMotion ? {} : { rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/[0.07] text-primary shadow-[0_0_40px_#E7C9A510]"
          >
            <Icon name="book" size={30} />
          </motion.div>

          <h2 className="mt-7 text-3xl font-black sm:text-4xl">
            Ready to Turn the Page?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-400">
            Join our reading community and find the stories that stay with you
            long after the last page.
          </p>

          <Link
            href={SiteUrls.signIn}
            className="mt-7 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-bold !text-black shadow-lg shadow-primary/10 transition hover:-translate-y-1 hover:bg-[#F2D9B9]"
          >
            Join BookWise <Icon name="arrow" size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="relative border-t border-white/[0.08] bg-[#060606]"
      >
        <div className="mx-auto max-w-7xl px-5 pb-6 pt-12 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-black">
                  <Icon name="book" size={23} />
                </span>
                <span className="text-xl font-black">
                  Book<span className="text-primary">Wise</span>
                </span>
              </Link>

              <p className="mt-5 max-w-xs text-sm leading-7 text-stone-500">
                A little escape. A thousand adventures. Discover your next
                favorite story with BookWise.
              </p>

              <div className="mt-5 flex gap-3">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-stone-400 transition hover:border-primary/40 hover:bg-primary/[0.07] hover:text-primary"
                >
                  <Icon name="instagram" />
                </a>
                <a
                  href="mailto:hello@BookWise.example"
                  aria-label="Email us"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-stone-400 transition hover:border-primary/40 hover:bg-primary/[0.07] hover:text-primary"
                >
                  <Icon name="mail" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">Quick Links</h3>
              <ul className="mt-5 space-y-3 text-sm text-stone-500">
                <li><Link className="transition hover:text-primary" href="#home">Home</Link></li>
                <li><Link className="transition hover:text-primary" href="#books">Books</Link></li>
                <li><Link className="transition hover:text-primary" href="#categories">Categories</Link></li>
                <li><Link className="transition hover:text-primary" href="#features">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">Help & Support</h3>
              <ul className="mt-5 space-y-3 text-sm text-stone-500">
                <li><Link className="transition hover:text-primary" href={SiteUrls.signIn}>My Account</Link></li>
                <li><a className="transition hover:text-primary" href="mailto:hello@BookWise.example">Contact Us</a></li>
              </ul>
            </div>

            {/* Admin Access */}
            <div>
              <h3 className="text-sm font-bold text-white">Restricted Area</h3>

              <motion.div
                whileHover={{ y: -4 }}
                className="group relative mt-5 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-[#211B13] to-[#100E0B] p-5 transition hover:border-primary/70 hover:shadow-[0_0_35px_#E7C9A515]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />

                <div className="relative flex items-start gap-3">
                  <motion.div
                    animate={
                      reduceMotion
                        ? {}
                        : {
                            boxShadow: [
                              "0 0 0px #E7C9A500",
                              "0 0 22px #E7C9A533",
                              "0 0 0px #E7C9A500",
                            ],
                          }
                    }
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/[0.08] text-primary"
                  >
                    <Icon name="shield" size={25} />
                  </motion.div>

                  <div>
                    <h4 className="text-sm font-bold">Admin Access</h4>
                    <p className="mt-2 text-xs leading-5 text-stone-400">
                      Secure access for authorized administrators only.
                    </p>
                  </div>
                </div>

                <Link
                  href={SiteUrls.adminLogin}
                  className="relative mt-5 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/[0.06] px-4 py-3 text-xs font-bold text-primary transition hover:bg-primary hover:text-black"
                >
                  <span>Administrator Login</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    <Icon name="arrow" size={17} />
                  </span>
                </Link>
              </motion.div>

              <p className="mt-3 text-[10px] leading-5 text-stone-600">
                Authorized personnel only. Authentication required.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-stone-600 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} BookWise. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Built for book lovers
              <span className="text-primary">♥</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
