import { writable, derived } from 'svelte/store';
import { range, hcl } from 'd3';

import {
  countryFilter,
  useCaseFilter,
  // technologyFilter,
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
} from './filter';
import { statusColors, statusLevels } from '../utils/levels';
import styles from '../utils/styles';

const generateCategoryColors = (numColors = 8, chroma = 50, lightness = 80) =>
  range(numColors).map((i) =>
    hcl((360 * i) / (1 + numColors), chroma, lightness).formatHex()
  );

export const generateHarmonicColorScale = (arr, na = 'not available', ud = 'Undecided', naColor = styles.gray) => {
  const colors = generateCategoryColors(arr.length);
  return arr.reduce((acc, cur, i) => ({ ...acc, [cur]: (cur === na || cur === ud ? naColor : colors[i]) }), {});
};

export const categoryNameScale = writable({
  name: 'Country',
  new_status: 'DID Status',
  use_case: 'Purpose',
  // technology: 'Technology',
  // architecture: 'Architecture',
  // infrastructure: 'Infrastructure',
  // access: 'Access',
  // corporate_partnership: 'Technology Partnerships',
  // crossborder_partnerships: 'Crossborder Projects',
  system:    'System Name',
  income:   'Income Group',
  authentication:  'Authentication Method',
  medium:   'ID Medium',
  interoperability:   'Interoperatibility',
  protection:    'Data Protection Frameworks',
  inclusion:   'Inclusion Risk',
  // controversies:    'Known Controversies',
  // technology:   'Technology Vendor',
  // funding:   'Funding Source',
  // international_partner:  'Internation Partner',
});


export const statusColorScale = writable(
  (function () {
    return statusLevels.reduce(
      (acc, cur, i) => ({ ...acc, [cur.name]: statusColors[i] }),
      {}
    );
  })()
);

export const countryColorScale = derived(countryFilter, $countryFilter => {
  return generateHarmonicColorScale($countryFilter.map(d => d.name));
});

export const useCaseColorScale = derived(useCaseFilter, $useCaseFilter => {
  return generateHarmonicColorScale($useCaseFilter.map(d => d.name));
});

// export const technologyColorScale = derived(technologyFilter, $technologyFilter => {
//   return generateHarmonicColorScale($technologyFilter.map(d => d.name));
// });

// export const architectureColorScale = derived(architectureFilter, $architectureFilter => {
//   return generateHarmonicColorScale($architectureFilter.map(d => d.name));
// });

// export const infrastructureColorScale = derived(infrastructureFilter, $infrastructureFilter => {
//   return generateHarmonicColorScale($infrastructureFilter.map(d => d.name));
// });

// export const accessColorScale = derived(accessFilter, $accessFilter => {
//   return generateHarmonicColorScale($accessFilter.map(d => d.name));
// });

// export const corporatePartnershipScale = derived(corporatePartnershipFilter, $corporatePartnershipFilter => {
//   return generateHarmonicColorScale($corporatePartnershipFilter.map(d => d.name));
// });

// export const crossborderPartnershipsScale = derived(crossborderPartnershipsFilter, $crossborderPartnershipsFilter => {
//   return generateHarmonicColorScale($crossborderPartnershipsFilter.map(d => d.name));
// });

export const systemScale = derived(systemNameFilter, $systemNameFilter => {
  return generateHarmonicColorScale($systemNameFilter.map(d => d.name));
});

export const incomeColorScale = derived(incomeGroupFilter, $incomeGroupFilter => {
  return generateHarmonicColorScale($incomeGroupFilter.map(d => d.name));
});

export const authenticationColorScale = derived(authenticationMethodFilter, $authenticationMethodFilter => {
  return generateHarmonicColorScale($authenticationMethodFilter.map(d => d.name));
});

export const mediumColorScale = derived(idMediumFilter, $idMediumFilter => {
  return generateHarmonicColorScale($idMediumFilter.map(d => d.name));
});

export const interoperabilityColorScale = derived(interoperabilityFilter, $interoperabilityFilter => {
  return generateHarmonicColorScale($interoperabilityFilter.map(d => d.name));
});

export const protectionColorScale = derived(dataProtectionFilter, $dataProtectionFilter => {
  return generateHarmonicColorScale($dataProtectionFilter.map(d => d.name));
});

export const inclusionColorScale = derived(inclusionFilter, $inclusionFilter => {
  return generateHarmonicColorScale($inclusionFilter.map(d => d.name));
});

// export const controversiesColorScale = derived(controversiesFilter, $controversiesFilter => {
//   return generateHarmonicColorScale($controversiesFilter.map(d => d.name));
// });

// export const technologyPartnerColorScale = derived(technologyPartnerFilter, $technologyPartnerFilter => {
//   return generateHarmonicColorScale($technologyPartnerFilter.map(d => d.name));
// });

// export const fundersColorScale = derived(fundingSourceFilter, $fundingSourceFilter => {
//   return generateHarmonicColorScale($fundingSourceFilter.map(d => d.name));
// });

// export const internationalpartnerColorScale = derived(internationalpartnerFilter, $internationalpartnerFilter => {
//   return generateHarmonicColorScale($internationalpartnerFilter.map(d => d.name));
// });


