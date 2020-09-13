#  Gridsome Recommender Plugin

[![npm](https://img.shields.io/npm/v/gridsome-plugin-recommender.svg)](https://www.npmjs.com/package/gridsome-plugin-recommender)

Improve churn rate of your [Gridsome](https://gridsome.org/) site by generating post or product recommendations to show users
related content they might be interested in.

 
## 
Analyses your posts and creates relations between similar posts based on text analysis. For more information on the text analysis part visit [content-based-recommender](https://github.com/stanleyfok/content-based-recommender)
 


## Install

- `yarn add gridsome-plugin-recommender`
- `npm install gridsome-plugin-recommender --save`

## Getting Started

Example: Find similar blog posts based on the title.

```js
module.exports = {
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
      },
    },
    {
      use: "gridsome-plugin-recommender",
      options: {
        enabled: true,
        typeName: 'Post',
        field: 'title',
        relatedFieldName: 'related',
        minScore: 0.01,
        maxScore: 1,
        maxRelations: 10,
        debug: false
      }
    }
  ]
};
```

**Important notice: the plugin needs to be placed below your source plugins or otherwise no required collections are created before. 
[Issue-1342](https://github.com/gridsome/gridsome/issues/1342)**


In your **templates** use something like this

```
<page-query>
    query RelatedPosts {
      allPost(filter:{id:{eq:"current-post-id"}}) {
        edges {
          node {
            id
            related{
              id
              path
            }
          }
        }
      }
    }
</page-query>
```




## Options

#### enabled

- Type: `boolean`

Enables / Disables the entire plugin. This might break your UI logic as the relations will be missing from
your nodes.

#### debug

- Type: `boolean`

Enables log messages

#### typeName

- Type: `boolean`

The collection we want to use to create relations of similar nodes.

#### typeName

- Type: `string` _required_

The collection we want to use to create relations of similar nodes.

#### field

- Type: `[string]` _required_

The collection fields we want to analyze for similarities


#### relatedFieldName

- Type: `[string]`
- Default: related

The field attached to your GraphQl node containing the related objects.
Allows creating multiple relations per collection

#### minScore

- Type: `number` [0,1]
- Default: 0.01

Minimum score required to identify a relation between two nodes.


#### maxScore

- Type: `number` [0,1]
- Default: 1

Maximum score allowed to identify a relation between two nodes

#### maxRelations

- Type: `number`
- Default: 100

Default locale to use in page's path without locale segment in it.

## Usage

This plugin will install and configure [content-based-recommender](https://github.com/stanleyfok/content-based-recommender).
Please refer to it in case of any problems related to the accuracy or performance issues that might occur when using
large collections. 

