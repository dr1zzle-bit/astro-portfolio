const { createClient } = require('@sanity/client');
require('dotenv').config();

// Config
const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_TOKEN,
    apiVersion: '2024-01-31',
    useCdn: false,
});

// Original Data from HTML
const rawProjects = [
    { img: "https://images.unsplash.com/photo-1768481664691-4ebcc786a68d?fm=jpg&q=60&w=600", title: "Dawn", desc: "Light" },
    { img: "https://plus.unsplash.com/premium_photo-1768838786473-9ca31ec635f5?fm=jpg&q=60&w=600", title: "Apex", desc: "Structure" },
    { img: "https://images.unsplash.com/photo-1768203528069-763a78e7d82b?fm=jpg&q=60&w=600", title: "Silk", desc: "Texture" },
    { img: "https://images.unsplash.com/photo-1767491727934-d0927e6c12d3?fm=jpg&q=60&w=600", title: "Flow", desc: "Motion" },
    { img: "https://plus.unsplash.com/premium_photo-1764599123152-51eca6c54826?fm=jpg&q=60&w=600", title: "Mist", desc: "Atmosphere" },
    { img: "https://images.unsplash.com/photo-1767132254901-a80b06bfd3ea?fm=jpg&q=60&w=600", title: "Core", desc: "Earth" },
    { img: "https://images.unsplash.com/photo-1768755457768-f4d561ab158e?fm=jpg&q=60&w=600", title: "Grain", desc: "Detail" },
    { img: "https://plus.unsplash.com/premium_photo-1741275288267-3b0ca5dbc927?fm=jpg&q=60&w=600", title: "Dusk", desc: "Mood" },
    { img: "https://images.unsplash.com/photo-1707793319199-442369e65305?fm=jpg&q=60&w=600", title: "Form", desc: "Shape" },
    { img: "https://images.unsplash.com/photo-1764389814703-9c3699580712?fm=jpg&q=60&w=600", title: "Echo", desc: "Space" },
    { img: "https://plus.unsplash.com/premium_photo-1764599122850-b9194c8ef137?fm=jpg&q=60&w=600", title: "Nova", desc: "Bright" },
    { img: "https://images.unsplash.com/photo-1767706455344-258b5fce12cb?fm=jpg&q=60&w=600", title: "Flux", desc: "Fluid" },
    { img: "https://plus.unsplash.com/premium_photo-1768824918620-c5efbc88dcb2?fm=jpg&q=60&w=600", title: "Drift", desc: "Air" },
    { img: "https://images.unsplash.com/photo-1768590398395-3a1ada8be1ea?fm=jpg&q=60&w=600", title: "Root", desc: "Organic" },
    { img: "https://images.unsplash.com/photo-1768111598057-f8f435a8719f?fm=jpg&q=60&w=600", title: "Beam", desc: "Focus" },
    { img: "https://images.unsplash.com/photo-1767821290049-ea327680c5b5?fm=jpg&q=60&w=600", title: "Tide", desc: "Water" },
    { img: "https://images.unsplash.com/photo-1765901177316-4aa8870c5e71?fm=jpg&q=60&w=600", title: "Haze", desc: "Blur" },
    { img: "https://images.unsplash.com/photo-1768463852353-046565dc6f74?fm=jpg&q=60&w=600", title: "Axis", desc: "Line" },
    { img: "https://images.unsplash.com/photo-1764874299927-ffca82850d63?fm=jpg&q=60&w=600", title: "Base", desc: "Solid" },
    { img: "https://images.unsplash.com/photo-1766851265130-a2d5909927df?fm=jpg&q=60&w=600", title: "Peak", desc: "Height" },
    { img: "https://images.unsplash.com/photo-1766075012298-0c55635f9429?fm=jpg&q=60&w=600", title: "Veil", desc: "Shadow" },
    { img: "https://images.unsplash.com/photo-1767969958226-9db2bffc0d5b?fm=jpg&q=60&w=600", title: "Zone", desc: "Area" },
    { img: "https://images.unsplash.com/photo-1768144931674-d5f5dad44f2a?fm=jpg&q=60&w=600", title: "Fold", desc: "Paper" },
    { img: "https://images.unsplash.com/photo-1767595343353-e1512892c7e4?fm=jpg&q=60&w=600", title: "Lume", desc: "Light" },
    { img: "https://images.unsplash.com/photo-1764346345121-174fe2deaba1?fm=jpg&q=60&w=600", title: "Mono", desc: "Tone" },
    { img: "https://images.unsplash.com/photo-1768590398395-3a1ada8be1ea?fm=jpg&q=60&w=600", title: "Pure", desc: "Clean" },
    { img: "https://images.unsplash.com/photo-1622593192705-4699764fc000?fm=jpg&q=60&w=600", title: "Rise", desc: "Up" },
    { img: "https://images.unsplash.com/photo-1768733993357-722d07ffd7dd?fm=jpg&q=60&w=600", title: "Fade", desc: "Soft" },
    { img: "https://images.unsplash.com/photo-1767893609750-904544ebb882?fm=jpg&q=60&w=600", title: "Mesh", desc: "Net" },
    { img: "https://images.unsplash.com/photo-1768797646936-0708ed194b03?fm=jpg&q=60&w=600", title: "Glow", desc: "Warm" },
    { img: "https://plus.unsplash.com/premium_photo-1768142359933-e2a2c717d869?fm=jpg&q=60&w=600", title: "Tile", desc: "Grid" },
    { img: "https://images.unsplash.com/photo-1768244826678-1aa9304ec3c1?fm=jpg&q=60&w=600", title: "Edge", desc: "Sharp" },
    { img: "https://images.unsplash.com/photo-1766831185262-3c55739e1d57?fm=jpg&q=60&w=600", title: "Zen", desc: "Calm" },
    { img: "https://images.unsplash.com/photo-1768329189984-5c3a71ae3592?fm=jpg&q=60&w=600", title: "Bold", desc: "Strong" },
    { img: "https://plus.unsplash.com/premium_photo-1764538126574-321516ce227d?fm=jpg&q=60&w=600", title: "Leaf", desc: "Nature" },
    { img: "https://images.unsplash.com/photo-1766583066465-68ab23171b9d?fm=jpg&q=60&w=600", title: "Rock", desc: "Stone" },
    { img: "https://images.unsplash.com/photo-1754252291886-f7fdd895358b?fm=jpg&q=60&w=600", title: "Wave", desc: "Ocean" },
    { img: "https://images.unsplash.com/photo-1766955181235-24eb7e00ff27?fm=jpg&q=60&w=600", title: "Sky", desc: "Blue" }
];

