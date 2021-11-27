const getVisibleResults = (searchResults = [], {location, company}) => {
  const results = searchResults.filter(result => {
    const locationMatch = result.location ? result.location.toLowerCase().includes(location.toLowerCase()) : false;
    const companyMatch = result.company ? result.company.toLowerCase().includes(company.toLowerCase()) : false;
    return locationMatch && companyMatch;
  });

  return results;
};

export default getVisibleResults;
