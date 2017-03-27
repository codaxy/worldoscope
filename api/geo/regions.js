const regions = [{
    id: 'africa',
    name: 'Africa',
    countries: [
        "DZ", "AO", "BJ", "BW", "BF", "BI", "CM",
        "CV", "CF", "TD", "KM", "CD", "DJ", "EG", 
        "GQ", "ER", "ET", "GA", "GM", "GH", "GN", 
        "GW", "CI", "KE", "LS", "LR", "LY", "MG", 
        "MW", "ML", "MR", "MU", "YT", "MA", "MZ", 
        "NA", "NE", "NG", "CG", "RE", "RW", "SH", 
        "ST", "SN", "SC", "SL", "SO", "ZA", "SS", 
        "SD", "SZ", "TZ", "TG", "TN", "UG", "EH", 
        "ZM", "ZW"
    ],
    bounds: "328 1299 800 831"
}, {
    id: 'north-america',
    name: 'North America',
    countries: [
        "AI", "AG", "AW", "BS", "BB", "BZ", "BM", 
        "VG", "CA", "KY", "CR", "CU", "CW", "DM", 
        "DO", "SV", "GL", "GD", "GP", "GT", "HT", 
        "HN", "JM", "MQ", "MX", "MS", "NI", "PA", 
        "PR", "KN", "LC", "PM", "VC", "SX", "TT", 
        "TC", "US", "VI"
    ],
    bounds: "65 729 535 194"
}, {
    id: 'south-america',
    name: 'South America',
    countries: [
        "AR", "BO", "BR", "CL", "CO", 
        "EC", "FK", "GF", "GY", "PY", "PE",
        "SR", "UY", "VE"
    ],
    bounds: "485 791 930 505"
}, {
    id: 'asia',
    name: 'Asia',
    countries: [
        "AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", 
        "CN", "CX", "CC", "TL", "EG", "GZ", "GE", "HK", "IN", 
        "ID", "IR", "IQ", "IL", "JP", "JO", "KZ", "KW", "KG", 
        "LA", "LB", "MO", "MY", "MV", "MN", "MM", "NP", "KP",
        "OM", "PK", "PH", "QA", "RU", "SA", "SG", "KR", "LK",
        "SY", "TW", "TJ", "TH", "TR", "TM", "AE", "UZ", "VN",
        "WE", "YE"
    ],
    bounds: "78 1775 643 1065"
}, {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    countries: [
        "MM", "LA", "TH", "KH", "MY", "PH", "VN", "ID", "SG",
        "BN", "TL"
    ],
    bounds: "388 1778 646 1480"
}, {
    id: 'south-asia',
    name: 'South Asia',
    countries: [
        "BD", "BT", "IN", "MV", "NP", "PK", "LK"
    ],
    bounds: "330 1507 540 1302"
}, {
    id: 'southwest-asia',
    name: 'Southwest Asia',
    countries: [
        "AF", "AM", "AZ", "BH", "CY", "EG", "GZ", "GE", "IR", 
        "IQ", "IL", "JO", "KW", "LB", "OM", "PK", "QA", "SA", 
        "SY", "TR", "AE", "WE", "YE", "PS"
    ],
    bounds: "294 1389 494 1109"
}, {
    id: 'east-asia',
    name: 'East Asia',
    countries: [
        "CN", "HK", "JP", "MO", "MN", "KP", "KR", "TW"
    ],
    bounds: "232 1722 458 1358"
}, {
    id: 'euroasia',
    name: 'Euroasia',
    countries: [
        "AF","AL","AD","AM","AT","AZ","BH","BD","BY",
        "BE","BT","BA","BN","BG","KH","CN","CX","CC","HR",
        "CY","CZ","DK","TL","EE","FO","FI","FR","GZ","GE",
        "DE","GI","GR","GG","HK","HU","IS","IN","ID","IR",
        "IQ","IE","IM","IL","IT","JP","JE","JO","KZ","KW",
        "KG","LA","LV","LB","LI","LT","LU","MO","MK","MY",
        "MV","MT","MD","MC","MN","ME","MM","NP","NL","KP",
        "NO","OM","PK","PH","PL","PT","QA","RO","RU","SM",
        "SA","RS","SG","SK","SI","KR","ES","LK","SJ","SE",
        "CH","SY","TW","TJ","TH","TR","TM","UA","AE","GB",
        "UZ","VA","VN","WE","YE"
    ],
    bounds: "75 1767 571 867"
}, {
    id: 'europe',
    name: 'Europe',
    countries: [
        "AL", "AD", "AT", "BY", "BE", "BA", "BG",
        "HR", "CY", "CZ", "DK", "EE", "FO", "FI", 
        "FR", "DE", "GI", "GR", "GG", "HU", "IS", 
        "IE", "IM", "IT", "JE", "LV", "LI", "LT", 
        "LU", "MK", "MT", "MD", "MC", "ME", "NL", 
        "NO", "PL", "PT", "RO", "SM", "RS", "SK", 
        "SI", "ES", "SJ", "SE", "CH", "UA", "GB", 
        "VA", "XK", "TR", "RU"
    ],
    bounds: "125 1240 358 870"
}, {
    id: 'southern-europe',
    name: 'Southern Europe',
    countries: [
        "AL", "AD", "BA", "BG", "HR", "CY", "FR",
        "GI", "GR", "IT", "MK", "MT", "MC", "ME", "PT",
        "RO", "SM", "RS", "SI", "ES", "XK"
    ],
    bounds: "247 1129 352 924"
}, {
    id: 'western-europe',
    name: 'Western Europe',
    countries: [
        "AD", "AT", "BE", "DK", "FO", "FR", "DE",
        "GI", "GG", "IS", "IE", "IM", "IT", "JE",
        "LI", "LU", "MT", "MC", "NL", "NO", "PT", "SM",
        "ES", "SJ", "SE", "CH", "GB", "VA"
    ],
    bounds: "130 1080 347 870"
}, {
    id: 'northern-europe',
    name: 'Northern Europe',
    countries: [
        "BE", "DK", "EE", "FO", "FI", "DE", "GG",
        "IS", "IE", "IM", "JE", "LV", "LT", "LU", "NL",
        "NO", "PL", "SJ", "SE", "GB"
    ],
    bounds: "131 1125 274 850"
}, {
    id: 'eastern-europe',
    name: 'Eastern Europe',
    countries: [
        "BY", "BG", "CZ", "HU", "MD", "PL", "RO",
        "SK", "UA"
    ],
    bounds: "216 1177 312 1034"
}, {
    id: 'oceania',
    name: 'Oceania',
    countries: [
        "AS", "AU", "CK", "FJ", "PF", "GU", "KI",
        "MH", "FM", "NR", "NC", "NZ", "NU", "NF", 
        "MP", "PW", "PG", "PN", "WS", "SB", "TK", 
        "TO", "TV", "VU", "WF"
    ],
    bounds: "581 1981 875 1581"
} ];

// sort regions in ascending order
regions.sort((r1, r2) => { 
    if(r1.id > r2.id) 
        return 1; 
    if(r1.id <= r2.id)
        return -1;
});

export { regions };


