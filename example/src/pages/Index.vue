<template>
  <Layout>
    <h1 class="py-4 underline text-2xl text-center">
      Showcase for the Gridsome Recommender Plugin
    </h1>

    <p>
      This Demo shows a simple implementation of the <a href="https://github.com/mklueh/gridsome-plugin-recommender">gridsome-plugin-recommender</a>
      plugin.
    </p>

    <div class="py-2">
      It is used for two cases on this website:

      <ul class="list-disc p-4 font-bold">
        <li>Finding related posts</li>
        <li>Finding related tags</li>
      </ul>
    </div>

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
