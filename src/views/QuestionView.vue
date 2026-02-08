<script setup lang="ts">
import { ref } from 'vue'
import QuestionCharacter from '@/components/question/QuestionCharacter.vue'
import YesNoButtons from '@/components/question/YesNoButtons.vue'
import ThankYouCard from '@/components/question/ThankYouCard.vue'
import FallingHearts from '@/components/question/FallingHearts.vue'
import noImg from '@/assets/img/No.png'

const accepted = ref(false)
const rejected = ref(false)
const hoveringYes = ref(false)

function onYes() {
  accepted.value = true
}

function onNo() {
  rejected.value = true
}
</script>

<template>
  <div class="question-view-container">
    <div class="question-view">
      <FallingHearts />
      <div class="question-content">
        <QuestionCharacter :jumping="true" />
        <YesNoButtons
          @yes="onYes"
          @no="onNo"
          @hover-yes="hoveringYes = true"
          @hover-yes-leave="hoveringYes = false"
        />
      </div>

      <div
        v-if="rejected"
        class="no-img-wrap"
        role="dialog"
        aria-modal="true"
        @click="rejected = false"
      >
        <div class="no-img-backdrop" />
        <div class="no-img-inner" @click.stop>
          <img :src="noImg" alt="No" class="no-img" />
        </div>
      </div>
      <ThankYouCard :visible="accepted" />
    </div>
    <p class="footer-text">
      Esta página fue hecha a mano y con un poquito de código, pero sobre todo fue hecha con amor.
    </p>
  </div>
</template>

<style scoped>
.question-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  min-height: 90dvh;
  text-align: center;
}

.footer-text {
  color: #908373;
  font-size: 0.8rem;
  font-style: italic;
}

.question-view {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
}

.question-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.no-img-wrap {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  cursor: pointer;
}

.no-img-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: -1;
}

.no-img-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.no-img {
  max-width: 90vw;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
}
</style>
