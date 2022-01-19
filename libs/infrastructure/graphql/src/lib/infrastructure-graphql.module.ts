import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ToastService } from '@TanglassTheme/services/toast.service';
import { AuthService } from '@auth0/auth0-angular';
const uri = 'https://hasuratg.cloudvision.dev:8000/v1/graphql';

export function createApollo(
  httpLink: HttpLink,
  toastService: ToastService,
  authService: AuthService
) {
  const token = async () =>
    (authService.isAuthenticated$
      ? authService.getAccessTokenSilently()
      : '');

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  }));



  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach((error) => {
        console.warn('error', error.extensions?.internal?.error?.message);
        toastService.showToast(
          'error',
          'Erreur',
          error.extensions?.internal?.error?.message || error.message
        );
      });

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
      toastService.showToast('error', 'Erreur', 'Network error');
    }
  });


  const link = ApolloLink.from([basic, errorLink, httpLink.create({ uri }),/*link2*/]);
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          notification_notification: {
            merge: false,
          },
        },
      },
      Subscription: {
        fields: {
          notification_notification: {
            merge: false,
          },
        },
      },
    },
  });
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  };

  return {
    link,
    cache,
    defaultOptions,
  };
}

@NgModule({
  exports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ToastService, AuthService],
    },
  ],
})
export class InfrastructureGraphqlModule { }