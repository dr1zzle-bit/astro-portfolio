import { client } from '../utils/sanity-client';

const SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  title,
  contactEmail,
  mainMenu[]->{
    title,
    slug,
    modules[] {
      ...,
      _type == 'module.about' => {
        ...,
        content[],
        facts[],
        image { asset-> },
        actionButton {
          label,
          "fileUrl": file.asset->url,
          url
        }
      },
      _type == 'module.services' => {
        ...,
        services[],
        actionButton {
          label,
          "fileUrl": file.asset->url,
          url
        }
      },
      _type == 'module.contact' => {
        ...
      },
      _type == 'module.text' => {
        ...,
        content[]
      }
    }
  }
}`;

export async function fetchSiteSettings() {
  return await client.fetch(SETTINGS_QUERY);
}
