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

// 表单数据类型定义
interface FormData {
    dept: string;
    reporter: string;
    phone: string;
    email: string;
    date: string;
    dateRangeStart: string;
    dateRangeEnd: string;
    time: string;
    period: "weekly" | "monthly" | "quarterly";
    category: string;
    tags: string[];
    notify: boolean;
    status: "draft" | "pending";
    indicatorA: string;
    indicatorB: string;
    indicatorC: number;
    remark: string;
    fileLink: string;
}

// 表单默认值
const getDefaultFormData = (): FormData => ({
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
    tags: [],
    notify: true,
    status: "draft",
    indicatorA: "",
    indicatorB: "",
    indicatorC: 50,
    remark: "",
    fileLink: "",
});

const form = reactive<FormData>(getDefaultFormData());

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
    const value = selectedOptions?.[0]?.value;
    if (value && ["weekly", "monthly", "quarterly"].includes(value)) {
        form.period = value as FormData["period"];
    }
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
    Object.assign(form, getDefaultFormData());
};
</script>

<template>
    <div class="Filling-content ios-page">
        <!-- 优化后的头部区域 -->
        <div class="ios-header">
            <div class="title-wrapper">
                <div class="title-icon">📋</div>
                <div class="title-content">
                    <div class="title">数据填报</div>
                    <div class="sub-title">请按要求填写基础信息和指标数据</div>
                </div>
            </div>
        </div>

        <van-form @submit="handleSubmit">
            <!-- 基础信息卡片 -->
            <div class="ios-card">
                <div class="section-header">
                    <div class="section-title">
                        <span class="title-icon">📋</span>
                        <span>基础信息</span>
                    </div>
                    <div class="section-badge">必填</div>
                </div>
                <van-cell-group inset class="custom-cell-group">
                    <van-field
                        v-model="form.dept"
                        label="填报部门"
                        placeholder="请输入部门名称"
                        required
                        clearable
                        label-width="5em"
                    />
                    <van-field 
                        v-model="form.reporter" 
                        label="填报人" 
                        placeholder="请输入姓名" 
                        required 
                        clearable
                        label-width="5em"
                    />
                    <van-field 
                        v-model="form.phone" 
                        label="联系电话" 
                        type="tel" 
                        placeholder="请输入手机或座机" 
                        clearable
                        label-width="5em"
                    />
                    <van-field 
                        v-model="form.email" 
                        label="邮箱" 
                        type="email" 
                        placeholder="name@example.com" 
                        clearable
                        label-width="5em"
                    />
                    <van-field 
                        v-model="form.date" 
                        label="填报日期" 
                        type="date"
                        label-width="5em"
                    />
                    <van-field 
                        v-model="form.dateRangeStart" 
                        label="开始日期" 
                        type="date"
                        label-width="5em"
                    />
                    <van-field 
                        v-model="form.dateRangeEnd" 
                        label="结束日期" 
                        type="date"
                        label-width="5em"
                    />
                    <van-field 
                        v-model="form.time" 
                        label="填报时间" 
                        type="time"
                        label-width="5em"
                    />
                    <van-field
                        :model-value="periodLabel"
                        label="数据周期"
                        readonly
                        is-link
                        placeholder="请选择周期"
                        label-width="5em"
                        @click="periodPickerVisible = true"
                    />
                    <van-field
                        :model-value="categoryLabel"
                        label="数据分类"
                        readonly
                        is-link
                        placeholder="请选择分类"
                        label-width="5em"
                        @click="categoryPickerVisible = true"
                    />
                </van-cell-group>
            </div>

            <!-- 指标与状态卡片 -->
            <div class="ios-card">
                <div class="section-header">
                    <div class="section-title">
                        <span class="title-icon">📊</span>
                        <span>指标与状态</span>
                    </div>
                </div>
                <van-cell-group inset class="custom-cell-group">
                    <van-field
                        v-model="form.indicatorA"
                        label="核心指标 A"
                        type="number"
                        placeholder="请输入数值"
                        clearable
                        label-width="5.5em"
                    />
                    <van-field
                        v-model="form.indicatorB"
                        label="核心指标 B"
                        type="number"
                        placeholder="请输入数量"
                        clearable
                        label-width="5.5em"
                    />
                    <van-field label="指标权重" label-width="5.5em">
                        <template #input>
                            <div class="slider-wrapper">
                                <van-slider 
                                    v-model="form.indicatorC" 
                                    :min="0" 
                                    :max="100"
                                    bar-height="6px"
                                    active-color="#2563eb"
                                />
                                <div class="slider-value">{{ form.indicatorC }}%</div>
                            </div>
                        </template>
                    </van-field>
                    <van-field label="标签" label-width="5.5em">
                        <template #input>
                            <van-checkbox-group v-model="form.tags" direction="horizontal" class="custom-checkbox-group">
                                <van-checkbox 
                                    v-for="item in tagOptions" 
                                    :key="item.value" 
                                    :name="item.value"
                                    shape="square"
                                >
                                    {{ item.label }}
                                </van-checkbox>
                            </van-checkbox-group>
                        </template>
                    </van-field>
                    <van-field label="状态" label-width="5.5em">
                        <template #input>
                            <van-radio-group v-model="form.status" direction="horizontal" class="custom-radio-group">
                                <van-radio name="draft" icon-size="18px">草稿</van-radio>
                                <van-radio name="pending" icon-size="18px">待审核</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <van-field label="消息通知" label-width="5.5em">
                        <template #input>
                            <div class="switch-wrapper">
                                <van-switch v-model="form.notify" size="22px" />
                                <span class="switch-desc">{{ form.notify ? '已开启' : '已关闭' }}</span>
                            </div>
                        </template>
                        <template #message>
                            <div class="field-tip">开启后提交结果会发送通知</div>
                        </template>
                    </van-field>
                    <van-field
                        v-model="form.fileLink"
                        label="附件/链接"
                        type="url"
                        placeholder="可填写文件链接、云盘地址等"
                        clearable
                        label-width="5.5em"
                    />
                    <van-field
                        v-model="form.remark"
                        label="备注说明"
                        type="textarea"
                        rows="3"
                        autosize
                        placeholder="可填写异常说明、数据口径等补充信息"
                        show-word-limit
                        maxlength="200"
                        label-width="5.5em"
                    />
                </van-cell-group>
            </div>

            <!-- 优化后的操作按钮区域 -->
            <div class="action-area">
                <van-button 
                    type="primary" 
                    native-type="submit" 
                    block 
                    round
                    size="large"
                    class="submit-btn"
                >
                    <span class="btn-text">✓ 提交填报</span>
                </van-button>
                <van-button 
                    type="default" 
                    native-type="button" 
                    block 
                    round
                    size="large"
                    class="reset-btn"
                    @click="handleReset"
                >
                    <span class="btn-text">↻ 重置表单</span>
                </van-button>
            </div>
        </van-form>

        <!-- 弹出选择器 -->
        <van-popup v-model:show="periodPickerVisible" position="bottom" round>
            <van-picker 
                :columns="periodOptions"
                title="选择数据周期"
                @confirm="handleConfirmPeriod" 
                @cancel="periodPickerVisible = false"
            />
        </van-popup>
        <van-popup v-model:show="categoryPickerVisible" position="bottom" round>
            <van-picker
                :columns="categoryOptions"
                title="选择数据分类"
                @confirm="handleConfirmCategory"
                @cancel="categoryPickerVisible = false"
            />
        </van-popup>
    </div>
