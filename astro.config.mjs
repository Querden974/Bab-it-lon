// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightObsidian, { obsidianSidebarGroup } from "starlight-obsidian";
import starlightSidebarTopics from "starlight-sidebar-topics";
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Bab-IT-Lon",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      plugins: [
        // Generate the Obsidian vault pages.
        starlightObsidian({
          vault: "D:/OneDrive/OneDrive - Afpa Angers/Notes TSSR/Astro",
          ignore: ["/notes/CLAUDE"],
          sidebar: {
            collapsed: false,
            collapsedFolders: true,
          },
          skipGeneration: true,
        }),
        starlightSidebarTopics(
          [
            {
              id: "Essentiels",
              label: "Essentiels",
              link: "/notes/essentiels/bases-des-réseaux-informatiques",
              icon: "star",
              items: [
                {
                  label: "Essentiels",
                  autogenerate: { directory: "notes/Essentiels" },
                },
              ],
            },
            {
              id: "Procédures",
              label: "Procédures",
              link: "/notes/",
              icon: "open-book",
              items: [
                {
                  label: "Procédures",
                  collapsed: true,
                  autogenerate: { directory: "notes/_Procédures" },
                },
              ],
            },
            {
              id: "Glossaire",
              label: "Glossaire",
              link: "/notes/glossaire",
              icon: "information",
              items: ["notes/glossaire"],
            },
          ],
          {
            exclude: [
              "/guides/**",
              "/reference/**",
              "/notes",
              "/notes/*",
              "/notes/_Procédures/Centre de documents/*/index",
            ],
            topics: {
              Essentiels: ["/"],
            },
          },
        ),
      ],

      //   sidebar: [
      //     // {
      //     // 	label: 'Guides',
      //     // 	items: [
      //     // 		// Each item here is one entry in the navigation menu.
      //     // 		{ label: 'Example Guide', slug: 'guides/example' },
      //     // 	],
      //     // },
      //     // {
      //     //   label: "Reference",
      //     //   autogenerate: { directory: "notes", collapsed: true },
      //     // },
      //     obsidianSidebarGroup,
      //   ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});