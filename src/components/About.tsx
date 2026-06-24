import { motion, useReducedMotion, type Variants } from "motion/react"
import { useTranslation } from "react-i18next"

const EASE = [0.25, 0.1, 0.25, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

const reducedItemVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true
  const variants = shouldReduceMotion ? reducedItemVariants : itemVariants

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-6 py-24 sm:px-10 md:px-16 lg:px-24"
    >
      <motion.div
        className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={variants}
          className="flex aspect-square w-full max-w-sm items-center justify-center rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md md:max-w-none"
          aria-hidden="true"
        >
          <span className="text-sm font-medium text-neutral-500">
            {t("about.photo")}
          </span>
        </motion.div>

        <motion.div variants={variants} className="flex flex-col">
          <h2
            id="about-heading"
            className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
          >
            {t("about.title")}
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-neutral-900 sm:text-xl">
            {t("about.paragraph1")}
          </p>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {t("about.paragraph2")}
          </p>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {t("about.paragraph3")}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
