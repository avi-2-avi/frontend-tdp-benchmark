<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { getRandomColor, getRandomInterval } from './../helpers'
  
  export let width: number;
  export let height: number;

  const color = writable("#FFFFFF");
  let interval: number;

  onMount(() => {
    const changeColor = () => {
      color.set(getRandomColor());
    };

    interval = setInterval(changeColor, getRandomInterval());
  });

  onDestroy(() => clearInterval(interval));
</script>

<div style="width: {width}px; height: {height}px; background-color: {$color}" />
