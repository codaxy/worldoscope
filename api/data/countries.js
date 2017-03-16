import {wbFetch} from './wbFetch';
import _ from 'lodash';
import { regions } from '../geo/regions';

let regionCodes = {
    "WLD": true,
    "LIC": true,
    "MIC": true,
    "LMC": true,
    "UMC": true,
    "LMY": true,
    "EAP": true,
    "ECA": true,
    "LAC": true,
    "MNA": true,
    "SAS": true,
    "SSA": true,
    "HIC": true,
    "EMU": true,
    "OEC": true,
    "NOC": true,
    "AFR": true,
    "ARB": true,
    "CEB": true,
    "EAS": true,
    "ECS": true,
    "EUU": true,
    "FCS": true,
    "HPC": true,
    "IBD": true,
    "IBT": true,
    "IDB": true,
    "IDX": true,
    "IDA": true,
    "LCN": true,
    "LDC": true,
    "MEA": true,
    "NAC": true,
    "OED": true,
    "SST": true,
    "CSS": true,
    "PSS": true,
    "OSS": true,
    "SSF": true
};

let countryCodes = null;
let countries = null;

async function getCountryCodes() {
    if (!countryCodes) {
        let result = await wbFetch(`countries`, {per_page: 1000});
        countryCodes = {};
        result[1].forEach(c => {
            if (!regionCodes[c.id] && c.iso2Code.search(/\d/) == -1)
                countryCodes[c.iso2Code] = c.name;
        });
    }
    return countryCodes;
}

export async function queryCountries(region) {
    if (!countries) {
        let result = await wbFetch(`countries`, {per_page: 1000});
        countries = result[1];
    }

    if (region) {
        let predicate = getCountryRegionPredicate(region);
        return countries.filter(a => predicate(a.iso2Code));
    }

    return countries;
}

export async function queryRegions() {
    return regions;
}

let indicatorCache = {};

export async function queryCountryIndicators(country, indicator, params, options) {

    let cacheKey = JSON.stringify({
        indicator,
        country,
        params
    });

    if (!indicatorCache[cacheKey]) {

        let [cc, result] = await Promise.all([
            getCountryCodes(),
            wbFetch(`countries/${country}/indicators/${indicator}`, {per_page: 10000, ...params})
        ]);

        let data = result[1] || [];

        indicatorCache[cacheKey] = data
            .filter(v => v.value != null && cc[v.country.id])
            .map((v, i) => ({
                index: i + 1,
                date: v.date,
                value: parseFloat(v.value),
                country: v.country,
                indicator: v.indicator
            }));
    }

    let x = indicatorCache[cacheKey];

    if (options) {
        let {filter} = options;
        if (filter) {
            if (filter.region) {
                let predicate = getCountryRegionPredicate(filter.region);
                x = x.filter(a => predicate(a.country.id));
            }
        }

        if (options.sort)
            x = _.orderBy(x, 'value', 'desc');

        if (options.take)
            x = x.slice(0, options.take);
    }

    return x;
}

export function getCountryRegionPredicate(regionId) {
    let region = regions.find(a => a.id == regionId);
    if (!region)
        return () => false;

    let active = {};
    region.countries.forEach(a => {
        active[a] = true
    });
    return countryCode => active[countryCode];
}
