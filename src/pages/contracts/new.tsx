import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateContractSchema } from "src/contracts/schemas"
import createContract from "src/contracts/mutations/createContract"
import { ContractForm, FORM_ERROR } from "src/contracts/components/ContractForm"
import { Suspense } from "react"
import { Button, Flex, Text } from "@chakra-ui/react"

const NewContractPage = () => {
  const router = useRouter()
  const [createContractMutation] = useMutation(createContract)

  return (
    <Layout title={"Create New Contract"}>
      <Flex flexDirection={"column"}>
        <Text as="b" fontSize={"4xl"} style={{ marginBottom: "20px" }}>
          Create New Contract
        </Text>
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
          <Button style={{ width: "100%", marginTop: 20 }}>
            <Link href={Routes.ContractsPage()}>Contracts</Link>
          </Button>
        </p>
      </Flex>
    </Layout>
  )
}

NewContractPage.authenticate = true

export default NewContractPage
