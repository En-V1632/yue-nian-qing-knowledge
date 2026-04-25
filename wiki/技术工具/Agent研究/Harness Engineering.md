---
type: concept
tags: [Harness Engineering, 编码代理, 系统设计, 控制论]
sources: [Harness engineering for coding agent users.md]
created: 2026-04-25
updated: 2026-04-25
---

## 定义

Harness Engineering是一种工程实践，旨在围绕AI代理构建编排系统（Harness），通过前馈指南和反馈传感器来引导代理，增加其首次就做对的概率，并在问题到达人类眼前之前自我纠正。

## 核心公式

**Agent = Model + Harness**

Harness是AI代理中除了模型本身以外的一切，包括：
- 系统提示
- 代码检索机制
- 编排系统
- 用户自定义的控制

## Harness的层次

### 内置Harness

- 通过系统提示、代码检索机制或复杂的编排系统实现
- 由代理的构建者提供
- 例如：Claude Agent SDK

### 用户Harness

- 用户为自己的用例和系统构建的外部Harness
- 针对特定场景定制
- 例如：AGENTS.md、Skills、自定义linter

## Harness的目标

1. **增加首次成功率**：提高代理首次就做对的概率
2. **自我纠正**：提供反馈循环，在问题到达人类眼前之前自我纠正
3. **减少审查工作量**：降低人工审查的负担
4. **提高系统质量**：通过持续的控制提升代码质量
5. **减少浪费**：减少浪费的token

## 两种执行类型

### 计算式（Computational）

- 确定性和快速
- CPU运行
- 示例：测试、linter、类型检查器、结构分析

### 推理式（Inferential）

- 语义分析、非确定性
- GPU/NPU运行
- 示例：AI代码审查、"LLM as judge"

## 核心组件

### 前馈指南（Feedforward Guides）

在代理开始工作之前提供指导：
- 编码约定（AGENTS.md、Skills）
- 引导新项目的指令
- 代码修改工具
- 架构文档

### 反馈传感器（Feedback Sensors）

在代理完成工作后进行检查：
- 结构测试
- 代码审查代理
- 静态分析
- 日志、浏览器测试

## 引导循环

- 人类通过迭代Harness来引导代理
- 当问题多次发生时，改进前馈和反馈控制
- 可以使用AI来改进Harness

## 监管类别

### 1. 可维护性Harness

- 监管内部代码质量和可维护性
- 目前最容易的Harness类型

### 2. 架构适配性Harness

- 定义和检查应用的架构特性
- 适配性函数

### 3. 行为Harness

- 指导和感知应用的功能行为
- 当前最大的挑战

## 关键洞察

1. **Harness是持续的工程实践**：不是一次性配置，而是持续改进的过程
2. **质量左移**：尽可能早地进行检查，因为越早发现问题，修复成本越低
3. **计算式vs推理式的权衡**：计算式便宜快速，推理式昂贵但提供更丰富的判断
4. **Harnessability很重要**：不是每个代码库都同样适合被Harness

## 相关来源

- [[2026-04-25 Harness engineering for coding agent users]]

## 相关概念

- [[计算式vs推理式]]
- [[引导循环]]
- [[监管类别]]
- [[Harnessability]]
- [[Harness模板]]
- [[Harness设计]]
