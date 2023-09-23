import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"
import styles from "src/styles/Home.module.css"

import { ChakraProvider } from "@chakra-ui/react"
import AppLogo from "src/core/Logo"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ChakraProvider>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <div>
          <div className={styles.globe} />
          <div className={styles.toastContainer}>
            <p>
              <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
            </p>
          </div>
          <div className={styles.container}>
            <main className={styles.main}>
              <div className={styles.wrapper}>
                <div className={styles.header}>
                  <div className={styles.logo}>
                    <AppLogo />
                  </div>
                  <div className={styles.buttonContainer}>
                    <Suspense fallback="Loading...">
                      {getLayout(<Component {...pageProps} />)}{" "}
                    </Suspense>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <footer className={styles.footer}></footer>
        </div>
      </ErrorBoundary>
    </ChakraProvider>
  )
}

export default withBlitz(MyApp)
