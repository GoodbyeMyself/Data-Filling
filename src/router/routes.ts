import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "root",
        component: Layout,
        redirect: { name: "Demo" },
        children: [
            {
                path: "test",
                name: "Test",
                component: () => import("@/views/test/index.vue"),
                meta: {
                    title: "测试页"
                }
            },
            {
                path: "filling",
                name: "Filling",
                component: () => import("@/views/filling/index.vue"),
                meta: {
                    title: "数据填报"
                }
            },
            {
                path: "tools",
                name: "Tools",
                component: () => import("@/views/tools/index.vue"),
                meta: {
                    title: "工具"
                }
            },
            {
                path: "demo",
                name: "Demo",
                component: () => import("@/views/demo/index.vue"),
                meta: {
                    title: "技术栈"
                }
            },
        ]
    }
];

export default routes;