async function seed() {
    console.log(`Starting seed of ${rawProjects.length} projects...`);
    
    // Create 'order' counter
    let i = 0;
    
    for (const project of rawProjects) {
        i++;
        const slug = project.title.toLowerCase().replace(/\s+/g, '-');
        
        console.log(`[${i}/${rawProjects.length}] Processing "${project.title}"...`);
        
        try {
            // Check if exists using a simple check on slug is risky if slugs aren't unique globally in your logic, 
            // but for this seed script we assume fresh or we just create duplicates if we don't check.
            // Better to check slug.
            const existing = await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
            if(existing) {
                console.log(`  -> Skipped (Already exists)`);
                continue;
            }

            // Fetch image
            const response = await fetch(project.img);
            if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
            const buffer = await response.arrayBuffer();
            
            // Upload to Sanity
            const asset = await client.assets.upload('image', Buffer.from(buffer), {
                filename: `${slug}.jpg`
            });
            console.log(`  -> Image uploaded: ${asset._id}`);
            
            // Create Document
            const doc = {
                _type: 'project',
                title: project.title,
                slug: { _type: 'slug', current: slug },
                description: project.desc,
                order: i,
                mainImage: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id
                    },
                    alt: project.title
                },
                details: [
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [
                            {
                                _type: 'span',
                                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${project.desc} represents the core essence of this project. We focused on capture the raw energy and structured beauty of the subject.`
                            }
                        ]
                    }
                ]
            };
            
            await client.create(doc);
            console.log(`  -> Document created!`);
            
        } catch (error) {
            console.error(`  -> ERROR: ${error.message}`);
        }
    }
    
    console.log('Seeding complete!');
}

seed();
