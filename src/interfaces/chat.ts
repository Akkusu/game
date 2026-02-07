export type ChatSender = 'other' | 'me'

export interface ChatMessageConfig {
  id: string
  text: string
  /** Delay in ms before showing this message (from previous message; 0 = show immediately) */
  delayAfterPreviousMs: number
  /** Optional avatar URL; if not set, uses default placeholder */
  avatarUrl?: string
  sender?: ChatSender
}
