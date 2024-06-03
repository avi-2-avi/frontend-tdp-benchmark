<script lang="ts">
  import Square from '$lib/Square.svelte';
  import { writable, get } from 'svelte/store';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  const numSquares = writable<number>(Number($page.params.number_squares));
  const renderTime = writable<number | null>(null);
  const fps = writable<number>(0);
  let squares: any[] = [];

  onMount(() => {
    numSquares.set(Number(get(page).params.number_squares));

    const updateSquares = () => {
      const num = get(numSquares);
      const squareWidth = window.innerWidth / num;
      const squareHeight = window.innerHeight / num;

      squares = [];
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
          squares.push({ id: `${i}-${j}`, width: squareWidth, height: squareHeight });
        }
      }
    };

    numSquares.subscribe(() => {
      updateSquares();
    });

    updateSquares(); // Initialize squares on mount
  });

  const addSquares = () => {
    const startTime = performance.now();
    numSquares.update(n => n + 100);
    renderTime.set(null); // Reset render time

    requestAnimationFrame(() => {
      const endTime = performance.now();
      renderTime.set(endTime - startTime); // Calculate render time
    });
  };
</script>

<main>
  <button on:click={addSquares}>Add Squares</button>

  <p>FPS: {$fps}</p>
  <p>
    Render Time: {#if $renderTime !== null}{$renderTime.toFixed(2)}ms{:else}N/A{/if}
  </p>
  <div
    style="
      display: grid;
      grid-template-columns: repeat({$numSquares}, 1fr);
      grid-template-rows: repeat({$numSquares}, 1fr);
      width: 100vw;
      height: 100vh;
    "
  >
  {#each squares as square}
    <Square width={square.width} height={square.height} />
  {/each}
  </div>
</main>
