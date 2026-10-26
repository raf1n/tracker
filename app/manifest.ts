import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Milk Tracker",
    short_name: "Milk",
    description: "A simple milk delivery log.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3f4f2",
    theme_color: "#f3f4f2",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
