# Log

## [2026-04-25] init | 首次摄取MiniMax开放平台文档

- 创建来源摘要页：[[2026-04-25 概览 - MiniMax 开放平台文档中心]]
- 创建实体页：[[MiniMax]]，包含完整的模型体系介绍
- 更新wiki/index.md，添加新页面到索引和Stats统计

## [2026-04-25] ingest | 摄取OpenAI Codex工程实践文章

- 创建来源摘要页：[[2026-04-25 工程技术：在智能体优先的世界中利用 Codex]]
- 创建5个概念页：
  - [[智能体优先开发]]
  - [[规范架构]]
  - [[智能体可读性]]
  - [[渐进式披露]]
  - [[熵与垃圾收集]]
- 更新wiki/index.md，添加新页面到索引和Stats统计

## [2026-04-25] ingest | 摄取Anthropic长运行智能体实践文章

- 创建来源摘要页：[[2026-04-25 Effective harnesses for long-running agents]]
- 创建4个概念页：
  - [[长运行智能体]]
  - [[环境管理]]
  - [[增量进展]]
  - [[智能体失败模式]]
- 更新wiki/index.md，添加新页面到索引和Stats统计

## [2026-04-25] ingest | 摄取Anthropic Harness设计实践文章

- 创建来源摘要页：[[2026-04-25 Harness design for long-running application development]]
- 创建4个概念页：
  - [[Harness设计]]
  - [[生成器-评估器循环]]
  - [[上下文管理]]
  - [[Sprint合约]]
- 更新wiki/index.md，添加新页面到索引和Stats统计

## [2026-04-25] ingest | 摄取Martin Fowler Harness Engineering文章

- 创建来源摘要页：[[2026-04-25 Harness engineering for coding agent users]]
- 创建6个概念页：
  - [[Harness Engineering]]
  - [[计算式vs推理式]]
  - [[引导循环]]
  - [[监管类别]]
  - [[Harnessability]]
  - [[Harness模板]]
- 更新wiki/index.md，添加新页面到索引和Stats统计

## [2026-04-25] ingest | 摄取LangChain Harness Engineering实践文章

- 创建来源摘要页：[[2026-04-25 Improving Deep Agents with harness engineering]]
- 创建4个概念页：
  - [[自我验证]]
  - [[上下文工程]]
  - [[推理三明治]]
  - [[跟踪分析]]
- 更新wiki/index.md，添加新页面到索引和Stats统计

## [2026-04-25] lint | Wiki健康检查

- **互相矛盾的说法**：未发现明显的矛盾，但"Harness Engineering"和"Harness设计"有内容重叠
- **孤儿页面**：未发现孤儿页面，所有页面都在index.md中有入链
- **提到但缺页的实体/概念**：发现以下被引用但没有对应页面的实体：
  - [[Anthropic]]（被3篇来源提及，应创建实体页）
  - [[Claude Agent SDK]]（被2篇来源提及，应创建实体页）
  - [[OpenAI]]、[[Codex]]、[[LangChain]]等（仅被1篇来源提及，暂不创建）
- **过时信息**：未发现过时信息
- **index.md与实际文件同步**：Stats正确（来源: 6, 实体: 1, 概念: 23）
- **值得新建的汇总/对比页**：可考虑创建Harness Engineering相关概念的汇总页面

## [2026-04-25] update | 创建lint发现的缺页实体

- 创建实体页：[[Anthropic]]，包含公司简介、主要产品和研究贡献
- 创建实体页：[[Claude Agent SDK]]，包含核心功能、应用场景和技术特点
- 更新wiki/index.md，添加新页面到索引和Stats统计（实体页数: 3）

## [2026-04-25] ingest | 摄取LangChain Agent Harness解剖学文章

- 创建来源摘要页：[[2026-04-25 The Anatomy of an Agent Harness]]
- 内容涵盖Agent Harness的核心组件：文件系统、Bash+代码执行、沙盒和工具、上下文管理、长时间自主执行
- 更新wiki/index.md，添加新页面到索引和Stats统计（来源页数: 7）

