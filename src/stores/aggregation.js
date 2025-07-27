import { derived } from 'svelte/store';
import { rollups } from 'd3';
import { sortBy } from 'lodash-es';

import { scaledData, data } from './data';
import { statusLevels, useCaseLevels, accessLevels, infrastructureLevels, architectureLevels,   incomeLevels,  authenticationLevels,  mediumLevels,  interoperabilityLevels,  dataprotectionLevels,  inclusionLevels,  controversiesLevels,  fundersLevels,
} from '../utils/levels';
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


export const fullsystemNameRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.system)));

export const fullincomeGroupRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.income), incomeLevels.map(d => d.name)));

export const fullauthenticationMethodRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.authentication), authenticationLevels.map(d => d.name)));

export const fullidMediumRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.medium), mediumLevels.map(d => d.name)));

export const fullinteroperabilityRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.interoperability), interoperabilityLevels.map(d => d.name)));

export const fulldataProtectionRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.protection), dataprotectionLevels.map(d => d.name)));

export const fullinclusionRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.inclusion), inclusionLevels.map(d => d.name)));

export const fullcontroversiesRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.controversies), controversiesLevels.map(d => d.name)));

export const fulltechnologyPartnerRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.technology)));

export const fullfundingSourceRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.funding), fundersLevels.map(d => d.name)));

export const fullinternationalpartnerRollup = derived(scaledData, $scaledData => generateRollup($scaledData.map(d => d.categories.international_partner)));




const showData = derived(data, $data => $data.filter(d => d.show));

export const statusRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.new_status), statusLevels.map(d => d.name)));

export const countryRollup = derived(showData, $showData => generateRollup($showData.map(d => d.name)));

export const useCaseRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.use_case)));


export const systemNameRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.system)));

export const incomeGroupRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.income), incomeLevels.map(d => d.name)));

export const authenticationMethodRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.authentication), authenticationLevels.map(d => d.name)));

export const idMediumRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.medium), mediumLevels.map(d => d.name)));

export const interoperabilityRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.interoperability), interoperabilityLevels.map(d => d.name)));

export const dataProtectionRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.protection), dataprotectionLevels.map(d => d.name)));

export const inclusionRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.inclusion), inclusionLevels.map(d => d.name)));

export const controversiesRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.controversies), controversiesLevels.map(d => d.name)));

export const technologyPartnerRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.technology)));

export const fundingSourceRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.funding), fundersLevels.map(d => d.name)));

export const internationalpartnerRollup = derived(showData, $showData => generateRollup($showData.map(d => d.categories.international_partner)));


export const totalCountries = derived(scaledData, $scaledData => {
  return [...new Set($scaledData.map(d => d.name))].length;
});