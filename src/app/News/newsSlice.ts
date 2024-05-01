import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewsType } from '../../Types/NewsType';
import { fetchNews } from '../../utils/hackerNewsApi/hackerNewsApi';

export interface NewsState {
    value: NewsType[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: NewsState = {
    value:  [],
    status: 'idle'
}

  export const getNews = createAsyncThunk(
    'news/getNews',
    async (id:string) => {
      const response = await fetchNews(id);
      return response;
    }
  );

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers:{
      handleClearValue: (state) => {
        state.value = [];
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getNews.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getNews.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value.push(action.payload);
          })
          .addCase(getNews.rejected, (state) => {
            state.status = 'failed';
          });
      },
})

export const { handleClearValue } = newsSlice.actions;

export default newsSlice.reducer;