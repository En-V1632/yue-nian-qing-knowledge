# Agent研究

AI代理（Agent）工程研究资料，包括Harness Engineering、上下文管理、编码代理等。

## 来源文章

| 页面 | 简介 | 更新 |
|------|------|------|
| [[2026-04-25 概览 - MiniMax 开放平台文档中心]] | MiniMax模型体系概览，涵盖文本、语音、视频、图像与音乐五大方向 | 2026-04-25 |
| [[2026-04-25 工程技术：在智能体优先的世界中利用 Codex]] | OpenAI团队分享的关于使用Codex构建完全由智能体编写的软件产品的经验 | 2026-04-25 |
| [[2026-04-25 Effective harnesses for long-running agents]] | Anthropic团队分享的关于如何让AI智能体在多个上下文窗口中有效工作的实践经验 | 2026-04-25 |
| [[2026-04-25 Harness design for long-running application development]] | Anthropic团队分享的关于如何设计用于长时间运行应用开发的Harness的实践经验 | 2026-04-25 |
| [[2026-04-25 Harness engineering for coding agent users]] | Martin Fowler网站文章，介绍Harness Engineering概念框架 | 2026-04-25 |
| [[2026-04-25 Improving Deep Agents with harness engineering]] | LangChain团队分享的关于如何通过Harness Engineering改进编码代理的实践经验 | 2026-04-25 |
| [[2026-04-25 The Anatomy of an Agent Harness]] | LangChain团队分享的关于Agent Harness解剖学的文章 | 2026-04-25 |
| [[2026-04-25 OpenAI's Michael Bolin on Codex, Harness Engineering, and the Real Future of Coding Agents]] | Turing Post对OpenAI Codex技术负责人Michael Bolin的访谈 | 2026-04-25 |
| [[2026-04-25 Building Effective AI Coding Agents for the Terminal]] | arXiv论文，介绍OPENDEV开源CLI编码代理 | 2026-04-25 |
| [[2026-04-25 What Harness Engineering Actually Means]] | Louis-François Bouchard视频，系统厘清三种Engineering的区别 | 2026-04-25 |
| [[2026-04-25 MiniMax Agent 简单指令, 无限可能]] | MiniMax Agent企业规划咨询对话记录 | 2026-04-25 |

## 实体

| 页面 | 简介 |
|------|------|
| [[Anthropic]] | AI安全和研究公司，开发Claude Agent SDK和Claude模型系列 |
| [[Claude Agent SDK]] | Anthropic开发的用于构建编码代理的SDK |
| [[MiniMax]] | AI模型提供商，提供多模态AI模型服务和MiniMax Agent智能助手 |

## 概念

| 页面 | 简介 |
|------|------|
| [[Harness Engineering]] | 围绕AI代理构建编排系统的工程实践 |
| [[Harness设计]] | 围绕AI智能体构建的编排系统 |
| [[Harnessability]] | 代码库适合被Harness驾驭的程度 |
| [[Harness模板]] | 针对常见服务拓扑预配置的Harness捆绑包 |
| [[计算式vs推理式]] | Harness Engineering中两种执行类型 |
| [[引导循环]] | 人类通过迭代Harness来引导代理 |
| [[监管类别]] | 根据Harness要调节的内容对Harness进行分类 |
| [[上下文工程]] | 为代理准备和交付上下文的工程实践 |
| [[上下文管理]] | 管理代理上下文窗口的策略和技术 |
| [[渐进式披露]] | 让代理从小切入点开始逐步发现更深层信息 |
| [[记忆系统]] | 让AI代理跨会话积累和保留项目知识 |
| [[agents.md]] | 放置在代码仓库的指导文件，为代理提供项目知识 |
| [[沙盒]] | 为AI代理提供安全、隔离执行环境的机制 |
| [[自我验证]] | 代理通过测试和验证自主改进其工作 |
| [[长运行智能体]] | 能在多个上下文窗口中持续工作的AI智能体 |
| [[环境管理]] | 为长运行智能体设置和维护开发环境 |
| [[增量进展]] | 让智能体每个会话只处理一个功能 |
| [[智能体失败模式]] | AI智能体执行任务时的常见问题模式 |
| [[智能体优先开发]] | 将AI智能体作为代码编写主力的开发方法论 |
| [[智能体可读性]] | 针对AI智能体优化代码库的可读性 |
| [[规范架构]] | 通过强制执行不变量使智能体快速交付 |
| [[推理三明治]] | 在规划和验证阶段使用更多推理计算的策略 |
| [[熵与垃圾收集]] | 通过循环清理流程管理代码库中的熵 |
| [[生成器-评估器循环]] | 受GAN启发的多代理架构 |
| [[Sprint合约]] | 生成器和评估器之间关于"完成"的协议 |
| [[跟踪分析]] | 通过分析代理运行的跟踪记录改进Harness |
