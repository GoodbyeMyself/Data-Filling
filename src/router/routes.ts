import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "root",
        component: Layout,
        redirect: () => ({
            name: "Filling",
            /**
             * @description: 测试参数
             * @author: M.yunlong
             * @date: 2025-12-15 11:20:54
            */
            query: {
                from: "home",
                ts: "1765768717757"
            }
        }),
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
                    title: "数据填报",
                    hideThemeToggle: true
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
