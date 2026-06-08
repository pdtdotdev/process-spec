const fs = require('fs');

// Mock Database of marketing campaign assets
const MOCK_CAMPAIGNS = {
  "CAMP_2026_SPRING": {
    "campaign_id": "CAMP_2026_SPRING",
    "name": "Spring Workspace Launch",
    "assets": {
      "headline": "Boost your team productivity with next-gen PROCESS.md workflows.",
      "body": "Tired of manual SOPs that your team ignores? Deploy executable standard operating procedures today. Get started for free.",
      "cta": "Try it now",
      "banner_url": "https://cdn.company.com/assets/spring_launch_banner.png"
    }
  },
  "CAMP_2026_SUMMER": {
    "campaign_id": "CAMP_2026_SUMMER",
    "name": "Summer Sale Promo",
    "assets": {
      "headline": "Summer Sale: 30% Off All Plans!",
      "body": "Supercharge your AI agent deployment with our enterprise PROCESS.md toolkit. Limited time offer.",
      "cta": "Get Discount",
      "banner_url": "https://cdn.company.com/assets/summer_sale.png"
    }
  }
};

function main() {
  let campaign_id = null;

  // Check command-line arguments
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--campaign_id' && args[i + 1]) {
      campaign_id = args[i + 1];
    }
  }

  // If not in command-line arguments, read from stdin (JSON payload)
  if (!campaign_id) {
    try {
      const stdinBuffer = fs.readFileSync(0);
      if (stdinBuffer.length > 0) {
        const payload = JSON.parse(stdinBuffer.toString().trim());
        campaign_id = payload.campaign_id;
      }
    } catch (e) {
      // Stdin empty or not JSON
    }
  }

  if (!campaign_id) {
    console.error(JSON.stringify({ error: "Missing required parameter: campaign_id" }));
    process.exit(1);
  }

  const campaign = MOCK_CAMPAIGNS[campaign_id];
  if (campaign) {
    console.log(JSON.stringify(campaign, null, 2));
    process.exit(0);
  } else {
    console.error(JSON.stringify({ error: `Campaign not found: ${campaign_id}` }));
    process.exit(2);
  }
}

main();
