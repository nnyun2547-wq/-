import { createContext, useContext } from 'react'

interface FeedbackContextValue {
  showToast: (message: string) => void
}

export const FeedbackContext = createContext<FeedbackContextValue | null>(null)

export function useFeedback() {
  const context = useContext(FeedbackContext)
  if (!context) throw new Error('useFeedback must be used inside FeedbackProvider')
  return context
}
