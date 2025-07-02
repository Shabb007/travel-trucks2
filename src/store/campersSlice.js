import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

// Async thunk for fetching all campers
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.location) {
      params.append("location", filters.location);
    }
    if (filters.form) {
      params.append("form", filters.form);
    }
    if (filters.features && filters.features.length > 0) {
      filters.features.forEach((feature) => {
        params.append(feature, true);
      });
    }

    const response = await axios.get(`${API_BASE_URL}/campers?${params}`);
    return response.data;
  }
);

// Async thunk for fetching single camper
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id) => {
    const response = await axios.get(`${API_BASE_URL}/campers/${id}`);
    return response.data;
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    currentCamper: null,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    loading: false,
    error: null,
    filters: {
      location: "",
      form: "",
      features: [],
    },
    pagination: {
      page: 1,
      limit: 4,
      hasMore: true,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.pagination.page = 1;
      state.pagination.hasMore = true;
    },
    addToFavorites: (state, action) => {
      const camperId = action.payload;
      if (!state.favorites.includes(camperId)) {
        state.favorites.push(camperId);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.favorites = state.favorites.filter((id) => id !== camperId);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    loadMore: (state) => {
      state.pagination.page += 1;
    },
    clearCampers: (state) => {
      state.items = [];
      state.pagination.page = 1;
      state.pagination.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        const newItems = action.payload;

        if (state.pagination.page === 1) {
          state.items = newItems;
        } else {
          state.items = [...state.items, ...newItems];
        }

        state.pagination.hasMore = newItems.length === state.pagination.limit;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setFilters,
  addToFavorites,
  removeFromFavorites,
  loadMore,
  clearCampers,
} = campersSlice.actions;
export default campersSlice.reducer;