## [2026-04-25] ingest | 摄取OpenAI Codex访谈文章

- 创建来源摘要页：[[2026-04-25 OpenAI's Michael Bolin on Codex, Harness Engineering, and the Real Future of Coding Agents]]
- Turing Post对OpenAI Codex技术负责人Michael Bolin的访谈，涵盖Harness定义、跨平台沙盒安全、开发者工作流变革、模型vs Harness之争
- 创建概念页：[[沙盒]]（第2篇来源提及，触发建页）
- 更新wiki/index.md，添加新页面到索引和Stats统计（来源: 8, 概念: 24）

## [2026-04-25] ingest | 摄取OPENDEV CLI编码代理论文

- 创建来源摘要页：[[2026-04-25 Building Effective AI Coding Agents for the Terminal]]
- arXiv论文，介绍OPENDEV开源CLI编码代理，涵盖复合AI架构、双智能体设计、自适应上下文压缩、自动记忆系统
- 创建概念页：[[记忆系统]]（第2篇来源提及，触发建页）
- 更新[[2026-04-25 Effective harnesses for long-running agents]]，补充记忆系统相关概念链接
- 更新wiki/index.md，添加新页面到索引和Stats统计（来源: 9, 概念: 25）

## [2026-04-25] ingest | 摄取Harness Engineering含义解析视频

- 创建来源摘要页：[[2026-04-25 What Harness Engineering Actually Means]]
- Louis-François Bouchard视频，系统厘清Prompt Engineering、Context Engineering和Harness Engineering的区别，涵盖业界案例（OpenAI、LangChain、Stripe、DataDog）
- 创建概念页：[[agents.md]]（第3篇来源提及，触发建页）
- 更新[[渐进式披露]]概念页，补充来源和相关概念链接
- 修正[[2026-04-25 Building Effective AI Coding Agents for the Terminal]]中的无效wiki-link
- 更新wiki/index.md，添加新页面到索引和Stats统计（来源: 10, 概念: 26）

## [2026-04-25] ingest | 摄取MiniMax Agent企业咨询对话

- 创建来源摘要页：[[2026-04-25 MiniMax Agent 简单指令, 无限可能]]
- MiniMax Agent企业规划咨询对话记录（26轮深度咨询），展示多轮对话、结构化分析、深度调研和文档生成能力
- 创建实体页：[[悦年轻]]，整理公司业务、团队、财务等信息
- 更新[[MiniMax]]实体页，补充MiniMax Agent产品信息和能力描述
- 更新wiki/index.md，添加新页面到索引和Stats统计（来源: 11, 实体: 4）

## [2026-04-25] 架构调整 | 从学术研究框架转为公司业务知识库

- 新目录结构：四大业务线（承制/培训/平台/发行）+ 八个共享模块（公司/行业研究/平台规则/竞品/客户/技术工具/融资/战略/财务）
- 原有Harness Engineering研究内容迁移至 `技术工具/Agent研究/`
- 原公司实体页迁移至 `公司/悦年轻.md`
- 重写 `wiki/index.md` 和 `CLAUDE.md`（v2.0）
- 删除旧目录：实体/、概念/、来源/、对比/

## [2026-04-25] lint | 发现并修复3个问题

- **孤儿页面**：0个，所有页面均有入链
- **Index同步**：2个问题已修复
  - `技术工具/index.md`：补充MiniMax.md条目
  - `公司/index.md`：补充团队/子目录链接
- **断链**：修复2个
  - `悦年轻.md`中`[[2026-04-25 悦年轻公司情况整理]]`→`[[2026-04-25 MiniMax Agent 简单指令, 无限可能]]`
  - `log.md`中`[[南京悦年轻信息技术有限公司]]`→`[[悦年轻]]`
- **待处理断链**：Agent研究模块中有约19个指向不存在实体/概念页的wiki-link（研究资料归档中的引用，非业务关键）
