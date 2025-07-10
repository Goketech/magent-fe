"use client";
import { motion, Variants } from "framer-motion";
import ProgressBar from "@/components/layouts/ProgressBar";
import StatCard from "@/components/layouts/StatCard";
import { services, stats } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 md:space-y-32">
      {/* Hero Banner */}
      <motion.div
        className="relative h-48 md:h-64 rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/abouthero.jpg"
          alt="Abstract tech banner"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            About Us
          </h1>
        </div>
      </motion.div>

      {/* Bridging Innovation Section */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="w-full h-80 md:h-full rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/about1.png"
            alt="Developer at a multi-screen setup"
            width={600}
            height={700}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="space-y-6">
          <p className="text-[#999999] font-semibold">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
            Bridging Innovation & Influence in Web3
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We help Web3 projects grow through strategic marketing,
            storytelling, and community activation. From token launches to DAO
            campaigns, we connect your brand with the right audience — driving
            traction, trust, and long-term impact in the decentralized world.
          </p>
          <motion.button
            className="px-8 py-3 bg-[#AAA1FF] text-white font-bold rounded-lg hover:bg-white hover:text-[#AAA1FF] transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button>
        </div>
      </motion.section>

      {/* What We Offer Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What We Offer?</h2>
            <p className="text-white leading-relaxed">
              Here at Magent we offer few services we feel will help Web3
              marketing reach the next level.
            </p>
            <div className="space-y-5 pt-4">
              {services.map((service, index) => (
                <ProgressBar
                  key={index}
                  label={service.label}
                  percentage={service.percentage}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-0 lg:pt-16">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                className={
                  index === 2
                    ? "sm:col-span-2 sm:justify-self-center sm:w-1/2"
                    : ""
                }
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Explore Section */}
      <motion.section
        className="relative py-20 md:py-28 px-6 text-center rounded-lg overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src="/aboutfooter.jpg"
          alt="Digital interface with charts"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 w-full h-full"
        />

        <div className="absolute inset-0 bg-brand-dark bg-opacity-70 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <button
      type="button"
      onClick={() => router.push("/")}
      className="text-[#D7D7D7] font-semibold hover:text-white hover:underline transition-colors duration-200"
    >
      Check out our website
    </button>
          <h2 className="text-2xl md:text-4xl font-bold leading-snug text-white">
            Explore how we help Web3 projects go from idea to impact. From case
            studies to services, our site breaks down what we do, how we do it,
            and why it works.
          </h2>
        </div>
      </motion.section>
    </div>
  );
}
