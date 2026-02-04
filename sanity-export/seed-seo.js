const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_TOKEN,
    apiVersion: '2024-01-31',
    useCdn: false,
});

async function uploadImage(url, filename) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    return client.assets.upload('image', Buffer.from(buffer), { filename });
}

async function seedSEO() {
    console.log('Starting SEO Seed...');

    // 1. Update Global Site Config
    console.log('Updating Site Config...');
    const siteConfig = await client.fetch('*[_type == "siteConfig"][0]');
    if (siteConfig) {
        // Upload a global SEO image
        const seoImageId = (await uploadImage(
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?fm=jpg&w=1200&h=630&fit=crop", 
            "global-seo.jpg"
        ))._id;

        await client
            .patch(siteConfig._id)
            .set({
                seoDescription: "A minimalist portfolio showcasing the intersection of design and motion. Built with Astro and Sanity.",
                seoKeywords: ["portfolio", "design", "minimalist", "astro", "sanity", "gsap"],
                seoImage: {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: seoImageId },
                    alt: "Abstract liquid gradient texture representing the portfolio brand"
                }
            })
            .commit();
        console.log('  -> Site Config patched.');
    } else {
        console.warn('  -> No siteConfig found to patch!');
    }

    // 2. Patch Projects
    console.log('Fetching projects to patch...');
    const projects = await client.fetch('*[_type == "project"]{_id, title, gallery}');
    
    for (const project of projects) {
        console.log(`  -> Patching ${project.title} (${project._id})...`);
        const patch = client.patch(project._id);

        // SEO Overrides
        patch.set({
            seoTitle: `${project.title} — Featured Work`,
            seoDescription: `Discover the details behind ${project.title}, a project exploring structure and form.`,
            // Set main image alt if not present (we can just overwrite for seed)
            "mainImage.alt": `${project.title} - Main View`,
        });

        // Gallery Alt Text
        // We need to build the gallery array with objects that have the new 'alt' field
        // Since we can't easily patch *inside* an array item without knowing keys or replacing the whole array,
        // and 'gallery' is an array of objects.
        // The safest way is to read the gallery, map it, and set it back.
        if (project.gallery && project.gallery.length > 0) {
            const updatedGallery = project.gallery.map((item, index) => ({
                ...item,
                alt: `${project.title} - Gallery Detail ${index + 1}`
            }));
            patch.set({ gallery: updatedGallery });
        }

        await patch.commit();
    }

    console.log('SEO Seed Complete! All projects and global config updated.');
}

seedSEO().catch(err => {
    console.error(err);
    process.exit(1);
});
