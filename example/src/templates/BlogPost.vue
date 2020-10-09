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
      <div class="grid grid-cols-3 p-4">
      <g-link :to="tag.path" class="tag" v-for="tag in $page.blogPost.tags" :key="tag.id">
        {{            tag.title          }}
      </g-link>
      </div>
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
export default {
  name: "BlogPost",
  components: {PostsWidget}
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

.tag {
  background-color: cornflowerblue;
  border-radius: 15px;
  padding: 6px 12px;
  margin: 4px;
  color: azure !important;

}
</style>
