import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { ImpersonateUserForm } from "src/auth/components/ImpersonateForm"
import ContractsPage from "./contracts"
import { Button, Flex, Spacer, Text } from "@chakra-ui/react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Flex flexDirection="column">
          <Flex>
            <Text as="b" fontSize={"md"}>
              User ID:
            </Text>{" "}
            <code>{currentUser.id}</code>
          </Flex>
          <br />
          <Flex>
            <Text as="b" fontSize={"md"}>
              User Role:
            </Text>{" "}
            <code>{currentUser.role}</code>
          </Flex>
          <br />
          <Flex>
            <Text as="b" fontSize={"md"}>
              User Email:
            </Text>{" "}
            <code>{currentUser.email}</code>
          </Flex>
          <ImpersonateUserForm />
          <ContractsPage />
          <Button
            // className={styles.button}
            style={{ marginTop: 20, marginBottom: 20 }}
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </Button>
        </Flex>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      {/* Auth */}

      <UserInfo />
    </Layout>
  )
}

export default Home
