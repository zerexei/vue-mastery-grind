<script setup lang="ts">
defineProps(['id']);
</script>

<template>
  <div class="space-y-6">
    <div>
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
