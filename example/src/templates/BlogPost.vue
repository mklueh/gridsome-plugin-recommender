<template>
  <layout>
    <g-link to="/">Back</g-link>
    <div style="padding-bottom: 20px;">
      {{ $page.blogPost.title }}
    </div>

    <div id="related-posts" style="padding-top: 20px" v-if="$page.blogPost.related.length > 0">
      Related Posts:
      <ul>
        <li v-for="related in $page.blogPost.related" :key="related.id">
          <g-link :to="related.path">{{
              related.title
            }}
          </g-link>
        </li>
      </ul>
    </div>
    <span v-else style="color: red;">This post has no similar posts</span>

  </layout>
</template>

<script>
export default {
  name: "BlogPost"
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
}
}

</page-query>

<style scoped>

</style>
