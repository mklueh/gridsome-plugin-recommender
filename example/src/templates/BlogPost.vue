<template>
  <layout>
    <g-link to="/">Back</g-link>
    <div style="padding-bottom: 20px;">
      <b>Post:</b> {{ $page.blogPost.title }}
    </div>

    <div id="tags">
      <b>Automatically matched tags:</b>
      <span class="tag" v-for="tag in $page.blogPost.tags" :key="tag.id">
        <g-link style="color: azure;font-size: large;font-weight: bold;text-decoration: none" :to="tag.path">{{
            tag.title
          }}
        </g-link>
      </span>
    </div>

    <div id="related-posts" style="padding-top: 20px" v-if="$page.blogPost.related.length > 0">
      <b>Related Posts:</b>
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
