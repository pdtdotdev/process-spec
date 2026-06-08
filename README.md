# PROCESS.md Specification & Reference Project

`PROCESS.md` is an open standard for **executable Standard Operating Procedures (SOPs)** designed for AI agents. 

This repository contains the official core specification, a Mintlify documentation site, and a conforming example workspace showcasing how the standard integrates processes, skills, tools, and validation schemas.

---

## 1. Project Philosophy

Standard Operating Procedures (SOPs) are instructions for running a business. While historically written for humans (in wikis or PDFs), modern organizations need these workflows to be executed directly by AI agents.

Usually, developers hardcode these flows inside python pipelines or complex state machine builders. This creates a disconnect between the operational teams who understand the business logic and the systems executing it.

`PROCESS.md` bridges this gap:
* **Prose-First:** Procedures are authored in clean, readable Markdown, making them editable by any business owner and easily tracked via Git.
* **Bounded Steps:** The compiler splits the document into isolated execution steps, ensuring the agent doesn't "reason ahead" or trigger side effects out of turn.
* **Explicit Security Gates:** Unlike prompts, security parameters are specified in workspace configurations (`pdt.yaml`) and enforced by the execution engine, not by asking the model nicely.

---

## 2. Directory Map

The repository is structured as follows:

```text
/
├── README.md                          # Main repository overview and quickstart
├── LICENSE                            # MIT License file
├── spec/
│   └── v0.1.0.md                      # Core specification document (v0.1.0)
├── docs/
│   ├── mint.json                      # Mintlify configuration
│   ├── introduction.mdx               # Overview documentation
│   ├── specification.mdx              # Formatted specification guide
│   └── examples.mdx                   # Examples walk-through page
└── examples/
    └── company_ops/                   # Conforming sample workspace
        ├── pdt.yaml                   # Global project config
        ├── processes/
        │   ├── growth_experiment_review/
        │   │   └── PROCESS.md
        │   └── marketing_launch_readiness/
        │       └── PROCESS.md
        ├── skills/
        │   ├── experiment-analysis/
        │   │   └── SKILL.md
        │   └── positioning-review/
        │       └── SKILL.md
        ├── tools/
        │   ├── experiment_lookup/
        │   │   ├── tool.yaml
        │   │   └── main.py
        │   └── campaign_asset_lookup/
        │       ├── tool.yaml
        │       └── index.js
        └── schemas/
            └── experiment-review.schema.json
```

---

## 3. Core Specification at a Glance

A `PROCESS.md` file contains three blocks in exact order:
1. **YAML Frontmatter:** Defines metadata: `id`, `name`, `version`, and `owner`.
2. **`# Description` Section:** Global rules, scope, and context injected into every step's prompt.
3. **`# Workflow` Section:** Ordered steps (`## Step <N>: <Name>`) containing execution instructions.

### Reference Resolution Schema
Runtimes parse the workflow for inline ticks `` `type/id` `` and resolve them relative to paths defined in `pdt.yaml`:
* **`` `skill/<id>` ``** $\rightarrow$ Reusable capability guidelines (e.g., `skills/<id>/SKILL.md`).
* **`` `tool/<id>` ``** $\rightarrow$ Executable tool manifest (e.g., `tools/<id>/tool.yaml`).
* **`` `schema/<id>` ``** $\rightarrow$ JSON Schema payload contract (e.g., `schemas/<id>.schema.json`).
* **`` `process/<id>` ``** $\rightarrow$ Sub-process workflow call (e.g., `processes/<id>/PROCESS.md`).

---

## 4. Quickstart: Building a Workspace

To implement a `PROCESS.md` compliant workspace in your system:

### Step A: Initialize `pdt.yaml`
Define the paths mapping and permitted tools in your workspace root:
```yaml
project:
  id: company_ops
  name: Company Operations Workflows
paths:
  processes: ./processes
  skills: ./skills
  tools: ./tools
  schemas: ./schemas
tools:
  allow:
    - experiment_lookup
```

### Step B: Author a Process
Create `processes/my_process/PROCESS.md`:
```markdown
---
id: my_process
name: My Automated Procedure
version: 1.0.0
owner: engineering
---
# Description
Rules governing this execution.

# Workflow
## Step 1: Look Up Data
Fetch data using `tool/my_tool`.
```

### Step C: Execute in Dry Run
Most compliant runtimes support a dry-run flag to compile and validate the process tree without triggering tools that write or execute external actions:
```bash
# Example command using a compliant pdt-cli
pdt compile --workspace ./examples/company_ops --process growth_experiment_review
```

---

## 5. Documentation Server

This repository's documentation is optimized for [Mintlify](https://mintlify.com). 

To run the documentation server locally:
1. Install the Mintlify CLI:
   ```bash
   npm i -g mintlify
   ```
2. Navigate to the `docs/` directory and start the server:
   ```bash
   mintlify dev
   ```

---

## 6. License
This project is licensed under the MIT License - see the [LICENSE](file:///Users/chris/Documents/GitHub/process-spec/LICENSE) file for details.
