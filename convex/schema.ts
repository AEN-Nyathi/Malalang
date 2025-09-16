import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  questionnaires: defineTable({
    // Section 1: Business Info
    contactPerson: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    businessName: v.string(),
    currentWebsite: v.optional(v.string()),
    businessDescription: v.string(),
    uniqueSellingProposition: v.optional(v.string()),
    
    // Competitors
    competitor1_name: v.optional(v.string()),
    competitor1_likes: v.optional(v.string()),
    competitor1_dislikes: v.optional(v.string()),
    
    // Audience
    targetAudience_demographics: v.optional(v.string()),
    targetAudience_goals: v.optional(v.string()),
    targetAudience_painPoints: v.optional(v.string()),

    // Section 2: Project Goals
    primaryGoal: v.optional(v.string()),
    successMetrics: v.optional(v.string()),
    requiredPages: v.array(v.string()),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),

    // Section 3: Design
    brandWords: v.optional(v.string()),
    designStyle: v.optional(v.string()),
    designStyleOther: v.optional(v.string()),
    hasLogo: v.optional(v.string()),
    hasBranding: v.optional(v.string()),
    brandColors: v.optional(v.string()),
    likedWebsites: v.optional(v.string()),
    dislikedWebsites: v.optional(v.string()),

    // Section 4: Content
    contentProvider: v.optional(v.string()),
    needsBlog: v.optional(v.string()),

    // Section 5: Features
    features: v.array(v.string()),
    
    // Section 6: Technical
    domainStatus: v.optional(v.string()),
    maintenanceInterest: v.optional(v.string()),
    additionalInfo: v.optional(v.string()),
  })
});