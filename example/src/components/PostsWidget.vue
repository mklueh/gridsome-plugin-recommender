<template>
  <div class="max-w-screen-md mx-auto list-none grid grid-cols-3 p-4">
    <g-link :to="post.path" class="hover:shadow-lg bg-gray-500 text-white p-6 m-2" v-for="post in posts">
      {{ post.title }}
    </g-link>
  </div>
</template>

<script>
export default {
  name: "PostsWidget",
  props: ["posts"]
}
</script>

<style scoped>

</style>
