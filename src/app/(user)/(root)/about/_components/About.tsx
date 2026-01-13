"use client"

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";

const About = () => {

  return (
    <div className="w-full mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="w-full">
        <div className="relative h-[300px] w-full">
          <Image
            src={imagesAddresses.images.loginPic}
            alt="about"
            fill
            className="object-cover !rounded-lg"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/40 flex items-center px-4 sm:px-10 lg:pl-20 rounded-lg">
            <div>
              <p className="dark:text-white text-gray-300 text-3xl sm:text-4xl lg:text-5xl font-bold">There’s a lot to love</p>
              <p className="dark:text-white text-gray-300 text-3xl sm:text-4xl lg:text-5xl font-bold">about BookWise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our purpose */}
      <div className="mt-10 text-center max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-200 dark:text-gray-900">Our purpose</h2>
        <div className="mt-12 flex flex-col">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 dark:text-gray-800">To drive integrity by being honest</h2>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 dark:text-gray-800">transparent in every interaction.</h2>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 dark:text-gray-800 mt-11">Who we are</h2>
        <div className="mt-10 flex flex-col lg:flex-row gap-6 lg:gap-8 px-6">
          <p className="text-gray-300 dark:text-gray-800 leading-6 text-justify">
            At CarMax, our commitment to innovation and iconic customer experiences have made us the nation’s largest retailer of used cars. As the original disruptor of the automotive industry, our “no-haggle” prices transformed car buying and selling from a stressful, dreaded event into the honest, straightforward experience all people deserve.
          </p>
          <p className="text-gray-300 dark:text-gray-800 leading-6 text-justify">
            Today, our customers have the ability to buy completely on their terms—whether that’s online, in the store, or using a seamless combination of both. Were committed to transparency, putting you in control, and delivering iconic car buying experiences.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-10 mt-12">
          {[
            { src: imagesAddresses.icons.purpose1, title: "24-hour", sub: "test drives" },
            { src: imagesAddresses.icons.purpose2, title: "Home", sub: "delivery†" },
            { src: imagesAddresses.icons.purpose3, title: "Express", sub: "pickup" },
          ].map((item, i) => (
            <div key={i} className="flex-col items-center gap-2 w-32 hidden dark:flex">
              <Image
                src={item.src}
                alt="feature"
                width={70}
                height={70}
                className="object-contain"
              />
              <p className="text-gray-300 dark:text-gray-800">{item.title}</p>
              <p className="text-gray-300 dark:text-gray-800">{item.sub}</p>
            </div>
          ))}
          {[
            { src: imagesAddresses.icons.purpose1White, title: "24-hour", sub: "test drives" },
            { src: imagesAddresses.icons.purpose2White, title: "Home", sub: "delivery†" },
            { src: imagesAddresses.icons.purpose3White, title: "Express", sub: "pickup" },
          ].map((item, i) => (
            <div key={i} className="flex-col items-center gap-2 w-32 dark:hidden flex">
              <Image
                src={item.src}
                alt="feature"
                width={70}
                height={70}
                className="object-contain"
              />
              <p className="text-gray-300 dark:text-gray-800">{item.title}</p>
              <p className="text-gray-300 dark:text-gray-800">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What matters to us */}
      <div className="bg-dark-300 dark:bg-gray-100 dark:text-gray-900 mt-16 pb-16 rounded-lg">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-24 xl:px-48 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 dark:text-gray-800 py-10">What matters to us</h2>

          {/* Core values */}
          <div className="bg-gray-700 dark:bg-light-700 rounded-lg p-6 sm:p-10 flex flex-col lg:flex-row gap-10 text-white dark:text-gray-700 items-center justify-center">
            <div className="flex flex-col font-bold text-center lg:text-left">
              <p className="text-2xl sm:text-3xl">Above all, we care</p>
              <p className="text-2xl sm:text-3xl">about people.</p>
            </div>
            <span className="hidden lg:block w-px h-40 bg-white" />
            <div className="flex flex-col gap-4">
              <p className="text-xl sm:text-2xl font-bold">Our core values</p>
              <ol className="space-y-1">
                {["Do the right thing", "Put people first", "Win together", "Go for greatness"].map((value, i) => (
                  <li key={i} className="text-lg sm:text-xl leading-7 text-justify font-semibold">{value}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Importance sections */}
          {[
            { src: imagesAddresses.images.notFoundBg, reverse: false },
            { src: imagesAddresses.images.notFoundBg, reverse: true },
            { src: imagesAddresses.images.notFoundBg, reverse: false },
            { src: imagesAddresses.images.notFoundBg, reverse: true },
          ].map(({ src, reverse }, idx) => (
            <div
              key={idx}
              className={`mt-12 flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-6 lg:gap-8 items-center`}
            >
              <Image
                src={src}
                alt=""
                width={700}
                height={500}
                className="rounded-xl w-full max-w-full sm:max-w-[500]"
              />
              <div className="flex flex-col gap-2 px-4 sm:px-0">
                <div className="flex gap-2 items-center">
                  <span className="w-10 h-3 dark:bg-[#7a6233] bg-primary" />
                  <p className="text-gray-300 dark:text-gray-800 font-semibold">Our associates</p>
                </div>
                <p className="text-justify text-gray-300 dark:text-gray-800 leading-6 text-sm sm:text-base">
                  Our success is possible because of the hard work and dedication of our 30,000+ associates nationwide. If you join our team, you’ll join a culture of transparency, integrity, and a focus on doing what’s right for our customers and communities. Were committed to helping you innovate, grow, and shape your career in ways you haven’t even imagined.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
