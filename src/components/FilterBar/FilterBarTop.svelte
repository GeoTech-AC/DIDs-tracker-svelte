<script>
  // import { slide } from 'svelte/transition';
  import { slide, fade, scale } from 'svelte/transition';

  import {
    countryFilter,
    statusFilter,
    useCaseFilter,
    // architectureFilter,
    // infrastructureFilter,
    // accessFilter,
    // corporatePartnershipFilter,
    // crossborderPartnershipsFilter,
    systemNameFilter,
    incomeGroupFilter,
    authenticationMethodFilter,
    idMediumFilter,
    interoperabilityFilter,
    dataProtectionFilter,
    inclusionFilter,
    // controversiesFilter,
    // technologyPartnerFilter,
    // fundingSourceFilter,
    // internationalpartnerFilter
   } 
   
   
  
   from '../../stores/filter';
  import {
    fullStatusRollup,
    fullUseCaseRollup,
    // fullArchitectureRollup,
    // fullInfrastructureRollup,
    // fullAccessRollup,
    statusRollup,
    useCaseRollup,
    // architectureRollup,
    // infrastructureRollup,
    // accessRollup,
    // fullCorporatePartnershipRollup,
    // fullCrossborderPartnershipsRollup,
    // crossborderPartnershipsRollup,
    // corporatePartnershipRollup,
    fullsystemNameRollup,
    fullincomeGroupRollup,
    fullauthenticationMethodRollup,
    fullidMediumRollup,
    fullinteroperabilityRollup,
    fulldataProtectionRollup,
    fullinclusionRollup,
    // fullcontroversiesRollup,
    // fulltechnologyPartnerRollup,
    // fullfundingSourceRollup,
    // fullinternationalpartnerRollup,
    systemNameRollup,
    incomeGroupRollup,
    authenticationMethodRollup,
    idMediumRollup,
    interoperabilityRollup,
    dataProtectionRollup,
    inclusionRollup,
    // controversiesRollup,
    // technologyPartnerRollup,
    // fundingSourceRollup,
    // internationalpartnerRollup
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
      info: null
    },
    {
      filter: statusFilter,
      label: $categoryNameScale.new_status,
      shortCuts: [],
      fullRollup: $fullStatusRollup,
      rollup: $statusRollup,
      info: $definitions.status
    }
  ].map((d, i) => ({...d, id: i}));

  $: dropdownsBottom = [
    // {
    //   filter: useCaseFilter,
    //   label: $categoryNameScale.use_case,
    //   shortCuts: [],
    //   fullRollup: $fullUseCaseRollup,
    //   rollup: $useCaseRollup,
    //   info: $definitions.use_case
    // },
    // {
    //   filter: architectureFilter,
    //   label: $categoryNameScale.architecture,
    //   shortCuts: [],
    //   fullRollup: $fullArchitectureRollup,
    //   rollup: $architectureRollup,
    //   info: $definitions.architecture
    // },
    // {
    //   filter: infrastructureFilter,
    //   label: $categoryNameScale.infrastructure,
    //   shortCuts: [],
    //   fullRollup: $fullInfrastructureRollup,
    //   rollup: $infrastructureRollup,
    //   info: $definitions.infrastructure
    // },
    // {
    //   filter: accessFilter,
    //   label: $categoryNameScale.access,
    //   shortCuts: [],
    //   fullRollup: $fullAccessRollup,
    //   rollup: $accessRollup,
    //   info: $definitions.access
    // },
    // {
    //   filter: incomeGroupFilter,
    //   label: $categoryNameScale.income,
    //   shortCuts: [],
    //   fullRollup: $fullincomeGroupRollup,
    //   rollup: $incomeGroupRollup,
    //   info: $definitions.income_group
    // },
    // {
    //   filter: authenticationMethodFilter,
    //   label: $categoryNameScale.authentication,
    //   shortCuts: [],
    //   fullRollup: $fullauthenticationMethodRollup,
    //   rollup: $authenticationMethodRollup,
    //   info: $definitions.authentication_method
    // },
    // {
    //   filter: idMediumFilter,
    //   label: $categoryNameScale.medium,
    //   shortCuts: [],
    //   fullRollup: $fullidMediumRollup,
    //   rollup: $idMediumRollup,
    //   info: $definitions.id_medium
    // },
    // {
    //   filter: interoperabilityFilter,
    //   label: $categoryNameScale.interoperability,
    //   shortCuts: [],
    //   fullRollup: $fullinteroperabilityRollup,
    //   rollup: $interoperabilityRollup,
    //   info: $definitions.interoperability
    // },
  ].map((d, i) => ({...d, id: i}));

  $: dropdownsBottomExtra = [
    // {
    //   filter: crossborderPartnershipsFilter,
    //   label: $categoryNameScale.crossborder_partnerships,
    //   shortCuts: [],
    //   fullRollup: $fullCrossborderPartnershipsRollup,
    //   rollup: $crossborderPartnershipsRollup,
    //   info: $definitions.crossborder_projets
    // },
    // {
    //   filter: corporatePartnershipFilter,
    //   label: $categoryNameScale.corporate_partnership,
    //   shortCuts: [],
    //   fullRollup: $fullCorporatePartnershipRollup,
    //   rollup: $corporatePartnershipRollup,
    //   info: $definitions.technology_partnerships
    // },
    {
      filter: incomeGroupFilter,
      label: $categoryNameScale.income,
      shortCuts: [],
      fullRollup: $fullincomeGroupRollup,
      rollup: $incomeGroupRollup,
      info: $definitions.income_group
    },
    {
      filter: authenticationMethodFilter,
      label: $categoryNameScale.authentication,
      shortCuts: [],
      fullRollup: $fullauthenticationMethodRollup,
      rollup: $authenticationMethodRollup,
      info: $definitions.authentication_method
    },
    {
      filter: idMediumFilter,
      label: $categoryNameScale.medium,
      shortCuts: [],
      fullRollup: $fullidMediumRollup,
      rollup: $idMediumRollup,
      info: $definitions.id_medium
    },
    {
      filter: interoperabilityFilter,
      label: $categoryNameScale.interoperability,
      shortCuts: [],
      fullRollup: $fullinteroperabilityRollup,
      rollup: $interoperabilityRollup,
      info: $definitions.interoperability
    },
    {
      filter: systemNameFilter,
      label: $categoryNameScale.system,
      shortCuts: [],
      fullRollup: $fullsystemNameRollup,
      rollup: $systemNameRollup,
      info: $definitions.system_name
    },
    // {
    //   filter: incomeGroupFilter,
    //   label: $categoryNameScale.income,
    //   shortCuts: [],
    //   fullRollup: $fullincomeGroupRollup,
    //   rollup: $incomeGroupRollup,
    //   info: $definitions.income_group
    // },
    {
      filter: dataProtectionFilter,
      label: $categoryNameScale.protection,
      shortCuts: [],
      fullRollup: $fulldataProtectionRollup,
      rollup: $dataProtectionRollup,
      info: $definitions.data_protection
    },
    {
      filter: inclusionFilter,
      label: $categoryNameScale.inclusion,
      shortCuts: [],
      fullRollup: $fullinclusionRollup,
      rollup: $inclusionRollup,
      info: $definitions.inclusion_risk
    },
    // {
    //   filter: controversiesFilter,
    //   label: $categoryNameScale.controversies,
    //   shortCuts: [],
    //   fullRollup: $fullcontroversiesRollup,
    //   rollup: $controversiesRollup,
    //   info: $definitions.controversies
    // },
    // {
    //   filter: technologyPartnerFilter,
    //   label: $categoryNameScale.technology,
    //   shortCuts: [],
    //   fullRollup: $fulltechnologyPartnerRollup,
    //   rollup: $technologyPartnerRollup,
    //   info: $definitions.technology
    // },
    // {
    //   filter: fundingSourceFilter,
    //   label: $categoryNameScale.funding,
    //   shortCuts: [],
    //   fullRollup: $fullfundingSourceRollup,
    //   rollup: $fundingSourceRollup,
    //   info: $definitions.funding_source
    // },
    // {
    //   filter: internationalpartnerFilter,
    //   label: $categoryNameScale.international_partner,
    //   shortCuts: [],
    //   fullRollup: $fullinternationalpartnerRollup,
    //   rollup: $internationalpartnerRollup,
    //   info: $definitions.international_partners
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
    {#each dropdownsTop as { id, filter, label, fullRollup, rollup, info, shortCuts } (id)}
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
      />
    {/each}
    <div class="share-panel"></div>
    <div class="logo">
      <Logo />
    </div>
  </div>

  <div class="extra grid-container" transition:slide>
    {#each dropdownsBottom as { id, filter, label, fullRollup, rollup, info } (id)}
      <Dropdown
        filter={filter}
        label={label}
        fullRollup={fullRollup}
        rollup={rollup}
        info={info}
        tooltip={tooltip}
        showReset
        showClickHint={`${$isVertical ? 'Tap' : 'Click'} to filter`}
      />
    {/each}
  </div>

  <FilterTitle
  label="More filters"
  expandable
  bind:expanded={extraFiltersGeoExpanded}
  class="fancy-more-filters-btn"
  />
  {#if extraFiltersGeoExpanded}
  <div transition:slide>
    <div transition:fade>
      <div class="extra grid-container">
        {#each dropdownsBottomExtra as { id, filter, label, fullRollup, rollup, info } (id)}
          <Dropdown
            filter={filter}
            label={label}
            fullRollup={fullRollup}
            rollup={rollup}
            info={info}
            tooltip={tooltip}
            showReset
            showClickHint={`${$isVertical ? 'Tap' : 'Click'} to filter`}
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
  padding: 2.1rem 0 1.3rem 0;
  background: linear-gradient(90deg, #f7faff 0%, #c9e7fa 50%, #aee9f8 100%);
  border-radius: 2.7em;
  box-shadow: 0 8px 32px 0 rgba(80,200,250,0.10), 0 2px 16px #c9e7fa44;
  margin: 1.3em 0 2.5em 0;
  transition: background 0.25s;
  position: relative;
}

.grid-container {
  display: grid;
  width: 100%;
  padding: 0.7rem 2.2rem;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 1.1rem;
  row-gap: 1.1rem;
  align-items: stretch;
  justify-items: stretch;
  justify-content: end;
}

.grid-container.standard {
  grid-template-columns: 1fr;
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
    border-radius: 1.4em;
    padding: 1.1rem 0 1rem 0;
  }
  .grid-container {
    padding: 0.6rem 0.4rem;
    column-gap: 0.7rem;
    row-gap: 0.7rem;
  }
}
.fancy-more-filters-btn button,
:global(.filter-title.expandable button) {
  background: linear-gradient(90deg, #aee9f8 0%, #6ed1e7 100%);
  color: #1b4965;
  border: none;
  border-radius: 2em;
  font-size: 1.15rem;
  font-weight: 700;
  padding: 0.7em 2.2em;
  box-shadow: 0 6px 24px #aee9f833, 0 1px 4px #6ed1e722;
  transition: 
    background 0.22s, 
    color 0.13s, 
    box-shadow 0.19s, 
    transform 0.13s;
  cursor: pointer;
  letter-spacing: 0.04em;
  outline: none;
  margin: 1em 0 0.5em 0;
  position: relative;
  overflow: hidden;
}

.fancy-more-filters-btn button:hover,
:global(.filter-title.expandable button:hover) {
  background: linear-gradient(90deg, #6ed1e7 0%, #aee9f8 100%);
  color: #0b2c43;
  box-shadow: 0 12px 32px #6ed1e744, 0 3px 12px #aee9f844;
  transform: scale(1.045);
}
</style>