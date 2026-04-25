---
type: source
tags: [Codex, OpenAI, Harness Engineering, 沙盒, 安全, 工具编排, 上下文工程, agents.md, 多智能体]
sources: [OpenAI's Michael Bolin on Codex, Harness Engineering, and the Real Future of Coding Agents.md]
author: Turing Post
created: 2026-04-25
updated: 2026-04-25
---

[[raw/OpenAI's Michael Bolin on Codex, Harness Engineering, and the Real Future of Coding Agents]]

## 主要内容

本文是Turing Post对OpenAI Codex技术负责人Michael Bolin的访谈记录，深入讨论了编码代理中Harness的角色、沙盒安全、开发者工作流变革，以及模型与Harness孰轻孰重的问题。

## 关键要点

### Harness的定义与角色

- **Harness = 代理循环（Agent Loop）**：调用模型、采样响应、提供上下文、接收工具调用并执行
- Michael Bolin持中间立场：模型将主导体验，但Harness让代理发挥最佳能力
- Codex团队追求**尽可能小而精的Harness**：给予少量极其强大的工具，而非大量专用工具
- 与某些代理不同，Codex没有显式的"读取文件"工具——而是给模型一个终端，让它用cat、sed等命令自行读取

### 安全与沙盒

- **安全（Security）与安全性（Safety）的区别**：
  - 安全：沙盒层面，限制可读写的文件夹等（Harness负责）
  - 安全性：确保模型建议的工具调用本身是安全的（模型/后端负责）
- **跨平台沙盒方案**：
  - macOS：seatbelt（系统内置）
  - Linux：bubblewrap + seccomp + landlock
  - Windows：自研沙盒（代码在开源仓库中）
- 沙盒是**替代人工在环的重要手段**：约束代理的探索空间，而非依赖人类逐一审批

### Codex的增长与产品形态

- 自年初以来使用量增长5倍
- 2025年4月随o3/o4-mini发布，8月GPT-5发布后真正起飞
- **产品线**：CLI → VS Code扩展（超越CLI使用量）→ JetBrains/Xcode → Codex App
- **Codex App**：全新的"任务控制"界面，并行管理多个对话，可浏览diff、打开终端

### 开发者工作流变革

- **吞吐量**：并行推进多个工作流，Michael个人有5个Codex仓库克隆
- **上下文切换**：会议间隙发送消息推动任务进展
- **优化新内循环**：将重复工作转化为Skill，与团队分享
- **代码审查**：Codex本身也承担大量代码审查工作

### 为AI代理编写代码库和文档

- **重新发现最佳实践**：文档、测试驱动开发等长期存在的最佳实践，在代理优先的世界中变得"明确值得做"
- **agents.md**：写入代理需要知道但不易从代码中推断的信息（如如何运行测试、哪些测试更重要）
- **AGI构建理念**：让代理自行决策，而非给予过多指令；避免与源码平行的、可能过时的文档
- 保持agents.md适度，不过度规定

### 上下文工程

- 大多数情况下内容来自agents.md + 用户提示 + 文件引用 + GitHub访问
- 关键原则：告知代理**有哪些工具可用**，但不规定解决问题的最佳方式
- **太多上下文确实有害**：好的文件/文件夹命名比大量上下文注入更重要
- 当工具输出过大（如1GB）时，倾向于让代理自行决定写入文件后grep，而非强行管理上下文窗口

### 模型 vs Harness

- **追求小Harness**：给予代理"一台计算机"和少量强大工具，让它自行探索
- 唯一的妥协是安全/沙盒方面——这是重要的后备防线
- 避免"Harness作者比模型更聪明"的陷阱：不通过特殊工具强行管理上下文窗口
- 训练时纠正优于推理时人工干预：让模型更智能，而非在Harness中打补丁

### 多智能体与未来方向

- 未来将扩展到多智能体、子代理、跨机器通信
- **记忆系统**：每次对话从零开始的模式正在改变，实验性记忆功能正在开发
- **上下文连接器**：从本机任务扩展到发送邮件、创建文档等操作
- **更少但更强大的工具**：找到正确的原语集合是持续的探索方向

## 相关实体

- [[OpenAI]]
- [[Michael Bolin]]
- [[Codex]]
- [[Turing Post]]

## 相关概念

- [[Harness Engineering]]
- [[沙盒]]
- [[工具编排]]
- [[上下文工程]]
- [[agents.md]]
- [[多智能体系统]]
- [[记忆系统]]
