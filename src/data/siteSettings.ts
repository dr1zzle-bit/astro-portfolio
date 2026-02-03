import { client } from '../utils/sanity-client';

const SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  title,
  about,
  services,
  contactEmail
}`;

export async function fetchSiteSettings() {
    return await client.fetch(SETTINGS_QUERY);
}
