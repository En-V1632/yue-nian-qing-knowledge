---
type: entity
tags: [Anthropic, AI公司, AI安全, 研究公司, Claude]
sources: [Effective harnesses for long-running agents.md, Harness design for long-running application development.md]
created: 2026-04-25
updated: 2026-04-25
---

## 公司简介

Anthropic是一家AI安全和研究公司，致力于构建可靠、可解释和可控的AI系统。

## 主要产品

### Claude模型系列

- **Claude Opus 4.5**：在长运行智能体任务中表现出色，但存在上下文焦虑问题
- **Claude Opus 4.6**：改进了规划、长时任务、大型代码库操作、代码审查和调试能力
- **Claude Sonnet 4.5**：表现出强烈的上下文焦虑，需要特殊的Harness设计

### Claude Agent SDK

- 用于构建编码代理的SDK
- 提供上下文管理能力，如压缩
- 支持多上下文窗口工作流

## 研究贡献

### Harness Engineering

Anthropic团队分享了多篇关于Harness Engineering的实践文章：

1. **Effective harnesses for long-running agents**
   - 介绍了如何让AI智能体在多个上下文窗口中有效工作
   - 提出了初始化智能体和编码智能体的两部分解决方案

2. **Harness design for long-running application development**
   - 介绍了如何设计用于长时间运行应用开发的Harness
   - 提出了三代理架构：规划器、生成器、评估器
   - 分享了生成器-评估器循环和Sprint合约的概念

### AI安全研究

- 致力于构建可靠的AI系统
- 关注AI系统的可解释性
- 推动可控的AI发展

## 相关来源

- [[2026-04-25 Effective harnesses for long-running agents]]
- [[2026-04-25 Harness design for long-running application development]]

## 相关概念

- [[Harness Engineering]]
- [[Harness设计]]
- [[长运行智能体]]
- [[生成器-评估器循环]]
