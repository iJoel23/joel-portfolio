import { motion, useReducedMotion, type Variants } from "motion/react"
import { useTranslation } from "react-i18next"

type SkillCategory = {
  titleKey:
    | "skills.categories.languages"
    | "skills.categories.frameworks"
    | "skills.categories.styling"
    | "skills.categories.tools"
    | "skills.categories.cms"
  skills: string[]
}

const categories: SkillCategory[] = [
  {
    titleKey: "skills.categories.languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    titleKey: "skills.categories.frameworks",
    skills: ["React", "React Native", "Next.js"],
  },
  {
    titleKey: "skills.categories.styling",
    skills: ["Tailwind CSS", "Bootstrap", "Responsive Design"],
  },
  {
    titleKey: "skills.categories.tools",
    skills: ["Git", "Vite", "Figma", "AI-assisted development"],
  },
  {
    titleKey: "skills.categories.cms",
    skills: ["WordPress (Divi, Elementor)", "Shopify (Liquid)"],
  },
]

const EASE = [0.25, 0.1, 0.25, 1] as const

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

const reducedCategoryVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

function SkillGroup({
  category,
  variants,
}: {
  category: SkillCategory
  variants: Variants
}) {
  const { t } = useTranslation()
  const title = t(category.titleKey)

  return (
    <motion.div
      variants={variants}
      className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-md sm:p-7"
    >
      <h3 className="text-sm font-semibold tracking-wide text-neutral-900 uppercase">
        {title}
      </h3>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label={title}>
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full bg-indigo-50/90 px-3 py-1.5 text-sm font-medium text-indigo-600 backdrop-blur-sm"
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = prefersReducedMotion === true
  const variants = shouldReduceMotion ? reducedCategoryVariants : categoryVariants

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="px-6 py-24 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="skills-heading"
          className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          {t("skills.title")}
        </h2>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <SkillGroup
              key={category.titleKey}
              category={category}
              variants={variants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
