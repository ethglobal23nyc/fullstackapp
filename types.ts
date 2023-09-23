import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User, GlobalRole } from "db"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<GlobalRole>
    PublicData: {
      userId: User["id"]
      role: GlobalRole
      impersonatingFromUserId?: number
    }
  }
}
