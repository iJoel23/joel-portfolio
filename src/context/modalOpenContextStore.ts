import { createContext } from "react"

export type ModalOpenContextValue = {
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
}

export const ModalOpenContext = createContext<ModalOpenContextValue | null>(null)
