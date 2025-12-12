<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { showNotify } from "vant";
import "vant/es/notify/style";

defineOptions({
    name: "Filling",
});

const route = useRoute();

// 进入页面及路由参数变化时输出
watch(
    () => route.query,
    (val) => {
        console.log("填报页面路由参数:", val);
    },
    { deep: true, immediate: true },
);

const form = reactive({
    dept: "",
    reporter: "",
    phone: "",
    email: "",
    date: "",
    dateRangeStart: "",
    dateRangeEnd: "",
    time: "",
    period: "weekly",
    category: "",
    tags: [] as string[],
    notify: true,
    status: "draft",
    indicatorA: "",
    indicatorB: "",
    indicatorC: 50,
    remark: "",
    fileLink: "",
});

const periodOptions = [
    { text: "周报", value: "weekly" },
    { text: "月报", value: "monthly" },
    { text: "季度", value: "quarterly" },
];

const categoryOptions = [
    { text: "业务数据", value: "biz" },
    { text: "运营数据", value: "ops" },
    { text: "财务数据", value: "fin" },
    { text: "其它", value: "other" },
];

const tagOptions = [
    { label: "重点监控", value: "key" },
    { label: "需复核", value: "review" },
    { label: "自动采集", value: "auto" },
    { label: "人工录入", value: "manual" },
];

const periodPickerVisible = ref(false);
const categoryPickerVisible = ref(false);

const periodLabel = computed(() => periodOptions.find((item) => item.value === form.period)?.text ?? "");
const categoryLabel = computed(() => categoryOptions.find((item) => item.value === form.category)?.text ?? "");

const handleConfirmPeriod = ({ selectedOptions }: { selectedOptions: Array<{ value: string }> }) => {
    form.period = selectedOptions?.[0]?.value ?? "";
    periodPickerVisible.value = false;
};

const handleConfirmCategory = ({ selectedOptions }: { selectedOptions: Array<{ value: string }> }) => {
    form.category = selectedOptions?.[0]?.value ?? "";
    categoryPickerVisible.value = false;
};

const handleSubmit = () => {
    const missing: string[] = [];
    if (!form.dept.trim()) missing.push("填报部门");
    if (!form.reporter.trim()) missing.push("填报人");
    if (missing.length) {
        showNotify({ type: "danger", message: `请补充必填项：${missing.join("、")}` });
        return;
    }
    console.log("填报提交数据:", JSON.parse(JSON.stringify(form)));
    showNotify({ type: "success", message: "填报成功" });
};

const handleReset = () => {
    form.dept = "";
    form.reporter = "";
    form.phone = "";
    form.email = "";
    form.date = "";
    form.dateRangeStart = "";
    form.dateRangeEnd = "";
    form.time = "";
    form.period = "weekly";
    form.category = "";
    form.tags = [];
    form.notify = true;
    form.status = "draft";
    form.indicatorA = "";
    form.indicatorB = "";
    form.indicatorC = 50;
    form.remark = "";
    form.fileLink = "";
};
</script>