</template>

<style scoped>
/* 页面整体布局 */
.ios-page {
    min-height: 100vh;
    padding: 12px 14px 80px;
    background: linear-gradient(180deg, #e8f1f8 0%, #f5f8fa 50%, #fafbfc 100%);
    position: relative;
}

/* 优化后的头部区域 - 缩小版 */
.ios-header {
    padding: 4px 4px 12px;
    margin-bottom: 8px;
}

.title-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    border-radius: 14px;
    box-shadow: 0 4px 16px rgba(30, 58, 138, 0.25);
    position: relative;
    overflow: hidden;
}

.title-wrapper::before {
    content: "";
    position: absolute;
    top: -30%;
    right: -15%;
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
}

.title-icon {
    font-size: 24px;
    line-height: 1;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
}

.title-content {
    flex: 1;
}

.title {
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 3px;
    letter-spacing: 0.5px;
}

.sub-title {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.4;
    font-weight: 400;
}

/* 卡片样式 */
.ios-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 14px;
    box-shadow: 0 2px 12px rgba(30, 58, 138, 0.08);
    border: 1px solid rgba(37, 99, 235, 0.1);
    margin-bottom: 14px;
    transition: all 0.3s ease;
}

.ios-card:hover {
    box-shadow: 0 4px 20px rgba(30, 58, 138, 0.12);
    transform: translateY(-1px);
}

