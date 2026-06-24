import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

type LanguageTransitionProps = {
  children: ReactNode
}

/** Fade suave al cambiar idioma (solo opacity) */
export default function LanguageTransition({ children }: LanguageTransitionProps) {
  const { i18n } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true
  const language = i18n.language.startsWith("es") ? "es" : "en"

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="will-change-[opacity]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
