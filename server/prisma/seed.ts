import { db } from "../src/database";
import bcrypt from 'bcrypt';

interface Province {
    province: string;
    districts: string[];
}

const provinces: Province[] = [
    {
        province: 'Maputo Cidade',
        districts: ['Maputo']
    },
    {
        province: 'Maputo Provincia',
        districts: [
            'Boane',
            'Magude', 
            'Manhiça', 
            'Marracuene', 
            'Matutuíne', 
            'Moamba', 
            'Namaacha'
        ]
    },
    {
        province: 'Gaza',
        districts: [
            'Bilene Macia',
            'Chibuto',
            'Chicualacuala',
            'Chigubo',
            'Chókwè',
            'Guijá',
            'Mabalane',
            'Manjacaze',
            'Massangena',
            'Massingir',
            'Xai-Xai',
        ]
    },
    {
        province: 'Inhambane',
        districts: [
            'Funhalouro',
            'Govuro',
            'Homoine',
            'Inharrime',
            'Inhassoro',
            'Jangamo',
            'Mabote',
            'Massinga',
            'Maxixe',
            'Morrumbene',
            'Panda',
            'Vilanculos',
            'Zavala'
        ]
    },
    {
        province: 'Manhica',
        districts: [
            'Báruè',
            'Gondola',
            'Guro',
            'Machaze',
            'Macossa',
            'Manica',
            'Mossurize',
            'Sussundenga',
            'Tambara'
        ]
    },
    {
        province: 'Nampula',
        districts: [
            'Angoche',
            'Eráti',
            'Lalaua',
            'Malema',
            'Meconta',
            'Mecubúri',
            'Memba',
            'Mogincual',
            'Mogovolas',
            'Moma',
            'Monapo',
            'Mossuril',
            'Muecate',
            'Murrupula',
            'Nacala-a-Velha',
            'Nacarôa',
            'Nampula',
            'Ribáuè'
        ]
    },
    {
        province: 'Niassa',
        districts: [
            'Cuamba',
            'Lago',
            'Lichinga',
            'Majune',
            'Mandimba',
            'Marrupa',
            'Maúa',
            'Mavago',
            'Mecanhelas',
            'Mecula',
            'Metarica',
            'Muembe',
            "N'gauma",
            'Nipepe',
            'Sanga',
        ]
    },
    {
        province: 'Sofala',
        districts: [
            'Buzi',
            'Caia',
            'Chemba',
            'Cheringoma',
            'Chibabava',
            'Dondo',
            'Gorongosa',
            'Marromeu',
            'Machanga',
            'Maringué',
            'Muanza',
            'Nhamatanda'
        ]
    },
    {
        province: 'Tete',
        districts: [
            'Angónia',
            'Cahora-Bassa',
            'Changara',
            'Chifunde',
            'Chiuta',
            'Doa',
            'Macanga',
            'Magoé',
            'Marávia',
            'Moatize',
            'Mutarara',
            'Tsangano',
            'Zumbo'
        ]
    },
    {
        province: 'Zambezia',
        districts: [
            'Alto Molocue',
            'Chinde',
            'Gilé',
            'Gurué',
            'Ile',
            'Inhassunge',
            'Lugela',
            'Maganja da Costa',
            'Milange',
            'Mocuba',
            'Mopeia',
            'Morrumbala',
            'Namacurra',
            'Namarroi',
            'Nicoadala',
            'Pebane'
        ]
    },
    {
        province: 'Cabo Delgado',
        districts: [
            'Ancuabe',
            'Balama',
            'Chiúre',
            'Ibo',
            'Macomia', 
            'Mecúfi',
            'Meluco',
            'Metuge',
            'Mocímboa da Praia',
            'Montepuez',
            'Mueda',
            'Muidumbe',
            'Namuno',
            'Nangade',
            'Palma',
            'Quissanga'
        ]
    }
]

async function seed() {
    const passwordHash = await bcrypt.hash('12345678', 10);
    return Promise.all([
        ...provinces.map(async (province) => {
            await db.province.upsert({
                where: {
                    designation: province.province
                },
                create: {
                    designation: province.province,
                    districts: {
                        create:
                        province.districts.map(district => ({
                            designation: district
                        }))
                    }
                },
                update: {
                }
            });
        }),
        await db.admin.create({
            data: {
                name: 'Administrator',
                email: 'admin@beprepared.co.mz',
                password: passwordHash
            }
        })]
    );
}

seed().then(() => {
    console.log('Seeds Created!');
});