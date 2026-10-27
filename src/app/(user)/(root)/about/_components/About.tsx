"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import imagesAddresses from "@/utils/imageAddresses";

const features = [
  {
    number: "01",
    title: "Always accessible",
    description:
      "Discover books and learning resources whenever inspiration strikes.",
    icon: imagesAddresses.icons.purpose1White,
    darkIcon: imagesAddresses.icons.purpose1,
  },
  {
    number: "02",
    title: "Made for readers",
    description:
      "A thoughtful experience that makes finding your next book effortless.",
    icon: imagesAddresses.icons.purpose2White,
    darkIcon: imagesAddresses.icons.purpose2,
  },
  {
    number: "03",
    title: "Knowledge in motion",
    description:
      "Explore new ideas and build a reading habit that stays with you.",
    icon: imagesAddresses.icons.purpose3White,
    darkIcon: imagesAddresses.icons.purpose3,
  },
];

const values = [
  {
    number: "01",
    title: "Education for everyone",
    description:
      "We believe access to knowledge should never be a privilege reserved for a few.",
  },
  {
    number: "02",
    title: "Curiosity without limits",
    description:
      "Every great discovery begins with a question. We make room for more of them.",
  },
  {
    number: "03",
    title: "A community of readers",
    description:
      "We bring people and ideas together through a shared love of learning.",
  },
  {
    number: "04",
    title: "Simplicity that matters",
    description:
      "We make discovering, exploring, and accessing books feel natural and effortless.",
  },
];

