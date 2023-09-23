import { invoke } from "@blitzjs/rpc"
import { useSession } from "@blitzjs/auth"

import stopImpersonating from "src/auth/mutations/stopImpersonating"

export const ImpersonatingUserNotice = () => {
  const session = useSession()
  if (!session.impersonatingFromUserId)
    return (
      <div className="bg-yellow-400 px-2 py-1 text-center font-semibold">
        Currently not impersonating any user
      </div>
    )

  return (
    <div className="bg-yellow-400 px-2 py-1 text-center font-semibold">
      Currently impersonating user {session.userId}{" "}
      <button
        className="appearance-none bg-transparent text-black uppercase"
        onClick={async () => {
          await invoke(stopImpersonating, {})
          queryClient.clear()
        }}
      >
        Exit
      </button>
    </div>
  )
}
