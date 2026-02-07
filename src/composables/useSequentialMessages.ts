import { ref, onMounted, onUnmounted } from 'vue'
import type { ChatMessageConfig } from '@/interfaces/chat'

export interface SequentialMessage extends ChatMessageConfig {
    sender: 'other' | 'me'
}

/**
 * Shows messages one by one with configurable delays.
 * @param messages - List of message configs (order = display order)
 * @returns visibleMessages (reactive), allShown (reactive), and reset()
 */
export function useSequentialMessages(messages: SequentialMessage[]) {
    const visibleCount = ref(0)
    const allShown = ref(false)

    const visibleMessages = ref<SequentialMessage[]>([])

    const timeouts: ReturnType<typeof setTimeout>[] = []

    function schedule() {
        let cumulativeMs = 0
        for (let i = 0; i < messages.length; i++) {
            const delay = i === 0 ? 0 : (messages[i - 1]?.delayAfterPreviousMs ?? 0)
            cumulativeMs += delay
            const ms = cumulativeMs
            const index = i
            timeouts.push(
                setTimeout(() => {
                    visibleCount.value = index + 1
                    visibleMessages.value = messages.slice(0, index + 1)
                    if (index === messages.length - 1) {
                        allShown.value = true
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
        visibleMessages.value = []
        schedule()
    }

    onMounted(schedule)
    onUnmounted(() => timeouts.forEach(clearTimeout))

    return { visibleMessages, allShown, reset }
}
