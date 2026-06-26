import { motion, useReducedMotion, type Variants } from "motion/react"
import { useTranslation } from "react-i18next"

const GITHUB_URL = "TODO_GITHUB_URL"
const LINKEDIN_URL = "TODO_LINKEDIN_URL"

const EASE = [0.25, 0.1, 0.25, 1] as const

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

const reducedFooterVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export default function Footer() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true
  const variants = shouldReduceMotion ? reducedFooterVariants : footerVariants

  return (
    <footer className="overflow-x-hidden border-t border-white/30 px-6 py-12 sm:px-10 sm:py-14 md:px-16 lg:px-24">
      <motion.div
        className="mx-auto max-w-5xl"
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
              {t("hero.name")}
            </p>
            <p className="mt-1.5 text-sm text-neutral-500">
              {t("footer.tagline")}
            </p>
          </div>

          <nav aria-label={t("footer.socialNav")}>
            <ul className="flex flex-wrap gap-6">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm font-medium text-neutral-600"
                >
                  {t("common.github")}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm font-medium text-neutral-600"
                >
                  {t("common.linkedin")}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/20 pt-8 text-center text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>{t("footer.copyright")}</p>
          <p className="break-words text-neutral-400">{t("footer.builtWith")}</p>
        </div>
      </motion.div>
    </footer>
  )
}
