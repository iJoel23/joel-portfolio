import { motion, useReducedMotion, type Variants } from "motion/react"
import {
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react"
import { useTranslation } from "react-i18next"
import { useModalOpen } from "../context/useModalOpen"
import ProjectModal from "./ProjectModal"

export type Project = {
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  codeUrl?: string
  images: string[]
  longDescription?: string
  role?: string
  year?: string | number
}

const projects: Project[] = [
  {
    title: "PeruCalcs",
    description:
      "Suite of SEO-optimized financial calculators for the Peruvian market — built for clarity, speed, and accessibility.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "SEO",
      "Accessibility",
    ],
    liveUrl: "https://perucalcs.netlify.app/",
    images: [
      "/PeruCalcs-home.png",
      "/PeruCalcs-calculators.png",
      "/PeruCalcs-functionality.png",
    ],
    year: "2025",
    role: "Frontend Developer",
    longDescription:
      "PeruCalcs is a collection of financial calculators tailored for Peru — from loan and tax tools to everyday number crunching — designed to rank well in search and work flawlessly on mobile.\n\nI built the product with Next.js and TypeScript, focusing on semantic HTML, accessible forms, and performance. Each calculator is a self-contained module with clear UX, validation, and shareable results.\n\nThe project combines SEO best practices (structured metadata, fast LCP) with a clean Tailwind UI that scales as new calculators are added.",
  },
  {
    title: "Developer Portfolio",
    description:
      "Personal portfolio showcasing projects, skills, and contact — with motion design, i18n, and a polished case-study experience.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Motion", "i18n"],
    images: ["/JoelLeon-home.png"],
    liveUrl: "https://ijoel23portfoliov3.netlify.app/",
    year: "2026",
    role: "Design & Development",
    longDescription:
      "This site is my living portfolio: a minimal, performance-conscious showcase built with Vite, React, and TypeScript.\n\nIt features ambient visuals, cursor-driven highlights, scroll reveals, and a bottom-sheet project detail flow — all respecting prefers-reduced-motion.\n\nFull English/Spanish support via react-i18next, with a language-aware CV download and a component architecture ready to grow as I add more case studies.",
  },
  {
    title: "Winning Numbers",
    description:
      "Contributed frontend and CSS architecture improvements to a high-traffic WordPress lottery results platform.",
    tech: [
      "WordPress",
      "CSS Architecture",
      "Git",
      "Pull Requests",
      "QA",
    ],
    liveUrl: "https://winningnumbers.net/",
    images: ["/WinningNumbers-home.png",
      "/WinningNumbers-filters.png",
      "/WinningNumbers-faq.png"
    ],
    year: "2025",
    role: "Frontend Developer",
    longDescription:
      "Winning Numbers is a WordPress-powered site serving lottery results and related content to a broad audience.\n\nI worked within an established codebase — refactoring CSS for maintainability, submitting changes via pull requests, and validating updates through structured QA.\n\nThe focus was reliable delivery in a team workflow: clear diffs, responsive layouts, and consistent patterns across templates.",
  },
  {
    title: "Cardiology Coffee",
    description:
      "Shopify storefront for a specialty coffee brand — custom Liquid templates and responsive styling.",
    tech: ["Shopify", "Liquid", "CSS", "Responsive Design"],
    liveUrl: "https://cardiologycoffee.com/",
    images: [
      "/CardiologyCoffee-home.png",
      "/CardiologyCoffee-testimonials.png",
      "/CardiologyCoffee-timeline.png"
    ],
    year: "2025",
    role: "Shopify Developer",
    longDescription:
      "Cardiology Coffee is a Shopify e-commerce experience for a specialty coffee brand.\n\nI customized theme sections with Liquid, tuned CSS for brand consistency, and ensured the storefront reads well across breakpoints — from product grids to checkout-adjacent flows.\n\nScreenshots coming soon; the live site reflects the current production theme.",
  },
  {
    title: "Inbody Coaching",
    description:
      "WordPress site for a coaching brand — performance, Core Web Vitals, and SEO-focused frontend work.",
    tech: [
      "WordPress",
      "Core Web Vitals",
      "Performance",
      "CSS",
      "SEO",
    ],
    images: ["/Inbody-home.png",
      "/Inbody-insidep.png",
      "/Inbody-insidep2.png"
    ],
    liveUrl: "https://inbody.es/",
    year: "2025",
    role: "Frontend Developer",
    longDescription:
      "Inbody Coaching is a WordPress marketing site for a fitness coaching business.\n\nI improved load performance and Core Web Vitals through asset optimization, lean CSS, and careful template structure — while keeping the design on-brand and easy to update.\n\nSEO fundamentals (headings, meta, semantic markup) were applied so the site could compete locally and convert visitors into leads.",
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

  const previewImage = project.images[0]

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
          className="flex aspect-video w-full items-center justify-center overflow-hidden bg-white/40 backdrop-blur-sm"
          whileHover={spotlightEnabled ? { scale: 1.04 } : undefined}
          transition={HOVER_TRANSITION}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-neutral-500">
              {t("projects.preview")}
            </span>
          )}
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
