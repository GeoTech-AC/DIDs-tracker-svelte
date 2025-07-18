import { writable, derived } from 'svelte/store';
import { sortBy } from 'lodash-es';

import { areAllSelected, areAllUnselected } from '../utils/logic';

import {
  statusLevels,
  useCaseLevels,
  // accessLevels,
  // infrastructureLevels,
  // architectureLevels,
  incomeLevels,
  authenticationLevels,
  mediumLevels,
  interoperabilityLevels,
  dataprotectionLevels,
  inclusionLevels,
  // controversiesLevels,
  // fundersLevels,
} from '../utils/levels';
import { sortToEnd } from '../utils/misc';

function createMultiFilter() {
  const { subscribe, set, update } = writable([]);

  const init = (data, col = null) => {
    let values = data;
    if (col !== null) {
      values = [
        ...new Set(
          data
            .map((d) => {
              return col.split('.').reduce((acc, cur) => acc[cur], d);
            })
            .flat()
        ),
      ];
      values = sortBy(values, (d) => d.toLowerCase());
    }
    set(
      sortToEnd(
        values.map((value) => {
          return {
            id: value,
            name: value,
            selected: true,
          };
        }),
        'name',
        'Undecided'
      )
    );
  };

  const unselect = (id) =>
    update((f) =>
      f.map((d) => ({
        ...d,
        selected: [id].flat().includes(d.id) ? false : d.selected,
      }))
    );

  const unselectAll = () =>
    update((f) => f.map((d) => ({ ...d, selected: false })));

  const select = (id) =>
    update((f) =>
      f.map((d) => ({
        ...d,
        selected: [id].flat().includes(d.id) ? true : d.selected,
      }))
    );

  const selectOne = (id) => {
    unselectAll();
    select(id);
  };

  const selectAll = () =>
    update((f) => f.map((d) => ({ ...d, selected: true })));

  const click = (id) =>
    update((f) => {
      let res = [];
      if (areAllSelected(f)) {
        res = f.map((d) => ({
          ...d,
          selected: [id].flat().includes(d.id),
        }));
      } else {
        res = f.map((d) => ({
          ...d,
          selected: [id].flat().includes(d.id) ? !d.selected : d.selected,
        }));
      }
      if (areAllUnselected(res)) {
        res = res.map((d) => ({ ...d, selected: true }));
      }
      return res;
    });

  const applyBoolArray = (arr) => {
    const tmpArr = [...arr].reverse();
    update((f) =>
      f
        .reverse()
        .map((d, i) => ({
          ...d,
          selected: tmpArr[i] !== undefined ? tmpArr[i] : false,
        }))
        .reverse()
    );
  };

  return {
    subscribe,
    set,
    init,
    select,
    selectOne,
    selectAll,
    unselect,
    unselectAll,
    click,
    applyBoolArray,
  };
}


export const statusFilter = createMultiFilter();  // needed
export const countryFilter = createMultiFilter();   // needed
export const useCaseFilter = createMultiFilter();   // needed
// export const technologyFilter = createMultiFilter();   // not needed
// export const architectureFilter = createMultiFilter();    // not needed 
// export const infrastructureFilter = createMultiFilter();   // not needed
// export const accessFilter = createMultiFilter();   // not needed
// export const corporatePartnershipFilter = createMultiFilter();   // not needed
// export const crossborderPartnershipsFilter = createMultiFilter();   // not needed 
export const systemNameFilter = createMultiFilter();
export const incomeGroupFilter = createMultiFilter();
export const authenticationMethodFilter = createMultiFilter();
export const idMediumFilter = createMultiFilter();
export const interoperabilityFilter = createMultiFilter();   
export const dataProtectionFilter = createMultiFilter();
export const inclusionFilter = createMultiFilter();   
// export const controversiesFilter = createMultiFilter();
// export const technologyPartnerFilter = createMultiFilter();   
// export const fundingSourceFilter = createMultiFilter();
// export const internationalpartnerFilter = createMultiFilter();


export const initFilters = (data) => {
  statusFilter.init(statusLevels.map((d) => d.name).filter(d => d != "Other"));
  countryFilter.init(data, 'name');
  useCaseFilter.init(useCaseLevels.map((d) => d.name));
  // technologyFilter.init(data, 'categories.technology');
  // architectureFilter.init(architectureLevels.map((d) => d.name));
  // infrastructureFilter.init(infrastructureLevels.map((d) => d.name));
  // accessFilter.init(accessLevels.map((d) => d.name));
  // corporatePartnershipFilter.init(data, 'categories.corporate_partnership');
  // crossborderPartnershipsFilter.init(
  //   data,
  //   'categories.crossborder_partnerships'
  // );
  systemNameFilter.init(
    data,
    'categories.system'
  );
  incomeGroupFilter.init(incomeLevels.map((d) => d.name));
  authenticationMethodFilter.init(authenticationLevels.map((d) => d.name));
  idMediumFilter.init(mediumLevels.map((d) => d.name));
  interoperabilityFilter.init(interoperabilityLevels.map((d) => d.name));
  dataProtectionFilter.init(dataprotectionLevels.map((d) => d.name));
  inclusionFilter.init(inclusionLevels.map((d) => d.name));
  // controversiesFilter.init(controversiesLevels.map((d) => d.name));
  // technologyPartnerFilter.init(
  //   data,
  //   'categories.technology_partnerships'
  // );
  // fundingSourceFilter.init(fundersLevels.map((d) => d.name));
  // internationalpartnerFilter.init(
  //   data,
  //   'categories.internationa_partners'
  // );
};

