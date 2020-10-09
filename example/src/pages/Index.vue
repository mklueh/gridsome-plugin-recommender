<template>
  <Layout>
    <h1 class="py-4 underline text-2xl text-center">
      Showcase for the Gridsome Recommender Plugin
      <br> (by <a href="https://twitter.com/mklueh90" target="_blank" class="text-indigo-600">Marian Klühspies</a>)
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

    <div>
      All available Tags
      <tag-widget :tags="this.tags"/>
    </div>

    <div>
      All available Posts
      <posts-widget :posts="this.posts"/>
    </div>
  </Layout>
</template>

<script>
import PostsWidget from "../components/PostsWidget";
import TagWidget from "../components/TagWidget";

export default {
  components: {TagWidget, PostsWidget},
  metaInfo: {
    title: 'Showcase of the Gridsome Recommender Plugin!'
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
    },
    tags: function () {
      return this.$page.tags.edges.map(tag => {
        return {
          id: tag.node.id,
          title: tag.node.title,
          path: tag.node.path
        }
      });
    }
  }
}
</script>

<page-query>
query {
tags:allTag {
edges {
node {
id
title
path
}
}
}
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
