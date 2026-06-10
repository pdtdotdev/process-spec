---
id: growth_experiment_review
name: Growth Experiment Review and Analysis
version: 0.1.0
owner: growth-ops
status: active
description: Analyzes completed product growth experiments and updates downstream spreadsheets.
tags: [growth, analytics, operations]
---

# Description

This process governs the weekly ingestion, verification, analysis, and archiving of product growth experiments.
It ensures that all experiment metrics conform to statistical standards and are correctly documented in the central database.

## Scope
- Applies to all A/B, multivariate, and split tests conducted on web, mobile, and desktop applications.
- Includes telemetry data validation and statistical significance evaluations.
- Excludes backend infrastructure experiments that do not impact user behavior.

## Pre-conditions
- The experiment must have completed execution (i.e., status in telemetry must be "completed").
- Telemetry data must be fully compiled.

## Expected Outcomes
- An analyzed and validated experiment report.
- A structured JSON result summary.

---

# Workflow

## Step 1: Retrieve Experiment Metadata
Retrieve the raw experiment metrics and telemetry data using the `tool/experiment_lookup` tool. 
You must supply the `experiment_id` passed in the execution context.
If the experiment ID is not found or is invalid, stop the process and report the failure.

## Step 2: Analyze Results
Evaluate the experiment metrics using the guidelines in `skill/experiment-analysis`.
Perform the sample size check, p-value calculations, and lift calculations.
Draft a natural-language description summarizing the experiment results, including recommendation (e.g., "Roll out variation" or "Keep control").

## Step 3: Validate and Format Output
Format the final analysis results into a structured JSON payload.
Ensure that the payload conforms strictly to the schema definition found in `schema/experiment-review`.
Any payload failing to meet the schema must be corrected before proceeding.
