<template>
  <Layout>
    <h1>gridsome-plugin-recommender example</h1>

    <p>
      This Example shows a simple implementation of the <a href="https://github.com/mklueh/gridsome-plugin-recommender">gridsome-plugin-recommender</a> plugin.
      Click on the links below and see the generated related posts.
    </p>

    <div>
      <ul>
        <li v-for="post in $page.posts.edges">
          <g-link :to="post.node.path">{{ post.node.title }}</g-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<page-query>
query {
posts:allBlogPost {
edges {
node {
id
path
title
}
}
}
}

</page-query>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
