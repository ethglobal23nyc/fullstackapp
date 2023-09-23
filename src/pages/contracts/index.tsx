import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getContracts from "src/contracts/queries/getContracts"

const ITEMS_PER_PAGE = 100

export const ContractsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ contracts, hasMore }] = usePaginatedQuery(getContracts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {contracts.map((contract) => (
          <li key={contract.id}>
            <Link href={Routes.ShowContractPage({ contractId: contract.id })}>{contract.name}</Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ContractsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Contracts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewContractPage()}>Create Contract</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ContractsList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default ContractsPage
