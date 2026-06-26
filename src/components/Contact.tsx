import { motion, useReducedMotion, type Variants } from "motion/react"
import { useTranslation } from "react-i18next"

const EMAIL = "joeljoelleon96@gmail.com"
const GITHUB_URL = "https://github.com/iJoel23"
const LINKEDIN_URL = "https://www.linkedin.com/in/ijoel23/"

const EASE = [0.25, 0.1, 0.25, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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

export default function Contact() {
  const { t, i18n } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true
  const variants = shouldReduceMotion ? reducedItemVariants : itemVariants

  const isEs = i18n.language.startsWith("es")
  const cvFile = isEs ? "/cv-es.pdf" : "/cv-en.pdf"
  const cvDownloadName = isEs ? "Joel_Leon_CV_ES.pdf" : "Joel_Leon_CV_EN.pdf"

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="overflow-x-hidden px-6 py-32 sm:px-10 md:px-16 lg:px-24"
    >
      <motion.div
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          id="contact-heading"
          variants={variants}
          className="text-3xl font-semibold tracking-tight text-balance text-neutral-900 sm:text-4xl md:text-5xl"
        >
          {t("contact.title")}
        </motion.h2>

        <motion.p
          variants={variants}
          className="mt-6 text-lg leading-relaxed text-neutral-600 sm:text-xl"
        >
          {t("contact.paragraph")}
        </motion.p>

        <motion.a
          variants={variants}
          href={`mailto:${EMAIL}`}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-indigo-700"
        >
          {t("contact.sendEmail")}
        </motion.a>

        <motion.div
          variants={variants}
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm font-medium text-neutral-600"
          >
            {t("common.github")}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm font-medium text-neutral-600"
          >
            {t("common.linkedin")}
          </a>
          <a
            href={cvFile}
            download={cvDownloadName}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/40 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-800 backdrop-blur-md transition-colors hover:border-indigo-200 hover:text-indigo-600"
          >
            {t("contact.downloadCv")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
