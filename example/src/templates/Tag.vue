<template>
  <layout>
    <div class="max-w-screen-md mx-auto">
      <h1 class="text-center">Tag: {{ $page.tag.title }}</h1>
      <div class="p-4">
        <posts-widget :posts="$page.tag.related"/>
      </div>
    </div>
  </layout>
</template>

<script>
import PostsWidget from "../components/PostsWidget";
export default {
  name: "Tag",
  components: {PostsWidget}
}
</script>


<page-query>
query Tag ($path: String) {
tag (path: $path) {
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
