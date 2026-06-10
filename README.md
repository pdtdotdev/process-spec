# PROCESS.md

`PROCESS.md` is an open specification for executable Standard Operating Procedures (SOPs) designed for AI agents and workflow engines.

It defines a prose-first Markdown format for business processes that need to stay readable by humans while being precise enough for software to compile, validate, and execute one step at a time.

The `PROCESS.md` file stands alone. Tools, skills, schemas, and subprocesses are standard reference types; runtimes provide the registries, permissions, execution infrastructure, and audit systems around them.

## Why It Exists

Most SOPs live in wikis, PDFs, tickets, and internal docs. They explain how work should happen, but they are not directly executable. When teams automate those processes with AI, the workflow often gets moved into brittle prompt templates, hardcoded scripts, or visual state machines that are difficult for the operational owner to inspect and maintain.

`PROCESS.md` keeps the procedure in Markdown while giving runtimes a clear contract for execution:

* **Human-owned workflows:** Operators, analysts, marketers, finance teams, legal teams, and support teams can read and edit the process without learning a state-machine DSL.
* **Bounded execution:** A runtime executes the workflow as ordered steps, keeping the agent focused on the current step instead of letting it reason ahead or perform actions out of sequence.
* **Standard references:** Steps reference tools, skills, schemas, and sub-processes with structured inline references, so the runtime knows exactly what context and actions are available.
* **Runtime-enforced safety:** Security, approvals, tool permissions, and dry-run behavior are enforced by the runtime, not by natural-language requests to the model.

## The Core Idea

A conforming `PROCESS.md` file has three blocks in order:

1. **YAML frontmatter** for process metadata such as `id`, `name`, `version`, and `owner`.
2. **`# Description`** for global context, scope, constraints, and goals that apply to every step.
3. **`# Workflow`** for ordered execution steps using headings like `## Step 1: Gather Inputs`.

Each step contains normal Markdown instructions. A runtime parses the step, resolves any referenced resources through its own environment, injects the relevant context, exposes the appropriate tools, and records the result before moving to the next step.

## Reference Model

`PROCESS.md` uses inline code references to bind prose instructions to executable or reusable resources. The syntax and core reference types are standard:

* `` `skill/<id>` `` loads reusable capability guidance.
* `` `tool/<id>` `` exposes an executable tool for the current step.
* `` `schema/<id>` `` validates a structured payload or output.
* `` `process/<id>` `` invokes another process as a sub-workflow.

This keeps the workflow readable while making dependencies explicit enough for runtimes to compile, validate, authorize, and audit execution.

Specific runtimes can add their own extensions, resource loaders, and policies. A standard process can use core reference types directly without declaring a runtime.

## Execution Principles

A compliant runtime should treat a process as an ordered, inspectable execution plan:

* Parse and validate the document before execution.
* Inject the full `# Description` into each step.
* Execute only the current workflow step.
* Resolve step references before running the agent.
* Enforce tool permissions and approval gates outside the model.
* Validate structured outputs against referenced schemas.
* Preserve an audit trail of inputs, outputs, decisions, and tool calls.

The result is a standard format for operational workflows that can be read like documentation, reviewed like code, and executed by AI systems with clearer boundaries.
