import { motion, useReducedMotion, type Variants } from "motion/react"
import {
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react"
import { useTranslation } from "react-i18next"
import { useModalOpen } from "../context/ModalOpenContext"
import ProjectModal from "./ProjectModal"

export type Project = {
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  codeUrl?: string
  image: string
  /** Case study: varios párrafos separados por línea en blanco */
  longDescription?: string
  role?: string
  images?: string[]
  year?: string | number
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
    year: 2025,
    role: "Frontend Lead",
    images: ["/projects/ecommerce-1.png", "/projects/ecommerce-2.png"], // TODO: capturas reales
    longDescription:
      "Diseñé e implementé un dashboard administrativo orientado a equipos de operaciones que necesitaban visibilidad en tiempo real sobre ventas e inventario.\n\nEl reto principal fue equilibrar densidad de información con claridad visual, usando gráficos interactivos, filtros avanzados y estados de carga optimistas para una experiencia fluida.",
  },
  {
    title: "Task Flow App",
    description:
      "Aplicación de productividad con tableros Kanban, arrastrar y soltar, y sincronización en la nube.",
    tech: ["Next.js", "TypeScript", "Prisma"],
    liveUrl: "https://example.com",
    image: "/projects/task-flow.png", // TODO: imagen real
    year: 2024,
    role: "Full-stack Developer",
    images: ["/projects/taskflow-1.png", "/projects/taskflow-2.png"], // TODO: capturas reales
    longDescription:
      "Aplicación de productividad inspirada en flujos Kanban con drag-and-drop, etiquetas y sincronización en la nube entre dispositivos.\n\nImplementé arquitectura con Next.js App Router, persistencia con Prisma y optimizaciones de renderizado para tableros con cientos de tarjetas.",
  },
  {
    title: "Weather Widget",
    description:
      "Widget meteorológico minimalista con pronóstico por hora y geolocalización automática.",
    tech: ["React", "OpenWeather API"],
    codeUrl: "https://github.com/example",
    image: "/projects/weather-widget.png", // TODO: imagen real
    year: 2024,
    role: "Frontend Developer",
    images: ["/projects/weather-1.png"], // TODO: capturas reales
    longDescription:
      "Widget meteorológico minimalista con geolocalización automática y pronóstico por hora.\n\nEnfocado en performance y accesibilidad: skeleton states, soporte para unidades métricas/imperiales y diseño responsive para embed en landing pages.",
  },
  {
    title: "Portfolio v2",
    description:
      "Sitio personal con animaciones fluidas, modo oscuro y rendimiento optimizado.",
    tech: ["Vite", "Motion", "Tailwind CSS"],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    image: "/projects/portfolio.png", // TODO: imagen real
    year: 2026,
    role: "Design & Development",
    images: [
      "/projects/portfolio-1.png",
      "/projects/portfolio-2.png",
      "/projects/portfolio-3.png",
    ], // TODO: capturas reales
    longDescription:
      "Rediseño completo del portfolio personal con enfoque en identidad visual, motion design accesible y arquitectura modular en React.\n\nIntegré animaciones con Motion respetando prefers-reduced-motion, fondo ambiental con glows y spotlight interactivo en tarjetas de proyectos.",
  },
]

const EASE = [0.25, 0.1, 0.25, 1] as const
const HOVER_TRANSITION = { duration: 0.28, ease: EASE }

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
  spotlightEnabled,
  onSelect,
}: {
  project: Project
  variants: Variants
  spotlightEnabled: boolean
  onSelect: (project: Project) => void
}) {
  const { t } = useTranslation()
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!spotlightEnabled) return

    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`)
  }

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--mx", "50%")
    event.currentTarget.style.setProperty("--my", "50%")
  }

  const handleActivate = () => onSelect(project)

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect(project)
    }
  }

  const cardStyle = {
    "--mx": "50%",
    "--my": "50%",
  } as CSSProperties

  return (
    <motion.article
      variants={variants}
      style={cardStyle}
      role="button"
      tabIndex={0}
      aria-label={t("projects.openCaseStudy", { title: project.title })}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      onMouseMove={spotlightEnabled ? handleMouseMove : undefined}
      onMouseLeave={spotlightEnabled ? handleMouseLeave : undefined}
      whileHover={spotlightEnabled ? { y: -3 } : undefined}
      transition={HOVER_TRANSITION}
      className={[
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white/60 backdrop-blur-md",
        "shadow-[0_2px_16px_-6px_rgba(0,0,0,0.06)]",
        "transition-[border-color] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
        "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none",
        spotlightEnabled
          ? "border-white/40 hover:border-accent/50"
          : "border-white/40",
      ].join(" ")}
    >
      {spotlightEnabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle 200px at var(--mx) var(--my), color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 72%)",
          }}
        />
      )}

      <div className="relative z-[2] overflow-hidden border-b border-white/30">
        <motion.div
          className="flex aspect-video w-full items-center justify-center bg-white/40 backdrop-blur-sm"
          aria-hidden="true"
          whileHover={spotlightEnabled ? { scale: 1.04 } : undefined}
          transition={HOVER_TRANSITION}
        >
          <span className="text-sm font-medium text-neutral-500">
            {t("projects.preview")}
          </span>
        </motion.div>
      </div>

      <div className="relative z-[2] flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={t("projects.technologies")}>
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded-full bg-indigo-50/90 px-3 py-1 text-xs font-medium text-indigo-600 backdrop-blur-sm"
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
                className="link-underline text-sm font-medium text-indigo-600"
                onClick={(event) => event.stopPropagation()}
              >
                {t("projects.viewSite")}
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm font-medium text-neutral-600"
                onClick={(event) => event.stopPropagation()}
              >
                {t("projects.code")}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true
  const variants = shouldReduceMotion ? reducedCardVariants : cardVariants
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { setModalOpen, isModalOpen } = useModalOpen()

  // Pausa efectos globales (cursor glow, aurora) mientras el modal está abierto
  useEffect(() => {
    setModalOpen(selectedProject !== null)
    return () => setModalOpen(false)
  }, [selectedProject, setModalOpen])

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)")

    const updatePointer = () => setHasFinePointer(media.matches)
    updatePointer()

    media.addEventListener("change", updatePointer)
    return () => media.removeEventListener("change", updatePointer)
  }, [])

  const spotlightEnabled =
    hasFinePointer && !shouldReduceMotion && !isModalOpen

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="overflow-x-hidden px-6 py-24 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="projects-heading"
          className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          {t("projects.title")}
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
              spotlightEnabled={spotlightEnabled}
              onSelect={setSelectedProject}
            />
          ))}
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