export const filterByCategory = (category, name) => {
  switch (category) {
    case 'name':
      countryFilter.click(name);
      break;
    case 'new_status':
      statusFilter.click(name);
      break;
    case 'use_case':
      useCaseFilter.click(name);
      break;
    // case 'technology':
    //   technologyFilter.click(name);
    //   break;
    // case 'architecture':
    //   architectureFilter.click(name);
    //   break;
    // case 'infrastructure':
    //   infrastructureFilter.click(name);
    //   break;
    // case 'access':
    //   accessFilter.click(name);
    //   break;
    // case 'corporate_partnership':
    //   corporatePartnershipFilter.click(name);
    //   break;
    // case 'crossborder_partnerships':
    //   crossborderPartnershipsFilter.click(name);
    //   break;
    case 'system':
      systemNameFilter.click(name);
      break;
    case 'income':
      incomeGroupFilter.click(name);
      break;    
    case 'authentication':
      authenticationMethodFilter.click(name);
      break;
    case 'medium':
      idMediumFilter.click(name);
      break;
    case 'interoperability':
      interoperabilityFilter.click(name);
      break;
    case 'protection':
      dataProtectionFilter.click(name);
      break;
    case 'inclusion':
      inclusionFilter.click(name);
      break;
    // case 'controversies':
    //   controversiesFilter.click(name);
    //   break;    
    // case 'technology':
    //   technologyPartnerFilter.click(name);
    //   break;
    // case 'funding':
    //   fundingSourceFilter.click(name);
    //   break;
    // case 'international_partner':
    //   internationalpartnerFilter.click(name);
    //   break;  
 }
};

export const resetAllFilters = () => {
  statusFilter.selectAll();
  countryFilter.selectAll();
  useCaseFilter.selectAll();
  // technologyFilter.selectAll();
  // architectureFilter.selectAll();
  // infrastructureFilter.selectAll();
  // accessFilter.selectAll();
  // corporatePartnershipFilter.selectAll();
  // crossborderPartnershipsFilter.selectAll();
  systemNameFilter.selectAll();
  incomeGroupFilter.selectAll();
  authenticationMethodFilter.selectAll();
  idMediumFilter.selectAll();
  interoperabilityFilter.selectAll();
  dataProtectionFilter.selectAll();
  inclusionFilter.selectAll();
  // controversiesFilter.selectAll();
  // technologyPartnerFilter.selectAll();
  // fundingSourceFilter.selectAll();
  // internationalpartnerFilter.selectAll();
};

export const anyFilterActive = derived(
  [
    statusFilter,
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
  ],
  ([
    $statusFilter,
    $countryFilter,
    $useCaseFilter,
    // $technologyFilter,
    // $architectureFilter,
    // $infrastructureFilter,
    // $accessFilter,
    // $corporatePartnershipFilter,
    // $crossborderPartnershipsFilter,
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
    // $internationalpartnerFilter

  ]) => {
    return !(
      areAllSelected($statusFilter) &&
      areAllSelected($countryFilter) &&
      areAllSelected($useCaseFilter) &&
      // areAllSelected($technologyFilter) &&
      // areAllSelected($architectureFilter) &&
      // areAllSelected($infrastructureFilter) &&
      // areAllSelected($accessFilter) &&
      // areAllSelected($corporatePartnershipFilter) &&
      // areAllSelected($crossborderPartnershipsFilter)
      // &&
      areAllSelected($systemNameFilter) &&
      areAllSelected($incomeGroupFilter) &&
      areAllSelected($authenticationMethodFilter) &&
      areAllSelected($idMediumFilter) &&
      areAllSelected($interoperabilityFilter) &&
      areAllSelected($dataProtectionFilter) &&
      areAllSelected($inclusionFilter) 
      // &&
      // areAllSelected($controversiesFilter) &&
      // areAllSelected($technologyPartnerFilter) &&
      // areAllSelected($fundingSourceFilter) &&
      // areAllSelected($internationalpartnerFilter)
    )    
  },
  false
);




export const applyParams = (params) => {
  if (!params || Object.keys(params).length === 0) return;

  const { status, useCase, architecture, infrastructure, access, country, corporatePartnership, crossborderPartnerships, system, income, authentication, medium, interoperability, protection, inclusion, controversies, technology, funding, international_partner } =
    params;

  statusFilter.applyBoolArray(status);
  useCaseFilter.applyBoolArray(useCase);
  // architectureFilter.applyBoolArray(architecture);
  // infrastructureFilter.applyBoolArray(infrastructure);
  // accessFilter.applyBoolArray(access);
//  // corporatePartnershipFilter.applyBoolArray(corporatePartnership);
//  // crossborderPartnershipsFilter.applyBoolArray(crossborderPartnerships);

  systemNameFilter.applyBoolArray(system);
  incomeGroupFilter.applyBoolArray(income);
  authenticationMethodFilter.applyBoolArray(authentication);
  idMediumFilter.applyBoolArray(medium);
  interoperabilityFilter.applyBoolArray(interoperability);
  dataProtectionFilter.applyBoolArray(protection);
  inclusionFilter.applyBoolArray(inclusion);
  // controversiesFilter.applyBoolArray(controversies);
  // // technologyPartnerFilter.applyBoolArray(technology);
  // fundingSourceFilter.applyBoolArray(funding);
  // internationalpartnerFilter.applyBoolArray(international_partner);

  if (country) {
    countryFilter.unselectAll();
    country.forEach((id) => {
      countryFilter.select(id);
    });
  }
};
