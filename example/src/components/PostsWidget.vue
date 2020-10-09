<template>
  <div>
    <ul class="list-none bg-gray-800">
      <li class="shadow" v-for="post in posts">
        <g-link :to="post.path">{{ post.title }}</g-link>
      </li>
    </ul>
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
