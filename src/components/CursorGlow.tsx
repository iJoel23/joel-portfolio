import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"
import { useEffect, useState } from "react"
import { useModalOpen } from "../context/ModalOpenContext"

/** Suavizado del seguimiento: más damping = menos rebote */
const SPRING = { stiffness: 150, damping: 22, mass: 0.45 }

export default function CursorGlow() {
  const prefersReducedMotion = useReducedMotion()
  const { isModalOpen } = useModalOpen()
  const [hasFinePointer, setHasFinePointer] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  const isActive =
    hasFinePointer && prefersReducedMotion !== true && !isModalOpen

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)")

    const updatePointer = () => setHasFinePointer(media.matches)
    updatePointer()

    media.addEventListener("change", updatePointer)
    return () => media.removeEventListener("change", updatePointer)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const handleMove = (event: MouseEvent) => {
      rawX.set(event.clientX)
      rawY.set(event.clientY)
    }

    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMove)
  }, [isActive, rawX, rawY])

  if (!isActive) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-0 left-0 h-[38rem] w-[38rem] opacity-75 will-change-transform"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 38%, transparent) 0%, color-mix(in srgb, var(--color-accent-secondary) 28%, transparent) 36%, color-mix(in srgb, var(--color-accent-tertiary) 22%, transparent) 58%, transparent 100%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  )
}
