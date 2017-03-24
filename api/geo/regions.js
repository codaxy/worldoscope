export const regions = [{
    id: 'africa',
    name: 'Africa',
    countries: [
        'MA', 'DZ', 'TN', 'LY', 'EG', 'EH', 'MR',
        'ML', 'NE', 'TD', 'SD', 'ER' ,'SN', 'GM',
        'GW', 'GN', 'SL', 'LR', 'CI', 'BF', 'GH',
        'TG', 'BJ', 'NG', 'CM', 'CF', 'SS', 'ET',
        'SO', 'GQ', 'GA', 'CG', 'CD', 'UG', 'KE',
        'AO', 'RW', 'BI', 'TZ', 'ZM', 'MW', 'MZ',
        'NA', 'BW', 'ZW', 'ZA', 'LS', 'SZ', 'MG',
        'KM', 'RE', 'ST', 'CV', 'IC', 'MU'
    ],
    bounds: "320 1250 800 890"
}, {
    id: 'europe',
    name: 'Europe',
    countries: [
        'BA', 'HR', 'RS', 'DE', 'ES', 'FR',
        'IT', 'SI', 'CH', 'AT', 'NO',
        'BG', 'GR', 'TR', 'BY', 'BE', 'DK',
        'SE', 'FI', 'EE', 'GB', 'GE', 'IS',
        'PL', 'PT', 'FO', 'NL', 'IE', 'AL',
        'MK', 'MC', 'RU', 'LT', 'LV', 'UA',
        'CZ', 'SK', 'HU', 'RO', 'MD', 'GE',
        'AZ', 'AM', 'LU', 'ME', "XK", 'DJ'
    ],
    bounds: "120 1220 360 850"
}, {
    id: 'north-america',
    name: 'North America',
    countries: ["AI", "AG", "AW", "BS", "BB", "BZ",
        "BM", "VG", "CA", "KY", "CR", "CU", "CW",
        "DM", "DO", "SV", "GL", "GD", "GP", "GT",
        "HT", "HN", "JM", "MQ", "MX", "MS", "NI",
        "PA", "PR", "KN", "LC", "PM", "VC", "SX",
        "TT", "TC", "US", "VI"
    ],
    bounds: "100 800 550 120"
}, {
    id: 'south-america',
    name: 'South America',
    countries: [
        "AR", "BO", "BR", "CL", "CO", 
        "EC", "FK", "GF", "GY", "PY", "PE",
        "SR", "UY", "VE"
    ],
    bounds: "470 750 950 400"
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
    bounds: "470 750 950 400"
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
    bounds: "470 750 950 400"
}, {
    id: 'southern-europe',
    name: 'Southern Europe',
    countries: [
        "AL", "AD", "BA", "BG", "HR", "CY", "FR",
        "GI", "GR", "IT", "MK", "MT", "MC", "ME", "PT",
        "RO", "SM", "RS", "SI", "ES"
    ],
    bounds: "470 750 950 400"
}, {
    id: 'western-europe',
    name: 'Western Europe',
    countries: [
        "AD", "AT", "BE", "DK", "FO", "FR", "DE",
        "GI", "GR", "GG", "IS", "IE", "IM", "IT", "JE",
        "LI", "LU", "MT", "MC", "NL", "NO", "PT", "SM",
        "ES", "SJ", "SE", "CH", "GB", "VA"
    ],
    bounds: "470 750 950 400"
}, {
    id: 'northern-europe',
    name: 'Northern Europe',
    countries: [
        "BE", "DK", "EE", "FO", "FI", "DE", "GG",
        "IS", "IE", "IM", "JE", "LV", "LT", "LU", "NL",
        "NO", "PL", "SJ", "SE", "GB"
    ],
    bounds: "470 750 950 400"
}, {
    id: 'eastern-europe',
    name: 'Eastern Europe',
    countries: [
        "BY", "BG", "CZ", "HU", "MD", "PL", "RO",
        "SK", "UA"
    ],
    bounds: "470 750 950 400"
}, {
    id: 'oceania',
    name: 'Oceania',
    countries: [
        "AS", "AU", "CK", "FJ", "PF", "GU", "KI",
        "MH", "FM", "NR", "NC", "NZ", "NU", "NF", 
        "MP", "PW", "PG", "PN", "WS", "SB", "TK", 
        "TO", "TV", "VU", "WF"
    ],
    bounds: "470 750 950 400"
} ];


