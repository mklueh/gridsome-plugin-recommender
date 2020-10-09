<template>
  <layout>
    <div class="max-w-screen-md mx-auto">
      <div>
        <g-link class="border-gray-600 border-2 p-2 my-2" to="/">Back</g-link>
      </div>
      <h1 class="text-center underline rounded-full text-indigo-600 font-bold p-4">{{ $page.tag.title }}</h1>
      <div class="p-4" v-if="$page.tag.related.length !== 0">
        <p class="text-sm text-center">All posts that are related to this tag</p>
        <posts-widget :posts="$page.tag.related"/>
      </div>
      <div class="text-center" v-else>This Tag is not used in any Post</div>
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
