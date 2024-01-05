import "@/styles/globals.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useEffect, useState } from "react";
// import cookies from "../../cookie";
import { client } from "@/client&query";

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <ApolloProvider client={client}>
        {isClient === true && <Component {...pageProps} />}
    </ApolloProvider>
  );
}
