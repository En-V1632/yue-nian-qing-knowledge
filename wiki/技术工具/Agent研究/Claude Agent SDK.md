---
type: entity
tags: [Claude Agent SDK, Anthropic, 编码代理, SDK]
sources: [Effective harnesses for long-running agents.md, Harness design for long-running application development.md]
created: 2026-04-25
updated: 2026-04-25
---

## 简介

Claude Agent SDK是Anthropic开发的用于构建编码代理的SDK。它提供了强大的上下文管理能力和编排功能，支持智能体在复杂任务中的执行。

## 核心功能

### 上下文管理

- **压缩（Compaction）**：将对话的早期部分就地摘要，使智能体可以在缩短的历史上继续工作
- **自动压缩**：处理上下文增长，保持智能体在同一会话中工作

### 编排能力

- 支持多上下文窗口工作流
- 提供结构化的交接机制
- 支持智能体在长时间任务中的持续工作

### 工具集成

- 支持多种工具，如bash、文件操作、浏览器自动化
- 可以与Playwright MCP等工具集成
- 支持git等开发工具

## 应用场景

### 长运行智能体

- 支持智能体在多个上下文窗口中工作
- 通过压缩和重置机制管理上下文
- 实现长时间任务的持续执行

### 全栈开发

- 支持React、Vite、FastAPI等技术栈
- 可以构建完整的Web应用
- 支持自动化测试和验证

### Harness Engineering

- 作为Harness的核心组件
- 支持前馈指南和反馈传感器的集成
- 实现引导循环和监管机制

## 技术特点

### 内置Harness

- 通过系统提示、代码检索机制或复杂的编排系统实现
- 由代理的构建者提供
- 为用户提供基础的代理功能

### 用户Harness

- 用户可以在此基础上构建自己的Harness
- 支持自定义系统提示、工具和中间件
- 允许针对特定场景进行优化

## 相关来源

- [[2026-04-25 Effective harnesses for long-running agents]]
- [[2026-04-25 Harness design for long-running application development]]

## 相关概念

- [[Harness Engineering]]
- [[长运行智能体]]
- [[上下文管理]]
- [[Anthropic]]
