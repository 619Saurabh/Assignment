

// Function to fetch places from the GeoDB API using fetch
export const fetchPlaces = async (query, limit = 5, page = 1) => {
  const url = new URL(import.meta.env.VITE_BASE_URL);

  // Set the query parameters
  url.searchParams.append('namePrefix', query);
  url.searchParams.append('limit', limit);
  url.searchParams.append('offset', (page - 1) * limit);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,     // RapidAPI key
        'x-rapidapi-host': import.meta.env.VITE_RAPID_API_HOST    // RapidAPI host
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data;  // Extract the places array from the API response
    const totalResults = result.metadata.totalCount; // Extract total count from metadata

    return {
      data: data.map((place) => ({
        name: place.city,         
        country: place.country,   
        countryCode: place.countryCode 
      })),
      totalPages: Math.ceil(totalResults / limit) // Calculate total pages based on results and limit
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      data: [],
      totalPages: 1
    };
  }
};