<template>
    <div class="Filling-content ios-page space-y-5">
        <div class="ios-header">
            <div class="title">数据填报</div>
            <div class="sub-title">请按要求填写基础信息和指标数据，确认无误后提交。</div>
        </div>

        <van-form @submit="handleSubmit">
            <div class="ios-card">
                <div class="section-title">基础信息</div>
                <van-cell-group inset>
                    <van-field
                        v-model="form.dept"
                        label="填报部门"
                        placeholder="请输入部门名称"
                        required
                        clearable
                    />
                    <van-field v-model="form.reporter" label="填报人" placeholder="姓名" required clearable />
                    <van-field v-model="form.phone" label="联系电话" type="tel" placeholder="手机或座机" clearable />
                    <van-field v-model="form.email" label="邮箱" type="email" placeholder="name@example.com" clearable />
                    <van-field v-model="form.date" label="填报日期" type="date" />
                    <van-field v-model="form.dateRangeStart" label="开始日期" type="date" />
                    <van-field v-model="form.dateRangeEnd" label="结束日期" type="date" />
                    <van-field v-model="form.time" label="填报时间" type="time" />
                    <van-field
                        :model-value="periodLabel"
                        label="数据周期"
                        readonly
                        is-link
                        placeholder="请选择"
                        @click="periodPickerVisible = true"
                    />
                    <van-field
                        :model-value="categoryLabel"
                        label="数据分类"
                        readonly
                        is-link
                        placeholder="请选择"
                        @click="categoryPickerVisible = true"
                    />
                </van-cell-group>
            </div>

            <div class="ios-card mt-[12px]">
                <div class="section-title">指标与状态</div>
                <van-cell-group inset>
                    <van-field
                        v-model="form.indicatorA"
                        label="核心指标 A"
                        type="number"
                        placeholder="数值"
                        clearable
                    />
                    <van-field
                        v-model="form.indicatorB"
                        label="核心指标 B"
                        type="number"
                        placeholder="数量"
                        clearable
                    />
                    <van-field label="指标权重" input-align="right">
                        <template #input>
                            <van-slider v-model="form.indicatorC" min="0" max="100" />
                        </template>
                        <template #message>当前值：{{ form.indicatorC }}</template>
                    </van-field>
                    <van-field label="标签">
                        <template #input>
                            <van-checkbox-group v-model="form.tags" direction="horizontal">
                                <van-checkbox v-for="item in tagOptions" :key="item.value" :name="item.value" class="mb-2">
                                    {{ item.label }}
                                </van-checkbox>
                            </van-checkbox-group>
                        </template>
                    </van-field>
                    <van-field label="状态">
                        <template #input>
                            <van-radio-group v-model="form.status" direction="horizontal">
                                <van-radio name="draft">草稿</van-radio>
                                <van-radio name="pending">待审核</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <van-field label="消息通知">
                        <template #input>
                            <van-switch v-model="form.notify" size="20px" />
                        </template>
                        <template #message>开启后提交结果会发送通知</template>
                    </van-field>
                    <van-field
                        v-model="form.fileLink"
                        label="附件/链接"
                        type="url"
                        placeholder="可填写文件链接、云盘地址等"
                        clearable
                    />
                    <van-field
                        v-model="form.remark"
                        label="备注说明"
                        type="textarea"
                        rows="3"
                        autosize
                        placeholder="可填写异常说明、数据口径等"
                        show-word-limit
                    />
                </van-cell-group>
            </div>

            <van-space :size="12" wrap class="action-space">
                <van-button type="primary" native-type="submit" block >
                    提交
                </van-button>
                <van-button type="default" native-type="button" plain block @click="handleReset">
                    重置
                </van-button>
            </van-space>
        </van-form>

        <van-popup v-model:show="periodPickerVisible" position="bottom" round>
            <van-picker :columns="periodOptions" @confirm="handleConfirmPeriod" @cancel="periodPickerVisible = false" />
        </van-popup>
        <van-popup v-model:show="categoryPickerVisible" position="bottom" round>
            <van-picker
                :columns="categoryOptions"
                @confirm="handleConfirmCategory"
                @cancel="categoryPickerVisible = false"
            />
        </van-popup>
    </div>
</template>

<style scoped>
.ios-page {
    min-height: 100vh;
    padding: 14px 12px 24px;
    background: linear-gradient(180deg, #f9fbff 0%, #f5f6f8 100%);
}

.ios-header {
    padding: 12px 6px 0 6px;
}

.title {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
}

.sub-title {
    font-size: 13px;
    color: #64748b;
    line-height: 1.5;
}

.ios-card {
    background: #ffffff;
    border-radius: 18px;
    padding: 12px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    border: 1px solid #eef2f6;
}

.section-title {
    font-size: 15px;
    font-weight: 600;
    color: #1e293b;
    margin: 2px 0 8px;
    padding-left: 8px;
    position: relative;
}

.section-title::before {
    content: "";
    position: absolute;
    left: 0;
    top: 46%;
    transform: translateY(-50%);
    width: 4px;
    height: 14px;
    border-radius: 999px;
    background: linear-gradient(180deg, #5a8cff 0%, #6ad6ff 100%);
}

.action-space {
    padding: 4px 2px 0;
}
</style>