const stories = [
  {
    number: "01",
    heading: "The people behind every page",
    eyebrow: "OUR PEOPLE",
    text: "Our librarians and staff make BookWise more than a collection of books. Their dedication creates a welcoming environment where every reader can find guidance, inspiration, and the freedom to explore.",
    src: imagesAddresses.images.ourStaff,
    reverse: false,
  },
  {
    number: "02",
    heading: "A world of knowledge, within reach",
    eyebrow: "OUR RESOURCES",
    text: "From timeless classics to new discoveries, our growing collection helps readers explore different perspectives, develop new skills, and find their next great idea.",
    src: imagesAddresses.images.ourResources,
    reverse: true,
  },
  {
    number: "03",
    heading: "Designed around your reading journey",
    eyebrow: "OUR SERVICES",
    text: "Our digital catalog and library services make it easier to discover books, explore available resources, and enjoy a smoother reading experience.",
    src: imagesAddresses.images.ourServices,
    reverse: false,
  },
  {
    number: "04",
    heading: "Better together, one book at a time",
    eyebrow: "OUR COMMUNITY",
    text: "Reading opens doors to new perspectives. BookWise brings together people who value learning, thoughtful conversations, and the lifelong pursuit of knowledge.",
    src: imagesAddresses.images.ourCommunity,
    reverse: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const About = () => {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
      initial: "hidden" as const,
      whileInView: "show" as const,
      viewport: { once: true, amount: 0.15 },
      variants: fadeUp,
    };

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-col overflow-hidden px-3 pb-10 pt-2 text-white sm:px-5 lg:px-8 dark:text-[#17130F]">
      {/* Hero */}
      <section className="relative isolate min-h-[390px] overflow-hidden rounded-[24px] border border-[#E7C9A5]/15 bg-[#0D0D0C] sm:min-h-[470px] sm:rounded-[30px] lg:min-h-[550px]">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute inset-0 -z-20"
        >
          <Image
            src={imagesAddresses.images.loginPic}
            alt="Explore the world of books at BookWise"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 -z-10 hidden dark:block bg-gradient-to-r from-[#0D0D0C]/65 via-[#0D0D0C]/20 to-transparent" />
        <div className="absolute inset-0 -z-10 hidden dark:block bg-gradient-to-t from-[#0D0D0C]/35 via-transparent to-transparent" />

        <div className="absolute inset-0 -z-10 dark:hidden bg-gradient-to-r from-[#0D0D0C]/90 via-[#0D0D0C]/65 to-[#0D0D0C]/15" />
        <div className="absolute inset-0 -z-10 dark:hidden bg-gradient-to-t from-[#0D0D0C]/70 via-transparent to-transparent" />

        <div className="absolute left-0 top-12 h-32 w-1 bg-gradient-to-b from-[#E7C9A5] to-[#A87938] sm:top-16 sm:h-44" />

        <div className="flex min-h-[390px] flex-col justify-between p-6 sm:min-h-[470px] sm:p-10 lg:min-h-[550px] lg:p-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#E7C9A5]" />
            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#E7C9A5] sm:text-xs">
              The BookWise Story
            </p>
          </div>

          <div className="max-w-3xl py-10">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-4 text-sm text-white/70 sm:text-base"
            >
              A little curiosity can take you a long way.
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              There&apos;s a lot
              <br />
              to love about
              <br />
              <span className="font-serif italic text-[#E7C9A5]">
                BookWise.
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 max-w-lg text-sm leading-7 text-white/70 sm:text-base sm:leading-8"
            >
              More than books. A place to discover new ideas, follow your
              curiosity, and make learning part of everyday life.
            </motion.p>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4">
            <span className="text-[10px] uppercase tracking-[2px] text-white/60 sm:text-xs">
              Read. Discover. Grow.
            </span>
            <span className="font-mono text-[10px] text-[#E7C9A5] sm:text-xs">
              EST. FOR THE CURIOUS
            </span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24 lg:py-32">
        <motion.div
          {...reveal}
          className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.5fr] lg:gap-20"
        >
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[2px] text-[#E7C9A5] dark:text-[#A87938]">
              <span className="h-px w-7 bg-current" />
              Why we exist
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl dark:text-[#17130F]">
              Our mission
            </h2>
          </div>

          <div>
            <p className="text-3xl font-medium leading-[1.35] tracking-tight text-[#F8F2E6] sm:text-4xl lg:text-5xl dark:text-[#302619]">
              To make knowledge{" "}
              <span className="font-serif italic text-[#E7C9A5] dark:text-[#A87938]">
                accessible
              </span>{" "}
              and curiosity a part of everyone&apos;s journey.
            </p>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base sm:leading-8 dark:text-[#75634E]">
              We believe a good library does more than store books. It creates
              opportunities to learn, discover different perspectives, and
              connect with ideas that make a difference.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="rounded-[24px] border border-[#E7C9A5]/20 bg-[#151411] p-5 sm:rounded-[30px] sm:p-8 lg:p-12 dark:bg-[#F2E9DA]">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#E7C9A5] dark:text-[#A87938]">
              The BookWise experience
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl dark:text-[#17130F]">
              A library that moves with you.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-stone-400 dark:text-[#75634E]">
            Thoughtfully designed to help you spend less time searching and
            more time discovering.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.number}
              {...reveal}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : index * 0.1,
              }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              className="group rounded-2xl border border-[#E7C9A5]/20 bg-[#0D0D0C] p-6 transition-colors sm:p-7 dark:bg-[#FBF7EF]"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-[#E7C9A5]/20 bg-[#E7C9A5]/10 dark:border-[#A87938]/20 dark:bg-[#E7C9A5]/30">
                  <Image
                    src={feature.darkIcon}
                    alt=""
                    width={34}
                    height={34}
                    className="hidden object-contain dark:block"
                  />
                  <Image
                    src={feature.icon}
                    alt=""
                    width={34}
                    height={34}
                    className="object-contain dark:hidden"
                  />
                </div>

                <span className="font-mono text-xs text-[#E7C9A5]/70 dark:text-[#A87938]/70">
                  {feature.number}
                </span>
              </div>

              <h3 className="mt-7 text-lg font-semibold text-white dark:text-[#17130F]">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-400 dark:text-[#75634E]">
                {feature.description}
              </p>

              <div className="mt-6 h-px w-10 bg-[#E7C9A5] transition-all duration-300 group-hover:w-full dark:bg-[#A87938]" />
            </motion.article>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="py-20 sm:py-24">
        <motion.div
          {...reveal}
          className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-20"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#E7C9A5] dark:text-[#A87938]">
              A place for every reader
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl dark:text-[#17130F]">
              Who we are,
              <br />
              <span className="font-serif italic text-[#E7C9A5] dark:text-[#A87938]">
                and what we believe.
              </span>
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-8 text-stone-400 sm:text-base dark:text-[#75634E]">
            <p>
              BookWise is dedicated to creating an engaging and inclusive
              library experience. Our digital catalog and physical collections
              give students, professionals, and curious minds a place to
              explore books, resources, and new possibilities.
            </p>

            <p>
              We believe knowledge should be available whenever inspiration
              strikes. Every detail of the experience is an opportunity to make
              discovering and accessing information simpler and more welcoming.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden rounded-[24px] border border-[#E7C9A5]/20 bg-[#0D0D0C] px-5 py-12 text-white sm:rounded-[30px] sm:px-8 sm:py-16 lg:px-14 lg:py-20 dark:bg-[#F8F2E6] dark:text-[#17130F]">
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[#A87938]/10 blur-[90px] dark:bg-[#E7C9A5]/30" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 size-64 rounded-full bg-[#E7C9A5]/[0.06] blur-[80px] dark:bg-[#A87938]/10" />

        <div className="relative">
          <motion.div {...reveal} className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#E7C9A5] dark:text-[#A87938]">
              What matters to us
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl dark:text-[#17130F]">
              Good books.
              <br />
              <span className="font-serif italic text-[#E7C9A5] dark:text-[#A87938]">
                Meaningful values.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-stone-400 sm:text-base dark:text-[#75634E]">
              The principles behind every experience we create and every reader
              we welcome.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-x-12 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.article
                key={value.number}
                {...reveal}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.07,
                }}
                className="border-t border-white/15 py-6 sm:py-7 dark:border-[#A87938]/25"
              >
                <div className="flex items-start gap-4">
                  <span className="pt-1 font-mono text-xs text-[#E7C9A5]/70 dark:text-[#A87938]/70">
                    {value.number}
                  </span>

                  <div>
                    <h3 className="text-lg font-semibold text-[#F8F2E6] sm:text-xl dark:text-[#17130F]">
                      {value.title}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-7 text-stone-400 dark:text-[#75634E]">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:mb-16 lg:flex-row lg:items-end">
          <motion.div {...reveal}>
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#E7C9A5] dark:text-[#A87938]">
              Behind the experience
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl dark:text-[#17130F]">
              More than a collection.
            </h2>
          </motion.div>

          <motion.p
            {...reveal}
            className="max-w-md text-sm leading-7 text-stone-400 sm:text-base dark:text-[#75634E]"
          >
            Discover the people, resources, and community that bring the
            BookWise experience to life.
          </motion.p>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {stories.map((story) => (
            <motion.article
              key={story.number}
              {...reveal}
              className={`grid items-center gap-7 lg:grid-cols-2 lg:gap-14 ${story.reverse ? "lg:[&>div:first-child]:order-2" : ""
                }`}
            >
              <div className="group relative aspect-[5/4] overflow-hidden rounded-[22px] border border-[#E7C9A5]/20 bg-[#151411] sm:aspect-[16/10] lg:aspect-[5/4] dark:border-[#A87938]/20 dark:bg-[#F2E9DA]">
                <Image
                  src={story.src}
                  alt={story.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/70 via-transparent to-transparent" />

                <span className="absolute bottom-4 left-4 rounded-full border border-[#E7C9A5]/30 bg-[#0D0D0C]/60 px-4 py-2 font-mono text-xs text-[#E7C9A5] backdrop-blur-md">
                  {story.number} / 04
                </span>
              </div>

              <div className="px-1 py-2 sm:px-4 lg:px-0">
                <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#E7C9A5] dark:text-[#A87938]">
                  <span className="h-px w-7 bg-current" />
                  {story.eyebrow}
                </p>

                <h3 className="mt-5 text-2xl font-semibold leading-snug text-white sm:text-3xl lg:text-4xl dark:text-[#17130F]">
                  {story.heading}
                </h3>

                <p className="mt-5 text-sm leading-8 text-stone-400 sm:text-base dark:text-[#75634E]">
                  {story.text}
                </p>

                <div className="mt-7 h-px w-16 bg-[#E7C9A5]/70 dark:bg-[#A87938]/70" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section
        {...reveal}
        className="relative overflow-hidden rounded-[24px] border border-[#E7C9A5]/20 bg-[#0D0D0C] px-5 py-14 text-center sm:rounded-[30px] sm:px-10 sm:py-20 dark:bg-[#F8F2E6]"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#E7C9A5] to-transparent dark:via-[#A87938]" />

        <p className="text-xs font-semibold uppercase tracking-[2px] text-[#E7C9A5] dark:text-[#A87938]">
          Your next chapter starts here
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl dark:text-[#17130F]">
          Every book opens
          <br />
          <span className="font-serif italic text-[#E7C9A5] dark:text-[#A87938]">
            a new possibility.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-stone-400 sm:text-base dark:text-[#75634E]">
          Stay curious, keep exploring, and let your next great discovery begin
          with BookWise.
        </p>

        <div className="mx-auto mt-8 flex items-center justify-center gap-2">
          <span className="size-1.5 rounded-full bg-[#E7C9A5] dark:bg-[#A87938]" />
          <span className="h-px w-10 bg-[#E7C9A5]/50 dark:bg-[#A87938]/50" />
          <span className="size-2 rounded-full bg-[#E7C9A5] dark:bg-[#A87938]" />
          <span className="h-px w-10 bg-[#E7C9A5]/50 dark:bg-[#A87938]/50" />
          <span className="size-1.5 rounded-full bg-[#E7C9A5] dark:bg-[#A87938]" />
        </div>
      </motion.section>
    </main>
  );
};

export default About;