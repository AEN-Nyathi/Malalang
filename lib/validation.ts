import { z } from 'zod';

export const bookingFormSchema = z.object({
    userName: z.string().min(1, { message: 'Full name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(9, { message: 'Phone number must be a valid 9-digit South African number' }),
    businessName: z.string().optional(),
    meetingType: z.string(),
    meetingLocation: z.string().optional(),
    officeLocation: z.string().optional(),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
    servicePackage: z.string(),
    additionalNotes: z.string().optional(),
});

export const websiteBlueprintSchema = z.object({
    business_name: z.string().min(1, { message: 'Business name is required' }),
    business_summary: z.string().min(1, { message: 'Business summary is required' }),
    target_audience: z.string().min(1, { message: 'Target audience is required' }),
});
