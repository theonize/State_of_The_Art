import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Site metadata
  title: 'State of the Art',
  description:
    'An interactive book on the latest and greatest issues facing the Church today — part declaration, part Bible-study guide, part information portal.',
  lang: 'en-US',

  // GitHub Pages project site is served from /State_of_The_Art/
  base: '/State_of_The_Art/',

  // Prettier URLs (no trailing .html)
  cleanUrls: true,

  // Show "last updated" timestamps pulled from git
  lastUpdated: true,

  // External links (Bible Gateway, news, orgs) are not checked; this guards
  // the first-edition build against the occasional in-progress cross-reference.
  ignoreDeadLinks: true,

  head: [
    ['meta', { name: 'theme-color', content: '#8a5a2b' }],
    ['meta', { name: 'author', content: 'theonize' }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'State of the Art — Issues Facing the Church Today'
      }
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A declaration, a Bible study, and an information portal on human dignity, children, nationalism, advocacy, heresy, and more.'
      }
    ]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'State of the Art',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'The Declaration', link: '/declaration' },
      {
        text: 'The Book',
        items: [
          { text: 'How to Use This Book', link: '/guide/how-to-use' },
          { text: 'Foundations', link: '/foundations/kingdom' },
          { text: 'The Issues', link: '/issues/human-rights' }
        ]
      },
      { text: 'Glossary', link: '/appendix/glossary' },
      { text: 'Resources', link: '/appendix/resources' }
    ],

    sidebar: [
      {
        text: 'Begin Here',
        items: [
          { text: 'Welcome', link: '/' },
          { text: 'The Declaration', link: '/declaration' },
          { text: 'How to Use This Book', link: '/guide/how-to-use' }
        ]
      },
      {
        text: 'Part I — Foundations',
        collapsed: false,
        items: [
          { text: '1. The Kingdom of God', link: '/foundations/kingdom' },
          {
            text: '2. Made in the Image of God',
            link: '/foundations/image-of-god'
          }
        ]
      },
      {
        text: 'Part II — The Issues',
        collapsed: false,
        items: [
          { text: '3. Human Rights & Human Dignity', link: '/issues/human-rights' },
          {
            text: '4. The Rights & Protection of Children',
            link: '/issues/childrens-rights'
          },
          {
            text: '5. Nationalism, Kingdom & Dominion',
            link: '/issues/nationalism-kingdom-dominion'
          },
          { text: '6. Advocacy & Public Witness', link: '/issues/advocacy' },
          {
            text: '7. Heresy, Orthodoxy & Discernment',
            link: '/issues/heresy'
          },
          {
            text: '8. Power, Abuse & Accountability',
            link: '/issues/power-and-abuse'
          },
          {
            text: '9. Creation, Stewardship & Dominion',
            link: '/issues/creation-care'
          },
          {
            text: '10. Technology, AI & the Human Person',
            link: '/issues/technology'
          },
          {
            text: '11. The Neighbor: Race, Migration & Reconciliation',
            link: '/issues/neighbor'
          },
          {
            text: '12. Wealth, Poverty & the Common Good',
            link: '/issues/wealth-and-poverty'
          },
          {
            text: '13. Sexuality, Marriage & the Body',
            link: '/issues/sexuality'
          }
        ]
      },
      {
        text: 'Appendix',
        collapsed: false,
        items: [
          { text: 'Glossary', link: '/appendix/glossary' },
          { text: 'Further Reading & Resources', link: '/appendix/resources' }
        ]
      }
    ],

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/theonize/State_of_The_Art'
      }
    ],

    editLink: {
      pattern:
        'https://github.com/theonize/State_of_The_Art/edit/main/docs/:path',
      text: 'Suggest an edit to this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Continue reading'
    },

    footer: {
      message:
        'A declaration, study guide & portal for the Church. Scripture references link to Bible Gateway. Released under the Apache-2.0 License.',
      copyright: 'Made for the people of God · theonize'
    },

    lastUpdated: {
      text: 'Last updated'
    }
  }
})
