import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper that simulates a network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Step 2: async action creators
export const ageUpAsync = createAsyncThunk("age/ageUpAsync", async (value) => {
  await delay(1000);
  return value; // amount to add
});

export const ageDownAsync = createAsyncThunk(
  "age/ageDownAsync",
  async (value) => {
    await delay(1000);
    return value; // amount to subtract
  }
);

// Step 3: slice
const initialState = {
  age: 20,
  loading: false,
};

const ageSlice = createSlice({
  name: "age",
  initialState,
  reducers: {
    // Plain reducers for loading state and direct age updates
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Age Up
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.age += action.payload;
      })
      .addCase(ageUpAsync.rejected, (state) => {
        state.loading = false;
      })
      // Age Down
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.age = Math.max(0, state.age - action.payload);
      })
      .addCase(ageDownAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, setAge } = ageSlice.actions;
export default ageSlice.reducer;