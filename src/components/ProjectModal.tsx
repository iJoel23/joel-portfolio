import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import type { Project } from "./Projects"

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

const SHEET_SPRING = { type: "spring" as const, damping: 34, stiffness: 320 }

function ProjectGallery({ project }: { project: Project }) {
  if (!project.images.length) return null

  return (
    <div className="space-y-4">
      {project.images.map((src, index) => (
        <div
          key={`${project.title}-image-${index}`}
          className="aspect-video overflow-hidden rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm"
        >
          <img
            src={src}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
        {project.year && <span>{project.year}</span>}
        {project.year && project.role && <span aria-hidden="true">·</span>}
        {project.role && <span>{project.role}</span>}
      </div>

      <h2 className="font-display mt-2 break-words text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        {project.title}
      </h2>

      {project.longDescription && (
        <div className="mt-5 space-y-4">
          {project.longDescription.split("\n\n").map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base leading-relaxed text-neutral-600"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <ul
        className="mt-6 flex flex-wrap gap-2"
        aria-label={t("projects.modal.technologies")}
      >
        {project.tech.map((item) => (
          <li
            key={item}
            className="rounded-full bg-indigo-50/90 px-3 py-1.5 text-sm font-medium text-indigo-600 backdrop-blur-sm"
          >
            {item}
          </li>
        ))}
      </ul>

      {(project.liveUrl || project.codeUrl) && (
        <div className="mt-8 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-medium text-indigo-600"
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
            >
              {t("projects.code")}
            </a>
          )}
        </div>
      )}
    </>
  )
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [project])

  useEffect(() => {
    if (!project) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [project, onClose])

  const sheetInitial = shouldReduceMotion ? { opacity: 0 } : { y: "100%" }
  const sheetAnimate = shouldReduceMotion ? { opacity: 1 } : { y: 0 }
  const sheetExit = shouldReduceMotion ? { opacity: 0 } : { y: "100%" }

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <motion.button
            type="button"
            aria-label={t("projects.modal.closeBackdrop")}
            className="absolute inset-0 bg-neutral-900/40 will-change-[opacity]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClose}
          />

          <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              className="pointer-events-auto flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-white/40 border-b-0 bg-white/90 shadow-2xl backdrop-blur-md will-change-transform"
              initial={sheetInitial}
              animate={sheetAnimate}
              exit={sheetExit}
              transition={
                shouldReduceMotion ? { duration: 0.2 } : SHEET_SPRING
              }
              onClick={(event) => event.stopPropagation()}
            >
              <header className="sticky top-0 z-20 shrink-0 bg-white/90 px-6 pt-3 pb-2 backdrop-blur-md sm:px-8">
                <div
                  className="flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="h-1 w-10 rounded-full bg-neutral-300" />
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label={t("projects.modal.close")}
                  className="absolute top-3 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/70 text-neutral-600 transition-colors hover:text-accent sm:right-6"
                  onClick={onClose}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </header>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-8 lg:hidden">
                <ProjectDetails project={project} />
                {project.images.length > 0 && (
                  <div className="mt-8">
                    <ProjectGallery project={project} />
                  </div>
                )}
              </div>

              <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[3fr_2fr] lg:gap-8 lg:overflow-hidden lg:px-8 lg:pb-8">
                <div className="min-h-0 overflow-y-auto overscroll-contain pt-2">
                  <ProjectGallery project={project} />
                </div>

                <aside className="sticky top-0 self-start overflow-y-auto overscroll-contain pt-2 pb-4">
                  <ProjectDetails project={project} />
                </aside>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
