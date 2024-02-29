import { z } from 'zod'

export const UserSchema = z.object({
    id: z.string().nonempty('provide a user id'),
})

export type User = z.infer<typeof UserSchema>
