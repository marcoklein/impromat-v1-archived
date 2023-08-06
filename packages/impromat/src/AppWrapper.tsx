import { setupIonicReact } from "@ionic/react";
import { retryExchange } from "@urql/exchange-retry";
import {
  createClient as createUrqlClient,
  errorExchange,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { cacheExchange } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";
import React, { PropsWithChildren, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { environment } from "./environment";
import { ErrorFallbackPage } from "./pages/ErrorFallbackPage";
import "./theme/colors.css";
import "./theme/variables.css";

setupIonicReact();

export const AppWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const graphqlClientRef = useRef(
    createUrqlClient({
      url: `${environment.API_URL}/graphql`,
      fetchOptions: { credentials: "include" },
      exchanges: [
        // devtoolsExchange,
        cacheExchange({
          keys: {
            ElementSearchResult: () => null, // do not cache search results
            ElementTag: () => null, // do not cache tags separately
          },
          resolvers: {
            Query: {
              searchElements: simplePagination({
                limitArgument: "take",
                offsetArgument: "skip",
              }),
            },
          },
          updates: {
            Mutation: {
              createElement(_result, _args, cache, _info) {
                cache.invalidate("Query", "elements");
                cache.invalidate("User", "elements");
              },
              updateElement(result, _args, cache, _info) {
                const id = (result.updateElement as any)?.id;
                cache.invalidate({
                  __typename: "Element",
                  id,
                });
              },
              createWorkshop(_result, _args, cache, _info) {
                cache.invalidate("Query", "workshops");
                cache.invalidate("User", "workshops");
              },
              updateWorkshop(_result, _args, cache, _info) {
                const id = (_result.updateWorkshop as any)?.id;
                cache.invalidate({
                  __typename: "Workshop",
                  id,
                });
              },
              duplicateWorkshop(_result, _args, cache, _info) {
                cache.invalidate("Query", "workshops");
                cache.invalidate("User", "workshops");
              },
              deleteWorkshop(_result, _args, cache, _info) {
                const id = (_result.deleteWorkshop as any)?.id;
                cache.invalidate({ __typename: "Workshop", id });
              },
              updateWorkshopItemOrder(_result, _args, cache, _info) {
                const id = (_result.updateWorkshopItemOrder as any)?.id;
                cache.invalidate({
                  __typename: "Workshop",
                  id,
                });
              },
            },
          },
        }),
        errorExchange({
          onError(error, _operation) {
            console.error("GraphQL Error:", error);
          },
        }),
        retryExchange({
          initialDelayMs: 1000,
          maxDelayMs: 15000,
          maxNumberAttempts: 2,
          randomDelay: false,
          retryIf: (err: any) => !!(err && err.networkError),
        }) as any,
        fetchExchange,
      ],
    }),
  );

  return (
    <UrqlProvider value={graphqlClientRef.current}>
      <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
        {children}
      </ErrorBoundary>
    </UrqlProvider>
  );
};
