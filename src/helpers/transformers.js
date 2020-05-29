export const formatHotelData = (rawData) => {
  let formatedData = {};
  let data = rawData.body;
  console.log(rawData);
  formatedData.Location = data.header;
  formatedData.totalReultCount = data.searchResults.totalCount;
  formatedData.hotels = data.searchResults.results;
  formatedData.currentPage = data.searchResults.pagination.currentPage;
  formatedData.destination = data.query.destination;
  formatedData.sortOptions = data.sortResults.options;
  formatedData.filterOptions = data.filters;
  return formatedData;
};

export const formatHotelDetailData = (rawData) => {
  let formatedData = {};
  let data = rawData;
  console.log(data);
  // formatedData.Neighborhood = data.neighborhood;
  // formatedData.transportation = data.transportation;
  // formatedData.main = data.data.body;
  // formatedData.main.amenities.forEach((a) => {
  //   let amenities = [];
  //   amenities.push(a.heading);
  //   // amenities.items = a.listItems.forEach((li) => {});
  // });
  return rawData;
};
