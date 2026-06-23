import { motion, useReducedMotion, type Variants } from "motion/react"

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
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true

  const variants = shouldReduceMotion ? reducedItemVariants : itemVariants

  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-screen items-center bg-white px-6 py-24 sm:px-10 md:px-16 lg:px-24"
    >
      <motion.div
        className="mx-auto w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          id="hero-heading"
          variants={variants}
          className="text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Joel Leon
        </motion.h1>

        <motion.p
          variants={variants}
          className="mt-4 text-base font-medium text-indigo-600 sm:mt-5 sm:text-lg md:text-xl"
        >
          Frontend Engineer — React · Next.js · TypeScript
        </motion.p>

        <motion.p
          variants={variants}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-500 sm:mt-10 sm:text-xl md:text-2xl"
        >
          {/* Edita esta frase con tu propuesta de valor */}
          Construyo interfaces rápidas, accesibles y con atención al detalle.
        </motion.p>
      </motion.div>
    </section>
  )
}
