import { motion, useReducedMotion, type Variants } from "motion/react"
import { useTranslation } from "react-i18next"
import { useModalOpen } from "../context/useModalOpen"

/** Duración y easing compartidos para el fade-in + slide-up */
const EASE = [0.25, 0.1, 0.25, 1] as const

/** Variantes del contenedor: el stagger retrasa cada hijo secuencialmente */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

/** Cada bloque de texto entra desde abajo con opacidad 0 → 1 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/** Sin movimiento: los elementos aparecen ya en su posición final */
const reducedItemVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const { isModalOpen } = useModalOpen()
  const shouldReduceMotion = prefersReducedMotion === true
  const pauseAurora = shouldReduceMotion || isModalOpen

  const variants = shouldReduceMotion ? reducedItemVariants : itemVariants

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center overflow-x-hidden px-6 py-24 sm:px-10 md:px-16 lg:px-24"
    >
      {/* Aurora de fondo: animación CSS lenta; estática si reduced motion */}
      <div
        aria-hidden="true"
        className={[
          "hero-aurora",
          pauseAurora ? "hero-aurora--static" : "",
        ].join(" ")}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge glass con punto verde pulsante */}
        <motion.div variants={variants} className="mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/40 bg-white/60 px-4 py-1.5 text-sm font-medium text-neutral-700 backdrop-blur-md">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              {!shouldReduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t("hero.badge")}
          </span>
        </motion.div>

        <motion.h1
          id="hero-heading"
          variants={variants}
          className="font-display text-[clamp(2.75rem,7.5vw+0.5rem,6rem)] leading-[1.05] font-semibold tracking-tight text-neutral-900"
        >
          <span className="bg-gradient-to-br from-neutral-900 via-[#3d38a8] to-neutral-800 bg-clip-text text-transparent">
            {t("hero.name")}
          </span>
        </motion.h1>

        <motion.p
          variants={variants}
          className="mt-4 text-base font-medium text-indigo-600 sm:mt-5 sm:text-lg md:text-xl"
        >
          {t("hero.role")}
        </motion.p>

        <motion.p
          variants={variants}
          className="mt-8 max-w-2xl break-words text-lg leading-relaxed text-neutral-600 sm:mt-10 sm:text-xl md:text-2xl"
        >
          {t("hero.description")}
        </motion.p>
      </motion.div>

      {/* Indicador de scroll hacia proyectos */}
      <motion.a
        href="#projects"
        aria-label={t("hero.scrollToProjects")}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-neutral-400 transition-colors hover:text-indigo-600"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          {t("hero.scroll")}
        </span>
        <motion.span
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  )
}
