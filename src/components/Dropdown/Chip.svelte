<script>
  import { createEventDispatcher } from 'svelte';

  export let id;
  export let name = '';
  export let hasCloseButton = true;

  const dispatch = createEventDispatcher();

  function handleClose() {
    dispatch('close', { id });
  }
</script>

<span
  class="chip-wrapper"
>
  <span
    class="chip-name"
  >
    {name}
  </span>
  {#if (hasCloseButton)}
    <button
      class="chip-icon"
      on:click={handleClose}
    >
      <span>+</span>
    </button>
  {/if}
</span>

<style>
  .chip-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.22rem 0.85rem 0.22rem 1.1rem;
  color: #1b4965;
  font-size: 1.05rem;
  background: linear-gradient(90deg, #aee9f8 0%, #6ed1e7 100%);
  border-radius: 2em;
  box-shadow: 0 2px 8px #aee9f844;
  user-select: none;
  font-weight: 600;
  transition: box-shadow 0.17s, background 0.19s, color 0.16s;
  margin: 0 0.35em 0.35em 0;
  border: 1.5px solid #6ed1e7;
}

.chip-wrapper:hover, .chip-wrapper:focus-within {
  background: linear-gradient(90deg, #6ed1e7 0%, #aee9f8 100%);
  box-shadow: 0 4px 18px #6ed1e755;
  color: #134166;
}

.chip-name {
  padding-right: 0.4em;
  font-weight: 700;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
  background: none;
}

button.chip-icon {
  font-size: 1.2rem;
  background: linear-gradient(120deg, #ffb6b9 0%, #fae3d9 100%);
  color: #e63946;
  border: none;
  border-radius: 50%;
  margin-left: 0.18em;
  width: 1.7em;
  height: 1.7em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px #fae3d966;
  cursor: pointer;
  outline: none;
  transition: background 0.18s, box-shadow 0.16s, color 0.13s, transform 0.13s;
}

button.chip-icon:hover, button.chip-icon:focus {
  background: linear-gradient(120deg, #fae3d9 0%, #ffb6b9 100%);
  color: #ba1b1d;
  box-shadow: 0 2px 8px #e6394633;
  transform: scale(1.13);
}

button.chip-icon span {
  display: inline-block;
  line-height: 100%;
  transform: rotate(45deg);
  font-size: 1.2em;
  font-weight: bold;
  padding: 0;
}
</style>