import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import impersonateUser, { ImpersonateUserInput } from "src/auth/mutations/impersonateUser"
import { Form, FORM_ERROR } from "src/core/components/Form"
import LabeledTextField from "src/core/components/LabeledTextField"

export const ImpersonateUserForm = () => {
  const [impersonateUserMutation] = useMutation(impersonateUser)
  const session = useSession()
  if (session.impersonatingFromUserId) {
    return (
      <div className="bg-yellow-400 px-2 py-1 text-center font-semibold">
        Currently impersonating user {session.userId}
      </div>
    )
  }

  return (
    <Form
      schema={ImpersonateUserInput}
      submitText="Switch to User"
      onSubmit={async (values) => {
        try {
          await impersonateUserMutation(values)
          queryClient.clear()
        } catch (error) {
          return {
            [FORM_ERROR]:
              "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
          }
        }
      }}
    >
      <LabeledTextField name="userId" type="number" label="User ID" />
    </Form>
  )
}
