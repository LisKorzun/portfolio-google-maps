import { groupBy } from 'lodash'
import { CONTINENTS } from '@/constants'

const { EUROPE, ASIA, N_AMERICA, S_AMERICA } = CONTINENTS

const offices = [
    {
        position: { lat: 47.586758855579205, lng: -122.23244313641405 },
        continent: N_AMERICA,
        country: 'USA',
        city: 'Seattle',
        address: '7853 SE 27th Street, Suite #283, Mercer Island WA 98040',
        phone: '+1 (888) 600 6103',
        image: '/img/NA-Seattle.webp',
    },
    {
        position: { lat: 37.925726186094, lng: -122.05838154232755 },
        continent: N_AMERICA,
        country: 'USA',
        city: 'Walnut Creek',
        address: '1340 Treat Blvd., Suite 375, Walnut Creek CA 94597',
        phone: '+1 (925) 255-7875',
        image: '/img/NA-walnut-creek.webp',
    },
    {
        position: { lat: 40.02619695064507, lng: -105.22340111215398 },
        continent: N_AMERICA,
        country: 'USA',
        city: 'Boulder',
        address: '2580 55th St, Suite 210, Boulder, CO 80301',
        phone: '+1 (866) 213 7162',
        image: '/img/NA-boulder.webp',
    },
    {
        position: { lat: -3.76040381250694, lng: -38.480651548242065 },
        continent: S_AMERICA,
        country: 'BRAZIL',
        city: 'Fortaleza',
        address: 'Loja 65B, Shopping Salinas, Av. Washington Soares, 909 - Edson Queiroz, CE',
        phone: '+55 85 3033 3299 x3281',
        image: '/img/SA-Fortaleza.webp',
    },
    {
        position: { lat: -23.588620488297963, lng: -46.68084120185358 },
        continent: S_AMERICA,
        country: 'BRAZIL',
        city: 'São Paulo',
        address: 'Wework - Rua Prof. Atílio Innocenti, 165 Vila Nova Conceição, 04538-000',
        phone: '+55 11 3512 2500 x2501',
        image: '/img/SA-San-Paulo.webp',
    },
    {
        position: { lat: 43.64970102406013, lng: -79.37739718131166 },
        continent: N_AMERICA,
        country: 'CANADA',
        city: 'Toronto',
        address: '10 King St East, Suite 502 Toronto, ON M5C 1C3',
        phone: '+1 437 213 9847',
        image: '/img/NA-Toronto.webp',
    },
    {
        position: { lat: -33.4189619705564, lng: -70.59812498878503 },
        continent: S_AMERICA,
        country: 'CHILE',
        city: 'Santiago',
        address: 'Callao 2970 Oficina 207, Comuna Las Condes',
        phone: '+56 23210 7516',
        image: '/img/SA-Santiago.webp',
    },
    {
        position: { lat: 6.199870486105078, lng: -75.57264938650867 },
        continent: S_AMERICA,
        country: 'COLOMBIA',
        city: 'Medellín',
        address: 'Cra 42 # 3 Sur 81 Business District Milla de Oro, Torre 1 Floor 15',
        phone: '+57 (324) 288 7703',
        image: '/img/SA-Medellin.webp',
    },
    {
        position: { lat: 41.7105291666037, lng: 44.75528998259013 },
        continent: ASIA,
        country: 'GEORGIA',
        city: 'Tbilisi',
        address: 'Ilo Mosashvili st., 24 Tbilisi 0162',
        phone: '+995 (577)247347',
        image: '/img/A-Tbilisi.webp',
    },
    {
        position: { lat: 41.348767386900185, lng: 69.3493276386204 },
        continent: ASIA,
        country: 'UZBEKISTAN',
        city: 'Tashkent',
        address: 'Mirzo Ulugbek Avenue, 73, Tashkent 100007',
        phone: '+998 (71) 2300533',
        image: '/img/A-Tashkent.webp',
    },
    {
        position: { lat: 42.70190519827743, lng: 23.31526012698264 },
        continent: EUROPE,
        country: 'BULGARIA',
        city: 'Sofia',
        address: '51 ul. Sofroniy Vlachanski, Sofia 1303',
        phone: '+359 886 837 984',
        image: '/img/EU-Sofia.webp',
    },
    {
        position: { lat: 51.027301810303115, lng: 13.759289884655095 },
        continent: EUROPE,
        country: 'GERMANY',
        city: 'Dresden',
        address: 'Heinrich-Zille-Str. 2, 01219 Dresden',
        phone: '+49 (0) 351 89881395',
        image: '/img/EU-Dresden.webp',
    },
    {
        position: { lat: 47.50128160701323, lng: 19.047700142327546 },
        continent: EUROPE,
        country: 'HUNGARY',
        city: 'Budapest',
        address: 'Roosevelt building, Széchenyi István tér 7-8, Budapest 1051',
        phone: '+36 1 803 7600',
        image: '/img/EU-Budapest.webp',
    },
    {
        position: { lat: 55.71288029225708, lng: 21.14023524232755 },
        continent: EUROPE,
        country: 'LITHUANIA',
        city: 'Klaipėda',
        address: 'Danės g. 6-401, LT-92109 Klaipėda',
        phone: '+370 698 51232',
        image: '/img/EU-klaipeda.webp',
    },
    {
        position: { lat: 54.70395258036778, lng: 25.277792269310194 },
        continent: EUROPE,
        country: 'LITHUANIA',
        city: 'Vilnius',
        address: 'Žalgirio g. 90C, LT-09303 Vilnius',
        phone: '+370 698 51232',
        image: '/img/EU-vilnius.webp',
    },
    {
        position: { lat: 54.40588788154658, lng: 18.577212286508672 },
        continent: EUROPE,
        country: 'POLAND',
        city: 'Gdańsk',
        address: 'Arkońska 6, 80-387, Gdańsk',
        phone: '+48 58 733 86 65',
        image: '/img/EU-Gdansk.webp',
    },
    {
        position: { lat: 52.22778493175784, lng: 21.005990113491322 },
        continent: EUROPE,
        country: 'POLAND',
        city: 'Warsaw',
        address: 'Warsaw Corporate Center ul. Emilii Plater 28, 00-688 Warszawa',
        phone: '+48 22 630 32 30',
        image: '/img/EU-Warsaw.webp',
    },
    {
        position: { lat: 53.137078830458016, lng: 23.143612953968738 },
        continent: EUROPE,
        country: 'POLAND',
        city: 'Białystok',
        address: 'Jana Henryka Dąbrowskiego 22, 15-872 Białystok',
        phone: '+48 22 630 32 30',
        image: '/img/EU-Bialystok.webp',
    },
    {
        position: { lat: 53.45053363028999, lng: 14.536252357671874 },
        continent: EUROPE,
        country: 'POLAND',
        city: 'Szczecin',
        address: 'ul. Cyfrowa 6, 71-441 Szczecin',
        phone: '+48 22 630 32 30',
        image: '/img/EU-Szczecin.webp',
    },
    {
        position: { lat: 52.40425772673816, lng: 16.928372846031262 },
        continent: EUROPE,
        country: 'POLAND',
        city: 'Poznań',
        address: 'ul. Ogrodowa 18/1, 61-821 Poznań',
        phone: '+48 22 630 32 30',
        image: '/img/EU-Poznan.webp',
    },
    {
        position: { lat: 47.42222677598672, lng: 8.555539598146417 },
        continent: EUROPE,
        country: 'SWITZERLAND',
        city: 'Zurich',
        address: 'Thurgauerstrasse 101A, 8152 Glattpark',
        phone: '+41 76 475 6065',
        image: '/img/EU-Zurich.webp',
    },
    {
        position: { lat: 50.026723206080646, lng: 36.220319755820306 },
        continent: EUROPE,
        country: 'UKRAINE',
        city: 'Kharkiv',
        address: 'prospekt Nauky 27b, Kharkiv 61072',
        phone: '+380 57 766 45 94',
        image: '/img/EU-Kharkiv.webp',
    },
    {
        position: { lat: 50.45189393765428, lng: 30.509030061906223 },
        continent: EUROPE,
        country: 'UKRAINE',
        city: 'Kyiv',
        address: 'vul. Yaroslaviv Val 15, Kyiv 01001',
        phone: '+380 67 533 82 44',
        image: '/img/EU-Kiev.webp',
    },
    {
        position: { lat: 49.82945599123779, lng: 23.99821057116406 },
        continent: EUROPE,
        country: 'UKRAINE',
        city: 'Lviv',
        address: 'vul. Maksyma Zalizniaka 16, Lviv 79057',
        phone: '+380 67 632 33 45',
        image: '/img/EU-Lviv.webp',
    },
    {
        position: { lat: 46.479226949572436, lng: 30.745136571164057 },
        continent: EUROPE,
        country: 'UKRAINE',
        city: 'Odesa',
        address: 'vul. Zhukovskogo 9, Odesa 65014',
        phone: '+380 67 939 17 04',
        image: '/img/EU-Odessa.webp',
    },
    {
        position: { lat: 49.23474272159976, lng: 28.488574015343747 },
        continent: EUROPE,
        country: 'UKRAINE',
        city: 'Vinnytsia',
        address: 'vul. Bratslavska 103, Vinnytsia 21001',
        phone: '+380 67 533 82 44',
        image: '/img/EU-Vinnytsia.webp',
    },
    {
        position: { lat: 52.08642922196274, lng: 23.679088101851566 },
        continent: EUROPE,
        country: 'BELARUS',
        city: 'Brest',
        address: 'prospekt Mašerova 6a, Brest 224030',
        phone: '+375 16 228 59 79',
        image: '/img/EU-Brest.webp',
    },
    {
        position: { lat: 52.4337112465874, lng: 31.010220015343755 },
        continent: EUROPE,
        country: 'BELARUS',
        city: 'Gomel',
        address: 'ul. Pushkina 2-9, Gomel 246050',
        phone: '+375 23 222 93 19',
        image: '/img/EU-Gomel.webp',
    },
    {
        position: { lat: 53.68652578776746, lng: 23.830828328835935 },
        continent: EUROPE,
        country: 'BELARUS',
        city: 'Grodno',
        address: 'ul. Maxima Gorkogo 1/1, Grodno 230023',
        phone: '+375 15 268 58 00',
        image: '/img/EU-Grodno.webp',
    },
    {
        position: { lat: 53.9281593488627, lng: 27.61762862275003 },
        continent: EUROPE,
        country: 'BELARUS',
        city: 'Minsk',
        address: 'ul. Naturalistov 3, Minsk 220012',
        phone: '+375 29 193 30 43',
        image: '/img/EU-Minsk.webp',
    },
    {
        position: { lat: 55.2023543772703, lng: 30.210265205554702 },
        continent: EUROPE,
        country: 'BELARUS',
        city: 'Vitebsk',
        address: 'ul. Kommunisticheskaya 16, Vitebsk 210026',
        phone: '+375 21 248 63 42',
        image: '/img/EU-Vitebsk.webp',
    },
]

export const markersByContinent = groupBy(offices, ({ continent }) => continent)
export const markersInEurope = markersByContinent[EUROPE]
export const markersInAsia = markersByContinent[ASIA]
export const markersInNAmerica = markersByContinent[N_AMERICA]
export const markersInSAmerica = markersByContinent[S_AMERICA]

export default offices
