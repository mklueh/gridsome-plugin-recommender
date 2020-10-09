<template>
  <layout>
    <div>
      <g-link class="border-gray-600 border-2 p-2 my-2" to="/">Back</g-link>
    </div>
    <h1 class="py-4 underline text-2xl text-center">
      {{ $page.blogPost.title }}
    </h1>

    <div id="tags" class="py-6">
      <b>Automatically matched tags by gridsome-plugin-recommender:</b>
      <tag-widget :tags="$page.blogPost.tags"/>
    </div>

    <div id="related-posts" class="py-6" v-if="$page.blogPost.related.length > 0">
      <b>Automatically matched related posts by gridsome-plugin-recommender:</b>
      <posts-widget :posts="$page.blogPost.related"/>
    </div>
    <span v-else style="color: red;">This post has no similar posts</span>

  </layout>
</template>

<script>
import PostsWidget from "../components/PostsWidget";
import TagWidget from "../components/TagWidget";
export default {
  name: "BlogPost",
  components: {TagWidget, PostsWidget}
}
</script>


<page-query>
query Post ($path: String) {
blogPost (path: $path) {
id
path
title
related{
id
path
title
}
tags{
id
path
title
}
}
}

</page-query>

<style scoped>


</style>
