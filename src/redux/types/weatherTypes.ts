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

export interface ItemType {
    Date: string;
    EpochDate: number;
    Temperature: {
        Minimum: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
        Maximum: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
    };
    Day: {
        Icon: number;
        IconPhrase: string;
        HasPrecipitation: boolean;
    };
    Night: {
        Icon: number;
        IconPhrase: string;
        HasPrecipitation: boolean;
    };
    Sources: [string];
    MobileLink: string;
    Link: string;
}
export interface FiveDaysForecasts {
    Headline: {
        EffectiveDate: string;
        EffectiveEpochDate: number;
        Severity: number;
        Text: string;
        Category: string;
        EndDate: string;
        EndEpochDate: number;
        MobileLink: string;
        Link: string;
    };
    DailyForecasts: ItemType[];
}

export interface FavoriteCitiesWeatherType {
    city: string;
    key: number;
    temperature: number;
}

export interface initialStateTypes {
    searchResults: SearchResultsType[];
    fiveDaysForecasts: FiveDaysForecasts | null;
    currentTemp: number | null;
    currentCityAndKey: {
        city: string;
        key: string;
    };
    favoriteCities: { [key: string]: { city: string; key: string } };
    favoriteCitiesWeather: FavoriteCitiesWeatherType[];
    tempUnits: 'C' | 'F';
}
