import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from 'vite';
import { createClient, type ClientConfig, type SanityClient } from '@sanity/client';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

const projectId =
    env.SANITY_PROJECT_ID ||
    env.PUBLIC_SANITY_PROJECT_ID ||
    env.SANITY_STUDIO_PROJECT_ID ||
    process.env.SANITY_PROJECT_ID ||
    process.env.PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID;

const dataset =
    env.SANITY_DATASET ||
    env.PUBLIC_SANITY_DATASET ||
    env.SANITY_STUDIO_DATASET ||
    process.env.SANITY_DATASET ||
    process.env.PUBLIC_SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    'production';

const token = env.SANITY_TOKEN || process.env.SANITY_TOKEN;

const isDev = import.meta.env.DEV;
const isDeployPreview = process.env.CONTEXT === 'deploy-preview';
const previewDrafts = env.STACKBIT_PREVIEW?.toLowerCase() === 'true' || env.SANITY_PREVIEW_DRAFTS?.toLowerCase() === 'true';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sanityConfig: ClientConfig = {
    projectId,
    dataset,
    useCdn: !isDev,
    apiVersion: '2024-01-31',
    token,
    perspective: isDev || isDeployPreview || previewDrafts ? 'previewDrafts' : 'published'
};

export const client = createClient(sanityConfig);

import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

/**
 * @param {SanityClient} client The Sanity client to add the listener to
 * @param {Array<String>} types An array of types the listener should take an action on
 * Creating Sanity listener to subscribe to whenever a new document is created or deleted to refresh the list in Create
 */
[{ client: client, types: ['page', 'project', 'siteSettings', 'sheet'] }].forEach(({ client, types }: { client: SanityClient; types: Array<String> }) =>
    client.listen(`*[_type in ${JSON.stringify(types)}]`, {}, { visibility: 'query' }).subscribe(async (event: any) => {
        // only refresh when pages are deleted or created
        if (event.transition === 'appear' || event.transition === 'disappear') {
            const filePath = path.join(__dirname, '../layouts/Layout.astro');
            const time = new Date();

            // update the updatedat stamp for the layout file, triggering astro to refresh the data in getStaticPaths
            await fs.promises.utimes(filePath, time, time);
        }
    })
);
