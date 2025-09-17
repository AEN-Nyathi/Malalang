<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// This defines the arguments for the mutation. It mirrors the schema,
// making fields optional where appropriate to handle partial form submissions.
const questionnaireArgs = {
    // Section 1
    contactPerson: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    businessName: v.string(),
    currentWebsite: v.optional(v.string()),
    businessDescription: v.string(),
    uniqueSellingProposition: v.optional(v.string()),
    competitor1_name: v.optional(v.string()),
    competitor1_likes: v.optional(v.string()),
    competitor1_dislikes: v.optional(v.string()),
    targetAudience_demographics: v.optional(v.string()),
    targetAudience_goals: v.optional(v.string()),
    targetAudience_painPoints: v.optional(v.string()),
    // Section 2
    primaryGoal: v.optional(v.string()),
    successMetrics: v.optional(v.string()),
    requiredPages: v.array(v.string()),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    // Section 3
    brandWords: v.optional(v.string()),
    designStyle: v.optional(v.string()),
    designStyleOther: v.optional(v.string()),
    hasLogo: v.optional(v.string()),
    hasBranding: v.optional(v.string()),
    brandColors: v.optional(v.string()),
    likedWebsites: v.optional(v.string()),
    dislikedWebsites: v.optional(v.string()),
    // Section 4
    contentProvider: v.optional(v.string()),
    needsBlog: v.optional(v.string()),
    // Section 5
    features: v.array(v.string()),
    // Section 6
    domainStatus: v.optional(v.string()),
    maintenanceInterest: v.optional(v.string()),
    additionalInfo: v.optional(v.string()),
};

export const addQuestionnaire = mutation({
  args: questionnaireArgs,
  handler: async (ctx, args) => {
    // Inserts the provided data into the "questionnaires" table.
    const questionnaireId = await ctx.db.insert("questionnaires", args);
    return questionnaireId;
  },
});

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1dTVaSUV9rWh7zmE4PKgHAegcjqmboIDP

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
