import { client } from '../utils/sanity-client';

const PROJECT_QUERY = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  slug,
  mainImage {
    asset->,
    alt
  },
  description,
  gallery[] {
    asset->,
    alt
  },
  details,
  order
}`;

export async function fetchProjects() {
    return await client.fetch(PROJECT_QUERY);
}

export async function fetchProjectBySlug(slug: string) {
    return await client.fetch(`*[_type == "project" && slug.current == $slug][0] {
        ...,
        mainImage {
            asset->,
            alt
        },
        gallery[] {
            asset->,
            alt
        }
    }`, { slug });
}
