import { client } from '../utils/sanity-client';

const PROJECT_QUERY = `*[_type == "project" && !(_id in path("drafts.**"))] | order(order asc) {
  _id,
  title,
  slug,
  mainImage {
    asset->,
    alt,
    crop,
    hotspot
  },
  description,
  gallery[] {
    _type,
    asset->,
    alt,
    url, 
    caption,
    "videoUrl": asset->url,
    crop,
    hotspot
  },
  details,
  order
}`;

export async function fetchProjects() {
  return await client.fetch(PROJECT_QUERY);
}

export async function fetchProjectBySlug(slug: string) {
  return await client.fetch(`*[_type == "project" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
        ...,
        galleryColumns,
        mainImage {
            asset->,
            alt,
            crop,
            hotspot,
            useCrop
        },
        gallery[] {
            _type,
            asset->,
            alt,
            url,
            caption,
            "videoUrl": asset->url,
            crop,
            hotspot,
            useCrop
        },
        youtubeEmbed,
        seoTitle,
        seoDescription,
        seoImage {
            asset->,
            alt,
            crop,
            hotspot
        }
    }`, { slug });
}
