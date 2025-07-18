import { csv, json } from 'd3';
import { initFilters } from '../stores/filter';

const splitValue = (value) =>
  value
    .split(',')
    .map((d) => d.trim())
    .map((d) => d === '' ? 'Undecided' : d);

const curate = (value) => {
  if (!value) return 'Undecided';
  return value.replace('n/a', 'Undecided');
};

export const loadTrackerData = async (dataPath) => {
  // load and format the data
  const data = await csv(dataPath, (d) => {
    let mediaSources;
    if (d['Media Sources'] !== undefined) {
      mediaSources = d['Media Sources'].split(';').filter(dd => dd);
    } else {
      mediaSources = '';
    }
    return {
      owner: d.Owner,
      name: d.Name,
      digital_id_name: d['System Name'],
      overview: d.Overview,
      overview_spotlight: d['Overview Spotlight'],
      key_developments: d['Key Developments'],
      key_developments_spotlight: d['Key Developments Spotlight'],
      categories: {
        // former version
        new_status: curate(d['Present Status']),
        // new_status: curate(d['October Status']),
        use_case: curate(d['Use case']),
        // technology: curate(d['Underlying technology']),
        // architecture: curate(d['Architecture: direct CBDC or hybrid']),
        // infrastructure: curate(d['Infrastructure: DLT or conventional']),
        // access: curate(d['Access: token or account']),
        // corporate_partnership: curate(d['Technology partnership']),
        // crossborder_partnerships: curate(d['Cross-border projects']),
        use_case: curate(d['Use Cases']),
        system: curate(d['System Name']),
        income: curate(d['Income Group']),
        authentication: curate(d['Authentication Method']),
        medium: curate(d['ID Medium']),
        interoperability: curate(d['Interoperatability']),
        protection: curate(d['Data Protection Framework']),
        inclusion: curate(d['Inclusion and Accessibility Risk']), 
        // controversies: curate(d['Known Controversies']),
        // technology: curate(d['Technology Providers']),
        // funding: curate(d['Funding Source']),
        // international_partner: curate(d['Internation Partners']),
      },
      sources: {
        managing_authority_name: d['Managing Authority'],
        managing_authority_url: d['Managing Authority Source to Hyperlink'],
        // media_urls: d['Media Sources'].split(';').filter(dd => dd)
        media_urls: d['Media Sources'].split(';').filter(dd => dd)
      },
      notes: d.Notes,
    };
  });


// filter for valid entries
  const filteredData = data
    .filter(
      (d) => d.categories.new_status !== 'not available'
    )
    .filter(
      (d) => d.categories.new_status !== 'Undecided'
    )
    .filter(
      (d) => d.categories.new_status !== 'No development yet'
    );

  // initialize the filters
  initFilters(filteredData);

  return filteredData;
};

export const loadJson = async (dataPath) => {
  return await json(dataPath);
};

export const loadNaturalEarth = async (dataPath) => {
  const { features } = await json(dataPath);
  return features.map(d => {
    return {
      ...d,
      properties: {
        name: d.properties.ADMIN
      }
    };
  });
};

export const loadCapitals = async (dataPath) => {
  return await csv(dataPath);
};