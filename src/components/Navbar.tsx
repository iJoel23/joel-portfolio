import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import type { TranslationKey } from "../i18n/typecheck"

type NavLink = {
  labelKey: Extract<TranslationKey, `nav.${string}`>
  href: string
}

const navLinks: NavLink[] = [
  { labelKey: "nav.work", href: "#projects" },
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.stack", href: "#skills" },
  { labelKey: "nav.contact", href: "#contact" },
]

function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const current = i18n.language.startsWith("es") ? "es" : "en"

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-neutral-200/80 bg-white/60 p-0.5 text-xs font-medium backdrop-blur-sm"
      role="group"
      aria-label={t("nav.languageToggle")}
    >
      <button
        type="button"
        aria-pressed={current === "en"}
        aria-label="English"
        className={[
          "rounded-full px-2.5 py-1 transition-colors",
          current === "en"
            ? "bg-indigo-600 text-white"
            : "text-neutral-500 hover:text-indigo-600",
        ].join(" ")}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={current === "es"}
        aria-label="Español"
        className={[
          "rounded-full px-2.5 py-1 transition-colors",
          current === "es"
            ? "bg-indigo-600 text-white"
            : "text-neutral-500 hover:text-indigo-600",
        ].join(" ")}
        onClick={() => i18n.changeLanguage("es")}
      >
        ES
      </button>
    </div>
  )
}

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="fixed top-0 z-50 w-full overflow-x-hidden border-b border-neutral-100/80 bg-white/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-6 sm:px-10 md:px-16 lg:px-24"
        aria-label="Navegación principal"
      >
        <a
          href="#hero"
          className="link-underline min-w-0 shrink truncate text-sm font-semibold tracking-tight text-neutral-900 sm:text-base"
          onClick={closeMenu}
        >
          Joel Leon
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-sm font-medium text-neutral-500"
                >
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-600 transition-colors hover:text-indigo-600"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setIsOpen((open) => !open)}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="border-t border-neutral-100/80 bg-white/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-6 py-4 sm:px-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="link-underline block py-3 text-sm font-medium text-neutral-600"
                    onClick={closeMenu}
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
