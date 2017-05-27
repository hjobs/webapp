import React from 'react';
import clone from 'clone';
import { getTranslations } from '../translationStore';
import { geolocationMappingObject } from '../../services/var';

export const langObj = {
    "ab":{
        "name":"Abkhaz",
        "nativeName":"аҧсуа"
    },
    "aa":{
        "name":"Afar",
        "nativeName":"Afaraf"
    },
    "af":{
        "name":"Afrikaans",
        "nativeName":"Afrikaans"
    },
    "ak":{
        "name":"Akan",
        "nativeName":"Akan"
    },
    "sq":{
        "name":"Albanian",
        "nativeName":"Shqip"
    },
    "am":{
        "name":"Amharic",
        "nativeName":"አማርኛ"
    },
    "ar":{
        "name":"Arabic",
        "nativeName":"العربية"
    },
    "an":{
        "name":"Aragonese",
        "nativeName":"Aragonés"
    },
    "hy":{
        "name":"Armenian",
        "nativeName":"Հայերեն"
    },
    "as":{
        "name":"Assamese",
        "nativeName":"অসমীয়া"
    },
    "av":{
        "name":"Avaric",
        "nativeName":"авар мацӀ, магӀарул мацӀ"
    },
    "ae":{
        "name":"Avestan",
        "nativeName":"avesta"
    },
    "ay":{
        "name":"Aymara",
        "nativeName":"aymar aru"
    },
    "az":{
        "name":"Azerbaijani",
        "nativeName":"azərbaycan dili"
    },
    "bm":{
        "name":"Bambara",
        "nativeName":"bamanankan"
    },
    "ba":{
        "name":"Bashkir",
        "nativeName":"башҡорт теле"
    },
    "eu":{
        "name":"Basque",
        "nativeName":"euskara, euskera"
    },
    "be":{
        "name":"Belarusian",
        "nativeName":"Беларуская"
    },
    "bn":{
        "name":"Bengali",
        "nativeName":"বাংলা"
    },
    "bh":{
        "name":"Bihari",
        "nativeName":"भोजपुरी"
    },
    "bi":{
        "name":"Bislama",
        "nativeName":"Bislama"
    },
    "bs":{
        "name":"Bosnian",
        "nativeName":"bosanski jezik"
    },
    "br":{
        "name":"Breton",
        "nativeName":"brezhoneg"
    },
    "bg":{
        "name":"Bulgarian",
        "nativeName":"български език"
    },
    "my":{
        "name":"Burmese",
        "nativeName":"ဗမာစာ"
    },
    "ca":{
        "name":"Catalan; Valencian",
        "nativeName":"Català"
    },
    "ch":{
        "name":"Chamorro",
        "nativeName":"Chamoru"
    },
    "ce":{
        "name":"Chechen",
        "nativeName":"нохчийн мотт"
    },
    "ny":{
        "name":"Chichewa; Chewa; Nyanja",
        "nativeName":"chiCheŵa, chinyanja"
    },
    "zh_can":{
        "name":"Cantonese (Chinese)",
        "nativeName":"粵語"
    },
    "zh_man":{
        "name": "Mandarin (Chinese)",
        "nativeName": "漢語"
    },
    "cv":{
        "name":"Chuvash",
        "nativeName":"чӑваш чӗлхи"
    },
    "kw":{
        "name":"Cornish",
        "nativeName":"Kernewek"
    },
    "co":{
        "name":"Corsican",
        "nativeName":"corsu, lingua corsa"
    },
    "cr":{
        "name":"Cree",
        "nativeName":"ᓀᐦᐃᔭᐍᐏᐣ"
    },
    "hr":{
        "name":"Croatian",
        "nativeName":"hrvatski"
    },
    "cs":{
        "name":"Czech",
        "nativeName":"česky, čeština"
    },
    "da":{
        "name":"Danish",
        "nativeName":"dansk"
    },
    "dv":{
        "name":"Divehi; Dhivehi; Maldivian;",
        "nativeName":"ދިވެހި"
    },
    "nl":{
        "name":"Dutch",
        "nativeName":"Nederlands, Vlaams"
    },
    "en":{
        "name":"English",
        "nativeName":"English"
    },
    "eo":{
        "name":"Esperanto",
        "nativeName":"Esperanto"
    },
    "et":{
        "name":"Estonian",
        "nativeName":"eesti, eesti keel"
    },
    "ee":{
        "name":"Ewe",
        "nativeName":"Eʋegbe"
    },
    "fo":{
        "name":"Faroese",
        "nativeName":"føroyskt"
    },
    "fj":{
        "name":"Fijian",
        "nativeName":"vosa Vakaviti"
    },
    "fi":{
        "name":"Finnish",
        "nativeName":"suomi, suomen kieli"
    },
    "fr":{
        "name":"French",
        "nativeName":"français, langue française"
    },
    "ff":{
        "name":"Fula; Fulah; Pulaar; Pular",
        "nativeName":"Fulfulde, Pulaar, Pular"
    },
    "gl":{
        "name":"Galician",
        "nativeName":"Galego"
    },
    "ka":{
        "name":"Georgian",
        "nativeName":"ქართული"
    },
    "de":{
        "name":"German",
        "nativeName":"Deutsch"
    },
    "el":{
        "name":"Greek, Modern",
        "nativeName":"Ελληνικά"
    },
    "gn":{
        "name":"Guaraní",
        "nativeName":"Avañeẽ"
    },
    "gu":{
        "name":"Gujarati",
        "nativeName":"ગુજરાતી"
    },
    "ht":{
        "name":"Haitian; Haitian Creole",
        "nativeName":"Kreyòl ayisyen"
    },
    "ha":{
        "name":"Hausa",
        "nativeName":"Hausa, هَوُسَ"
    },
    "he":{
        "name":"Hebrew (modern)",
        "nativeName":"עברית"
    },
    "hz":{
        "name":"Herero",
        "nativeName":"Otjiherero"
    },
    "hi":{
        "name":"Hindi",
        "nativeName":"हिन्दी, हिंदी"
    },
    "ho":{
        "name":"Hiri Motu",
        "nativeName":"Hiri Motu"
    },
    "hu":{
        "name":"Hungarian",
        "nativeName":"Magyar"
    },
    "ia":{
        "name":"Interlingua",
        "nativeName":"Interlingua"
    },
    "id":{
        "name":"Indonesian",
        "nativeName":"Bahasa Indonesia"
    },
    "ie":{
        "name":"Interlingue",
        "nativeName":"Originally called Occidental; then Interlingue after WWII"
    },
    "ga":{
        "name":"Irish",
        "nativeName":"Gaeilge"
    },
    "ig":{
        "name":"Igbo",
        "nativeName":"Asụsụ Igbo"
    },
    "ik":{
        "name":"Inupiaq",
        "nativeName":"Iñupiaq, Iñupiatun"
    },
    "io":{
        "name":"Ido",
        "nativeName":"Ido"
    },
    "is":{
        "name":"Icelandic",
        "nativeName":"Íslenska"
    },
    "it":{
        "name":"Italian",
        "nativeName":"Italiano"
    },
    "iu":{
        "name":"Inuktitut",
        "nativeName":"ᐃᓄᒃᑎᑐᑦ"
    },
    "ja":{
        "name":"Japanese",
        "nativeName":"日本語 (にほんご／にっぽんご)"
    },
    "jv":{
        "name":"Javanese",
        "nativeName":"basa Jawa"
    },
    "kl":{
        "name":"Kalaallisut, Greenlandic",
        "nativeName":"kalaallisut, kalaallit oqaasii"
    },
    "kn":{
        "name":"Kannada",
        "nativeName":"ಕನ್ನಡ"
    },
    "kr":{
        "name":"Kanuri",
        "nativeName":"Kanuri"
    },
    "ks":{
        "name":"Kashmiri",
        "nativeName":"कश्मीरी, كشميري‎"
    },
    "kk":{
        "name":"Kazakh",
        "nativeName":"Қазақ тілі"
    },
    "km":{
        "name":"Khmer",
        "nativeName":"ភាសាខ្មែរ"
    },
    "ki":{
        "name":"Kikuyu, Gikuyu",
        "nativeName":"Gĩkũyũ"
    },
    "rw":{
        "name":"Kinyarwanda",
        "nativeName":"Ikinyarwanda"
    },
    "ky":{
        "name":"Kirghiz, Kyrgyz",
        "nativeName":"кыргыз тили"
    },
    "kv":{
        "name":"Komi",
        "nativeName":"коми кыв"
    },
    "kg":{
        "name":"Kongo",
        "nativeName":"KiKongo"
    },
    "ko":{
        "name":"Korean",
        "nativeName":"한국어 (韓國語), 조선말 (朝鮮語)"
    },
    "ku":{
        "name":"Kurdish",
        "nativeName":"Kurdî, كوردی‎"
    },
    "kj":{
        "name":"Kwanyama, Kuanyama",
        "nativeName":"Kuanyama"
    },
    "la":{
        "name":"Latin",
        "nativeName":"latine, lingua latina"
    },
    "lb":{
        "name":"Luxembourgish, Letzeburgesch",
        "nativeName":"Lëtzebuergesch"
    },
    "lg":{
        "name":"Luganda",
        "nativeName":"Luganda"
    },
    "li":{
        "name":"Limburgish, Limburgan, Limburger",
        "nativeName":"Limburgs"
    },
    "ln":{
        "name":"Lingala",
        "nativeName":"Lingála"
    },
    "lo":{
        "name":"Lao",
        "nativeName":"ພາສາລາວ"
    },
    "lt":{
        "name":"Lithuanian",
        "nativeName":"lietuvių kalba"
    },
    "lu":{
        "name":"Luba-Katanga",
        "nativeName":""
    },
    "lv":{
        "name":"Latvian",
        "nativeName":"latviešu valoda"
    },
    "gv":{
        "name":"Manx",
        "nativeName":"Gaelg, Gailck"
    },
    "mk":{
        "name":"Macedonian",
        "nativeName":"македонски јазик"
    },
    "mg":{
        "name":"Malagasy",
        "nativeName":"Malagasy fiteny"
    },
    "ms":{
        "name":"Malay",
        "nativeName":"bahasa Melayu, بهاس ملايو‎"
    },
    "ml":{
        "name":"Malayalam",
        "nativeName":"മലയാളം"
    },
    "mt":{
        "name":"Maltese",
        "nativeName":"Malti"
    },
    "mi":{
        "name":"Māori",
        "nativeName":"te reo Māori"
    },
    "mr":{
        "name":"Marathi (Marāṭhī)",
        "nativeName":"मराठी"
    },
    "mh":{
        "name":"Marshallese",
        "nativeName":"Kajin M̧ajeļ"
    },
    "mn":{
        "name":"Mongolian",
        "nativeName":"монгол"
    },
    "na":{
        "name":"Nauru",
        "nativeName":"Ekakairũ Naoero"
    },
    "nv":{
        "name":"Navajo, Navaho",
        "nativeName":"Diné bizaad, Dinékʼehǰí"
    },
    "nb":{
        "name":"Norwegian Bokmål",
        "nativeName":"Norsk bokmål"
    },
    "nd":{
        "name":"North Ndebele",
        "nativeName":"isiNdebele"
    },
    "ne":{
        "name":"Nepali",
        "nativeName":"नेपाली"
    },
    "ng":{
        "name":"Ndonga",
        "nativeName":"Owambo"
    },
    "nn":{
        "name":"Norwegian Nynorsk",
        "nativeName":"Norsk nynorsk"
    },
    "no":{
        "name":"Norwegian",
        "nativeName":"Norsk"
    },
    "ii":{
        "name":"Nuosu",
        "nativeName":"ꆈꌠ꒿ Nuosuhxop"
    },
    "nr":{
        "name":"South Ndebele",
        "nativeName":"isiNdebele"
    },
    "oc":{
        "name":"Occitan",
        "nativeName":"Occitan"
    },
    "oj":{
        "name":"Ojibwe, Ojibwa",
        "nativeName":"ᐊᓂᔑᓈᐯᒧᐎᓐ"
    },
    "cu":{
        "name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
        "nativeName":"ѩзыкъ словѣньскъ"
    },
    "om":{
        "name":"Oromo",
        "nativeName":"Afaan Oromoo"
    },
    "or":{
        "name":"Oriya",
        "nativeName":"ଓଡ଼ିଆ"
    },
    "os":{
        "name":"Ossetian, Ossetic",
        "nativeName":"ирон æвзаг"
    },
    "pa":{
        "name":"Panjabi, Punjabi",
        "nativeName":"ਪੰਜਾਬੀ, پنجابی‎"
    },
    "pi":{
        "name":"Pāli",
        "nativeName":"पाऴि"
    },
    "fa":{
        "name":"Persian",
        "nativeName":"فارسی"
    },
    "pl":{
        "name":"Polish",
        "nativeName":"polski"
    },
    "ps":{
        "name":"Pashto, Pushto",
        "nativeName":"پښتو"
    },
    "pt":{
        "name":"Portuguese",
        "nativeName":"Português"
    },
    "qu":{
        "name":"Quechua",
        "nativeName":"Runa Simi, Kichwa"
    },
    "rm":{
        "name":"Romansh",
        "nativeName":"rumantsch grischun"
    },
    "rn":{
        "name":"Kirundi",
        "nativeName":"kiRundi"
    },
    "ro":{
        "name":"Romanian, Moldavian, Moldovan",
        "nativeName":"română"
    },
    "ru":{
        "name":"Russian",
        "nativeName":"русский язык"
    },
    "sa":{
        "name":"Sanskrit (Saṁskṛta)",
        "nativeName":"संस्कृतम्"
    },
    "sc":{
        "name":"Sardinian",
        "nativeName":"sardu"
    },
    "sd":{
        "name":"Sindhi",
        "nativeName":"सिन्धी, سنڌي، سندھی‎"
    },
    "se":{
        "name":"Northern Sami",
        "nativeName":"Davvisámegiella"
    },
    "sm":{
        "name":"Samoan",
        "nativeName":"gagana faa Samoa"
    },
    "sg":{
        "name":"Sango",
        "nativeName":"yângâ tî sängö"
    },
    "sr":{
        "name":"Serbian",
        "nativeName":"српски језик"
    },
    "gd":{
        "name":"Scottish Gaelic; Gaelic",
        "nativeName":"Gàidhlig"
    },
    "sn":{
        "name":"Shona",
        "nativeName":"chiShona"
    },
    "si":{
        "name":"Sinhala, Sinhalese",
        "nativeName":"සිංහල"
    },
    "sk":{
        "name":"Slovak",
        "nativeName":"slovenčina"
    },
    "sl":{
        "name":"Slovene",
        "nativeName":"slovenščina"
    },
    "so":{
        "name":"Somali",
        "nativeName":"Soomaaliga, af Soomaali"
    },
    "st":{
        "name":"Southern Sotho",
        "nativeName":"Sesotho"
    },
    "es":{
        "name":"Spanish; Castilian",
        "nativeName":"español, castellano"
    },
    "su":{
        "name":"Sundanese",
        "nativeName":"Basa Sunda"
    },
    "sw":{
        "name":"Swahili",
        "nativeName":"Kiswahili"
    },
    "ss":{
        "name":"Swati",
        "nativeName":"SiSwati"
    },
    "sv":{
        "name":"Swedish",
        "nativeName":"svenska"
    },
    "ta":{
        "name":"Tamil",
        "nativeName":"தமிழ்"
    },
    "te":{
        "name":"Telugu",
        "nativeName":"తెలుగు"
    },
    "tg":{
        "name":"Tajik",
        "nativeName":"тоҷикӣ, toğikī, تاجیکی‎"
    },
    "th":{
        "name":"Thai",
        "nativeName":"ไทย"
    },
    "ti":{
        "name":"Tigrinya",
        "nativeName":"ትግርኛ"
    },
    "bo":{
        "name":"Tibetan Standard, Tibetan, Central",
        "nativeName":"བོད་ཡིག"
    },
    "tk":{
        "name":"Turkmen",
        "nativeName":"Türkmen, Түркмен"
    },
    "tl":{
        "name":"Tagalog",
        "nativeName":"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
    },
    "tn":{
        "name":"Tswana",
        "nativeName":"Setswana"
    },
    "to":{
        "name":"Tonga (Tonga Islands)",
        "nativeName":"faka Tonga"
    },
    "tr":{
        "name":"Turkish",
        "nativeName":"Türkçe"
    },
    "ts":{
        "name":"Tsonga",
        "nativeName":"Xitsonga"
    },
    "tt":{
        "name":"Tatar",
        "nativeName":"татарча, tatarça, تاتارچا‎"
    },
    "tw":{
        "name":"Twi",
        "nativeName":"Twi"
    },
    "ty":{
        "name":"Tahitian",
        "nativeName":"Reo Tahiti"
    },
    "ug":{
        "name":"Uighur, Uyghur",
        "nativeName":"Uyƣurqə, ئۇيغۇرچە‎"
    },
    "uk":{
        "name":"Ukrainian",
        "nativeName":"українська"
    },
    "ur":{
        "name":"Urdu",
        "nativeName":"اردو"
    },
    "uz":{
        "name":"Uzbek",
        "nativeName":"zbek, Ўзбек, أۇزبېك‎"
    },
    "ve":{
        "name":"Venda",
        "nativeName":"Tshivenḓa"
    },
    "vi":{
        "name":"Vietnamese",
        "nativeName":"Tiếng Việt"
    },
    "vo":{
        "name":"Volapük",
        "nativeName":"Volapük"
    },
    "wa":{
        "name":"Walloon",
        "nativeName":"Walon"
    },
    "cy":{
        "name":"Welsh",
        "nativeName":"Cymraeg"
    },
    "wo":{
        "name":"Wolof",
        "nativeName":"Wollof"
    },
    "fy":{
        "name":"Western Frisian",
        "nativeName":"Frysk"
    },
    "xh":{
        "name":"Xhosa",
        "nativeName":"isiXhosa"
    },
    "yi":{
        "name":"Yiddish",
        "nativeName":"ייִדיש"
    },
    "yo":{
        "name":"Yoruba",
        "nativeName":"Yorùbá"
    },
    "za":{
        "name":"Zhuang, Chuang",
        "nativeName":"Saɯ cueŋƅ, Saw cuengh"
    }
}

