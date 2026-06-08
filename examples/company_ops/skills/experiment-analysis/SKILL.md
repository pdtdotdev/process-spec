---
id: experiment-analysis
name: Product Growth Experiment Analysis
version: 1.0.0
---

# Guidelines

When analyzing product growth experiments, apply the following statistical rigor and analytical boundaries:

1. **Sample Size Validation:**
   - Verify that the Control and Treatment groups each have a minimum sample size ($N$) of 1,000 unique users.
   - If either group size is below 1,000, flag the experiment as "insufficiently powered".

2. **Statistical Significance Check:**
   - Ensure the p-value is calculated. A result is only statistically significant if the p-value is strictly less than `0.05` ($p < 0.05$).
   - If $p \ge 0.05$, the result is not statistically significant. Treat the outcome as neutral and recommend retaining the Control.

3. **Lift Calculation:**
   - Calculate relative lift on key conversion metrics using the formula:
     $$\text{Lift} = \frac{\text{Treatment Mean} - \text{Control Mean}}{\text{Control Mean}} \times 100$$
   - Report lift as a percentage with two decimal places.

4. **Recommendation Logic:**
   - If the lift is positive, the sample size is sufficient, and the p-value is significant, recommend "Rollout".
   - If the lift is negative, the sample size is sufficient, and the p-value is significant, recommend "Rollback".
   - If the p-value is not significant, recommend "Retain Control".

# Examples

### Example 1: Statistically Significant Positive Lift
* **Input Metrics:**
  - Control Users: 12,500, Conversion Rate: 4.2%
  - Treatment Users: 12,600, Conversion Rate: 4.8%
  - P-value: 0.012
* **Analysis:**
  - Sample Size: 12,500 and 12,600 are both $\ge 1,000$. (Valid)
  - P-value: $0.012 < 0.05$. (Significant)
  - Lift: $\frac{4.8 - 4.2}{4.2} \times 100 = 14.29\%$
* **Recommendation:** Rollout (Significant positive lift of 14.29%).

### Example 2: Non-Significant Result
* **Input Metrics:**
  - Control Users: 5,400, Conversion Rate: 3.10%
  - Treatment Users: 5,500, Conversion Rate: 3.15%
  - P-value: 0.450
* **Analysis:**
  - Sample Size: Valid.
  - P-value: $0.450 \ge 0.05$. (Not Significant)
  - Lift: $\frac{3.15 - 3.10}{3.10} \times 100 = 1.61\%$
* **Recommendation:** Retain Control (Results not statistically significant).
