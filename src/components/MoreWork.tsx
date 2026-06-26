import { motion, useReducedMotion, type Variants } from "motion/react"
import { useTranslation } from "react-i18next"

type MoreItem = { name: string; tech: string[]; url: string }

const items: MoreItem[] = [
  {
    name: "Mojo Medical",
    tech: ["WordPress", "Divi"],
    url: "https://www.mojomedical.com/",
  },
  {
    name: "Shea's Lounge",
    tech: ["WordPress", "Divi"],
    url: "https://www.sheasloungeep.com/",
  },
  {
    name: "Corporación S. Valderrama",
    tech: ["WordPress", "Elementor", "WooCommerce", "PHP"],
    url: "https://svalderrama.pe/",
  },
]

const EASE = [0.25, 0.1, 0.25, 1] as const

export default function MoreWork() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASE },
    },
  }

  return (
    <section
      id="more-work"
      aria-labelledby="more-work-heading"
      className="overflow-x-hidden px-6 py-16 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-5xl border-t border-neutral-200/70 pt-10">
        <h2
          id="more-work-heading"
          className="font-display text-xl font-semibold text-neutral-700 md:text-2xl"
        >
          {t("moreWork.title")}
        </h2>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2"
        >
          {items.map((item) => (
            <motion.li
              key={item.name}
              variants={itemVariants}
              className="flex min-w-0 flex-col gap-1 border-b border-neutral-200/60 pb-4"
            >
              <span className="break-words text-base font-medium text-neutral-800">
                {item.name}
              </span>
              <span className="break-words text-sm text-neutral-500">
                {item.tech.join(" · ")}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-1 w-fit text-sm text-accent"
              >
                {t("moreWork.viewSite")} →
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