export const langArr = [
  {"key":"ab","name":"Abkhaz","text":"Abkhaz","value":"ab"},{"key":"aa","name":"Afar","text":"Afar","value":"aa"},{"key":"af","name":"Afrikaans","text":"Afrikaans","value":"af"},{"key":"ak","name":"Akan","text":"Akan","value":"ak"},{"key":"sq","name":"Albanian","text":"Albanian","value":"sq"},{"key":"am","name":"Amharic","text":"Amharic","value":"am"},{"key":"ar","name":"Arabic","text":"Arabic","value":"ar"},{"key":"an","name":"Aragonese","text":"Aragonese","value":"an"},{"key":"hy","name":"Armenian","text":"Armenian","value":"hy"},{"key":"as","name":"Assamese","text":"Assamese","value":"as"},{"key":"av","name":"Avaric","text":"Avaric","value":"av"},{"key":"ae","name":"Avestan","text":"Avestan","value":"ae"},{"key":"ay","name":"Aymara","text":"Aymara","value":"ay"},{"key":"az","name":"Azerbaijani","text":"Azerbaijani","value":"az"},{"key":"bm","name":"Bambara","text":"Bambara","value":"bm"},{"key":"ba","name":"Bashkir","text":"Bashkir","value":"ba"},{"key":"eu","name":"Basque","text":"Basque","value":"eu"},{"key":"be","name":"Belarusian","text":"Belarusian","value":"be"},{"key":"bn","name":"Bengali","text":"Bengali","value":"bn"},{"key":"bh","name":"Bihari","text":"Bihari","value":"bh"},{"key":"bi","name":"Bislama","text":"Bislama","value":"bi"},{"key":"bs","name":"Bosnian","text":"Bosnian","value":"bs"},{"key":"br","name":"Breton","text":"Breton","value":"br"},{"key":"bg","name":"Bulgarian","text":"Bulgarian","value":"bg"},{"key":"my","name":"Burmese","text":"Burmese","value":"my"},{"key":"ca","name":"Catalan; Valencian","text":"Catalan; Valencian","value":"ca"},{"key":"ch","name":"Chamorro","text":"Chamorro","value":"ch"},{"key":"ce","name":"Chechen","text":"Chechen","value":"ce"},{"key":"ny","name":"Chichewa; Chewa; Nyanja","text":"Chichewa; Chewa; Nyanja","value":"ny"},{"key":"zh_can","name":"Cantonese (Chinese)","text":"Cantonese (Chinese)","value":"zh_can"},{"key":"zh_man","name":"Mandarin (Chinese)","text":"Mandarin (Chinese)","value":"zh_man"},{"key":"cv","name":"Chuvash","text":"Chuvash","value":"cv"},{"key":"kw","name":"Cornish","text":"Cornish","value":"kw"},{"key":"co","name":"Corsican","text":"Corsican","value":"co"},{"key":"cr","name":"Cree","text":"Cree","value":"cr"},{"key":"hr","name":"Croatian","text":"Croatian","value":"hr"},{"key":"cs","name":"Czech","text":"Czech","value":"cs"},{"key":"da","name":"Danish","text":"Danish","value":"da"},{"key":"dv","name":"Divehi; Dhivehi; Maldivian;","text":"Divehi; Dhivehi; Maldivian;","value":"dv"},{"key":"nl","name":"Dutch","text":"Dutch","value":"nl"},{"key":"en","name":"English","text":"English","value":"en"},{"key":"eo","name":"Esperanto","text":"Esperanto","value":"eo"},{"key":"et","name":"Estonian","text":"Estonian","value":"et"},{"key":"ee","name":"Ewe","text":"Ewe","value":"ee"},{"key":"fo","name":"Faroese","text":"Faroese","value":"fo"},{"key":"fj","name":"Fijian","text":"Fijian","value":"fj"},{"key":"fi","name":"Finnish","text":"Finnish","value":"fi"},{"key":"fr","name":"French","text":"French","value":"fr"},{"key":"ff","name":"Fula; Fulah; Pulaar; Pular","text":"Fula; Fulah; Pulaar; Pular","value":"ff"},{"key":"gl","name":"Galician","text":"Galician","value":"gl"},{"key":"ka","name":"Georgian","text":"Georgian","value":"ka"},{"key":"de","name":"German","text":"German","value":"de"},{"key":"el","name":"Greek, Modern","text":"Greek, Modern","value":"el"},{"key":"gn","name":"Guaraní","text":"Guaraní","value":"gn"},{"key":"gu","name":"Gujarati","text":"Gujarati","value":"gu"},{"key":"ht","name":"Haitian; Haitian Creole","text":"Haitian; Haitian Creole","value":"ht"},{"key":"ha","name":"Hausa","text":"Hausa","value":"ha"},{"key":"he","name":"Hebrew (modern)","text":"Hebrew (modern)","value":"he"},{"key":"hz","name":"Herero","text":"Herero","value":"hz"},{"key":"hi","name":"Hindi","text":"Hindi","value":"hi"},{"key":"ho","name":"Hiri Motu","text":"Hiri Motu","value":"ho"},{"key":"hu","name":"Hungarian","text":"Hungarian","value":"hu"},{"key":"ia","name":"Interlingua","text":"Interlingua","value":"ia"},{"key":"id","name":"Indonesian","text":"Indonesian","value":"id"},{"key":"ie","name":"Interlingue","text":"Interlingue","value":"ie"},{"key":"ga","name":"Irish","text":"Irish","value":"ga"},{"key":"ig","name":"Igbo","text":"Igbo","value":"ig"},{"key":"ik","name":"Inupiaq","text":"Inupiaq","value":"ik"},{"key":"io","name":"Ido","text":"Ido","value":"io"},{"key":"is","name":"Icelandic","text":"Icelandic","value":"is"},{"key":"it","name":"Italian","text":"Italian","value":"it"},{"key":"iu","name":"Inuktitut","text":"Inuktitut","value":"iu"},{"key":"ja","name":"Japanese","text":"Japanese","value":"ja"},{"key":"jv","name":"Javanese","text":"Javanese","value":"jv"},{"key":"kl","name":"Kalaallisut, Greenlandic","text":"Kalaallisut, Greenlandic","value":"kl"},{"key":"kn","name":"Kannada","text":"Kannada","value":"kn"},{"key":"kr","name":"Kanuri","text":"Kanuri","value":"kr"},{"key":"ks","name":"Kashmiri","text":"Kashmiri","value":"ks"},{"key":"kk","name":"Kazakh","text":"Kazakh","value":"kk"},{"key":"km","name":"Khmer","text":"Khmer","value":"km"},{"key":"ki","name":"Kikuyu, Gikuyu","text":"Kikuyu, Gikuyu","value":"ki"},{"key":"rw","name":"Kinyarwanda","text":"Kinyarwanda","value":"rw"},{"key":"ky","name":"Kirghiz, Kyrgyz","text":"Kirghiz, Kyrgyz","value":"ky"},{"key":"kv","name":"Komi","text":"Komi","value":"kv"},{"key":"kg","name":"Kongo","text":"Kongo","value":"kg"},{"key":"ko","name":"Korean","text":"Korean","value":"ko"},{"key":"ku","name":"Kurdish","text":"Kurdish","value":"ku"},{"key":"kj","name":"Kwanyama, Kuanyama","text":"Kwanyama, Kuanyama","value":"kj"},{"key":"la","name":"Latin","text":"Latin","value":"la"},{"key":"lb","name":"Luxembourgish, Letzeburgesch","text":"Luxembourgish, Letzeburgesch","value":"lb"},{"key":"lg","name":"Luganda","text":"Luganda","value":"lg"},{"key":"li","name":"Limburgish, Limburgan, Limburger","text":"Limburgish, Limburgan, Limburger","value":"li"},{"key":"ln","name":"Lingala","text":"Lingala","value":"ln"},{"key":"lo","name":"Lao","text":"Lao","value":"lo"},{"key":"lt","name":"Lithuanian","text":"Lithuanian","value":"lt"},{"key":"lu","name":"Luba-Katanga","text":"Luba-Katanga","value":"lu"},{"key":"lv","name":"Latvian","text":"Latvian","value":"lv"},{"key":"gv","name":"Manx","text":"Manx","value":"gv"},{"key":"mk","name":"Macedonian","text":"Macedonian","value":"mk"},{"key":"mg","name":"Malagasy","text":"Malagasy","value":"mg"},{"key":"ms","name":"Malay","text":"Malay","value":"ms"},{"key":"ml","name":"Malayalam","text":"Malayalam","value":"ml"},{"key":"mt","name":"Maltese","text":"Maltese","value":"mt"},{"key":"mi","name":"Māori","text":"Māori","value":"mi"},{"key":"mr","name":"Marathi (Marāṭhī)","text":"Marathi (Marāṭhī)","value":"mr"},{"key":"mh","name":"Marshallese","text":"Marshallese","value":"mh"},{"key":"mn","name":"Mongolian","text":"Mongolian","value":"mn"},{"key":"na","name":"Nauru","text":"Nauru","value":"na"},{"key":"nv","name":"Navajo, Navaho","text":"Navajo, Navaho","value":"nv"},{"key":"nb","name":"Norwegian Bokmål","text":"Norwegian Bokmål","value":"nb"},{"key":"nd","name":"North Ndebele","text":"North Ndebele","value":"nd"},{"key":"ne","name":"Nepali","text":"Nepali","value":"ne"},{"key":"ng","name":"Ndonga","text":"Ndonga","value":"ng"},{"key":"nn","name":"Norwegian Nynorsk","text":"Norwegian Nynorsk","value":"nn"},{"key":"no","name":"Norwegian","text":"Norwegian","value":"no"},{"key":"ii","name":"Nuosu","text":"Nuosu","value":"ii"},{"key":"nr","name":"South Ndebele","text":"South Ndebele","value":"nr"},{"key":"oc","name":"Occitan","text":"Occitan","value":"oc"},{"key":"oj","name":"Ojibwe, Ojibwa","text":"Ojibwe, Ojibwa","value":"oj"},{"key":"cu","name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic","text":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic","value":"cu"},{"key":"om","name":"Oromo","text":"Oromo","value":"om"},{"key":"or","name":"Oriya","text":"Oriya","value":"or"},{"key":"os","name":"Ossetian, Ossetic","text":"Ossetian, Ossetic","value":"os"},{"key":"pa","name":"Panjabi, Punjabi","text":"Panjabi, Punjabi","value":"pa"},{"key":"pi","name":"Pāli","text":"Pāli","value":"pi"},{"key":"fa","name":"Persian","text":"Persian","value":"fa"},{"key":"pl","name":"Polish","text":"Polish","value":"pl"},{"key":"ps","name":"Pashto, Pushto","text":"Pashto, Pushto","value":"ps"},{"key":"pt","name":"Portuguese","text":"Portuguese","value":"pt"},{"key":"qu","name":"Quechua","text":"Quechua","value":"qu"},{"key":"rm","name":"Romansh","text":"Romansh","value":"rm"},{"key":"rn","name":"Kirundi","text":"Kirundi","value":"rn"},{"key":"ro","name":"Romanian, Moldavian, Moldovan","text":"Romanian, Moldavian, Moldovan","value":"ro"},{"key":"ru","name":"Russian","text":"Russian","value":"ru"},{"key":"sa","name":"Sanskrit (Saṁskṛta)","text":"Sanskrit (Saṁskṛta)","value":"sa"},{"key":"sc","name":"Sardinian","text":"Sardinian","value":"sc"},{"key":"sd","name":"Sindhi","text":"Sindhi","value":"sd"},{"key":"se","name":"Northern Sami","text":"Northern Sami","value":"se"},{"key":"sm","name":"Samoan","text":"Samoan","value":"sm"},{"key":"sg","name":"Sango","text":"Sango","value":"sg"},{"key":"sr","name":"Serbian","text":"Serbian","value":"sr"},{"key":"gd","name":"Scottish Gaelic; Gaelic","text":"Scottish Gaelic; Gaelic","value":"gd"},{"key":"sn","name":"Shona","text":"Shona","value":"sn"},{"key":"si","name":"Sinhala, Sinhalese","text":"Sinhala, Sinhalese","value":"si"},{"key":"sk","name":"Slovak","text":"Slovak","value":"sk"},{"key":"sl","name":"Slovene","text":"Slovene","value":"sl"},{"key":"so","name":"Somali","text":"Somali","value":"so"},{"key":"st","name":"Southern Sotho","text":"Southern Sotho","value":"st"},{"key":"es","name":"Spanish; Castilian","text":"Spanish; Castilian","value":"es"},{"key":"su","name":"Sundanese","text":"Sundanese","value":"su"},{"key":"sw","name":"Swahili","text":"Swahili","value":"sw"},{"key":"ss","name":"Swati","text":"Swati","value":"ss"},{"key":"sv","name":"Swedish","text":"Swedish","value":"sv"},{"key":"ta","name":"Tamil","text":"Tamil","value":"ta"},{"key":"te","name":"Telugu","text":"Telugu","value":"te"},{"key":"tg","name":"Tajik","text":"Tajik","value":"tg"},{"key":"th","name":"Thai","text":"Thai","value":"th"},{"key":"ti","name":"Tigrinya","text":"Tigrinya","value":"ti"},{"key":"bo","name":"Tibetan Standard, Tibetan, Central","text":"Tibetan Standard, Tibetan, Central","value":"bo"},{"key":"tk","name":"Turkmen","text":"Turkmen","value":"tk"},{"key":"tl","name":"Tagalog","text":"Tagalog","value":"tl"},{"key":"tn","name":"Tswana","text":"Tswana","value":"tn"},{"key":"to","name":"Tonga (Tonga Islands)","text":"Tonga (Tonga Islands)","value":"to"},{"key":"tr","name":"Turkish","text":"Turkish","value":"tr"},{"key":"ts","name":"Tsonga","text":"Tsonga","value":"ts"},{"key":"tt","name":"Tatar","text":"Tatar","value":"tt"},{"key":"tw","name":"Twi","text":"Twi","value":"tw"},{"key":"ty","name":"Tahitian","text":"Tahitian","value":"ty"},{"key":"ug","name":"Uighur, Uyghur","text":"Uighur, Uyghur","value":"ug"},{"key":"uk","name":"Ukrainian","text":"Ukrainian","value":"uk"},{"key":"ur","name":"Urdu","text":"Urdu","value":"ur"},{"key":"uz","name":"Uzbek","text":"Uzbek","value":"uz"},{"key":"ve","name":"Venda","text":"Venda","value":"ve"},{"key":"vi","name":"Vietnamese","text":"Vietnamese","value":"vi"},{"key":"vo","name":"Volapük","text":"Volapük","value":"vo"},{"key":"wa","name":"Walloon","text":"Walloon","value":"wa"},{"key":"cy","name":"Welsh","text":"Welsh","value":"cy"},{"key":"wo","name":"Wolof","text":"Wolof","value":"wo"},{"key":"fy","name":"Western Frisian","text":"Western Frisian","value":"fy"},{"key":"xh","name":"Xhosa","text":"Xhosa","value":"xh"},{"key":"yi","name":"Yiddish","text":"Yiddish","value":"yi"},{"key":"yo","name":"Yoruba","text":"Yoruba","value":"yo"},{"key":"za","name":"Zhuang, Chuang","text":"Zhuang, Chuang","value":"za"}
];



export const levelArr = [
  { key: "fluent", value: "fluent", text: "levelFluent" },
  { key: "good", value: "good", text: "levelGood"},
  { key: "basic", value: "basic", text: "levelBasic" }
];

export const userIconTextObjects = [
  {
    key: "email",
    iconName: "at",
    inputType: "email"
  },
  {
    key: "phone",
    iconName: "phone",
    inputType: "tel"
  },
  {
    key: "location",
    iconName: "location arrow",
    getValue: obj => !obj ? getTranslations().profile.notGiven : obj.address || getTranslations().profile.notGiven,
    getInitialEditValue: obj => !obj ? "" : obj.street || "",
    editType: "Location",
    placeholder: getTranslations().profile.locationPlaceholder
  },
  {
    key: "lang_qs",
    iconName: "comment outline",
    getInitialEditValue: obj => {
      if (!!obj.toString()) return clone(obj);
      return [
        {lang_code: "en", level: ""},
        {lang_code: "zh_can", level: ""},
        {lang_code: "zh_man", level: ""}
      ];
    },
    getValue: array => {
      if (!array.toString()) return getTranslations().profile.notGiven;
      return array.reduce((dom, curr, i) => {
        dom.push(<span key={"lang_qs_" + i}>{langObj[curr.lang_code].name} ({curr.level})</span>);
        if (i < array.length - 1) dom.push(<br key={"lang_qs_separator_" + i} />)
        return dom;
      }, [])
    },
    editType: "Lang"
  },
  {
    key: "cv",
    iconName: "attach",
    getValue: url => {
      if (!url) return getTranslations().profile.cv.none;
      return (
        <a href={url} target="_blank">{getTranslations().profile.cv.view}</a>
      );
    },
    getInitialEditValue: () => "",
    placeholder: getTranslations().profile.cv.placeholder,
    editType: "CV"
  },
  {
      key: "description",
      elementClassName: "pre-line",
      iconName: "sticky note outline",
      editType: "textarea",
      doNotSubmitOnEnter: true
  }
];

export const getJobExpEditErrors = (editingData) => {
    const errors = [],
          t = getTranslations();
    if (!editingData.position) errors.push(t.profile.jobExp.error.noPosition)
    if ((!editingData.working && !editingData.time_to) || !editingData.time_from) errors.push(t.profile.jobExp.error.workingOrTimeTo)
    else if (new Date(editingData.time_from) > new Date(editingData.time_to)) errors.push(t.profile.jobExp.error.time)
    if (!editingData.company_name && !editingData.org) errors.push(t.profile.jobExp.error.noCompany)
    if (editingData.working) editingData.time_to = null;
    if (!!editingData.company_name) editingData.org = null;

    return errors.join(".\n");
}

export const getLocationObject = (data, originalStreetName) => {
  const result = data.results[0];
  let mappedObject = {};
  result.address_components.forEach(comp => {
    geolocationMappingObject.forEach((obj, i) => {
      if (comp.types.includes(obj.fromKey)) mappedObject[obj.to] = comp.long_name
    })
  })

  const locationObject = {
    address: result.formatted_address,
    street: (!!mappedObject.street_number && !!mappedObject.street_name) ?
              (mappedObject.street_number + " " + mappedObject.street_name) :
              originalStreetName,
    country: mappedObject.country,
    region: mappedObject.region,
    city: mappedObject.city,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng
  };

  console.log(["locationObject", locationObject]);
  return locationObject;
}

export const getJobExpHttpArray = (editingData, googleLocationData) => {
    const getDateString = date => {
        switch (typeof(date)) {
            case "string":
                return date;
            default:
                return date.toUTCString();
        }
    };
    let obj = {
        position: editingData.position,
        description: editingData.description,
        time_from: !editingData.time_from ? null : getDateString(editingData.time_from),
        time_to: !editingData.time_to ? null : getDateString(editingData.time_to),
        working: editingData.working,
        company_name: editingData.company_name
    };
    console.log([obj]);
    if (editingData.id) obj.id = editingData.id
    if (!!googleLocationData && !!googleLocationData.toString()) {
        console.log("going to getLocationObject");
        obj["location_attributes"] = getLocationObject(googleLocationData, editingData.location);
    }
    if (!!editingData.org) obj.org_id = editingData.org.id;

    return [obj];
}
