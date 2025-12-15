<script setup lang="ts">
import { useRouter } from "vue-router";

defineOptions({
    name: "Forbidden",
});

const router = useRouter();

const goBack = () => {
    router.back();
};

const goHome = () => {
    router.push({ name: "Test" });
};
</script>

<template>
    <div class="forbidden-page">
        <div class="forbidden-container">
            <div class="icon-wrapper">
                <div class="icon-bg">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                        <path d="M15.5 8L8 15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M8 8L15.5 15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>

            <div class="content">
                <div class="error-code">403</div>
                <div class="error-title">访问受限</div>
                <div class="error-message">
                    抱歉，您没有权限访问此页面
                    <br />
                    请检查您的登录凭证或联系管理员
                </div>
            </div>

            <div class="action-buttons">
                <van-button type="primary" round block size="large" class="primary-btn" @click="goHome">
                    返回首页
                </van-button>
                <van-button plain round block size="large" class="secondary-btn" @click="goBack">
                    返回上页
                </van-button>
            </div>

            <div class="tips">
                <div class="tip-item">
                    <span class="tip-icon">💡</span>
                    <span class="tip-text">可能原因：未登录、登录过期或无访问权限</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.forbidden-page {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    background: linear-gradient(180deg, #e8f1f8 0%, #f5f8fa 50%, #fafbfc 100%);
    overflow: hidden;
    box-sizing: border-box;
}

.forbidden-container {
    width: 100%;
    max-width: 320px;
    text-align: center;
}

/* 图标区域 */
.icon-wrapper {
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
}

.icon-bg {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
    animation: pulse 2s ease-in-out infinite;
}

.icon {
    width: 32px;
    height: 32px;
    color: #ffffff;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
    }
}

/* 内容区域 */
.content {
    margin-bottom: 14px;
}

.error-code {
    font-size: 40px;
    font-weight: 800;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 8px;
    letter-spacing: -1px;
}

.error-title {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
}

.error-message {
    font-size: 13px;
    color: #64748b;
    line-height: 1.4;
    margin: 0 auto;
    max-width: 260px;
}

/* 按钮区域 */
.action-buttons {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.primary-btn {
    height: 36px;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    border: none;
    box-shadow: 0 2px 10px rgba(30, 58, 138, 0.3);
    transition: all 0.3s ease;
}

.primary-btn:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(30, 58, 138, 0.25);
}

.primary-btn :deep(.van-button__text) {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
}

.secondary-btn {
    height: 36px;
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    color: #64748b;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
    transition: all 0.3s ease;
}

.secondary-btn:active {
    transform: scale(0.98);
    background: #f8f9fb;
}

.secondary-btn :deep(.van-button__text) {
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
}

/* 提示区域 */
.tips {
    background: #ffffff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);
    border: 1px solid rgba(37, 99, 235, 0.1);
}

.tip-item {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
}

.tip-icon {
    font-size: 16px;
    line-height: 1;
    flex-shrink: 0;
}

.tip-text {
    font-size: 11px;
    color: #64748b;
    line-height: 1.4;
}

/* 响应式优化 */
@media (max-width: 375px) {
    .forbidden-page {
        padding: 10px 12px;
    }

    .forbidden-container {
        max-width: 300px;
    }

    .icon-bg {
        width: 55px;
        height: 55px;
    }

    .icon {
        width: 28px;
        height: 28px;
    }

    .error-code {
        font-size: 36px;
    }

    .error-title {
        font-size: 16px;
    }

    .error-message {
        font-size: 12px;
    }

    .primary-btn,
    .secondary-btn {
        height: 34px;
    }

    .primary-btn :deep(.van-button__text),
    .secondary-btn :deep(.van-button__text) {
        font-size: 13px;
    }

    .tip-text {
        font-size: 10px;
    }
}

/* 更小屏幕优化 */
@media (max-height: 700px) {
    .forbidden-page {
        padding: 10px 16px;
    }

    .icon-wrapper {
        margin-bottom: 10px;
    }

    .icon-bg {
        width: 55px;
        height: 55px;
    }

    .icon {
        width: 28px;
        height: 28px;
    }

    .content {
        margin-bottom: 12px;
    }

    .error-code {
        font-size: 36px;
        margin-bottom: 6px;
    }

    .error-title {
        font-size: 16px;
        margin-bottom: 6px;
    }

    .error-message {
        font-size: 12px;
    }

    .action-buttons {
        margin-bottom: 10px;
        gap: 6px;
    }

    .primary-btn,
    .secondary-btn {
        height: 34px;
    }

    .primary-btn :deep(.van-button__text),
    .secondary-btn :deep(.van-button__text) {
        font-size: 13px;
    }

    .tips {
        padding: 8px;
    }

    .tip-text {
        font-size: 10px;
    }
}

/* 极小屏幕优化 */
@media (max-height: 600px) {
    .icon-wrapper {
        margin-bottom: 8px;
    }

    .icon-bg {
        width: 50px;
        height: 50px;
    }

    .icon {
        width: 26px;
        height: 26px;
    }

    .content {
        margin-bottom: 10px;
    }

    .error-code {
        font-size: 32px;
        margin-bottom: 5px;
    }

    .error-title {
        font-size: 15px;
        margin-bottom: 5px;
    }

    .action-buttons {
        margin-bottom: 8px;
        gap: 6px;
    }

    .primary-btn,
    .secondary-btn {
        height: 32px;
    }

    .tips {
        padding: 8px;
    }
}
</style>

