const BASE_URL = 'https://6679b8a118a459f6395124b3.mockapi.io/api/v1';

export const getCampers = async ({ page = 1, limit = 4, ...filters }) => {
  const params = new URLSearchParams({ page, limit });

  if (filters.location) {
    params.append('location', filters.location);
  }
  if (filters.vehicleType) {
    params.append('form', filters.vehicleType);
  }
  
  if (filters.equipment) {
    Object.entries(filters.equipment).forEach(([key, value]) => {
      if (value) {
        params.append(key, true);
      }
    });
  }

  const response = await fetch(`${BASE_URL}/adverts?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch campers');
  }
  return response.json();
};

export const getCamperById = async (id) => {
  const response = await fetch(`${BASE_URL}/adverts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch camper details');
  }
  return response.json();
};
