---
id: marketing_launch_readiness
name: Marketing Launch Readiness Review
version: 0.1.0
owner: marketing-ops
status: active
description: Reviews marketing campaign assets and copy against brand positioning before launch.
tags: [marketing, brand, copy, launch]
---

# Description

This process governs the final review of marketing campaigns and launch assets.
It ensures that positioning statements, campaign copy, design assets, and target channels are aligned with company brand guidelines before going live.

## Scope
- Applies to all public-facing advertising campaigns, email blasts, and landing pages.
- Excludes organic social media posts under 10k impressions expected reach.

## Pre-conditions
- All creative assets must be uploaded to the shared folder.
- Campaign tracking URLs must be generated.

## Expected Outcomes
- An asset review scorecard.
- Final launch approval status.

---

# Workflow

## Step 1: Ingest Campaign Assets
Lookup and retrieve the campaign assets using the `tool/campaign_asset_lookup` tool.
Retrieve the asset payload for the given `campaign_id`.
Verify that both copy and visual assets are present.

## Step 2: Audit Brand Positioning
Perform a detailed audit of the campaign copy and brand positioning using `skill/positioning-review`.
Check for consistency of messaging, tone of voice, and trademark usage.
Generate a list of any compliance violations or recommendations.

## Step 3: Compile Readiness Scorecard
Combine findings from the previous steps into a readiness scorecard.
The scorecard must include:
1. Asset completeness check.
2. Tone & Positioning check results.
3. Recommended go/no-go status.
Present the final scorecard for verification.
