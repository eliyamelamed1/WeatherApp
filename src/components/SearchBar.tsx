import React, { useCallback, useEffect, useState } from 'react';
import { SearchResultsType, autoCompleteSearchAction } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import { RootState } from '../redux/store';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const [options, setOptions] = useState<SearchResultsType[]>([]);
    const [loading, setLoading] = useState(false);
    const { searchResults } = useSelector((state: RootState) => state.weatherSlice);

    const deb = useCallback(
        debounce((e: any) => {
            setCity(e.target.value);
        }, 300),
        [city]
    );

    const onChange = (e: any) => {
        deb(e);
        setCity(e.target.value);
    };

    useEffect(() => {
        const searchCities = async () => {
            if (city?.trim() === '') return setOptions([]);
            setLoading(true);
            await dispatch(autoCompleteSearchAction({ q: city }));
            setLoading(false);
        };
        searchCities();
    }, [city, dispatch]);

    useEffect(() => {
        setOptions(searchResults);
    }, [searchResults]);

    const onSubmit = () => {
        for (const obj of options) {
            if (obj.LocalizedName !== city) continue;
            const key = obj.Key;
            return console.log(key);
        }
        return toast.error('Wrong city - please choose from one of the options ');
    };

    return (
        <div className='search-bar'>
            <Autocomplete
                className='auto-complete'
                disableClearable
                freeSolo
                options={options}
                loading={loading}
                getOptionLabel={(option) => option.LocalizedName}
                renderInput={(params) => (
                    <TextField
                        key={'asd'}
                        onSelect={onChange}
                        name='city'
                        {...params}
                        label='Cities'
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            endAdornment: (
                                <React.Fragment>
                                    {loading && <CircularProgress className='circular-progress' size={20} />}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
            <button onClick={onSubmit}>Check Weather</button>
        </div>
    );
};

export default SearchBar;