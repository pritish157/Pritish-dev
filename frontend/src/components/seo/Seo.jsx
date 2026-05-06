import { useEffect } from 'react'
import { pageMeta, projects, siteConfig, skillCategories } from '../../content/siteContent'

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertStructuredData(payload) {
  let script = document.getElementById('structured-data')

  if (!script) {
    script = document.createElement('script')
    script.id = 'structured-data'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(payload)
}

function buildSchema(page) {
  const pageUrl = `${siteConfig.siteUrl}${page.path}`
  const personId = `${siteConfig.siteUrl}/#person`
  const websiteId = `${siteConfig.siteUrl}/#website`

  const graph = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: `${siteConfig.name} Portfolio`,
      url: siteConfig.siteUrl,
      inLanguage: 'en-IN',
      description: siteConfig.description,
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      email: `mailto:${siteConfig.email}`,
      jobTitle: `${siteConfig.role} / ${siteConfig.secondaryRole}`,
      description: siteConfig.description,
      image: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
      nationality: {
        '@type': 'Country',
        name: 'India',
      },
      sameAs: siteConfig.socialLinks
        .map((link) => link.href)
        .filter((href) => href.startsWith('http')),
      knowsAbout: [
        'React.js',
        'Node.js',
        'Express.js',
        'MongoDB',
        'REST APIs',
        'Socket.IO',
        'JWT Authentication',
        'MERN Stack',
        'AI Integration',
        'JavaScript',
        'Java',
        'Python',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': personId },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteConfig.siteUrl,
        },
        ...(page.path === '/'
          ? []
          : [
              {
                '@type': 'ListItem',
                position: 2,
                name: page.title.split('|')[0].trim(),
                item: pageUrl,
              },
            ]),
      ],
    },
  ]

  if (page.key === 'projects') {
    graph.push({
      '@type': 'ItemList',
      name: 'Portfolio Projects',
      itemListElement: projects.map((project, index) => ({
        '@type': 'CreativeWork',
        position: index + 1,
        name: project.name,
        description: project.summary,
        creator: { '@id': personId },
        url: `${siteConfig.siteUrl}/projects#${project.id}`,
      })),
    })
  }

  if (page.key === 'skills') {
    graph.push({
      '@type': 'DefinedTermSet',
      name: 'Technical Skills',
      hasDefinedTerm: skillCategories.flatMap((category) =>
        category.items.map((item) => ({
          '@type': 'DefinedTerm',
          name: item.name,
          description: item.detail,
          inDefinedTermSet: `${siteConfig.siteUrl}/skills`,
        })),
      ),
    })
  }

  if (page.key === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      name: 'Contact Pritish Kumar Panda',
      url: pageUrl,
      mainEntity: { '@id': personId },
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export default function Seo({ pageKey = 'home' }) {
  useEffect(() => {
    const page = pageMeta[pageKey] ?? pageMeta.home
    const url = `${siteConfig.siteUrl}${page.path}`
    const keywords = [...siteConfig.keywords, ...page.keywords].join(', ')

    document.title = page.title

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: page.description,
    })
    upsertMeta('meta[name="keywords"]', {
      name: 'keywords',
      content: keywords,
    })
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    })
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: page.title,
    })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: page.description,
    })
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: url,
    })
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    })
    upsertMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: `${siteConfig.name} developer portfolio preview`,
    })
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: page.title,
    })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: page.description,
    })
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: `${siteConfig.siteUrl}${siteConfig.defaultImage}`,
    })

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: url,
    })

    upsertStructuredData(buildSchema(page))
  }, [pageKey])

  return null
}
