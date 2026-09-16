<script>
  // import { slide } from 'svelte/transition';
  import { slide, fade, scale } from 'svelte/transition';
  import { statusRenameDict } from '../../utils/levels';

  function getDisplayStatus(status) {
    return statusRenameDict[status] || status;
  }
  

  import {
    countryFilter,
    statusFilter,
    useCaseFilter,
    systemNameFilter,
    incomeGroupFilter,
    authenticationMethodFilter,
    idMediumFilter,
    interoperabilityFilter,
    dataProtectionFilter,
    inclusionFilter,
    controversiesFilter,
    launchYearFilter,
   } 
   
   
  
   from '../../stores/filter';
  import {
    fullStatusRollup,
    fullUseCaseRollup,
    statusRollup,
    useCaseRollup,
    fullsystemNameRollup,
    fullincomeGroupRollup,
    fullauthenticationMethodRollup,
    fullidMediumRollup,
    fullinteroperabilityRollup,
    fulldataProtectionRollup,
    fullinclusionRollup,
    fullcontroversiesRollup,
    fulllaunchYearRollup,
    systemNameRollup,
    incomeGroupRollup,
    authenticationMethodRollup,
    idMediumRollup,
    interoperabilityRollup,
    dataProtectionRollup,
    inclusionRollup,
    controversiesRollup,
    launchYearRollup,
  } from '../../stores/aggregation';
  import { categoryNameScale } from '../../stores/scales';
  import { isVertical } from '../../stores/device';
  import { definitions, tooltip } from '../../stores/definitions';
  import { css } from '../../actions/css';
  import { countryGroups } from '../../utils/geo';

  import FilterTitle from './FilterTitle.svelte';
  import Logo from './Logo.svelte';
  import Dropdown from '../Dropdown/Dropdown.svelte';

  $: extraFiltersExpanded = !$isVertical;
  $: extraFiltersGeoExpanded = false;

  $: dropdownsTop = [
    {
      filter: countryFilter,
      label: $categoryNameScale.name,
      shortCuts: countryGroups,
      fullRollup: [],
      rollup: [],
      info: null,
      showBarChart: true
    },
    {
      filter: statusFilter,
      label: $categoryNameScale.new_status,
      shortCuts: [],
      fullRollup: $fullStatusRollup,
      rollup: $statusRollup,
      info: $definitions.status,
      showBarChart: true
    }
  ].map((d, i) => ({...d, id: i}));

  $: dropdownsBottom = [
    // {
    //   filter: useCaseFilter,
    //   label: $categoryNameScale.use_case,
    //   shortCuts: [],
    //   fullRollup: $fullUseCaseRollup,
    //   rollup: $useCaseRollup,
    //   info: $definitions.use_case,
    //   showBarChart: false
    // },
    // {
    //   filter: incomeGroupFilter,
    //   label: $categoryNameScale.income,
    //   shortCuts: [],
    //   fullRollup: $fullincomeGroupRollup,
    //   rollup: $incomeGroupRollup,
    //   info: $definitions.income_group,
    //   showBarChart: false
    // },
    // {
    //   filter: authenticationMethodFilter,
    //   label: $categoryNameScale.authentication,
    //   shortCuts: [],
    //   fullRollup: $fullauthenticationMethodRollup,
    //   rollup: $authenticationMethodRollup,
    //   info: $definitions.authentication_method,
    //   showBarChart: false
    // },
    // {
    //   filter: idMediumFilter,
    //   label: $categoryNameScale.medium,
    //   shortCuts: [],
    //   fullRollup: $fullidMediumRollup,
    //   rollup: $idMediumRollup,
    //   info: $definitions.id_medium,
    //   showBarChart: false
    // },
    // {
    //   filter: interoperabilityFilter,
    //   label: $categoryNameScale.interoperability,
    //   shortCuts: [],
    //   fullRollup: $fullinteroperabilityRollup,
    //   rollup: $interoperabilityRollup,
    //   info: $definitions.interoperability,
    //   showBarChart: false
    // },
  ].map((d, i) => ({...d, id: i}));

  $: dropdownsBottomExtra = [
    {
      filter: incomeGroupFilter,
      label: $categoryNameScale.income,
      shortCuts: [],
      fullRollup: $fullincomeGroupRollup,
      rollup: $incomeGroupRollup,
      info: $definitions.income_group,
      showBarChart: false
    },
    {
      filter: authenticationMethodFilter,
      label: $categoryNameScale.authentication,
      shortCuts: [],
      fullRollup: $fullauthenticationMethodRollup,
      rollup: $authenticationMethodRollup,
      info: $definitions.authentication_method,
      showBarChart: false
    },
    {
      filter: idMediumFilter,
      label: $categoryNameScale.medium,
      shortCuts: [],
      fullRollup: $fullidMediumRollup,
      rollup: $idMediumRollup,
      info: $definitions.id_medium,
      showBarChart: false
    },
    {
      filter: interoperabilityFilter,
      label: $categoryNameScale.interoperability,
      shortCuts: [],
      fullRollup: $fullinteroperabilityRollup,
      rollup: $interoperabilityRollup,
      info: $definitions.interoperability,
      showBarChart: false
    },
    {
      filter: systemNameFilter,
      label: $categoryNameScale.system,
      shortCuts: [],
      fullRollup: $fullsystemNameRollup,
      rollup: $systemNameRollup,
      info: $definitions.system_name,
      showBarChart: false
    },
    // {
    //   filter: incomeGroupFilter,
    //   label: $categoryNameScale.income,
    //   shortCuts: [],
    //   fullRollup: $fullincomeGroupRollup,
    //   rollup: $incomeGroupRollup,
    //   info: $definitions.income_group,
    //   showBarChart: false
    // },
    {
      filter: dataProtectionFilter,
      label: $categoryNameScale.protection,
      shortCuts: [],
      fullRollup: $fulldataProtectionRollup,
      rollup: $dataProtectionRollup,
      info: $definitions.data_protection,
      showBarChart: false
    },
    {
      filter: inclusionFilter,
      label: $categoryNameScale.inclusion,
      shortCuts: [],
      fullRollup: $fullinclusionRollup,
      rollup: $inclusionRollup,
      info: $definitions.inclusion_risk,
      showBarChart: false
    },
    {
      filter: controversiesFilter,
      label: $categoryNameScale.controversies,
      shortCuts: [],
      fullRollup: $fullcontroversiesRollup,
      rollup: $controversiesRollup,
      info: $definitions.controversies,
      showBarChart: false
    },
    {
      filter: launchYearFilter,
      label: $categoryNameScale.launch_year,
      shortCuts: [],
      fullRollup: $fulllaunchYearRollup,
      rollup: $launchYearRollup,
      info: null,
      showBarChart: false
    },
    // {
    //   filter: technologyPartnerFilter,
    //   label: $categoryNameScale.technology,
    //   shortCuts: [],
    //   fullRollup: $fulltechnologyPartnerRollup,
    //   rollup: $technologyPartnerRollup,
    //   info: $definitions.technology,
    //   showBarChart: false
    // },
    // {
    //   filter: fundingSourceFilter,
    //   label: $categoryNameScale.funding,
    //   shortCuts: [],
    //   fullRollup: $fullfundingSourceRollup,
    //   rollup: $fundingSourceRollup,
    //   info: $definitions.funding_source,
    //   showBarChart: false
    // },
    // {
    //   filter: internationalpartnerFilter,
    //   label: $categoryNameScale.international_partner,
    //   shortCuts: [],
    //   fullRollup: $fullinternationalpartnerRollup,
    //   rollup: $internationalpartnerRollup,
    //   info: $definitions.international_partners,
    //   showBarChart: false
    // }
  ].map((d, i) => ({...d, id: i}));

  $: maxColumns = Math.max(dropdownsTop.length, 4);
