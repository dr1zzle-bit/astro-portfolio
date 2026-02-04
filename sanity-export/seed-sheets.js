const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_TOKEN,
    apiVersion: '2024-01-31',
    useCdn: false,
});

const ABOUT_IMG = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format";

async function seedSheets() {
    console.log('--- Starting Sheet Seeding ---');

    try {
        // 1. Upload About Image
        console.log('Uploading About image...');
        const imgRes = await fetch(ABOUT_IMG);
        if (!imgRes.ok) throw new Error('Failed to fetch about image');
        const imgBuffer = await imgRes.arrayBuffer();
        const aboutAsset = await client.assets.upload('image', Buffer.from(imgBuffer), { filename: 'about.jpg' });
        console.log(`  -> Image uploaded: ${aboutAsset._id}`);

        // 2. Create Sheets
        const sheets = [
            {
                _id: 'sheet-about',
                _type: 'sheet',
                title: 'About',
                slug: { _type: 'slug', current: 'about' },
                modules: [
                    {
                        _type: 'module.about',
                        _key: 'about-module',
                        miniTitle: '00 / Profile',
                        headline: 'Honest Observation.',
                        content: [
                            {
                                _type: 'block',
                                style: 'normal',
                                children: [
                                    { _type: 'span', text: "My work exists at the intersection of technical precision and organic imperfection. I don't just capture moments; I structure them." }
                                ]
                            }
                        ],
                        image: {
                            _type: 'image',
                            asset: { _type: 'reference', _ref: aboutAsset._id },
                            alt: 'About Me'
                        },
                        facts: [
                            { _key: 'f1', label: 'Clients', value: 'Vogue, COS, Vitra' },
                            { _key: 'f2', label: 'Gear', value: 'Hasselblad, Sony Alpha' },
                            { _key: 'f3', label: 'Contact', value: 'hello@mmichelic.com' }
                        ]
                    }
                ]
            },
            {
                _id: 'sheet-services',
                _type: 'sheet',
                title: 'Services',
                slug: { _type: 'slug', current: 'services' },
                modules: [
                    {
                        _type: 'module.services',
                        _key: 'services-module',
                        miniTitle: '01 / Services',
                        heading: 'Services',
                        services: [
                            {
                                _key: 's1',
                                title: 'Art Direction',
                                icon: 'pen-tool',
                                description: 'Visual identities and concept development for brands that value aesthetic purity.'
                            },
                            {
                                _key: 's2',
                                title: 'Photography',
                                icon: 'aperture',
                                description: 'Architecture, Editorial, and Product. Specialized in natural light and geometric composition.'
                            },
                            {
                                _key: 's3',
                                title: 'Set Design',
                                icon: 'box',
                                description: 'Creating physical spaces and installations for campaigns and events.'
                            }
                        ],
                        actionButton: {
                            label: 'Download Rate Card',
                            url: '#'
                        }
                    }
                ]
            },
            {
                _id: 'sheet-contact',
                _type: 'sheet',
                title: 'Contact',
                slug: { _type: 'slug', current: 'contact' },
                modules: [
                    {
                        _type: 'module.contact',
                        _key: 'contact-module',
                        miniTitle: '02 / Contact',
                        formName: 'contact',
                        showHoneypot: true,
                        introText: [
                             {
                                _type: 'block',
                                style: 'normal',
                                children: [
                                    { _type: 'span', text: "Let's create something together." }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        for (const sheet of sheets) {
            console.log(`Creating sheet: ${sheet.title}...`);
            await client.createOrReplace(sheet);
            console.log(`  -> Created ${sheet.title}`);
        }

        // 3. Update Site Settings Main Menu
        console.log('Updating Site Settings Main Menu...');
        await client.createOrReplace({
            _id: 'siteSettings',
            _type: 'siteSettings',
            title: 'Portfolio', // Ensure title exists
            mainMenu: [
                { _type: 'reference', _ref: 'sheet-about', _key: 'link-about' },
                { _type: 'reference', _ref: 'sheet-services', _key: 'link-services' },
                { _type: 'reference', _ref: 'sheet-contact', _key: 'link-contact' }
            ]
        });
        console.log('  -> Main Menu updated!');

        console.log('--- Sheet Seeding Complete ---');

    } catch (err) {
        console.error('Seeding failed:', err);
    }
}

seedSheets();
