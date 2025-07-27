import { readable, derived } from 'svelte/store';

import { loadTrackerData } from '../utils/load';

import {
  statusFilter,
  countryFilter,
  useCaseFilter,
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
} from './filter';
import { hasOverlap } from '../utils/logic';
import {
  categoryNameScale,
  statusColorScale,
  countryColorScale,
  useCaseColorScale,
  incomeColorScale,
  authenticationColorScale,
  mediumColorScale,
  interoperabilityColorScale,
  protectionColorScale,
  inclusionColorScale,
  // controversiesColorScale,
  // fundersColorScale,
} from '../stores/scales';
import styles from '../utils/styles';

// static test filter data & spotlight & new data
// const trackerDataPath = 'Digital IDs Tracker Current Updates - Digital IDs Current Updates.csv';

// const trackerDataPath = 'data/Digital IDs Tracker Current Updates - Digital IDs Current Updates.csv'

// live data v1: add 'Overview Spotlight' + 'Key Developments Spotlight'
// const trackerDataPath = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQh27kpYjCRmNoWa4FEpWqLSxLLaqK_hlgqP6wGQLp8Pum7guAYS6i0qt6wIRAPvb5Up6-6wvmTN05s/pub?gid=0&single=true&output=csv';
const trackerDataPath = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbLuIpgqe7OnMxsi2Bme5BPf_sPi7yr1IXOFPMaBDDRxOQs3R6bmCDBqAEPgEUnUb5gBNF7wMS8IgS/pub?gid=111002649&single=true&output=csv'


export const rawData = readable([], async (set) => {
  set(await loadTrackerData(trackerDataPath));
});

console.log(rawData)

export const scaledData = derived(
  [
    rawData,
    categoryNameScale,
    statusColorScale,
    countryColorScale,
    useCaseColorScale,
    incomeColorScale,
    authenticationColorScale,
    mediumColorScale,
    interoperabilityColorScale,
    protectionColorScale,
    inclusionColorScale,
    // controversiesColorScale,
    // fundersColorScale,
    ],
  ([
    $rawData,
    $categoryNameScale,
    $statusColorScale,
    $countryColorScale,
    $useCaseColorScale,
    $incomeColorScale,
    $authenticationColorScale,
    $mediumColorScale,
    $interoperabilityColorScale,
    $protectionColorScale,
    $inclusionColorScale,
    // $controversiesColorScale,
    // $fundersColorScale,
    ]) => {
    return $rawData.map((d) => {
      return {
        ...d,
        name: {
          name: d.name,
          title: $categoryNameScale.name,
          color: $countryColorScale[d.name],
          filterable: true
        },
        categories: {
          ...d.categories,
          new_status: {
            name: d.categories.new_status,
            title: $categoryNameScale.new_status,
            color: $statusColorScale[d.categories.new_status],
            filterable: true
          },
          use_case: {
            name: d.categories.use_case,
            title: $categoryNameScale.use_case,
            color: $useCaseColorScale[d.categories.use_case],
            filterable: true
          },
          // corporate_partnership: {
          //   name: d.categories.corporate_partnership,
          //   title: $categoryNameScale.corporate_partnership,
          //   color: styles.gray,
          //   filterable: false
          // },
          // crossborder_partnerships: {
          //   name: d.categories.crossborder_partnerships,
          //   title: $categoryNameScale.crossborder_partnerships,
          //   color: styles.gray,
          //   filterable: false
          // },
          system: {
            name: d.categories.system,
            title: $categoryNameScale.system,
            color: styles.gray,
            filterable: false
          },
          income: {
            name: d.categories.income,
            title: $categoryNameScale.income,
            color: $incomeColorScale[d.categories.income],
            filterable: true
          },
          authentication: {
            name: d.categories.authentication,
            title: $categoryNameScale.authentication,
            color: $authenticationColorScale[d.categories.authentication],
            filterable: true
          },
          medium: {
            name: d.categories.medium,
            title: $categoryNameScale.medium,
            color: $mediumColorScale[d.categories.medium],
            filterable: true
          },
          interoperability: {
            name: d.categories.interoperability,
            title: $categoryNameScale.interoperability,
            color: $interoperabilityColorScale[d.categories.interoperability],
            filterable: true
          },
          protection: {
            name: d.categories.protection,
            title: $categoryNameScale.protection,
            color: $protectionColorScale[d.categories.protection],
            filterable: true
          },
          inclusion: {
            name: d.categories.inclusion,
            title: $categoryNameScale.inclusion,
            color: $inclusionColorScale[d.categories.inclusion],
            filterable: true
          },
          // controversies: {
          //   name: d.categories.controversies,
          //   title: $categoryNameScale.controversies,
          //   color: $controversiesColorScale[d.categories.controversies],
          //   filterable: true
          // },
          // technology: {
          //   name: d.categories.technology,
          //   title: $categoryNameScale.technology,
          //   color: styles.gray,
          //   filterable: true
          // },
          // funding: {
          //   name: d.categories.funding,
          //   title: $categoryNameScale.funding,
          //   color: $fundingColorScale[d.categories.funding],
          //   filterable: true
          // },
          // international_partner: {
          //   name: d.categories.international_partner,
          //   title: $categoryNameScale.international_partner,
          //   color: styles.gray,
          //   filterable: true
          // }
        }
      };
    });
  }, []);

export const data = derived(
  [
    scaledData,
    statusFilter,
    countryFilter,
    useCaseFilter,
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
    // internationalpartnerFilter,
    ],
  ([
    $scaledData,
    $statusFilter,
    $countryFilter,
    $useCaseFilter,
    $systemNameFilter,
    $incomeGroupFilter,
    $authenticationMethodFilter,
    $idMediumFilter,
    $interoperabilityFilter,
    $dataProtectionFilter,
    $inclusionFilter,
    // $controversiesFilter,
    // $technologyPartnerFilter,
    // $fundingSourceFilter,
    // $internationalpartnerFilter,
    ]) => {
    return $scaledData.map((d) => {
      return {
        ...d,
        show:
          hasOverlap([d.categories.new_status.name], $statusFilter) &&
          hasOverlap([d.name.name], $countryFilter) &&
          hasOverlap([d.categories.use_case.name], $useCaseFilter) &&
          hasOverlap([d.categories.system.name], $systemNameFilter) &&
          hasOverlap([d.categories.income.name], $incomeGroupFilter)  &&
          hasOverlap([d.categories.authentication.name], $authenticationMethodFilter) &&
          hasOverlap([d.categories.medium.name], $idMediumFilter) &&
          hasOverlap([d.categories.interoperability.name],  $interoperabilityFilter)  &&
          hasOverlap([d.categories.protection.name], $dataProtectionFilter) &&
          hasOverlap([d.categories.inclusion.name], $inclusionFilter) 
          // &&
          // hasOverlap([d.categories.controversies.name], $controversies) &&
          // hasOverlap([d.categories.technology.name], $technologyPartnerFilter) &&
          // hasOverlap([d.categories.funding.name], $fundingSourceFilter) &&
          // hasOverlap([d.categories.international_partner.name],$internationalpartnerFilter),
      };
    });
  },
  []
);