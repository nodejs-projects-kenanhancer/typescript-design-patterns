export interface Language {
  name: string;
  code: string;
  native: string;
  rtl?: number;
}

export const LANGUAGES = [
  {
    name: "Afar",
    native: "Afar",
    code: "aa",
  },
  {
    name: "Abkhazian",
    native: "Аҧсуа",
    code: "ab",
  },
  {
    name: "Afrikaans",
    native: "Afrikaans",
    code: "af",
  },
  {
    name: "Akan",
    native: "Akana",
    code: "ak",
  },
  {
    name: "Amharic",
    native: "አማርኛ",
    code: "am",
  },
  {
    name: "Aragonese",
    native: "Aragonés",
    code: "an",
  },
  {
    name: "Arabic",
    native: "العربية",
    rtl: 1,
    code: "ar",
  },
  {
    name: "Assamese",
    native: "অসমীয়া",
    code: "as",
  },
  {
    name: "Avar",
    native: "Авар",
    code: "av",
  },
  {
    name: "Aymara",
    native: "Aymar",
    code: "ay",
  },
  {
    name: "Azerbaijani",
    native: "Azərbaycanca / آذربايجان",
    code: "az",
  },
  {
    name: "Bashkir",
    native: "Башҡорт",
    code: "ba",
  },
  {
    name: "Belarusian",
    native: "Беларуская",
    code: "be",
  },
  {
    name: "Bulgarian",
    native: "Български",
    code: "bg",
  },
  {
    name: "Bihari",
    native: "भोजपुरी",
    code: "bh",
  },
  {
    name: "Bislama",
    native: "Bislama",
    code: "bi",
  },
  {
    name: "Bambara",
    native: "Bamanankan",
    code: "bm",
  },
  {
    name: "Bengali",
    native: "বাংলা",
    code: "bn",
  },
  {
    name: "Tibetan",
    native: "བོད་ཡིག / Bod skad",
    code: "bo",
  },
  {
    name: "Breton",
    native: "Brezhoneg",
    code: "br",
  },
  {
    name: "Bosnian",
    native: "Bosanski",
    code: "bs",
  },
  {
    name: "Catalan",
    native: "Català",
    code: "ca",
  },
  {
    name: "Chechen",
    native: "Нохчийн",
    code: "ce",
  },
  {
    name: "Chamorro",
    native: "Chamoru",
    code: "ch",
  },
  {
    name: "Corsican",
    native: "Corsu",
    code: "co",
  },
  {
    name: "Cree",
    native: "Nehiyaw",
    code: "cr",
  },
  {
    name: "Czech",
    native: "Čeština",
    code: "cs",
  },
  {
    name: "Old Church Slavonic / Old Bulgarian",
    native: "словѣньскъ / slověnĭskŭ",
    code: "cu",
  },
  {
    name: "Chuvash",
    native: "Чăваш",
    code: "cv",
  },
  {
    name: "Welsh",
    native: "Cymraeg",
    code: "cy",
  },
  {
    name: "Danish",
    native: "Dansk",
    code: "da",
  },
  {
    name: "German",
    native: "Deutsch",
    code: "de",
  },
  {
    name: "Divehi",
    native: "ދިވެހިބަސް",
    rtl: 1,
    code: "dv",
  },
  {
    name: "Dzongkha",
    native: "ཇོང་ཁ",
    code: "dz",
  },
  {
    name: "Ewe",
    native: "Ɛʋɛ",
    code: "ee",
  },
  {
    name: "Greek",
    native: "Ελληνικά",
    code: "el",
  },
  {
    name: "English",
    native: "English",
    code: "en",
  },
  {
    name: "Esperanto",
    native: "Esperanto",
    code: "eo",
  },
  {
    name: "Spanish",
    native: "Español",
    code: "es",
  },
  {
    name: "Estonian",
    native: "Eesti",
    code: "et",
  },
  {
    name: "Basque",
    native: "Euskara",
    code: "eu",
  },
  {
    name: "Persian",
    native: "فارسی",
    rtl: 1,
    code: "fa",
  },
  {
    name: "Peul",
    native: "Fulfulde",
    code: "ff",
  },
  {
    name: "Finnish",
    native: "Suomi",
    code: "fi",
  },
  {
    name: "Fijian",
    native: "Na Vosa Vakaviti",
    code: "fj",
  },
  {
    name: "Faroese",
    native: "Føroyskt",
    code: "fo",
  },
  {
    name: "French",
    native: "Français",
    code: "fr",
  },
  {
    name: "West Frisian",
    native: "Frysk",
    code: "fy",
  },
  {
    name: "Irish",
    native: "Gaeilge",
    code: "ga",
  },
  {
    name: "Scottish Gaelic",
    native: "Gàidhlig",
    code: "gd",
  },
  {
    name: "Galician",
    native: "Galego",
    code: "gl",
  },
  {
    name: "Guarani",
    native: "Avañe'ẽ",
    code: "gn",
  },
  {
    name: "Gujarati",
    native: "ગુજરાતી",
    code: "gu",
  },
  {
    name: "Manx",
    native: "Gaelg",
    code: "gv",
  },
  {
    name: "Hausa",
    native: "هَوُسَ",
    rtl: 1,
    code: "ha",
  },
  {
    name: "Hebrew",
    native: "עברית",
    rtl: 1,
    code: "he",
  },
  {
    name: "Hindi",
    native: "हिन्दी",
    code: "hi",
  },
  {
    name: "Hiri Motu",
    native: "Hiri Motu",
    code: "ho",
  },
  {
    name: "Croatian",
    native: "Hrvatski",
    code: "hr",
  },
  {
    name: "Haitian",
    native: "Krèyol ayisyen",
    code: "ht",
  },
  {
    name: "Hungarian",
    native: "Magyar",
    code: "hu",
  },
  {
    name: "Armenian",
    native: "Հայերեն",
    code: "hy",
  },
  {
    name: "Herero",
    native: "Otsiherero",
    code: "hz",
  },
  {
    name: "Interlingua",
    native: "Interlingua",
    code: "ia",
  },
  {
    name: "Indonesian",
    native: "Bahasa Indonesia",
    code: "id",
  },
  {
    name: "Interlingue",
    native: "Interlingue",
    code: "ie",
  },
  {
    name: "Igbo",
    native: "Igbo",
    code: "ig",
  },
  {
    name: "Sichuan Yi",
    native: "ꆇꉙ / 四川彝语",
    code: "ii",
  },
  {
    name: "Inupiak",
    native: "Iñupiak",
    code: "ik",
  },
  {
    name: "Ido",
    native: "Ido",
    code: "io",
  },
  {
    name: "Icelandic",
    native: "Íslenska",
    code: "is",
  },
  {
    name: "Italian",
    native: "Italiano",
    code: "it",
  },
  {
    name: "Inuktitut",
    native: "ᐃᓄᒃᑎᑐᑦ",
    code: "iu",
  },
  {
    name: "Japanese",
    native: "日本語",
    code: "ja",
  },
  {
    name: "Javanese",
    native: "Basa Jawa",
    code: "jv",
  },
  {
    name: "Georgian",
    native: "ქართული",
    code: "ka",
  },
  {
    name: "Kongo",
    native: "KiKongo",
    code: "kg",
  },
  {
    name: "Kikuyu",
    native: "Gĩkũyũ",
    code: "ki",
  },
  {
    name: "Kuanyama",
    native: "Kuanyama",
    code: "kj",
  },
  {
    name: "Kazakh",
    native: "Қазақша",
    code: "kk",
  },
  {
    name: "Greenlandic",
    native: "Kalaallisut",
    code: "kl",
  },
  {
    name: "Cambodian",
    native: "ភាសាខ្មែរ",
    code: "km",
  },
  {
    name: "Kannada",
    native: "ಕನ್ನಡ",
    code: "kn",
  },
  {
    name: "Korean",
    native: "한국어",
    code: "ko",
  },
  {
    name: "Kanuri",
    native: "Kanuri",
    code: "kr",
  },
  {
    name: "Kashmiri",
    native: "कश्मीरी / كشميري",
    rtl: 1,
    code: "ks",
  },
  {
    name: "Kurdish",
    native: "Kurdî / كوردی",
    rtl: 1,
    code: "ku",
  },
  {
    name: "Komi",
    native: "Коми",
    code: "kv",
  },
  {
    name: "Cornish",
    native: "Kernewek",
    code: "kw",
  },
  {
    name: "Kyrgyz",
    native: "Кыргызча",
    code: "ky",
  },
  {
    name: "Latin",
    native: "Latina",
    code: "la",
  },
  {
    name: "Luxembourgish",
    native: "Lëtzebuergesch",
    code: "lb",
  },
  {
    name: "Ganda",
    native: "Luganda",
    code: "lg",
  },
  {
    name: "Limburgian",
    native: "Limburgs",
    code: "li",
  },
  {
    name: "Lingala",
    native: "Lingála",
    code: "ln",
  },
  {
    name: "Laotian",
    native: "ລາວ / Pha xa lao",
    code: "lo",
  },
  {
    name: "Lithuanian",
    native: "Lietuvių",
    code: "lt",
  },
  {
    name: "Luba-Katanga",
    native: "Tshiluba",
    code: "lu",
  },
  {
    name: "Latvian",
    native: "Latviešu",
    code: "lv",
  },
  {
    name: "Malagasy",
    native: "Malagasy",
    code: "mg",
  },
  {
    name: "Marshallese",
    native: "Kajin Majel / Ebon",
    code: "mh",
  },
  {
    name: "Maori",
    native: "Māori",
    code: "mi",
  },
  {
    name: "Macedonian",
    native: "Македонски",
    code: "mk",
  },
  {
    name: "Malayalam",
    native: "മലയാളം",
    code: "ml",
  },
  {
    name: "Mongolian",
    native: "Монгол",
    code: "mn",
  },
  {
    name: "Moldovan",
    native: "Moldovenească",
    code: "mo",
  },
  {
    name: "Marathi",
    native: "मराठी",
    code: "mr",
  },
  {
    name: "Malay",
    native: "Bahasa Melayu",
    code: "ms",
  },
  {
    name: "Maltese",
    native: "bil-Malti",
    code: "mt",
  },
  {
    name: "Burmese",
    native: "မြန်မာစာ",
    code: "my",
  },
  {
    name: "Nauruan",
    native: "Dorerin Naoero",
    code: "na",
  },
  {
    name: "Norwegian Bokmål",
    native: "Norsk bokmål",
    code: "nb",
  },
  {
    name: "North Ndebele",
    native: "Sindebele",
    code: "nd",
  },
  {
    name: "Nepali",
    native: "नेपाली",
    code: "ne",
  },
  {
    name: "Ndonga",
    native: "Oshiwambo",
    code: "ng",
  },
  {
    name: "Dutch",
    native: "Nederlands",
    code: "nl",
  },
  {
    name: "Norwegian Nynorsk",
    native: "Norsk nynorsk",
    code: "nn",
  },
  {
    name: "Norwegian",
    native: "Norsk",
    code: "no",
  },
  {
    name: "South Ndebele",
    native: "isiNdebele",
    code: "nr",
  },
  {
    name: "Navajo",
    native: "Diné bizaad",
    code: "nv",
  },
  {
    name: "Chichewa",
    native: "Chi-Chewa",
    code: "ny",
  },
  {
    name: "Occitan",
    native: "Occitan",
    code: "oc",
  },
  {
    name: "Ojibwa",
    native: "ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin",
    code: "oj",
  },
  {
    name: "Oromo",
    native: "Oromoo",
    code: "om",
  },
  {
    name: "Oriya",
    native: "ଓଡ଼ିଆ",
    code: "or",
  },
  {
    name: "Ossetian / Ossetic",
    native: "Иронау",
    code: "os",
  },
  {
    name: "Panjabi / Punjabi",
    native: "ਪੰਜਾਬੀ / पंजाबी / پنجابي",
    code: "pa",
  },
  {
    name: "Pali",
    native: "Pāli / पाऴि",
    code: "pi",
  },
  {
    name: "Polish",
    native: "Polski",
    code: "pl",
  },
  {
    name: "Pashto",
    native: "پښتو",
    rtl: 1,
    code: "ps",
  },
  {
    name: "Portuguese",
    native: "Português",
    code: "pt",
  },
  {
    name: "Quechua",
    native: "Runa Simi",
    code: "qu",
  },
  {
    name: "Raeto Romance",
    native: "Rumantsch",
    code: "rm",
  },
  {
    name: "Kirundi",
    native: "Kirundi",
    code: "rn",
  },
  {
    name: "Romanian",
    native: "Română",
    code: "ro",
  },
  {
    name: "Russian",
    native: "Русский",
    code: "ru",
  },
  {
    name: "Rwandi",
    native: "Kinyarwandi",
    code: "rw",
  },
  {
    name: "Sanskrit",
    native: "संस्कृतम्",
    code: "sa",
  },
  {
    name: "Sardinian",
    native: "Sardu",
    code: "sc",
  },
  {
    name: "Sindhi",
    native: "सिनधि",
    code: "sd",
  },
  {
    name: "Northern Sami",
    native: "Sámegiella",
    code: "se",
  },
  {
    name: "Sango",
    native: "Sängö",
    code: "sg",
  },
  {
    name: "Serbo-Croatian",
    native: "Srpskohrvatski / Српскохрватски",
    code: "sh",
  },
  {
    name: "Sinhalese",
    native: "සිංහල",
    code: "si",
  },
  {
    name: "Slovak",
    native: "Slovenčina",
    code: "sk",
  },
  {
    name: "Slovenian",
    native: "Slovenščina",
    code: "sl",
  },
  {
    name: "Samoan",
    native: "Gagana Samoa",
    code: "sm",
  },
  {
    name: "Shona",
    native: "chiShona",
    code: "sn",
  },
  {
    name: "Somalia",
    native: "Soomaaliga",
    code: "so",
  },
  {
    name: "Albanian",
    native: "Shqip",
    code: "sq",
  },
  {
    name: "Serbian",
    native: "Српски",
    code: "sr",
  },
  {
    name: "Swati",
    native: "SiSwati",
    code: "ss",
  },
  {
    name: "Southern Sotho",
    native: "Sesotho",
    code: "st",
  },
  {
    name: "Sundanese",
    native: "Basa Sunda",
    code: "su",
  },
  {
    name: "Swedish",
    native: "Svenska",
    code: "sv",
  },
  {
    name: "Swahili",
    native: "Kiswahili",
    code: "sw",
  },
  {
    name: "Tamil",
    native: "தமிழ்",
    code: "ta",
  },
  {
    name: "Telugu",
    native: "తెలుగు",
    code: "te",
  },
  {
    name: "Tajik",
    native: "Тоҷикӣ",
    code: "tg",
  },
  {
    name: "Thai",
    native: "ไทย / Phasa Thai",
    code: "th",
  },
  {
    name: "Tigrinya",
    native: "ትግርኛ",
    code: "ti",
  },
  {
    name: "Turkmen",
    native: "Туркмен / تركمن",
    code: "tk",
  },
  {
    name: "Tagalog / Filipino",
    native: "Tagalog",
    code: "tl",
  },
  {
    name: "Tswana",
    native: "Setswana",
    code: "tn",
  },
  {
    name: "Tonga",
    native: "Lea Faka-Tonga",
    code: "to",
  },
  {
    name: "Turkish",
    native: "Türkçe",
    code: "tr",
  },
  {
    name: "Tsonga",
    native: "Xitsonga",
    code: "ts",
  },
  {
    name: "Tatar",
    native: "Tatarça",
    code: "tt",
  },
  {
    name: "Twi",
    native: "Twi",
    code: "tw",
  },
  {
    name: "Tahitian",
    native: "Reo Mā`ohi",
    code: "ty",
  },
  {
    name: "Uyghur",
    native: "Uyƣurqə / ئۇيغۇرچە",
    code: "ug",
  },
  {
    name: "Ukrainian",
    native: "Українська",
    code: "uk",
  },
  {
    name: "Urdu",
    native: "اردو",
    rtl: 1,
    code: "ur",
  },
  {
    name: "Uzbek",
    native: "Ўзбек",
    code: "uz",
  },
  {
    name: "Venda",
    native: "Tshivenḓa",
    code: "ve",
  },
  {
    name: "Vietnamese",
    native: "Tiếng Việt",
    code: "vi",
  },
  {
    name: "Volapük",
    native: "Volapük",
    code: "vo",
  },
  {
    name: "Walloon",
    native: "Walon",
    code: "wa",
  },
  {
    name: "Wolof",
    native: "Wollof",
    code: "wo",
  },
  {
    name: "Xhosa",
    native: "isiXhosa",
    code: "xh",
  },
  {
    name: "Yiddish",
    native: "ייִדיש",
    rtl: 1,
    code: "yi",
  },
  {
    name: "Yoruba",
    native: "Yorùbá",
    code: "yo",
  },
  {
    name: "Zhuang",
    native: "Cuengh / Tôô / 壮语",
    code: "za",
  },
  {
    name: "Chinese",
    native: "中文",
    code: "zh",
  },
  {
    name: "Zulu",
    native: "isiZulu",
    code: "zu",
  },
] as const satisfies readonly Language[];

export const LANGUAGE_NAMES = LANGUAGES.map((l) => l.name);

export type LanguageCodes = (typeof LANGUAGES)[number]["code"];

export type LanguageNames = (typeof LANGUAGES)[number]["name"];
