import { ref, onMounted, onUnmounted } from 'vue'
import type { ChatMessageConfig } from '@/interfaces/chat'

export interface SequentialMessage extends ChatMessageConfig {
    sender: 'other' | 'me'
}

/** Pausa (ms) entre que aparece un mensaje y se muestran los 3 puntos — da tiempo a "respirar" */
export const PRE_TYPING_DELAY_MS = 700

/**
 * Shows messages one by one with configurable delays.
 * @param messages - List of message configs (order = display order)
 * @returns visibleMessages (reactive), allShown (reactive), and reset()
 */
export function useSequentialMessages(messages: SequentialMessage[]) {
    const visibleCount = ref(0)
    const allShown = ref(false)
    /** true mientras se espera mostrar el siguiente mensaje de "other" */
    const isOtherTyping = ref(false)

    const visibleMessages = ref<SequentialMessage[]>([])

    const timeouts: ReturnType<typeof setTimeout>[] = []

    function schedule() {
        if (messages.length > 0 && messages[0]?.sender === 'other') {
            timeouts.push(setTimeout(() => { isOtherTyping.value = true }, PRE_TYPING_DELAY_MS))
        }
        let cumulativeMs = 0
        for (let i = 0; i < messages.length; i++) {
            const delay = i === 0 ? 0 : (messages[i - 1]?.delayAfterPreviousMs ?? 0)
            cumulativeMs += delay
            const ms = cumulativeMs
            const index = i
            timeouts.push(
                setTimeout(() => {
                    isOtherTyping.value = false
                    visibleCount.value = index + 1
                    visibleMessages.value = messages.slice(0, index + 1)
                    if (index === messages.length - 1) {
                        allShown.value = true
                    } else if (messages[index + 1]?.sender === 'other') {
                        timeouts.push(
                            setTimeout(() => { isOtherTyping.value = true }, PRE_TYPING_DELAY_MS)
                        )
                    }
                }, ms)
            )
        }
    }

    function reset() {
        timeouts.forEach(clearTimeout)
        timeouts.length = 0
        visibleCount.value = 0
        allShown.value = false
        isOtherTyping.value = false
        visibleMessages.value = []
        schedule()
    }

    onMounted(schedule)
    onUnmounted(() => timeouts.forEach(clearTimeout))

    return { visibleMessages, allShown, isOtherTyping, reset }
}
