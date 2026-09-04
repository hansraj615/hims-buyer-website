import { z } from 'zod'

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined)

export const leadSchema = z
  .object({
    name: z.string().trim().min(2, 'Name is too short').max(120, 'Name is too long'),
    email: z.string().trim().email('Enter a valid work email').max(160),
    phone: optionalText(40).refine(
      (value) => !value || /^[+\d][\d\s().-]{6,24}$/.test(value),
      'Enter a valid phone number',
    ),
    hospital: optionalText(160),
    company: optionalText(160),
    message: optionalText(4000),
      website: optionalText(200),
      hp: optionalText(200),
      source: optionalText(80),
    })
  .transform((input) => {
    const company = input.company || input.hospital || ''
    return {
      name: input.name,
      email: input.email.toLowerCase(),
      phone: input.phone,
      company,
      message: input.message,
      hp: input.website || input.hp,
      source: input.source || 'buyer-website',
    }
  })
  .superRefine((input, ctx) => {
    if (input.company.length < 2) {
      ctx.addIssue({
        code: 'custom',
        path: ['hospital'],
        message: 'Hospital / clinic name is required',
      })
    }
  })

export type LeadInput = z.infer<typeof leadSchema>

export function formatFieldErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] || 'form')
    if (!fields[key]) fields[key] = issue.message
  }
  return fields
}
