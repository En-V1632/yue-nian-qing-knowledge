# Wiki Schema — 悦年轻知识库

> 这是 Claude 的行为配置文件（Schema）。它定义了这个知识库的结构、约定和工作流。
> 每次会话开始时，Claude 应先阅读此文件，再阅读 `wiki/index.md`，再开始工作。

---

## 仓库结构

```
En_V/
├── CLAUDE.md              ← 本文件：Schema 配置
├── .gitignore             ← Git 忽略配置
├── raw/                   ← 原始资料层（只读，不可修改）
│   └── 素材/              ← 文章内嵌图片的本地存储
├── wiki/                  ← 知识库层
│   ├── index.md           ← 总索引
│   ├── log.md             ← 操作日志（仅追加）
│   ├── 承制/              ← 承制业务线
│   ├── 培训/              ← 培训业务线
│   ├── 平台/              ← 平台业务线
│   ├── 发行/              ← 发行业线
│   ├── 公司/              ← 公司信息、团队架构
│   ├── 行业研究/          ← 行业趋势、市场规模、政策法规
│   ├── 平台规则/          ← 抖音/TikTok/红果等平台规则
│   ├── 竞品/              ← 竞争对手档案
│   ├── 客户/              ← 客户信息与商务管理
│   ├── 技术工具/          ← AI工具、工作流、Prompt、Agent研究
│   ├── 融资/              ← 融资进展、投资人沟通
│   ├── 战略/              ← 战略规划、OKR、决策记录
│   └── 财务/              ← 预算、成本、收入、利润
└── scripts/               ← 同步脚本（自动执行）
    ├── config.js          ← 同步配置
    ├── sync-feishu.js     ← 飞书知识库同步
    ├── sync-volcengine.js ← 火山引擎知识库同步
    └── utils/             ← 工具函数
```

### 层级规则

| 层级 | 目录 | 谁可以修改 |
|------|------|-----------|
| 原始资料 | `raw/` | **只有用户**，Claude 只读 |
| 知识库 | `wiki/` | Claude 和用户均可修改 |
| Schema | `CLAUDE.md` | 用户和 Claude 共同演进 |

---

## 页面类型与 Frontmatter

### 业务线页面

```yaml
---
type: 业务
business: 承制 | 培训 | 平台 | 发行
tags: [标签1, 标签2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### 行业研究页面

```yaml
---
type: 行业研究
tags: [AI短剧, 趋势, 具体标签]
source: 来源URL或文件名
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### 竞品页面

```yaml
---
type: 竞品
tags: [竞品, 具体标签]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### 客户页面

```yaml
---
type: 客户
tags: [客户, 平台方/MCN/发行]
status: 洽谈中 | 合作中 | 已结束
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### 技术工具页面

```yaml
---
type: 技术
tags: [AI工具, 工作流, 具体标签]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### 融资页面

```yaml
---
type: 融资
tags: [融资, 投资人, 具体标签]
status: 洽谈中 | 已close
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### 战略/决策页面

```yaml
---
type: 战略
tags: [战略, OKR, 具体标签]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### 财务页面

```yaml
---
type: 财务
tags: [财务, 月报/年报]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### 公司页面

```yaml
---
type: 公司
tags: [公司, 具体标签]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

---

## 交叉引用

- 页面间用 Obsidian Wiki-link：`[[页面名]]`
- 提到的其他页面应链接到对应页面
- 来源摘要页顶部链接对应的 raw 文件：`[[raw/文件名]]`

---

## 工作流

### 1. Ingest（摄取新资料）

当用户说"摄取 XXX"或"处理 XXX"时：

1. **阅读** `raw/` 中的目标文件
2. **讨论** 与用户确认关键要点和归档位置
3. **创建**对应目录下的摘要/分析页
4. **更新**相关模块的 index.md
5. **追加** `wiki/log.md`：格式 `## [YYYY-MM-DD] ingest | 标题`

### 2. 新增信息

当用户说"添加 XX"或"记录 XX"时：

1. **确认**信息类型和存放位置
2. **创建**对应页面
3. **更新**所在目录的 index.md
4. **追加** `wiki/log.md`

### 3. 查询

当用户提问时：

1. **阅读** `wiki/index.md` 找到相关模块
2. **深入**阅读相关页面
3. **综合**生成回答
4. **追加** `wiki/log.md`：格式 `## [YYYY-MM-DD] query | 问题简述`

### 4. Lint（健康检查）

当用户说"检查 wiki"或"lint"时：

- [ ] 有无**孤儿页面**（没有任何入链）
- [ ] 有无**提到但缺页**的链接目标
- [ ] 有无**过时信息**
- [ ] 各模块 index.md 是否与实际文件同步

追加日志：`## [YYYY-MM-DD] lint | 发现 N 个问题`

---

## Log 格式

```markdown
## [YYYY-MM-DD] 操作类型 | 标题

- 操作说明 bullet 1
- 操作说明 bullet 2
```

操作类型：`ingest` / `新增` / `query` / `lint` / `update` / `架构调整`

---

### 5. 多端同步（Sync）

知识库通过 Git + 飞书/火山引擎实现多端同步：

- **多设备**：通过 `obsidian-git` 插件同步到 GitHub 私有仓库
- **飞书/火山**：通过 `scripts/sync-feishu.js` 和 `scripts/sync-volcengine.js` 定时同步
- **冲突处理**：双向同步时出现冲突，标记文件等待人工确认

同步配置：`scripts/config.js`

---

## 图片处理

- 原始资料中的图片下载到 `raw/素材/` 目录
- wiki 页面引用图片用：`![[素材/图片名.png]]`

---

*Schema 版本：v2.0 — 2026-04-25*（架构调整：从学术研究框架转为公司业务知识库）
