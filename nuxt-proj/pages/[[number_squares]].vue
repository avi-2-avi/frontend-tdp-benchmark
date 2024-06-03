<template>
  <main>
    <button @click="addSquares">Add Squares</button>

    <p>FPS: {{ fps }}</p>
    <p>
      Render Time:
      {{ renderTime !== null ? `${renderTime}ms` : "N/A" }}
    </p>
    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: `repeat(${numSquares}, 1fr)`,
        gridTemplateRows: `repeat(${numSquares}, 1fr)`,
        width: '100vw',
        height: '100vh',
      }"
    >
      <Square
        v-for="(square, index) in renderSquares"
        :key="index"
        :width="squareSize"
        :height="squareSize"
      />
    </div>
  </main>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  computed,
  nextTick,
} from "vue";
import Square from "@/components/Square.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Square,
  },
  setup() {
    const route = useRoute();
    const numSquares = ref(Number(route.params.number_squares));
    const renderTime = ref<number | null>(null);
    const fps = ref(0);
    const windowSize = reactive({ width: 0, height: 0 });
    const frameCount = ref(0);
    const lastTime = ref(performance.now());
    let animationFrameRef: number;

    const handleResize = () => {
      windowSize.width = window.innerWidth;
      windowSize.height = window.innerHeight;
    };

    const renderSquares = computed(() => {
      const squares = [];
      for (let i = 0; i < numSquares.value; i++) {
        for (let j = 0; j < numSquares.value; j++) {
          squares.push({ width: squareSize.value, height: squareSize.value });
        }
      }
      return squares;
    });

    const squareSize = computed(() => {
      return Math.min(
        windowSize.width / numSquares.value,
        windowSize.height / numSquares.value,
      );
    });

    onMounted(() => {
      handleResize();
      window.addEventListener("resize", handleResize);

      const animate = () => {
        frameCount.value += 1;
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime.value;

        if (deltaTime >= 1000) {
          const currentFPS = (frameCount.value / deltaTime) * 1000;
          fps.value = parseFloat(currentFPS.toFixed(2));
          frameCount.value = 0;
          lastTime.value = currentTime;
        }

        animationFrameRef = requestAnimationFrame(animate);
      };

      animationFrameRef = requestAnimationFrame(animate);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef) {
        cancelAnimationFrame(animationFrameRef);
      }
    });

    const addSquares = async () => {
      const startTime = performance.now();
      numSquares.value += 100;
      renderTime.value = null;

      await nextTick();
      const endTime = performance.now();
      renderTime.value = endTime - startTime;
    };

    return {
      numSquares,
      renderTime,
      fps,
      renderSquares,
      addSquares,
      squareSize,
    };
  },
};
</script>

<style scoped>
/* Add any styles here if needed */
</style>
