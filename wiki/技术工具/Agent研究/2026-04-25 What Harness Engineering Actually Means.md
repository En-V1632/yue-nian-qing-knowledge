---
type: source
tags: [Harness Engineering, 上下文工程, 渐进式披露, 长运行智能体, 记忆系统, 自我验证, 引导循环, agents.md]
sources: [What Harness Engineering Actually Means.md]
author: What's AI by Louis-François Bouchard
created: 2026-04-25
updated: 2026-04-25
---

[[raw/What Harness Engineering Actually Means]]

## 主要内容

本文是Louis-François Bouchard的YouTube视频，系统性地厘清了Prompt Engineering、Context Engineering和Harness Engineering三者的区别，并阐述了Harness Engineering为何在当前成为行业焦点。

## 关键要点

### 三者的区别

**Prompt Engineering（提示工程）**：问什么——给模型的指令内容

**Context Engineering（上下文工程）**：给模型看什么——使任务在给定时刻对模型而言可解。包括：
- 什么信息应在上下文窗口中
- 什么应被检索
- 什么应被摘要
- 什么应被驱逐

**Harness Engineering（Harness工程）**：整个系统如何运作——模型周围的基础设施。包括：
- 工具、权限、状态
- 测试、日志、重试、检查点
- 护栏、审查、评估
- Harness决定何时加载上下文、哪些工具可用、哪些操作被允许、失败如何处理

**核心比喻**：模型是引擎，上下文是燃料和仪表盘，Harness是其余的一切——转向、刹车、车道边界、维护计划、警告灯。

### 为何现在成为焦点

- 代理变得足够有用但不够可靠：能写代码、调工具、执行长任务，但也会自信地重复犯同样的错误
- **Karpathy的反转**：工作流从"主要手动编码+少量代理辅助"转变为"主要代理驱动编码+少量手动编辑"
- 代理变得有用的同时也变得危险——需要Harness来约束

### Harness Engineering的实践

**Mitchell Hashimoto的贡献**（2026年2月命名）：
- 每次代理犯错，不只是希望下次更好，而是**工程化环境**使其无法以同样方式犯错
- 基于实际错误行为改进agents.md
- 添加脚本、linters、检查和工具让代理自我验证
- **心态转变**：将负担从"等待下一个模型发布"转移到"构建者自己改进"

**自定义Skill文件的实践**：
- 在Skill文件末尾添加反思步骤：回顾整个交互，理解用户喜欢/编辑/不喜欢的内容
- 让代理花费时间寻找更好的任务执行方式
- 发现好方法后更新Skill文件
- 节省大量token和时间，Skill文件随时间越来越好

### 业界案例

- **OpenAI**：内部产品约100万行代码，零手动编写源码
- **Claude Code**：所有代码都由Claude Code自身推送
- **LangChain**：仅改变Harness（不换模型）将编码代理从Terminal Bench 2.0排行榜30名外提升到前5
- **Stripe**：代理每周产出超1000个合并PR，在隔离环境中运行，有严格CI限制和升级规则
- **DataDog**：将生产遥测作为Harness的一部分——性能回退信号自动回到循环中

### 渐进式披露的重要性

- 如果把整个公司的知识一次性倒入agents.md，代理不会变聪明，反而会变差
- 更多噪声 → 更多Context Rot → 更多内容被静默忽略
- **更好的模式**：前面放简短的地图，深层真相源仅在需要时拉取
- Harness决定展示什么表面、何时展示，而非把上下文窗口当垃圾场

### Harness的挑战

- **Harness深度**：Harness本身成为有自己bug和漂移的产品
- **记忆仍然会出错**，验证仍然会遗漏，工具使用仍然有安全风险
- **人类注意力成为真正稀缺资源**：代理生成的输出远超人类能仔细审查的量
- 需要构建**安全失败的环境**和能告诉我们为何出错的追踪

### 未来方向

- 未来不是"一个天才模型做所有事"，而是**模型在精心设计的环境中运行**
- 更多价值来自编排、约束和反馈循环，而非提示和模型
- 程序员的工作在**转移**而非消失：更少逐行编码，更多设计代理能有用工作而不破坏一切的"栖息地"

## 相关实体

- [[What's AI by Louis-François Bouchard]]
- [[LangChain]]
- [[Anthropic]]
- [[OpenAI]]

## 相关概念

- [[Harness Engineering]]
- [[上下文工程]]
- [[渐进式披露]]
- [[长运行智能体]]
- [[记忆系统]]
- [[自我验证]]
- [[引导循环]]
- [[上下文管理]]
