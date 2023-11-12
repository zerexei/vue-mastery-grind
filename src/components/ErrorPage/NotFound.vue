<script setup lang="ts">
defineProps(['resource']);

// router.push('/404/post') // The post you are looking for is not found
</script>

<template>
  <div>The {{ resource }} you are looking for is not found</div>
</template>
