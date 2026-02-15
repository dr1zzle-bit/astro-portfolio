import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { markdownSchema } from "sanity-plugin-markdown";
import { Studio } from "sanity";
import { schemaTypes } from "../../studio/schemaTypes";

// Use environment variables from import.meta.env for Astro/Vite
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || import.meta.env.SANITY_DATASET;

if (!projectId || !dataset) {
    throw new Error("Missing Sanity project ID or dataset in environment variables.");
}

const config = defineConfig({
    name: "default",
    title: "Astro Sanity Starter",
    basePath: "/studio", // Important: Match the route
    projectId,
    dataset,
    plugins: [deskTool(), visionTool(), markdownSchema()],
    schema: {
        types: schemaTypes,
    },
});

export default function StudioPage() {
    return <Studio config={config} />;
}