/* 区块标题 */
.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 0 4px;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
}

.section-title .title-icon {
    font-size: 18px;
    line-height: 1;
}

.section-badge {
    font-size: 11px;
    padding: 3px 10px;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: #ffffff;
    border-radius: 12px;
    font-weight: 500;
    letter-spacing: 0.5px;
}

/* 自定义表单组样式 */
.custom-cell-group {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

:deep(.van-cell) {
    padding: 14px 16px;
    font-size: 14px;
    transition: background-color 0.2s ease;
}

:deep(.van-cell:active) {
    background-color: #f8f9fb;
}

:deep(.van-cell::after) {
    border-color: #f0f1f5;
}

:deep(.van-field__label) {
    color: #475569;
    font-weight: 500;
}

:deep(.van-field__control) {
    color: #1e293b;
}

:deep(.van-field__control::placeholder) {
    color: #94a3b8;
}

/* Slider 样式优化 */
.slider-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
}

.slider-wrapper :deep(.van-slider) {
    flex: 1;
}

.slider-value {
    min-width: 42px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #1e3a8a;
    background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
    padding: 4px 8px;
    border-radius: 8px;
}

/* 复选框组样式 */
.custom-checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.custom-checkbox-group :deep(.van-checkbox) {
    margin: 0;
}

.custom-checkbox-group :deep(.van-checkbox__label) {
    font-size: 13px;
    color: #475569;
}

/* 单选框组样式 */
.custom-radio-group {
    display: flex;
    gap: 16px;
}

.custom-radio-group :deep(.van-radio__label) {
    font-size: 14px;
    color: #475569;
}

/* 开关样式 */
.switch-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.switch-desc {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
}

.field-tip {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
}

/* 操作按钮区域 */
.action-area {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px 20px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0.98) 100%);
    backdrop-filter: blur(10px);
    display: flex;
    gap: 12px;
    z-index: 100;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
}

.submit-btn {
    flex: 2;
    height: 48px;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    border: none;
    box-shadow: 0 4px 16px rgba(30, 58, 138, 0.35);
    transition: all 0.3s ease;
}

.submit-btn:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(30, 58, 138, 0.25);
}

.reset-btn {
    flex: 1;
    height: 48px;
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    color: #64748b;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
    transition: all 0.3s ease;
}

.reset-btn:active {
    transform: scale(0.98);
    background: #f8f9fb;
}

.btn-text {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.submit-btn .btn-text {
    color: #ffffff;
}

.reset-btn .btn-text {
    color: #64748b;
}

/* Picker 标题样式优化 */
:deep(.van-picker__toolbar) {
    height: 48px;
}

:deep(.van-picker__title) {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
}

:deep(.van-picker__confirm) {
    color: #2563eb;
    font-weight: 600;
}

:deep(.van-picker__cancel) {
    color: #94a3b8;
}

/* 响应式优化 */
@media (max-width: 375px) {
    .ios-page {
        padding: 12px 10px 80px;
    }
    
    .title {
        font-size: 20px;
    }
    
    .action-area {
        padding: 10px 12px 16px;
    }
}
</style>
