<template>
  <div class="grid grid-cols-3 p-4 gap-3">
    <g-link :to="tag.path" class="tag bg-indigo-500 hover:shadow-lg rounded-full text-white text-center p-2 font-bold"
            v-for="tag in tags" :key="tag.id">
      {{ tag.title }}
    </g-link>
  </div>
</template>

<script>
export default {
  name: "tag-widget",
  props: ["tags"]
}
</script>

<style scoped>
.tag {

}
</style>
