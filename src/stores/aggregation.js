import { derived } from 'svelte/store';
import { rollups } from 'd3';
import { sortBy } from 'lodash-es';

import { scaledData, data } from './data';
import { statusLevels, useCaseLevels, accessLevels, infrastructureLevels, architectureLevels } from '../utils/levels';
import { sortToEnd } from '../utils/misc';

const generateRollup = (arr, sortArr = null) => {
  let rollup = rollups(arr, d => d.length, d => d.name)
    .map(d => {
      return {
        name: d[0],
        color: arr.find(dd => dd.name === d[0]).color,
        n: d[1],
        percent: 100 * d[1] / arr.length
      };
    });
  if (sortArr !== null) {
    rollup = sortBy(rollup, d => sortArr.indexOf(d.name));
  } else {
    rollup = sortBy(rollup, d => {
      return d.name.toLowerCase()
    });
  }

  rollup = sortToEnd(rollup, 'name', 'Undecided');

  return rollup;
};

export const fullStatusRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.new_status), statusLevels.map(d => d.name)));

export const fullCountryRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.name)));

export const fullUseCaseRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.use_case), useCaseLevels.map(d => d.name)));

export const fullTechnologyRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.technology)));

export const fullArchitectureRollup = derived(scaledData, $scaledData => generateRollup($scaledData.filter(d => ['Retail', 'Both'].includes(d.categories.use_case.name)).map(d => d.categories.architecture), architectureLevels.map(d => d.name)));

export const fullInfrastructureRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.infrastructure), infrastructureLevels.map(d => d.name)));

export const fullAccessRollup = derived(scaledData, $scaledData => generateRollup($scaledData.filter(d => ['Retail', 'Both'].includes(d.categories.use_case.name)).map(d => d.categories.access), accessLevels.map(d => d.name)));

export const fullCorporatePartnershipRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.corporate_partnership)));

export const fullCrossborderPartnershipsRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.crossborder_partnerships)));

const showData = derived(data, $data => $data.filter(d => d.show));

export const statusRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.new_status), statusLevels.map(d => d.name)));

export const countryRollup = derived(showData, $showData => generateRollup($showData.map(d => d.name)));

export const useCaseRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.use_case)));

export const technologyRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.technology)));

export const architectureRollup = derived(showData, $showData => generateRollup($showData.filter(d => ['Retail', 'Both'].includes(d.categories.use_case.name)).map(d => d.categories.architecture)));

export const infrastructureRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.infrastructure)));

export const accessRollup = derived(showData, $showData => generateRollup($showData.filter(d => ['Retail', 'Both'].includes(d.categories.use_case.name)).map(d => d.categories.access)));

export const corporatePartnershipRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.corporate_partnership)));

export const crossborderPartnershipsRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.crossborder_partnerships)));

// export const corporatePartnershipRollup = derived(showData, $showData => generateRollup($showData.filter(d => ['Retail', 'Both'].includes(d.categories.use_case.name)).map(d => d.categories.corporate_partnership)));

// export const crossborderPartnershipsRollup = derived(showData, $showData => generateRollup($showData.filter(d => ['Retail', 'Both'].includes(d.categories.use_case.name)).map(d => d.categories.crossborder_partnerships)));

export const totalCountries = derived(scaledData, $scaledData => {
  return [...new Set($scaledData.map(d => d.name))].length;
});