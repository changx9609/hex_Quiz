# hex.coach — 六维智商与科学竞技系统

> **全栈解耦 · 极客题库 · 实时对战级体验**

## 概述

hex.coach 是一个以 6 个科学维度为核心的纯前端答题竞技系统。所有数据与逻辑在浏览器端完成，无需后端服务。

### 六维题库

| 维度 | 内容 | 题数 |
|------|------|------|
| 🌊 深海 | 海洋地理、深海生物、物理极限 | 15 题 |
| ⭐ 星空 | 天文学、黑洞、相对论、航天 | 15 题 |
| 🏆 世界之最 | 地理、生物、物理极端纪录 | 15 题 |
| 🏛️ 古文明 | 苏美尔、古埃及、玛雅、特洛伊、秦 | 15 题 |
| 🧠 智商测试 | 数列、逻辑、模式识别、空间思维 | 15 题 |
| 🤖 AI | 神经网络、Transformer、对齐、诺贝尔奖 | 15 题 |

共计 **90 道** 专业单选题，每次随机抽取 **18 题**（每维度 3 题）组成测试卷。

## 技术栈

- **HTML5** + **CSS3** (纯 CSS 动画 & 布局)
- **Tailwind CSS** (CDN 加载，辅助样式)
- **Vanilla JavaScript** (ES2020+，零依赖)
- **JSON** 静态题库（`quiz_data.json`）

## 项目结构

```
hex_Quiz/
├── index.html        # 单页应用入口
├── quiz_data.json    # 静态题库（6维 × 15题）
└── README.md         # 本文档
```

## 核心功能

1. **智能组卷** — 每维度随机抽 3 题，全局打乱，保证每次测试不重复
2. **15 秒倒计时** — 动态计时条，最后 35% 变红预警，超时自动判错
3. **即时反馈** — 点击后立即判定对错（绿色=正确，红色=错误），同时弹窗显示硬核冷知识解析
4. **冷知识解析** — 每题包含 100 字以内的硬核科普，答对答错皆可学习
5. **维度成绩** — 结果页展示各维度正确率，精准定位知识短板

## 运行方式

直接打开 `index.html` 即可运行（需要网络加载 Tailwind CSS CDN）：

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

或使用本地服务器（推荐以获得 best JSON fetch 体验）：

```bash
# Python 3
python -m http.server 8000
# 然后打开 http://localhost:8000

# Node.js
npx serve .
```

## 扩展指南

### 添加题目
编辑 `quiz_data.json`，在对应维度的 `questions` 数组中添加新条目：

```json
{
  "id": "dimension_06",
  "question": "题目文本",
  "options": ["选项A", "选项B", "选项C", "选项D"],
  "answer": 0,
  "explanation": "100字以内硬核解析"
}
```

### 添加新维度
在 `quiz_data.json` 的 `dimensions` 数组中添加新对象，并提供 5+ 道题目即可自动生效。

### 修改计时
编辑 `index.html` 中 `startTimer` 函数的 `duration` 变量（单位毫秒）。

## 许可证

MIT © hex.coach