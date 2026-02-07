import { ref, type Ref, onMounted } from 'vue'
import { Howl } from 'howler'
import popSoundUrl from '@/assets/sounds/PopSound.mp3'

const popSound = new Howl({ src: [popSoundUrl] })

export interface GameHeart {
  id: number
  x: number
  y: number
}

export const CHARACTER_SIZE = 72
export const HEART_SIZE = 48
export const MESSAGE_DURATION_MS = 2200

const CATCH_RADIUS = (CHARACTER_SIZE + HEART_SIZE) / 2
/** Distancia mínima entre centros de corazones para que no se amontonen */
const MIN_HEART_DISTANCE = 85
const MAX_POSITION_RETRIES = 80

const CATCH_MESSAGES = [
  'Eres la persona mas especial de mi vida',
  'Contigo aprendi a amar',
  'Eres mi día más esperado de la semana',
  'Soy feliz contigo',
  'Eres la persona que me hace sentir vivo',
  'Contigo todo es mejor',
  'Gracias por estar en mi vida',
  'Eres lo más especial que me ha pasado',
  'Te amo',
]

export const HEARTS_TO_WIN = CATCH_MESSAGES.length

export function useCatchGame(arenaRef: Ref<HTMLElement | null>) {
  const characterPos = ref({ x: 200, y: 200 })
  const hearts = ref<GameHeart[]>([])
  const caughtCount = ref(0)
  const isPaused = ref(false)
  const currentMessage = ref('')
  const gameWon = ref(false)
  const isDragging = ref(false)
  const dragOffset = ref({ x: 0, y: 0 })

  const usedMessageIndices = ref<Set<number>>(new Set())

  function getRandomMessage(): string {
    if (usedMessageIndices.value.size >= CATCH_MESSAGES.length) {
      usedMessageIndices.value.clear()
    }
    let idx: number
    do {
      idx = Math.floor(Math.random() * CATCH_MESSAGES.length)
    } while (usedMessageIndices.value.has(idx))
    usedMessageIndices.value.add(idx)
    return CATCH_MESSAGES[idx] ?? CATCH_MESSAGES[0] ?? 'Te amo'
  }

  function randomHeartPosition(): { x: number; y: number } {
    const padding = 60
    const w = (arenaRef.value?.clientWidth ?? 300) - padding * 2
    const h = (arenaRef.value?.clientHeight ?? 400) - padding * 2
    return {
      x: padding + Math.random() * Math.max(0, w),
      y: padding + Math.random() * Math.max(0, h),
    }
  }

  function heartCenterX(x: number) {
    return x + HEART_SIZE / 2
  }
  function heartCenterY(y: number) {
    return y + HEART_SIZE / 2
  }

  function isPositionFarEnough(
    x: number,
    y: number,
    existing: { x: number; y: number }[],
    minDist: number,
  ): boolean {
    const cx = heartCenterX(x)
    const cy = heartCenterY(y)
    for (const other of existing) {
      const d = distance(cx, cy, heartCenterX(other.x), heartCenterY(other.y))
      if (d < minDist) return false
    }
    return true
  }

  function initHearts() {
    const list: GameHeart[] = []
    const padding = 60
    const w = (arenaRef.value?.clientWidth ?? 300) - padding * 2
    const h = (arenaRef.value?.clientHeight ?? 400) - padding * 2

    for (let i = 0; i < HEARTS_TO_WIN; i++) {
      let pos = randomHeartPosition()
      let tries = 0
      const existing = list.map((heart) => ({ x: heart.x, y: heart.y }))
      while (
        !isPositionFarEnough(pos.x, pos.y, existing, MIN_HEART_DISTANCE) &&
        tries < MAX_POSITION_RETRIES
      ) {
        pos = randomHeartPosition()
        tries++
      }
      list.push({ id: i, x: pos.x, y: pos.y })
    }
    hearts.value = list
  }

  function clampPosition(x: number, y: number) {
    const el = arenaRef.value
    if (!el) return { x, y }
    const w = el.clientWidth
    const h = el.clientHeight
    const r = CHARACTER_SIZE / 2
    return {
      x: Math.max(r, Math.min(w - r, x)),
      y: Math.max(r, Math.min(h - r, y)),
    }
  }

  function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.hypot(x2 - x1, y2 - y1)
  }

  function checkCatch() {
    const cx = characterPos.value.x
    const cy = characterPos.value.y
    const caught = hearts.value.find(
      (h) => distance(cx, cy, h.x + HEART_SIZE / 2, h.y + HEART_SIZE / 2) < CATCH_RADIUS,
    )
    if (caught) {
      popSound.play()
      hearts.value = hearts.value.filter((h) => h.id !== caught.id)
      caughtCount.value += 1
      currentMessage.value = getRandomMessage()
      isPaused.value = true
      setTimeout(() => {
        isPaused.value = false
        if (caughtCount.value >= HEARTS_TO_WIN) {
          gameWon.value = true
        }
      }, MESSAGE_DURATION_MS)
    }
  }

  function onPointerDown(e: PointerEvent) {
    if (gameWon.value || isPaused.value) return
    const rect = arenaRef.value?.getBoundingClientRect()
    if (!rect) return
    isDragging.value = true
    dragOffset.value = {
      x: e.clientX - rect.left - characterPos.value.x,
      y: e.clientY - rect.top - characterPos.value.y,
    }
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging.value) return
    const rect = arenaRef.value?.getBoundingClientRect()
    if (!rect) return
    characterPos.value = clampPosition(
      e.clientX - rect.left - dragOffset.value.x,
      e.clientY - rect.top - dragOffset.value.y,
    )
  }

  function onPointerUp(e: PointerEvent) {
    if (!isDragging.value) return
    ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
    isDragging.value = false
    checkCatch()
  }

  function centerCharacter() {
    const el = arenaRef.value
    if (!el) return
    characterPos.value = clampPosition(el.clientWidth / 2, el.clientHeight / 2)
  }

  onMounted(() => {
    initHearts()
    centerCharacter()
  })

  return {
    characterPos,
    hearts,
    caughtCount,
    isPaused,
    currentMessage,
    gameWon,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
}
