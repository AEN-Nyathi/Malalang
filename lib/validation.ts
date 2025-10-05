
import { z } from 'zod';

export const questionnaireSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  businessName: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().regex(/^\+27\d{9}$/, 'Phone number must be a valid 9-digit South African number.'),
  meetingType: z.enum(['Face-to-Face', 'Virtual']),
  meetingLocation: z.string().optional(),
  officeLocation: z.string().optional(),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  servicePackage: z.string().min(1, 'Service package is required'),
  additionalNotes: z.string().optional(),
  isWhatsApp: z.boolean().optional(),
}).refine(data => {
    if (data.meetingType === 'Face-to-Face' && data.meetingLocation === 'My Office' && !data.officeLocation) {
        return false;
    }
    return true;
}, {
    message: 'Office location is required when you select "My Office"',
    path: ['officeLocation'],
});
