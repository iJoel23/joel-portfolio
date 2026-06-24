import { motion, useReducedMotion, type Variants } from "motion/react"

type Project = {
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  codeUrl?: string
  image: string
}

// TODO: Reemplaza cada entrada con tus proyectos reales
const projects: Project[] = [
  {
    title: "E-Commerce Dashboard",
    description:
      "Panel de administración con métricas en tiempo real, gestión de inventario y reportes exportables.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    image: "/projects/ecommerce-dashboard.png", // TODO: imagen real
  },
  {
    title: "Task Flow App",
    description:
      "Aplicación de productividad con tableros Kanban, arrastrar y soltar, y sincronización en la nube.",
    tech: ["Next.js", "TypeScript", "Prisma"],
    liveUrl: "https://example.com",
    image: "/projects/task-flow.png", // TODO: imagen real
  },
  {
    title: "Weather Widget",
    description:
      "Widget meteorológico minimalista con pronóstico por hora y geolocalización automática.",
    tech: ["React", "OpenWeather API"],
    codeUrl: "https://github.com/example",
    image: "/projects/weather-widget.png", // TODO: imagen real
  },
  {
    title: "Portfolio v2",
    description:
      "Sitio personal con animaciones fluidas, modo oscuro y rendimiento optimizado.",
    tech: ["Vite", "Motion", "Tailwind CSS"],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    image: "/projects/portfolio.png", // TODO: imagen real
  },
]

const EASE = [0.25, 0.1, 0.25, 1] as const

/** Stagger entre tarjetas al entrar en viewport */
const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

/** Reveal de cada tarjeta: fade-in + slide-up */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

const reducedCardVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

function ProjectCard({
  project,
  variants,
}: {
  project: Project
  variants: Variants
}) {
  return (
    <motion.article
      variants={variants}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-shadow hover:shadow-sm"
    >
      {/* TODO: Reemplazar este placeholder por <img src={project.image} alt={...} /> */}
      <div
        className="flex aspect-video items-center justify-center bg-neutral-100"
        aria-hidden="true"
      >
        <span className="text-sm font-medium text-neutral-400">Preview</span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-500 sm:text-base">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
            >
              {item}
            </li>
          ))}
        </ul>

        {(project.liveUrl || project.codeUrl) && (
          <div className="mt-6 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
              >
                Ver sitio →
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-700"
              >
                Código →
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true
  const variants = shouldReduceMotion ? reducedCardVariants : cardVariants

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-white px-6 py-24 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="projects-heading"
          className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          Selected Work
        </h2>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 md:grid-cols-2 md:gap-10"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              variants={variants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
