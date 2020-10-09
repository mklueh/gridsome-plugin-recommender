<template>
  <layout>
    <div class="max-w-screen-md mx-auto">
      <h1 class="text-center">{{ $page.tag.title }}</h1>
      <div class="p-4">

      </div>
    </div>
  </layout>
</template>

<script>
export default {
  name: "Tag"
}
</script>


<page-query>
query Tag ($path: String) {
tag (path: $path) {
id
path
title

}
}
</page-query>
<style scoped>

</style>
