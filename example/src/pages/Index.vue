<template>
  <Layout>
    <h1>gridsome-plugin-recommender example</h1>

    <p>
      This Example shows a simple implementation of the <a href="https://github.com/mklueh/gridsome-plugin-recommender">gridsome-plugin-recommender</a>
      plugin.
      Click on the links below and see the generated related posts.
    </p>

    <posts-widget :posts="this.posts"/>

  </Layout>
</template>

<script>
import PostsWidget from "../components/PostsWidget";

export default {
  components: {PostsWidget},
  metaInfo: {
    title: 'Hello, world!'
  },
  computed: {
    posts: function () {
      return this.$page.posts.edges.map(post => {
        return {
          id: post.node.id,
          title: post.node.title,
          path: post.node.path
        }
      });
    }
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
