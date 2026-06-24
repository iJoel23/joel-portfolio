import { motion, useReducedMotion, type Variants } from "motion/react"

const EASE = [0.25, 0.1, 0.25, 1] as const

/** Stagger entre imagen y bloque de texto al entrar en viewport */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

/** Reveal de cada bloque: fade-in + slide-up */
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
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true
  const variants = shouldReduceMotion ? reducedItemVariants : itemVariants

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white px-6 py-24 sm:px-10 md:px-16 lg:px-24"
    >
      <motion.div
        className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* TODO: Reemplazar por <img src="..." alt="Joel Leon" className="aspect-square w-full rounded-2xl object-cover" /> */}
        <motion.div
          variants={variants}
          className="flex aspect-square w-full max-w-sm items-center justify-center rounded-2xl bg-neutral-100 md:max-w-none"
          aria-hidden="true"
        >
          <span className="text-sm font-medium text-neutral-400">Foto</span>
        </motion.div>

        <motion.div variants={variants} className="flex flex-col">
          <h2
            id="about-heading"
            className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
          >
            About
          </h2>

          {/* TODO: Reemplaza con tu párrafo principal */}
          <p className="mt-6 text-lg leading-relaxed text-neutral-900 sm:text-xl">
            Soy desarrollador frontend con pasión por crear experiencias web
            claras, rápidas y accesibles.
          </p>

          {/* TODO: Reemplaza con tu narrativa */}
          <p className="mt-4 text-base leading-relaxed text-neutral-500">
            Llevo varios años trabajando con React y el ecosistema moderno de
            JavaScript, desde prototipos hasta productos en producción.
          </p>

          <p className="mt-4 text-base leading-relaxed text-neutral-500">
            Fuera del código, me interesa el diseño de interfaces, la
            performance web y seguir aprendiendo herramientas que mejoren cómo
            construimos para la web.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