</script>

<div
  class="filter-bar-top"
  use:css={{maxColumns, halfMaxColumns: Math.ceil(maxColumns / 2)}}
>
  <FilterTitle label="Filters" />
  <div class="standard grid-container">
    {#each dropdownsTop as { id, filter, label, fullRollup, rollup, info, shortCuts, showBarChart } (id)}
      <Dropdown
        filter={filter}
        label={label}
        shortCuts={shortCuts}
        fullRollup={fullRollup}
        rollup={rollup}
        info={info}
        tooltip={tooltip}
        showReset
        showClickHint={`${$isVertical ? 'Tap' : 'Click'} to filter`}
        showBarChart={showBarChart}
      />
    {/each}
    <div class="share-panel"></div>
    <div class="logo">
      <Logo />
    </div>
  </div>

  <div class="more-filters-wrapper">
    <FilterTitle
      label="More filters"
      expandable
      bind:expanded={extraFiltersGeoExpanded}
    />
  </div>

  {#if extraFiltersGeoExpanded}
  <div transition:slide>
    <div transition:fade>
      <div class="extra grid-container">
        {#each dropdownsBottomExtra as { id, filter, label, fullRollup, rollup, info, showBarChart } (id)}
          <Dropdown
            filter={filter}
            label={label}
            fullRollup={fullRollup}
            rollup={rollup}
            info={info}
            tooltip={tooltip}
            showReset
            showClickHint={`${$isVertical ? 'Tap' : 'Click'} to filter`}
            showBarChart={showBarChart}
          />
        {/each}
      </div>
    </div>
  </div>
{/if}
</div>

<style>
 .filter-bar-top {
  width: 100%;
  padding: 0.5rem 0 0.5rem 0;
  /* background: linear-gradient(90deg, #f7faff 0%, #c9e7fa 50%, #aee9f8 100%); */
  background: #c9e7fa;
  border-radius: 0;
  box-shadow: 0 8px 32px 0 rgba(80,200,250,0.10), 0 2px 16px #c9e7fa44;
  margin: 0.3em 0 0.5em 0;
  transition: background 0.25s;
  position: relative;
}

.grid-container {
  display: grid;
  width: 100%;
  padding: 0.7rem 2.2rem;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 1.1rem;
  row-gap: 0.3rem;
  align-items: stretch;
  justify-items: stretch;
  justify-content: end;
}

.grid-container.standard {
  grid-template-columns: repeat(2, minmax(0, 1fr));
 }

.grid-container.standard > * {
  min-width: 0;
}

.more-filters-wrapper {
  padding: 0 2.2rem;
  margin-top: 0;
  display: flex;
  justify-content: flex-start;
}

.share-panel, .logo {
  display: none;
}

@media (min-width: 1000px) {
  .share-panel {
    display: block;
  }
  .logo {
    justify-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(var(--halfMaxColumns), 1fr);
  }
  .grid-container.standard {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .grid-container {
    grid-template-columns: repeat(var(--maxColumns), 1fr);
  }
  .grid-container.standard {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .filter-bar-top {
    border-radius: 0;
    padding: 0.4rem 0 0.4rem 0;
  }
  .grid-container {
    padding: 0.6rem 0.4rem;
    column-gap: 0.7rem;
    row-gap: 0.3rem;
  }
  .more-filters-wrapper {
    padding: 0 0.4rem;
  }
}

/* Fancy "More filters" checkbox — black when expanded, white with blue border when collapsed */
:global(button.filter-title.expandable) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #61c3fa 0%, #aee9f8 100%);
  color: #134166;
  border: 2.5px solid #61c3fa;
  border-radius: 3em;
  font-size: 1.18rem;
  font-weight: 900;
  padding: 1.02em 2.7em 1.02em 3.2em; /* extra left for the checkbox */
  box-shadow: 0 10px 38px 0 #61c3fa33, 0 2px 16px #aee9f822, 0 0 0 3px #f7faff;
  cursor: pointer;
  letter-spacing: 0.07em;
  outline: none;
  margin: 0;
  position: relative;
  overflow: hidden;
  transition:
    background 0.18s,
    color 0.13s,
    box-shadow 0.18s,
    border 0.15s,
    transform 0.14s;
  z-index: 12;
}

/* Hide unwanted icon/box from FilterTitle if present */
:global(button.filter-title.expandable > span),
:global(button.filter-title.expandable > span > svg) {
  display: none !important;
}

/* Checkbox box to the left */
:global(button.filter-title.expandable)::before {
  content: '';
  display: inline-block;
  width: 1.3em;
  height: 1.3em;
  position: absolute;
  left: 1em;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border: 2.2px solid #61c3fa;
  border-radius: 0.35em;
  box-shadow: 0 2px 8px #61c3fa22;
  transition: background 0.18s, border-color 0.18s;
  z-index: 2;
}

/* When expanded, box is solid black with a white checkmark */
:global(button.filter-title.expandable[aria-expanded="true"])::before {
  background: #000;
  border-color: #000;
}

/* White checkmark for contrast on black */
:global(button.filter-title.expandable[aria-expanded="true"])::after {
  content: '';
  position: absolute;
  left: 1.31em;
  top: 50%;
  width: 0.8em;
  height: 0.5em;
  transform: translateY(-60%) rotate(-7deg);
  border-left: 3px solid #fff;
  border-bottom: 3px solid #fff;
  border-radius: 0.15em;
  opacity: 1;
  z-index: 3;
  pointer-events: none;
  background: none;
}
:global(button.filter-title.expandable:not([aria-expanded="true"]))::after {
  content: '';
  opacity: 0;
  background: none;
}

/* Hover and active states for the button */
:global(button.filter-title.expandable:hover),
:global(button.filter-title.expandable:focus-visible) {
  background: linear-gradient(90deg, #aee9f8 0%, #61c3fa 100%);
  color: #0b2545;
  border: 2.8px solid #21d8d6;
  box-shadow: 0 14px 40px #61c3fa55, 0 4px 18px #aee9f855, 0 0 0 9px #b7e8fa55;
  transform: scale(1.048);
}

:global(button.filter-title.expandable:active) {
  background: linear-gradient(90deg, #61c3fa 0%, #21d8d6 100%);
  color: #0582ca;
  border: 2.8px solid #61c3fa;
  transform: scale(0.97);
  box-shadow: 0 2px 8px #61c3fa44;
}

/* Chevron (SVG) styling for expand/collapse */
:global(button.filter-title.expandable svg) {
  transition: transform 0.33s cubic-bezier(.5,2,.6,1);
  margin-left: 10px;
  width: 1.35em;
  height: 1.35em;
  vertical-align: middle;
}
:global(button.filter-title.expandable[aria-expanded="true"] svg) {
  transform: rotate(180deg);
}
</style>
