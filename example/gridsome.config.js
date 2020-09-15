// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'Gridsome Plugin Recommender Demo',
    siteUrl: 'https://mklueh.github.io',
    pathPrefix: '/gridsome-plugin-recommender',
    transformers: {
        remark: {
            externalLinksTarget: '_blank',
            externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
            plugins: []
        }
    },
    plugins: [
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'BlogPost',
                path: './content/blog/**/*.md',
            }
        },
        {
            use: 'gridsome-plugin-recommender',
            options: {
                enabled: true,
                debug: true,
                typeName: 'BlogPost',
                field: 'title',
                minScore: 0.1,
                maxRelations: 3,
            }
        },
    ],
    templates: {
        BlogPost: '/blog/:slug'
    }
}
