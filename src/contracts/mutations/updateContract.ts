import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateContractSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateContractSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const contract = await db.contract.update({ where: { id }, data })

    return contract
  }
)
