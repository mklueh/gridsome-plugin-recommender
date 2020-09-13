#  Gridsome i18n plugin

[![npm](https://img.shields.io/npm/v/gridsome-plugin-recommender.svg)](https://www.npmjs.com/package/gridsome-plugin-recommender)

A recommender plugin for [Gridsome](https://gridsome.org/) to create relations to similar nodes using machine learning.

## Install

- `yarn add gridsome-plugin-recommender`
- `npm install gridsome-plugin-recommender --save`

## Getting Started

```js
module.exports = {
  plugins: [
    {
      use: "gridsome-plugin-recommender",
      options: {
        
      }
    }
  ]
};
```

## Options

#### collection

- Type: `string` _required_

The collection we want to build relations to.

#### field

- Type: `string`

The collection field we want to analyze

#### minScore

- Type: `number` [0,1]
- Default: 0.1

Minimum score required to identify a relation between two nodes

#### maxScore

- Type: `number` [0,1]
- Default: 1

Maximum score allowed to identify a relation between two nodes

#### maxRelations

- Type: `number`
- Default: 100

Default locale to use in page's path without locale segment in it.


## Usage

This plugin will install and configure [content-based-recommender](https://kazupon.github.io/vue-i18n/introduction.html), so refer to it about usage.

## Use cases

- Related Posts / Products / Articles
  Identify similar posts and show recommendations on the post page linking to other posts
