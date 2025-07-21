<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { orderBy } from 'lodash-es';
  import { statusRenameDict } from '../../utils/levels';

  import { isVertical } from '../../stores/device';
  import { css } from '../../actions/css';
  import { extractHostname } from '../../utils/misc';

  import Share from '../Share/Share.svelte';

  export let datum;

  function handleClick(id) {
    statusFilter.click(id);
  }

  function getDisplayStatus(status) {
    return statusRenameDict[status] || status;
  }
  
  const dispatch = createEventDispatcher();

  let showOverlayCloseButton = false;

  function close() {
    dispatch('close');
  }

  function handleKeydown(e) {
    if (e.keyCode === 27) { // esc
      close();
    }
  }

  function handleScroll() {
    showOverlayCloseButton = true;
  }

  function handleCategoryClick(category, name) {
    dispatch('categoryclick', { category, name });
    close();
  }

  $: categories = orderBy(Object.keys(datum.categories).map(key => {
    return {
      category: key,
      ...datum.categories[key]
    };
  }),
  'filterable', 'desc');
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="modal"
  use:css={{statusColor: datum.categories.new_status.color}}
  transition:fade={{duration: 200}}
>
  <div
    class="modal-outer"
    on:click={close}
  >
  </div>
  <div
    class="modal-inner"
    on:scroll={handleScroll}
  >
    {#if ($isVertical && showOverlayCloseButton)}
      <button
        class="close-button overlay"
        on:click={close}
        transition:fade
      >
        <span>+</span>
      </button>
    {/if}
    <div
      class="header"
    >
      <div class="header-top-line">
        <button
          class="close-button"
          on:click={close}
        >
          <span>+</span>
        </button>
      </div>
      <div class="header-content">
        <h1>{datum.name.name === 'United States of America' ? 'United States' : datum.name.name}</h1>
        {#if (datum.digital_id_name)} 
          <h2>Project Name – {datum.digital_id_name}</h2>
        {/if}
        <p>{datum.overview}</p>
      </div>
    </div>
    <div class="body">
      <div class="categories-wrapper">
        <h2>Properties<span class="small">(Click to filter)</span></h2>
        <div class="categories">
          {#each categories as cat (cat.title)}
            <div
              class="category"
              use:css={{chipColor: cat.color}}
            >
              <h3>{cat.title}</h3>
              {#if (cat.filterable)}
                <button
                  class="chip"
                  on:click={() => handleCategoryClick(cat.category, cat.name)}
                >
                {getDisplayStatus(cat.name)}
                </button>
              {:else}
                <span>{getDisplayStatus(cat.name)}
                </span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      <main>
        <h2>Key developments</h2>
        <p>{@html datum.key_developments.replace(/\n/g, '<br>')}</p>
        <h4>Sources</h4>
        <div class="sources">
          {#if (datum.sources.managing_authority_name)}
            <a href={datum.sources.managing_authority_url} target="_blank">{datum.sources.managing_authority_name}</a>
          {/if}
          <p>Atlantic Council Research</p>
          {#if (datum.sources.media_urls.length)}
            <ul class="media-sources">
              {#each datum.sources.media_urls as url}
                <li><a href={url} target="_blank">{extractHostname(url)}</a></li>
              {/each}
            </ul>
          {/if}
        </div>
        <h4>Share</h4>
        <div class="share-panel">
          <Share />
        </div>
      </main>
    </div>
  </div>
</div>

<style>
  .modal {
  position: fixed;
  left: 0; top: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-family: var(--primFont, 'Inter', 'Segoe UI', Arial, sans-serif);
  background: rgba(30, 41, 59, 0.10);
  backdrop-filter: blur(4px);
}

.modal-outer {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(120deg, #dbeafe 10%, #f7faff 90%);
  opacity: 0.75;
  z-index: 1;
  border-radius: 0 0 2em 2em;
}

.modal-inner {
  position: relative;
  z-index: 2;
  width: 98vw;
  max-width: 800px;
  min-height: 420px;
  max-height: 90vh;
  margin: 0 auto;
  background: rgba(255,255,255,0.98);
  border-radius: 2.5em;
  box-shadow: 0 20px 56px #aee9f844, 0 2px 20px #6ed1e733;
  border: 3.2px solid #aee9f8;
  overflow-y: auto;
  animation: modalPop .4s cubic-bezier(.3,1.6,.4,1) 1;
}

@keyframes modalPop {
  0%   { opacity: 0; transform: scale(0.90) translateY(30px);}
  100% { opacity: 1; transform: scale(1) translateY(0);}
}

@media (min-width: 980px) {
  .modal-inner {
    width: 70vw;
    max-width: 1200px;
    min-height: 480px;
    max-height: 92vh;
  }
}

.header {
  width: 100%;
  padding: 2.2rem 1.2rem 1.4rem 1.2rem;
  background: linear-gradient(90deg, #aee9f8 10%, #6ed1e7 90%);
  border-radius: 2.5em 2.5em 0 0;
  box-shadow: 0 6px 22px #6ed1e722;
  position: relative;
  color: #134166;
  text-align: center;
}

.header-top-line {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.close-button {
  width: 48px;
  height: 48px;
  color: #fff;
  background: linear-gradient(90deg, #aee9f8 0%, #6ed1e7 100%);
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 2.3rem;
  font-weight: bold;
  margin: 0.3em 0.7em 0 0;
  box-shadow: 0 2px 12px #6ed1e744;
  transition: box-shadow 0.16s, background 0.16s, color 0.13s, transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-button span {
  font-size: 2.5rem;
  transform: rotate(45deg);
}
.close-button:hover {
  background: linear-gradient(90deg, #6ed1e7 0%, #aee9f8 100%);
  color: #1b4965;
  box-shadow: 0 7px 24px #6ed1e744;
  transform: scale(1.12) rotate(6deg);
}

.close-button.overlay {
  position: fixed;
  right: 40px;
  bottom: 150px;
  z-index: 20000;
  background: linear-gradient(90deg, #aee9f8 0%, #6ed1e7 100%);
  color: #1b4965;
  font-size: 1.8rem;
}

.header-content {
  width: 100%;
  padding: 0 1rem;
}

.header-content h1 {
  margin: 2.2rem 0 1.1rem 0;
  font-size: 2.6rem;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: #1b4965;
}

.header-content h2 {
  margin: 0.5rem 0 1.2rem 0;
  font-size: 1.45rem;
  color: #0582ca;
  font-weight: 700;
}

.header-content p {
  width: 100%;
  max-width: 850px;
  margin: 0.4em auto 0 auto;
  color: #234;
  font-size: 1.13rem;
  opacity: 0.86;
}

@media (min-width: 980px) {
  .header-content {
    padding: 0 3rem;
  }
  .header-content h1 {
    font-size: 3.2rem;
  }
}

.body {
  display: flex;
  flex-direction: column;
  gap: 2.3em;
  padding: 2em 1.5em;
}

@media (min-width: 980px) {
  .body {
    flex-direction: row;
    gap: 2.7em;
    padding: 2.3em 3em;
  }
}

.categories-wrapper {
  flex: 0 0 300px;
  padding: 0.7em 0.5em 1.2em 0.5em;
  background: linear-gradient(120deg, #f0fbfe 75%, #f7faff 100%);
  border-radius: 1.5em;
  box-shadow: 0 2px 16px #aee9f822;
  text-align: left;
}

.categories-wrapper h2 {
  margin-bottom: 0.7em;
  font-size: 1.2rem;
  color: #156385;
  font-weight: 800;
}

.small {
  display: inline-block;
  margin: 0 0.4rem;
  font-size: 1rem;
  color: #4d7eae;
}

.categories {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.9em;
}

.category {
  margin: 0.3rem 0;
  padding: 0.7rem 1.1rem;
  background: linear-gradient(90deg, #c9e7fa 10%, #f0fbfe 100%);
  border-radius: 1.1em;
  box-shadow: 0 2px 10px #6ed1e722;
  transition: box-shadow 0.11s, background 0.12s;
}
.category h3 {
  color: #156385;
  font-size: 1.12rem;
  font-weight: 700;
  margin-bottom: 0.3em;
}
.category span, .chip {
  display: inline-block;
  margin: 0.25rem 0 0.25rem 0;
  color: #156385;
  font-size: 1.05rem;
  opacity: 0.85;
  background: #e3f2fd;
  border-radius: 0.7em;
  padding: 0.17rem 0.9rem;
  font-weight: 700;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 0.18s, color 0.13s;
}
.chip {
  background: linear-gradient(90deg, var(--chipColor, #2196f3) 40%, #00b4d8 100%);
  color: #fff;
  margin-left: 0.4em;
}
.chip:hover {
  background: linear-gradient(90deg, #00b4d8 40%, var(--chipColor, #2196f3) 100%);
  color: #e3f2fd;
}

main {
  flex: 1;
  background: #f7faff;
  border-radius: 1.2em;
  box-shadow: 0 2px 10px #aee9f822;
  padding: 2em 1.2em;
}

main h2 {
  margin: 0.7rem 0 0.7rem 0;
  color: #196aa5;
  font-size: 1.29rem;
  font-weight: 700;
}

main h4 {
  margin: 1.7rem 0 0.7rem 0;
  color: #156385;
  font-size: 1.09rem;
}

.sources {
  margin: 0.7em 0 1.2em 0;
}
.sources ul.media-sources {
  margin: 0.4em 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.18em;
  list-style-type: none;
}
.sources ul.media-sources li {
  margin: 0 0.6em 0 0;
  padding: 0;
}
.sources a {
  font-size: 1.1rem;
  line-height: 1.2;
  color: #0093e9;
  text-decoration: underline dotted #2196f3;
  transition: color 0.14s;
}
.sources a:hover {
  color: #2b50ec;
  text-decoration: underline solid #2b50ec;
}
.sources p {
  margin: 0.3rem 0 0.2rem 0;
  font-size: 1.06rem;
  line-height: 1.3;
  color: #3d4852;
}

.share-panel {
  margin: 0.5rem 0 1.1rem 0;
  text-align: left;
}
</style>