import { z } from 'zod'

export const UserSchema = z.object({
    team: z.string().nonempty('provide a team id'),
    id: z.string().nonempty('provide a user id'),
})

export type User = z.infer<typeof UserSchema>
