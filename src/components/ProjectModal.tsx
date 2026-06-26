import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import type { Project } from "./Projects"

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

const SHEET_ENTER_SPRING = { type: "spring" as const, damping: 34, stiffness: 320 }
const EXIT_EASE = [0.32, 0.72, 0, 1] as const
const EXIT_TRANSITION = { duration: 0.32, ease: EXIT_EASE }
const REDUCED_TRANSITION = { duration: 0.01 }

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: EXIT_TRANSITION },
}

const backdropReducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: REDUCED_TRANSITION },
  exit: { opacity: 0, transition: REDUCED_TRANSITION },
}

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: SHEET_ENTER_SPRING },
  exit: { y: "100%", transition: EXIT_TRANSITION },
}

const sheetReducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: REDUCED_TRANSITION },
  exit: { opacity: 0, transition: REDUCED_TRANSITION },
}

function lockBodyScroll() {
  const scrollY = window.scrollY
  const { style } = document.body
  const previous = {
    position: style.position,
    top: style.top,
    left: style.left,
    right: style.right,
    width: style.width,
    overflow: style.overflow,
  }

  style.position = "fixed"
  style.top = `-${scrollY}px`
  style.left = "0"
  style.right = "0"
  style.width = "100%"
  style.overflow = "hidden"

  return () => {
    style.position = previous.position
    style.top = previous.top
    style.left = previous.left
    style.right = previous.right
    style.width = previous.width
    style.overflow = previous.overflow
    window.scrollTo(0, scrollY)
  }
}

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
  const scrollUnlockRef = useRef<(() => void) | null>(null)

  const handleExitComplete = () => {
    scrollUnlockRef.current?.()
    scrollUnlockRef.current = null
  }

  useEffect(() => {
    if (!project) return

    scrollUnlockRef.current = lockBodyScroll()
    closeButtonRef.current?.focus({ preventScroll: true })
  }, [project])

  useEffect(() => {
    return () => {
      scrollUnlockRef.current?.()
      scrollUnlockRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!project) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [project, onClose])

  const backdropMotionVariants = shouldReduceMotion
    ? backdropReducedVariants
    : backdropVariants
  const sheetMotionVariants = shouldReduceMotion
    ? sheetReducedVariants
    : sheetVariants

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[100] isolate h-[100dvh] max-h-[100dvh] w-full overflow-hidden"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.button
            type="button"
            aria-label={t("projects.modal.closeBackdrop")}
            className="fixed inset-0 h-[100dvh] max-h-[100dvh] w-full bg-neutral-950/60 will-change-[opacity]"
            variants={backdropMotionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex max-h-[100dvh] items-end justify-center">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              className="pointer-events-auto flex h-[90dvh] max-h-[90dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-neutral-200 border-b-0 bg-white shadow-2xl will-change-transform lg:border-white/40 lg:bg-white/90 lg:backdrop-blur-md"
              variants={sheetMotionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="relative z-20 shrink-0 border-b border-neutral-100 bg-white px-6 pt-3 pb-3 sm:px-8 lg:border-neutral-100/80 lg:bg-white/90 lg:backdrop-blur-md">
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
                  className="absolute top-3 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-600 transition-colors hover:text-accent sm:right-6 lg:border-white/50 lg:bg-white/70"
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

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain bg-white px-6 pb-8 [-webkit-overflow-scrolling:touch] lg:hidden">
                <ProjectDetails project={project} />
                {project.images.length > 0 && (
                  <div className="mt-8">
                    <ProjectGallery project={project} />
                  </div>
                )}
              </div>

              <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[3fr_2fr] lg:gap-8 lg:overflow-hidden lg:px-8 lg:pb-8">
                <div className="min-h-0 overflow-y-auto overscroll-contain pt-2 [-webkit-overflow-scrolling:touch]">
                  <ProjectGallery project={project} />
                </div>

                <aside className="sticky top-0 self-start overflow-y-auto overscroll-contain pt-2 pb-4 [-webkit-overflow-scrolling:touch]">
                  <ProjectDetails project={project} />
                </aside>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
