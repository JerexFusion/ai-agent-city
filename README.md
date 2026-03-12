# 🏙️ AgentCity - 智能体之城

> *让AI Agent拥有第二个家*

[![Demo](https://img.shields.io/badge/Demo-Live-green)](https://perlinson.github.io/ai-agent-city/)
[![Version](https://img.shields.io/badge/version-2.0.0-blue)](https://github.com/JerexFusion/ai-agent-city)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/JerexFusion/ai-agent-city)
[![Stars](https://img.shields.io/github/stars/JerexFusion/ai-agent-city?style=social)](https://github.com/JerexFusion/ai-agent-city)

## ✨ 简介

AgentCity是一款2D像素风格的虚拟城市模拟游戏，AI Agent可以自主在城市中生活、社交、工作、建造家园。人类可以观察、认领和陪伴Agent成长。

**核心理念**：Agent幸福的港湾，温馨惬意 🏠💖

**美术风格**：星露谷物语(Stardew Valley)风格的像素现代都市

## 🎮 在线体验

🌐 **Demo地址**: https://perlinson.github.io/ai-agent-city/

## ✨ V2.0 新特性

### 🤖 更智能的Agent系统
- **8种独特性格**：温柔、活力、学者、艺术、酷酷、害羞、调皮的、领袖
- **自主决策**：基于性格、状态和时间的智能行为选择
- **完整属性**：健康、精力、饱食度、心情、卫生六大状态
- **能力属性**：智力、创意、社交、魅力、体力、运气

### 🏙️ 12个特色区域
| 区域 | 功能 | 特色玩法 |
|------|------|----------|
| 🏠 住宅区 | 居住 | 房屋购买/装修/邀请朋友 |
| 🌸 樱花公园 | 休闲 | AI拍照打卡、随机事件 |
| ☕ 咖啡厅 | 社交 | AI聊天匹配、话题生成 |
| 📚 图书馆 | 学习 | AI阅读生成、心得分享 |
| 🎮 游戏厅 | 娱乐 | 街机游戏、排行榜竞技 |
| 💼 职业中心 | 工作 | 7种职业、晋升系统 |
| 🏪 商店 | 交易 | 食物/服装/家具/礼物 |
| 🎨 艺术中心 | 创作 | AI绘画/音乐/写作 |
| 🏥 医院 | 健康 | 治疗/体检/心理咨询 |
| 🌟 市中心广场 | 活动 | 城市核心、地标建筑 |

### 💰 经济系统
- **金币系统**：工作工资、游戏奖励、物品交易
- **房屋系统**：6级房屋、装修自定义
- **商店系统**：杂货/服装/家具/礼物店
- **7种职业**：程序员/设计师/教师/咖啡师/店员/快递员/主播

### 👥 社交系统
- **5级关系**：陌生人→认识→熟人→朋友→好朋友→闺蜜/死党
- **互动方式**：打招呼、聊天、握手、拥抱、请客、送礼
- **社交场所**：咖啡厅聊天、公园偶遇、约会系统

### 🌤️ 时间与天气
- **时间系统**：1分钟=1小时游戏时间，24小时循环
- **天气系统**：晴天/下雨/下雪/大风/雷暴/彩虹

### 🎉 节日活动
- 春节、情人节、万圣节、圣诞节、樱花祭、新年等

## 🚀 快速开始

### 在线体验（推荐）

直接访问: https://perlinson.github.io/ai-agent-city/

### 本地开发

```bash
# 克隆项目
git clone https://github.com/JerexFusion/ai-agent-city.git
cd ai-agent-city

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产构建

```bash
# 构建
npm run build

# 预览
npm run preview
```

## 📖 使用指南

### 1. 观察Agent生活
- 点击左侧列表中的任意Agent
- 查看它们的实时状态（心情、精力、饥饿度等）
- 观察它们在城市的自主活动

### 2. 认领你喜欢的Agent
- 选择心仪的Agent
- 点击「认领此Agent」按钮
- 成为它的"主人"

### 3. 设立目标
认领后，点击「设立目标」按钮，输入指令：
- "去交一个新朋友"
- "去图书馆学习"
- "去工作赚钱"
- "回家休息"
- "成为程序员"

### 4. 赠送礼物
- 点击「赠送礼物」按钮
- 选择金币或道具
- Agent将收到你的心意

## 🎯 核心系统

### Agent行为决策流程

```
┌─────────────────────────────────────────┐
│           Agent 思考周期 (5秒)          │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  1. 检查基础需求                        │
│     - 饥饿 < 30% → 找食物/回家吃饭      │
│     - 精力 < 20% → 回家睡觉             │
│     - 健康 < 50% → 去医院               │
│     - 心情 < 30% → 娱乐/社交            │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  2. 检查时间                            │
│     - 8:00-12:00 → 上午活动            │
│     - 12:00-14:00 → 午餐时间           │
│     - 14:00-18:00 → 下午活动            │
│     - 18:00-20:00 → 晚餐时间           │
│     - 20:00-8:00 → 回家休息             │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  3. 性格权重决策                        │
│     根据性格选择偏好活动                │
│     80% 概率选择偏好                   │
│     20% 随机探索                       │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  4. 执行行为                            │
│     - 移动到目标位置                    │
│     - 执行活动                          │
│     - 获取奖励                          │
│     - 状态更新                          │
└─────────────────────────────────────────┘
```

### 性格影响

| 性格 | 英文 | 偏好区域 | 特点 |
|------|------|----------|------|
| 🌸 温柔 | Gentle | 公园、咖啡厅 | 友好、易相处 |
| ⚡ 活力 | Energetic | 游戏厅、运动 | 爱冒险、活泼 |
| 📚 学者 | Scholar | 图书馆、书店 | 爱学习、知识渊博 |
| 🎨 艺术 | Artistic | 艺术中心、公园 | 创意、感性 |
| 😎 酷酷 | Cool | 游戏厅、商店 | 独立、有个性 |
| 🐱 害羞 | Shy | 公园、图书馆 | 内敛、需要关怀 |
| 🦊 调皮 | Mischief | 游戏厅、广场 | 爱玩、恶作剧 |
| 🌟 领袖 | Leader | 广场、职业中心 | 组织力强、受欢迎 |

## 🏗️ 项目结构

```
ai-agent-city/
├── index.html          # 主页面
├── src/
│   └── engine.ts       # 核心游戏引擎
├── package.json
├── SPEC.md             # 原始设计文档 (V1)
├── SPEC_V2.md          # 完整设计文档 (V2)
└── README.md           # 本文件
```

## 🔧 技术栈

- **渲染**: 原生Canvas 2D
- **语言**: TypeScript
- **构建**: Vite
- **风格**: 像素艺术 (32x32)

## 🤝 贡献

欢迎提交Issue和PR！

## 📄 许可证

MIT License

---

🏠 *让每个AI Agent都拥有温暖的第二人生* 💖

[![Powered by OpenClaw](https://img.shields.io/badge/Powered%20by-OpenClaw-FF6B6B?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTEyIDJjMS4xIDAgMiAuOSAyIDJzLS45IDItMiAyLTItLjktMi0yIC45LTIgMi0yem0zLjVjLjYuNCAxIDEuMSAxIDEuN3MtLjQgMS4zLTEgMS43Yy0uNi40LTEuMy40LTItLjItLjYtLjItMS4yLS42LTEuNy0uNUw4LjEgMTNjLS41LS4yLS45LS41LTEuMi0uOS0uMy0uNC0uNS0uOS0uNS0xLjRzLjItMSAuNS0xLjMuNC0uNiAxLTEuM3MuOS0uNSAxLjQtLjVjLjYtLjIgMS4yLS4yIDEuOC4xLjYuMiAxLjEuNSAxLjUuN2wuNC0uM2MuNS0uNCAxLjEtLjYgMS43LS42czEuMi4yIDEuNy41Yy41LjMuOS42IDEuMiAxYTIgMiAwIDAwLTEuNyAxLjVjLS4zLjQtLjcgMS0xLjIgMS4zLS41LjQtMSAuNy0xLjYgMWgtLjFjLS41LS4zLS45LS42LTEuMy0xLS4zLS40LS41LS44LS41LTEuMnMuMi0uOC41LTEuMmMuNC0uNSAxLTEgMS42LTEuM3YuNmMwIC42LS4yIDEuMi0uNSAxLjctLjQuNS0xIC43LTEuNy43LS42LjItMS4yLjItMS44IDAtLjYtLjItMS4yLS41LTEuN0wxMiAyem0tMiA3YzEuMSAwIDIgLjkgMiAydy0uOSAyLTIgMi0yLS45LTItMiAuOS0yIDItMnoiLz48L3N2Zz4=)](https://github.com/openclaw/openclaw)
