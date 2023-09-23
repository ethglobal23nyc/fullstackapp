import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateContractSchema } from "src/contracts/schemas"
import getContract from "src/contracts/queries/getContract"
import updateContract from "src/contracts/mutations/updateContract"
import { ContractForm, FORM_ERROR } from "src/contracts/components/ContractForm"

export const EditContract = () => {
  const router = useRouter()
  const contractId = useParam("contractId", "number")
  const [contract, { setQueryData }] = useQuery(
    getContract,
    { id: contractId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateContractMutation] = useMutation(updateContract)

  return (
    <>
      <Head>
        <title>Edit Contract {contract.id}</title>
      </Head>

      <div>
        <h1>Edit Contract {contract.id}</h1>
        <pre>{JSON.stringify(contract, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ContractForm
            submitText="Update Contract"
            schema={UpdateContractSchema}
            initialValues={contract}
            onSubmit={async (values) => {
              try {
                const { id, ...newValues } = values
                const updated = await updateContractMutation({
                  id: id,
                  ...newValues,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowContractPage({ contractId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditContractPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditContract />
      </Suspense>

      <p>
        <Link href={Routes.ContractsPage()}>Contracts</Link>
      </p>
    </div>
  )
}

EditContractPage.authenticate = true
EditContractPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditContractPage
