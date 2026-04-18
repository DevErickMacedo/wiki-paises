import restCountriesApi from "./restcountries.api";

const restCountriesService = {
    listCountries: async () => {
        const response = await restCountriesApi.get
        ("/all?fields=name,flags,capital,region,population,cca3");
        return response.data;
    },
    filterCountriesByRegion: async (region) => {
        const response = await restCountriesApi.get
        (`/region/${region}?fields=name,flags,capital,region,population,cca3`);
        return response.data;
    },
    getCountriesByName: async (name) => {
        try {
            const response = await restCountriesApi.get
            (`/name/${name}?fields=name,flags,capital,region,population,cca3`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar país:", error.message);
            throw error;
        }
    },
    getCountriesByCode: async (code) => {
        try {
            const response = await restCountriesApi.get
            (`/alpha/${code}?fields=name,flags,capital,region,subregion,area,population,languages,currencies,cca3`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar país pelo código cca3:", error.message);
            throw error;
        }
    },
};

export default restCountriesService;