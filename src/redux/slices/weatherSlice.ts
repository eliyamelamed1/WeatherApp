import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import { endpoints } from '../../utils/enums';

const apikey = 'Ef3pkQ7Ujusncevg374cA2v5CbiDSn7F';
export interface SearchResultsType {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: {
        ID: string;
        LocalizedName: string;
    };
    AdministrativeArea: {
        ID: string;
        LocalizedName: string;
    };
}
interface initialStateTypes {
    searchResults: SearchResultsType[];
    locationKey: string;
}
const initialState: initialStateTypes = { searchResults: [], locationKey: 'null' };

export const autoCompleteSearchAction = createAsyncThunk<
    {},
    {
        q: string;
    }
>('autoCompleteSearchAction', async ({ q }, { rejectWithValue }) => {
    try {
        let res = axios.get(endpoints({ q, apikey }).autoCompleteSearch);
        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const weatherSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase<any>(autoCompleteSearchAction.fulfilled, (state, { payload }) => {
            state.searchResults = payload.data;
        });
    },
});

export default weatherSlice.reducer;