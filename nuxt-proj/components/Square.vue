<template>
  <div
    :style="{
      width: width + 'px',
      height: height + 'px',
      backgroundColor: color,
    }"
  ></div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const color = ref("#FFFFFF");

    const changeColor = () => {
      color.value = getRandomColor();
    };

    onMounted(() => {
      const interval = setInterval(changeColor, getRandomInterval());

      onUnmounted(() => {
        clearInterval(interval);
      });
    });

    return {
      color,
    };
  },
};
</script>
