import { useContext } from "react"
import { ModalOpenContext } from "./modalOpenContextStore"

export function useModalOpen() {
  const context = useContext(ModalOpenContext)
  if (!context) {
    throw new Error("useModalOpen debe usarse dentro de ModalOpenProvider")
  }
  return context
}
