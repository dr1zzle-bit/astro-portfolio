const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_TOKEN,
    apiVersion: '2024-01-31',
    useCdn: false,
});

async function seedImprint() {
    console.log('--- Starting Imprint Seeding ---');

    try {
        // 1. Create Imprint Sheet
        const imprintSheet = {
            _id: 'sheet-imprint',
            _type: 'sheet',
            title: 'Imprint',
            slug: { _type: 'slug', current: 'imprint' },
            modules: [
                {
                    _type: 'module.text',
                    _key: 'imprint-module',
                    miniTitle: '03 / Legal',
                    heading: 'Imprint',
                    content: [
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "Legal Disclosure", marks: ['strong'] }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "Information in accordance with section 5 TMG" }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "\nMax Mustermann\nMusterstraße 1\n12345 Musterstadt\nGermany" }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "\nContact", marks: ['strong'] }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "Telephone: +49 123 456789\nE-Mail: hello@mmichelic.com\nInternet: www.mmichelic.com" }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "\nVAT-ID", marks: ['strong'] }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "Sales tax identification number according to Sect. 27 a of the Sales Tax Law:\nDE 999 999 999" }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "\nPerson responsible for editorial", marks: ['strong'] }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "Max Mustermann\nMusterstraße 1\n12345 Musterstadt" }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "\nEU Dispute Resolution", marks: ['strong'] }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/.\nOur e-mail address can be found above in the site notice." }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "\nDispute Resolution Proceedings in front of a Consumer Arbitration Board", marks: ['strong'] }
                            ]
                        },
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [
                                { _type: 'span', text: "We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board." }
                            ]
                        }
                    ]
                }
            ]
        };

        console.log(`Creating sheet: ${imprintSheet.title}...`);
        await client.createOrReplace(imprintSheet);
        console.log(`  -> Created ${imprintSheet.title}`);

        // 2. Update Site Settings Main Menu
        console.log('Updating Site Settings Main Menu...');
        
        // Fetch existing settings to preserve other links if needed, 
        // but for now we'll fully reconstruct the known menu state to ensure order.
        await client.createOrReplace({
            _id: 'siteSettings',
            _type: 'siteSettings',
            title: 'Portfolio',
            contactEmail: 'hello@mmichelic.com',
            mainMenu: [
                { _type: 'reference', _ref: 'sheet-about', _key: 'link-about' },
                { _type: 'reference', _ref: 'sheet-services', _key: 'link-services' },
                { _type: 'reference', _ref: 'sheet-contact', _key: 'link-contact' },
                { _type: 'reference', _ref: 'sheet-imprint', _key: 'link-imprint' }
            ]
        });
        console.log('  -> Main Menu updated with Imprint!');

        console.log('--- Imprint Seeding Complete ---');

    } catch (err) {
        console.error('Seeding failed:', err);
    }
}

seedImprint();
