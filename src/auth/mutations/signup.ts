import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { GlobalRole, MembershipRole } from "db"
import { Signup } from "../schemas"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, password, organizationName }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: GlobalRole.CUSTOMER,
        memberships: {
          create: {
            role: MembershipRole.OWNER,
            organization: {
              create: {
                name: organizationName,
              },
            },
          },
        },
      },
      include: { memberships: true },
    })

    await ctx.session.$create({ userId: user.id, roles: [user.role] })
    return user
  }
)
