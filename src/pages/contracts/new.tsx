import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateContractSchema } from "src/contracts/schemas"
import createContract from "src/contracts/mutations/createContract"
import { ContractForm, FORM_ERROR } from "src/contracts/components/ContractForm"
import { Suspense } from "react"

const NewContractPage = () => {
  const router = useRouter()
  const [createContractMutation] = useMutation(createContract)

  return (
    <Layout title={"Create New Contract"}>
      <h1>Create New Contract</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ContractForm
          submitText="Create Contract"
          schema={CreateContractSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const contract = await createContractMutation(values)
              await router.push(Routes.ShowContractPage({ contractId: contract.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.ContractsPage()}>Contracts</Link>
      </p>
    </Layout>
  )
}

NewContractPage.authenticate = true

export default NewContractPage
