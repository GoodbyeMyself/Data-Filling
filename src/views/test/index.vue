<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

defineOptions({
    name: "Test",
});

const router = useRouter();
const route = useRoute();

const queryText = computed(() => JSON.stringify(route.query, null, 2));

const simulateLinkVisit = () => {
    router.replace({
        name: "Test",
        query: {
            from: "Govern",
            token: '1234567890',
            userId: '1',
            fillId: 'abcdefg'
        },
    });
};

const goToFilling = () => {
    router.push({
        name: "Filling",
        query: route.query,
    });
};
</script>

<template>
    <div class="Test-content px-[12px]">
        <div class="relative w-[120px] mx-auto mb-[30px] pt-[20px]">
            <img class="block w-full" alt="Vue logo" src="~@/assets/logo_melomini.png" />
            <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-white text-[18px] font-bold">数据填报</span>
            </div>
        </div>

        <div class="flex flex-col gap-[12px] items-start">
            <button
                type="button"
                class="px-[12px] py-[8px] bg-[#409EFF] text-white rounded hover:bg-[#66b1ff] active:bg-[#3a8ee6] transition"
                @click="simulateLinkVisit"
            >
                模拟链接携参进入当前页
            </button>
            <div class="w-full">
                <div class="text-[14px] text-gray-600 mb-[6px]">
                    当前路由参数（query）
                </div>
                <pre class="bg-gray-100 rounded p-[10px] text-[13px] whitespace-pre-wrap">
                    {{ queryText }}
                </pre>
            </div>
            <button
                type="button"
                class="px-[12px] py-[8px] bg-[#67C23A] text-white rounded hover:bg-[#85ce61] active:bg-[#5daf34] transition"
                @click="goToFilling"
            >
                进行数据填报（携当前参数）
            </button>
        </div>
    </div>
</template>
