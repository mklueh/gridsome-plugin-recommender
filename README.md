#  Gridsome i18n plugin

[![npm](https://img.shields.io/npm/v/gridsome-plugin-recommender.svg)](https://www.npmjs.com/package/gridsome-plugin-recommender)

A recommender plugin for [Gridsome](https://gridsome.org/) to create relations to similar nodes using machine learning.

## Install

- `yarn add gridsome-plugin-recommender`
- `npm install gridsome-plugin-recommender --save`

## Getting Started

Example: Find similar blog posts based on the title.

```js
module.exports = {
  plugins: [
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

## Options

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

## Use cases

Generating post or product recommendations for your static site pages based on text analysis to show users
additional content they might be interested in. 
