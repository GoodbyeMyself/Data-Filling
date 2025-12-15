<script setup lang="ts">
import {
  useDarkMode,
  useToggleDarkMode
} from "@/composables/useToggleDarkMode";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const onClickRight = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};

// 根据路由 meta 判断是否隐藏主题切换按钮
const hideThemeToggle = computed(() => {
  return route.meta?.hideThemeToggle === true;
});
</script>

<template>
  <van-nav-bar fixed placeholder @click-right="onClickRight">
    <template #right>
      <svg-icon 
        v-if="!hideThemeToggle" 
        class="text-[18px]" 
        :name="useDarkMode() ? 'light' : 'dark'" 
      />
    </template>
  </van-nav-bar>
</template>

<style scoped></style>
