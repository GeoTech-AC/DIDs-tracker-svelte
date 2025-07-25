<script>
  import { clickOutside } from '../../actions/clickoutside';
  import { setFocus } from '../../actions/focus';
  import { areAllSelected, hasOverlap } from "../../utils/logic";
  import { questionMark } from '../../utils/icons';
  import { getCoords } from '../../utils/misc';
  import { statusRenameDict } from '../../utils/levels';

  function getDisplayStatus(status) {
    return statusRenameDict[status] || status;
  }
  
  import Icon from 'svelte-awesome';
  import Chip from './Chip.svelte';
  import BarChart from './BarChart.svelte';
  import Suggestion from './Suggestion.svelte';

  export let filter;
  export let label = '';
  export let shortCuts = [];
  export let fullRollup = [];
  export let rollup = [];
  export let info = null;
  export let tooltip = null;
  export let showReset = false;
  export let hideColorBoxes = false;
  export let showClickHint = false;

  let searchValue = '';
  let hoveredSuggestion = null;
  let showSuggestions = false;
  let chips = [];
  let infoElem;
  $: isScrollable = suggestions.length > 7;

  function handleInfo(show) {
    if (!info || !infoElem) return;
    if (show && !$tooltip) {
      const { x, y, width, height } = getCoords(infoElem);
      tooltip.set({
        info,
        x: x + width / 2,
        y: y + height
      });
      return;
    }
    tooltip.set(null);
  }

  function handleResetClick() {
    filter.selectAll();
  }

  function handleShowSuggestions() {
    hoveredSuggestion = 0;
    showSuggestions = true;
  }

  function handleFieldClickOutside() {
    showSuggestions = false;
    searchValue = '';
  }

  function handleKeydown(e) {
    if (e.keyCode === 27) { // esc
      searchValue = '';
      showSuggestions = false;
    }
    
    if (showSuggestions) {
      if (hoveredSuggestion !== null) {
        if (e.keyCode === 13) { // enter
          const s = suggestions[hoveredSuggestion];
          handleSuggestionSelect(s.id, s.type);
        }
      }
    
      if (e.keyCode === 38) { // arrow up
        hoveredSuggestion = Math.max(hoveredSuggestion - 1, 0);
      } else if (e.keyCode === 40) { // arrow down
        hoveredSuggestion = Math.min(hoveredSuggestion + 1, suggestions.length - 1);
      }
    }
  }

  function handleSuggestionSelect(id, type) {
    if (type === 'shortcut') {
      const { items } = shortCuts.find(d => d.id === id) || {};
      filter.unselectAll();
      filter.select(items);
    } else {
      filter.click(id);
    }
    showSuggestions = false;
  }

  $: id = `dropdown_${label.toLowerCase()}`;

  $: {
    let prelimChips = $filter.filter(d => d.selected);
    if (prelimChips.length === $filter.length) {
      prelimChips = [];
    }
    chips = prelimChips;
  }

  $: suggestions = [...shortCuts.map(d => ({...d, type: 'shortcut'})), ...$filter].filter(d => {
    if (!searchValue) return true;
    const regexp = new RegExp(searchValue, 'gi');
    return regexp.test(d.name);
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="dropdown">
  <label
    class:active={showSuggestions}
    for={id}
  >
    <span
      class="title"
    >
      {label}
      {#if (info)}
        <button
          class="info"
          bind:this={infoElem}
          on:mouseenter={() => handleInfo(true)}
          on:mouseleave={() => handleInfo(false)}
        >
          <Icon data={questionMark} />
        </button>
      {/if}
    </span>
    {#if (showReset && chips.length)}
  <button on:click={handleResetClick}>
    <span>Reset</span>
    <span class="reset">+</span>
  </button>
  {/if}
  </label>
  <div
    class="field"
    on:click={() => showSuggestions = true}
    use:clickOutside={handleFieldClickOutside}
  >
    {#if (showClickHint && !chips.length)}
      <span class="click-hint">
        {showClickHint}
      </span>
    {/if}
    <ul class="chips">
      {#each chips as { id, name} (id)}
        <li>
          <Chip
            id={id}
            name={getDisplayStatus(name)}
            on:close={() => handleSuggestionSelect(id)}
          />
        </li>
      {/each}
    </ul>
  </div>
  <BarChart
    rollup={rollup}
    fullRollup={fullRollup}
    dummy={!rollup.length || !fullRollup.length}
  />
  {#if (showSuggestions)}
    <div class="suggestions">
      <input
        id={id}
        type="text"
        placeholder="Search..."
        autocomplete="off"
        spellcheck="off"
        bind:value={searchValue}
        on:focus={handleShowSuggestions}
        on:click|stopPropagation
        use:setFocus
      />
      <ul class="suggestions-list" class:scrollable={isScrollable}>
        {#each suggestions as { id, name, type }, i (id)}
          <Suggestion
            name={getDisplayStatus(name)}
            fullRollup={fullRollup.find(d => d.name === name)}
            rollup={rollup.find(d => d.name === name)}
            bold={type && type === 'shortcut'}
            isActive={hoveredSuggestion === i}
            isSelected={!areAllSelected($filter) && hasOverlap([id], $filter)}
            showColorBox={!hideColorBoxes}
            on:mouseenter={() => hoveredSuggestion = i}
            on:mouseleave={() => hoveredSuggestion = null}
            on:click={() => handleSuggestionSelect(id, type)}
          />
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    width: 100%;
    font-family: var(--primFont);
    user-select: none;
    --inputHeight: 40px;
  }

  label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    color: var(--darkgray);
    font-size: 1rem;
  }

  label.active {
    color: var(--primBlack);
  }

  label button {
    display: flex;
    align-items: center;
    color: var(--darkgray);
    font-size: 0.9rem;
    line-height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  label button:hover {
    color: var(--primBlack);
  }

  label span.title {
    display: flex;
  }

  label span.title button.info {
    margin: 0 0.3rem;
  }

  :global(.dropdown .fa-icon) {
    fill: var(--darkgray) !important;
  }

  :global(.dropdown button.info:hover .fa-icon) {
    fill: var(--tertBlue) !important;
  }

  :global(.dropdown .fa-icon path:not(:first-child)) {
    display: none;
  }

  label button, .suggestions input {
    /* background: linear-gradient(90deg, #80d0c7 0%, #0093e9 100%); */
    background: #82eeff;
    color: #fff;
    border-radius: 1em;
    border: none;
    font-weight: 600;
    transition: background 0.22s, color 0.12s;
  }
  label button:hover, .suggestions input:focus {
    /* background: linear-gradient(90deg, #0093e9 0%, #80d0c7 100%); */
    background: #82eeff;
    color: #000;
  }
 
  /* Style only the Reset button */
  button:has(span:first-child) {
    background: #ffd34f;      /* Brighter yellow, or pick any strong color */
    border-radius: 1.4em;
    box-shadow: 0 1px 8px #ffd34f55;
    padding: 0.5em 1.2em;
    border: none;
    transition: background 0.17s, box-shadow 0.17s;
    margin-left: 0.5em;
  }

  /* Make the Reset label bold and black */
  button span:first-child {
    color: #000;
    font-weight: 700;
  }

  /* Optional: On hover, even stronger background */
  button:has(span:first-child):hover {
    background: #ffba08;
    box-shadow: 0 2px 12px #ffba0855;
  }

  .field {
  position: relative;
  width: 100%;
  min-height: var(--inputHeight);
  height: auto;
  /* background: linear-gradient(90deg, #e3f2fd 0%, #f7faff 100%); */
  background: #e3f2fd;
  border-radius: 2em;
  box-shadow: 0 4px 16px 0 #b6e0fe33, 0 2px 8px #e3f2fd33;
  transition: background 0.28s, box-shadow 0.21s, transform 0.18s;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25em 1.2em;
  margin-bottom: 0.2em;
  border: none;
  outline: none;
  font-weight: 600;
  color: #196aa5;
  font-size: 1.1rem;
  letter-spacing: 0.01em;
}

.field:focus, .field:hover {
  box-shadow:
    0 0 8px 2px #80d0c7cc,
    0 10px 32px 0 rgba(0,147,233,0.23),
    0 4px 24px #80d0c799;
}

  .field span.click-hint {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    color: var(--darkgray);
    font-size: 0.9rem;
    transform: translateY(-50%);
  }

  ul.chips {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    padding: 0.2rem;
    min-height: var(--inputHeight);
    max-height: calc(1.3 * var(--inputHeight));
    list-style-type: none;
    overflow-x: hidden;
    overflow-y: auto;
  }

  ul.chips {
    /* Make chips float elegantly over the fancy field */
    background: transparent !important;
    color: #fff;
  }


  .suggestions {
  position: absolute;
  z-index: 10000;
  width: 100%;
  /* 50% transparent very light blue */
  background: rgba(205, 245, 254, 0.9);  /* #e1f5fe at 50% */
  border-radius: 1.3em;
  box-shadow: 0 8px 32px 0 #b6e0fe33, 0 1.5px 7px #e3f2fd66;
  margin-top: 0.4em;
  padding: 1.1em 0.5em 0.6em 0.5em;
  color: #234;
  border: 1.5px solid #c4e0ec;
  /* Remove or comment out previous background lines if present */
  /* background: linear-gradient(120deg, #f7faff 70%, #e3f2fd 100%); */
}

/* The suggestions input bar (search box) */
.suggestions input {
  background: #fff;
  color: #196aa5;
  border: 2px solid #aee9f8;
  border-radius: 1em;
  font-size: 1.08rem;
  margin-bottom: 0.65em;
  padding: 0.6em 1em;
  outline: none;
  font-weight: 500;
  box-shadow: 0 1px 6px 0 #c9e7fa44;
}

/* Suggestions list (ul) */
.suggestions ul {
  background: rgba(225, 245, 254, 0.9);  /* #e1f5fe at 90% */
  /* background: transparent; */
  border-radius: 1em;
  padding: 0;
  margin: 0;
  list-style: none;
}

/* Each suggestion item (li) - light background */
.suggestions ul li {
  background: #39f5fc;
  padding: 0.55em 1.2em;
  margin: 0.17em 0;
  border-radius: 0.95em;
  color: #196aa5;
  font-size: 1.08rem;
  cursor: pointer;
  transition: background 0.17s, color 0.11s, box-shadow 0.14s;
  border: none;
}

.suggestions ul li:hover {
  /* background: linear-gradient(90deg, #e3f2fd 0%, #b3e0ff 100%); */
  background: #e3f2fd;
  color: #134166;
  box-shadow: 0 2px 12px 0 #aee9f855;
  font-weight: 600;
  transform: scale(1.035);
}

.suggestions ul li:active {
  background: #59e7fa;
  color: #196aa5;
  transform: scale(0.99);
}
.suggestions-list {
  max-height: none;
  overflow-y: visible;
  padding: 0;
  margin: 0;
  list-style: none;
}

/* When there are more than 7, show scrollbar and limit height */
.suggestions-list.scrollable {
  max-height: 17em; /* Adjust as needed, roughly 7 items' height */
  overflow-y: auto;
}

/* Optional: always show a nice custom scrollbar */
.suggestions-list.scrollable::-webkit-scrollbar {
  width: 0.6em;
  background: #e3f2fd;
  border-radius: 0.7em;
}
.suggestions-list.scrollable::-webkit-scrollbar-thumb {
  background: #b6e0fe;
  border-radius: 0.7em;
}
</style>