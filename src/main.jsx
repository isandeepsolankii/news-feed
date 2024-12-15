import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseProvider } from "./context/firebase";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Your GraphQL server URL
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </ApolloProvider>
);
