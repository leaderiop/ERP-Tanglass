import { Address, AddressDB } from '../models/shared.models';
import { InsertedContact } from '../models/contact.models';
import { AffectedCustomer, InsertedCustomer } from '../models/customer.models';
import { AffectedProvider, InsertedProvider } from '../models/provider.models';
import {
  InsertContactMutationVariables,
  InsertCustomerMutationVariables,
  InsertProviderMutationVariables
} from '@tanglass-erp/infrastructure/graphql';

interface InsertedContactPlus
  extends Pick<
    InsertedContact,
    Exclude<keyof InsertedContact, 'addresses' | 'providers'>
  > {
  addresses: {
    data: Address[];
  };
  providers: {
    data: InsertedProvider[];
  };
}

interface InsertedCustomerPlus
  extends Pick<
    InsertedCustomer,
    Exclude<keyof InsertedCustomer, 'addresses' | 'contacts'>
  > {
  addresses: {
    data: Address[];
  };
  contacts: {
    data: InsertedContactPlus[];
  };
}

interface InsertedProviderPlus
  extends Pick<
    InsertedProvider,
    Exclude<keyof InsertedProvider, 'addresses' | 'contacts'>
  > {
  addresses: {
    data: Address[];
  };
  contacts: {
    data: InsertedContactPlus[];
  };
}

interface InsertedContactDB {
  contact: {
    data: InsertedContactPlus;
  };
}
interface InsertedCustomerDB {
  customer: {
    data: InsertedCustomerPlus;
  };
}
interface InsertedProviderDB {
  provider: {
    data: InsertedProviderPlus;
  };
}

export interface AffectedContact {
  contactid?: string;
}

type objToAdapt = InsertedProvider & InsertedCustomer & InsertedContact;
type adaptedObj = InsertContactMutationVariables &
  InsertCustomerMutationVariables &
  InsertProviderMutationVariables;

export function dataAdapter(obj: objToAdapt): adaptedObj {
  let addresses: AddressDB[];
  let contacts: Array<InsertedContactDB | AffectedContact>;
  let customers: Array<InsertedCustomerDB | AffectedCustomer>;
  let providers: Array<InsertedProviderDB | AffectedProvider>;
  if (obj.addresses) {
    addresses = adaptAddress(obj.addresses);
  }

  if (obj.contacts || obj.affectedContacts) {
    contacts = [
      ...adaptAffectedContactsID(obj.affectedContacts),
      ...adaptContact(obj.contacts),
    ];
  }

  if (obj.customers || obj.affectedCustomers) {
    customers = [
      ...adaptAffectedCustomersID(obj.affectedCustomers),
      ...adaptCustomer(obj.customers),
    ];
  }

  if (obj.providers || obj.affectedProviders) {
    providers = [
      ...adaptAffectedProvidersID(obj.affectedProviders),
      ...adaptProvider(obj.providers),
    ];
  }

  const {
    affectedProviders,
    affectedCustomers,
    affectedContacts,
    ...value
  } = obj;
  return { ...value, addresses, contacts, customers, providers };
}

export function adaptAffectedContactsID(
  affected: string[] = []
): AffectedContact[] {
  if (affected) {
    return affected.map((id) => ({
      contactid: id,
    }));
  }
  return [];
}
export function adaptAffectedCustomersID(
  affected: string[] = []
): AffectedCustomer[] {
  if (affected) {
    return affected.map((id) => ({
      customerid: id,
    }));
  }
  return [];
}
export function adaptAffectedProvidersID(
  affected: string[] = []
): AffectedProvider[] {
  if (affected) {
    return affected.map((id) => ({
      providerid: id,
    }));
  }
  return [];
}
export function adaptAddress(addresses: Address[]): AddressDB[] {
  return addresses.map((address) => ({
    address: {
      data: address,
    },
  }));
}

export function adaptContact(data: InsertedContact[]): InsertedContactDB[] {
  return data.map((contact) => ({
    contact: {
      data: {
        ...contact,
        addresses: {
          data: contact?.addresses,
        },
        providers: {
          data: contact?.providers,
        },
      },
    },
  }));
}

export function adaptCustomer(data: InsertedCustomer[]): InsertedCustomerDB[] {
  return data.map((customer) => ({
    customer: {
      data: {
        ...customer,
        addresses: {
          data: customer?.addresses,
        },
        contacts: {
          data: customer?.contacts.map((e) => ({
            ...e,
            addresses: {
              data: e?.addresses,
            },
            providers: {
              data: e?.providers,
            },
          })),
        },
      },
    },
  }));
}

export function adaptProvider(data: InsertedProvider[]): InsertedProviderDB[] {
  return data.map((provider) => ({
    provider: {
      data: {
        ...provider,
        addresses: {
          data: provider?.addresses,
        },
        contacts: {
          data: provider?.contacts.map(e => (
            {
              ...e,
              addresses: {data: e?.addresses},
              providers: {data: e?.providers}
            }
          ))
        },
      },
    },
  }));
}
