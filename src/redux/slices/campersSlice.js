import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCampers } from '../../services/api';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (filters, { getState }) => {
    const { page } = getState().campers;
    const response = await getCampers({ ...filters, page, limit: 4 });
    return response;
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      location: '',
      equipment: {},
      vehicleType: '',
    },
    page: 1,
    hasMore: true,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    clearCampers: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    setPage: (state, action) => {
      state.page = action.payload;
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
        if (action.payload.length < 4) {
          state.hasMore = false;
        }
        // Avoid duplicates
        const newItems = action.payload.filter(
          (newItem) => !state.items.some((existingItem) => existingItem._id === newItem._id)
        );
        state.items = [...state.items, ...newItems];
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearCampers, setPage } = campersSlice.actions;
export default campersSlice.reducer;
