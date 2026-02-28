"use client"

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {

  return (
    <div className="w-full mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="w-full">
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={imagesAddresses.images.loginPic}
              alt="about"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/60 dark:bg-black/40 flex items-center px-4 sm:px-10 lg:pl-20">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                className="dark:text-white text-gray-300 text-3xl sm:text-4xl lg:text-5xl font-bold"
              >
                There’s a lot to love
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                className="dark:text-white text-gray-300 text-3xl sm:text-4xl lg:text-5xl font-bold"
              >
                about BookWise
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Our purpose */}
      <motion.div
        className="mt-10 text-center max-w-screen-xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.18
            }
          }
        }}
      >
        {/* Our Mission */}
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 60 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
          className="text-3xl font-bold text-gray-200 dark:text-gray-900"
        >
          Our Mission
        </motion.h2>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 60 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="mt-12 flex flex-col"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 dark:text-gray-800">
            To foster learning and curiosity
          </h2>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 dark:text-gray-800">
            by providing accessible knowledge to everyone.
          </h2>
        </motion.div>
        {/* Who we are */}
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 60 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="text-3xl font-bold text-gray-200 dark:text-gray-900 !mt-11"
        >
          Who we are
        </motion.h2>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 60 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="mt-10 flex flex-col lg:flex-row gap-6 lg:gap-8 px-6"
        >
          <p className="text-gray-300 dark:text-gray-800 leading-6 text-justify">
            BookWise is dedicated to creating an engaging and inclusive library experience.
            Our digital catalog and physical collections provide students, professionals,
            and casual readers access to thousands of books, e-resources, and learning tools.
          </p>

          <p className="text-gray-300 dark:text-gray-800 leading-6 text-justify">
            We believe knowledge should be available anytime, anywhere. Our team works
            tirelessly to ensure you can borrow, return, or reserve books with ease,
            whether online or at one of our library branches.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center gap-10 mt-12"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {[
            { src: imagesAddresses.icons.purpose1, title: "24/7", sub: "Access Online" },
            { src: imagesAddresses.icons.purpose2, title: "Home", sub: "Delivery Available" },
            { src: imagesAddresses.icons.purpose3, title: "Express", sub: "Book Pickup" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 60 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
              className="flex-col items-center gap-2 w-32 hidden dark:flex"
            >
              <Image src={item.src} alt="feature" width={70} height={70} className="object-contain" />
              <p className="text-gray-300 dark:text-gray-800">{item.title}</p>
              <p className="text-gray-300 dark:text-gray-800">{item.sub}</p>
            </motion.div>
          ))}

          {[
            { src: imagesAddresses.icons.purpose1White, title: "24/7", sub: "Access Online" },
            { src: imagesAddresses.icons.purpose2White, title: "Home", sub: "Delivery Available" },
            { src: imagesAddresses.icons.purpose3White, title: "Express", sub: "Book Pickup" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 60 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
              className="flex-col items-center gap-2 w-32 dark:hidden flex"
            >
              <Image src={item.src} alt="feature" width={70} height={70} className="object-contain" />
              <p className="text-gray-300 dark:text-gray-800">{item.title}</p>
              <p className="text-gray-300 dark:text-gray-800">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      {/* What matters to us */}
      <div className="bg-dark-300 dark:bg-gray-100 dark:text-gray-900 mt-16 pb-16 rounded-lg">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-24 xl:px-48 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 dark:text-gray-800 py-10">What matters to us</h2>
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gray-700 dark:bg-light-700 rounded-lg p-6 sm:p-10 flex flex-col lg:flex-row gap-10 text-white dark:text-gray-700 items-center justify-center">
            <div className="flex flex-col font-bold text-center lg:text-left">
              <p className="text-2xl sm:text-3xl">Above all, we care</p>
              <p className="text-2xl sm:text-3xl">about learning.</p>
            </div>
            <span className="hidden lg:block w-px h-40 bg-white" />
            <div className="flex flex-col gap-4">
              <p className="text-xl sm:text-2xl font-bold">Our core values</p>
              <ol className="space-y-1">
                {["Promote education", "Serve the community", "Foster curiosity", "Ensure accessibility"].map((value, i) => (
                  <li key={i} className="text-lg sm:text-xl leading-7 text-justify font-semibold">{value}</li>
                ))}
              </ol>
            </div>
          </motion.div>
          {[
            {
              src: imagesAddresses.images.ourStaff,
              reverse: false,
              heading: "Our staff",
              text: "Our success is made possible by the dedication of our librarians and staff. Their passion ensures every visitor has a smooth, welcoming experience and access to knowledge. Joining BookWise means joining a community focused on growth, curiosity, and learning."
            },
            {
              src: imagesAddresses.images.ourResources,
              reverse: true,
              heading: "Our resources",
              text: "We provide access to thousands of books, e-resources, and learning tools to help you expand your knowledge anytime, anywhere."
            },
            {
              src: imagesAddresses.images.ourServices,
              reverse: false,
              heading: "Our services",
              text: "Our online catalog and digital services make borrowing, returning, and reserving books simple and convenient for everyone."
            },
            {
              src: imagesAddresses.images.ourCommunity,
              reverse: true,
              heading: "Our community",
              text: "Joining BookWise connects you to a community that values curiosity, education, and lifelong learning."
            },
          ].map(({ src, reverse, heading, text }, idx) => (
            <motion.div
              key={idx}
              className={`mt-12 flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-6 lg:gap-8 items-center`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                show: {}
              }}
            >
              <motion.div
                className="relative w-full sm:w-1/2 rounded-xl overflow-hidden aspect-[4/3]"
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
                viewport={{ once: true }}
              >
                <Image
                  src={src}
                  alt={heading}
                  fill
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/20 dark:bg-black/10" />
              </motion.div>

              <motion.div
                className="flex flex-col gap-2 px-4 sm:px-0 sm:w-1/2"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.25,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true }}
              >
                <div className="flex gap-2 items-center">
                  <span className="w-10 h-3 dark:bg-[#7a6233] bg-primary rounded-lg" />
                  <p className="text-gray-300 dark:text-gray-800 font-semibold">{heading}</p>
                </div>

                <p className="text-justify text-gray-300 dark:text-gray-800 leading-6 text-sm sm:text-base">
                  {text}
                </p>
              </motion.div>

            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default About;
