export const statusColors = [
'#F3B100',  // Golden Yellow
'#E79A38',  // Amber Orange
'#A1D5A4',  // 	Mint Green
'#3AB4A2',  // Teal Blue
'#276955',  // Deep Forest Green
'#124074',  // Navy Blue
'#FFD662',  // Lemon Yellow
'#034F84',  // Ocean Blue
'#B565A7',  // Orchid Purple
];


// Status Legend Rename Dictionary
export const statusRenameDict = {
  "Launched": "Operational",
  "Pilot": "Pilot",
  "Development": "In Design Phase",
  "Research": "Scoping",
  "Inactive": "Dormant",
  "Canceled": "Discontinued"
};

// If you want to rename the legend heading itself:
export const legendRenameDict = {
  "legend": "Status Legend" // Replace with your preferred name
};

function getDisplayStatus(status) {
  return statusRenameDict[status] || status;
}

export const statusLevels = [
  {
    id: 0,
    name: 'Launched',
  },
  {
    id: 1,
    name: 'Pilot',
  },
  {
    id: 2,
    name: 'Development',
  },
  {
    id: 3,
    name: 'Research',
  },
  {
    id: 4,
    name: 'Inactive',
  },
  {
    id: 5,
    name: 'Canceled',
  },
  {
    id: 6,
    name: 'Other'
  }
];




export const incomeLevels = [
  {
    id: 0,
    name: 'Low',
  },
  {
    id: 1,
    name: 'Lower_middle',
  },
  {
    id: 2,
    name: 'Upper_middle',
  },
  {
    id: 3,
    name: 'High',
  },  
  {
    id: 4,
    name: 'Undecided',
  }  
];


export const authenticationLevels = [
  {
    id: 0,
    name: 'Biometric',
  },
  {
    id: 1,
    name: 'OTP',
  },
  {
    id: 2,
    name: 'PIN',
  },
  {
    id: 3,
    name: 'Cryptography',
  },
  {
    id: 4,
    name: 'Multifactor',
  },
  {
    id: 5,
    name: 'Undecided',
  }
];


export const mediumLevels = [
  {
    id: 0,
    name: 'Smart_Card',
  },
  {
    id: 1,
    name: 'Mobile_App',
  },
  {
    id: 2,
    name: 'Web_Portal',
  },
  {
    id: 3,
    name: 'Hybrid',
  },
  {
    id: 4,
    name: 'Undecided',
  }
];



export const useCaseLevels = [
  {
    id: 0,
    name: 'Voting',
  },
  {
    id: 1,
    name: 'Healthcare',
  },
  {
    id: 2,
    name: 'Welfare',
  },
  {
    id: 3,
    name: 'Financial',
  },
  {
    id: 4,
    name: 'Tax',
  },
  {
    id: 5,
    name: 'Immigration',
  },
  {
    id: 6,
    name: 'Education',
  },
  {
    id: 7,
    name: 'Private',
  },
  {
    id: 8,
    name: 'Multiple',
  }
  ,
  {
    id: 9,
    name: 'Undecided',
  }
];


export const interoperabilityLevels = [
  {
    id: 0,
    name: 'Cross_Border',
  },
  {
    id: 1,
    name: 'National',
  },
  {
    id: 2,
    name: 'Siloed',
  },
  {
    id: 3,
    name: 'Undecided',
  }
];



export const dataprotectionLevels = [
  {
    id: 0,
    name: 'Strong',
  },
  {
    id: 1,
    name: 'Moderate',
  },
  {
    id: 2,
    name: 'Weak',
  },
  {
    id: 3,
    name: 'Undecided',
  }
];


export const inclusionLevels = [
  {
    id: 0,
    name: 'High',
  },
  {
    id: 1,
    name: 'Medium',
  },
  {
    id: 2,
    name: 'Low',
  },
  {
    id: 3,
    name: 'Unknown',
  },
  {
    id: 4,
    name: 'Undecided',
  }
];


export const controversiesLevels = [
  {
    id: 0,
    name: 'Surveillance',
  },
  {
    id: 1,
    name: 'Breaches',
  },
  {
    id: 2,
    name: 'Deportation',
  },
  {
    id: 3,
    name: 'Deprivation',
  },
  {
    id: 4,
    name: 'Bureaucratic',
  },
  {
    id: 5,
    name: 'None',
  },
  {
    id: 6,
    name: 'Undecided',
  }
];



export const fundersLevels = [
  {
    id: 0,
    name: 'Domestic',
  },
  {
    id: 1,
    name: 'PPP',
  },
  {
    id: 2,
    name: 'International',
  },
  {
    id: 3,
    name: 'Private',
  },
  {
    id: 4,
    name: 'Multiple',
  },
  {
    id: 5,
    name: 'Undecided',
  }
];





