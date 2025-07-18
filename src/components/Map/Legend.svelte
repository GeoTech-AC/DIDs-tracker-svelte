<script>
  import { isVertical } from '../../stores/device';
  import { countryGroups } from '../../utils/geo';

  import Dropdown from '../Dropdown/Dropdown.svelte';

  export let statusFilter;
  export let countryFilter;
  export let fullStatusRollup;
  export let statusRollup;
  export let totalCountries = 0;

  function handleClick(id) {
    statusFilter.click(id);
  }

  $: data = $statusFilter.map(item => {
    const fullR = $fullStatusRollup.find(d => d.name === item.name);
    const { n = 0 } = $statusRollup.find(d => d.name === item.name) || {};
    return {
      ...item,
      ...fullR,
      n
    };
  });
</script>

<div
  class="legend"
  on:mousedown|stopPropagation
>
  <div class="countries">
    <h5 class="total">
      <span>{totalCountries}</span> Countr{totalCountries === 1 ? 'y' : 'ies'} / Identity Union{totalCountries === 1 ? '' : 's'} Tracked
    </h5>
    <Dropdown
      filter={countryFilter}
      shortCuts={countryGroups}
      hideColorBoxes
      showReset
      showClickHint={`${$isVertical ? 'Tap' : 'Click'} to filter`}
    />
  </div>
  <div class="status">
    <h5>Status</h5>
    <ul>
      {#each data as { id, name, color, n } (id)}
        <li
          class:inactive={n === 0}
          on:click|stopPropagation={() => handleClick(id)}
        >
          <span
            class="color"
            style="background-color: {color};"
          >
          </span>
          <span class="number">
            {n ? n : ''}
          </span>
          <span class="name">
            {name}
          </span>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
 .legend {
  position: absolute;
  right: 0;
  left: auto;
  top: auto;
  bottom: 0;
  z-index: 800;
  width: 100%;
  margin: 0;
  padding: 1.2rem 0.7rem 1.6rem 0.7rem;
  color: #234;
  font-family: var(--primFont, 'Inter', 'Segoe UI', Arial, sans-serif);
  font-size: 1.03rem;
  background: linear-gradient(135deg, #f7faff 60%, #e3f2fd 100%);
  border-radius: 1.4em 1.4em 0 0;
  box-shadow: 0 10px 32px 0 #6ed1e744, 0 1.5px 10px #aee9f844;
  border: 1.5px solid #c4e0ec;
  backdrop-filter: blur(5px);
  transition: background 0.2s, box-shadow 0.19s;
}


@media (min-width: 600px) {
  .legend {
    width: 230px;
    min-width: 230px;
    max-width: 230px;
    margin: 2.2rem 1.4rem;
    border-radius: 1.3em;
  }
}
@media (min-width: 1000px) {
  .legend {
    top: 0;
    bottom: auto;
    border-radius: 0 1.3em 1.3em 0;
  }
}

.countries {
  width: 100%;
  margin-bottom: 1.2em;
  text-align: center;
}

h5 {
  margin: 0.3rem 0.5rem;
  font-size: 0.96rem;
  color: #1b4965;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.total {
  margin: 0.2rem 0.5rem 0.7rem 0.5rem;
  font-size: 1.11rem;
  letter-spacing: 0.02em;
}

.total span {
  font-weight: 700;
  font-size: 1.23rem;
  color: #2196f3;
}

.status {
  margin: 0.6rem 0 0 0;
  --colorBoxWidth: 18px;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  list-style-type: none;
  padding: 0.1em 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 0.33em 0.5em 0.33em 0.3em;
  cursor: pointer;
  border-radius: 0.7em;
  margin-bottom: 0.13em;
  font-weight: 500;
  font-size: 1.03rem;
  background: transparent;
  transition: background 0.13s, transform 0.13s;
}

li.inactive {
  opacity: 0.37;
  filter: grayscale(0.5);
}

li:hover, li.inactive:hover {
  opacity: 1.0;
  background: linear-gradient(90deg, #c9e7fa 0%, #aee9f8 100%);
  transform: scale(1.045);
  filter: none;
}

.color {
  display: inline-block;
  width: var(--colorBoxWidth);
  height: var(--colorBoxWidth);
  margin: 0 0.48rem 0 0.1rem;
  border: 2.7px solid #f7faff;
  border-radius: 5px;
  box-shadow: 0 1.5px 8px #c9e7fa33;
}

.number {
  min-width: 1.5rem;
  margin: 0 0.28rem 0 0.15rem;
  font-size: 0.98rem;
  text-align: right;
  color: #0093e9;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.name {
  margin-left: 0.1rem;
  color: #234;
  font-weight: 600;
  font-size: 1.04rem;
}
</style>