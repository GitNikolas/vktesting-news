import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewsType } from '../../Types/NewsType';
import { fetchNewsArray } from '../../utils/hackerNewsApi/hackerNewsApi';

export interface NewsState {
    value: NewsType[] | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: NewsState = {
    value:  null,
    status: 'idle'
}

export const getNews = createAsyncThunk(
    'news/getNews',
    async () => {
      const response = await fetchNewsArray();
      return response;
    }
  );

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(getNews.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getNews.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
          })
          .addCase(getNews.rejected, (state) => {
            state.status = 'failed';
          });
      },
})

export const { } = newsSlice.actions;

export default newsSlice.reducer;