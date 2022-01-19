const SalePointHeaders = [
  { field: 'name', headerName: 'Emplacement', type: "linkColumn",
    cellRendererParams: (params) => (
      {
      link: `${params.value}`,
      state: {id: params?.data?.id},
      })
  },
  { field: 'phone', headerName: 'Téléphone', type: "textColumn"},
  { field: 'fax', headerName: 'Fax', type: "textColumn"},
  { field: 'email', headerName: 'E-mail', type: "textColumn"},
];

const CompanieHeaders = [
  { field: 'name', headerName: 'Nom', type: "linkColumn",
    cellRendererParams: (params) => (
      {
        link: `${params.value}`,
        state: {id: params?.data?.id},
      })
  },
  { field: 'CNSS', headerName: 'CNSS', type: "textColumn"},
  { field: 'ICE', headerName: 'ICE', type: "textColumn"},
  { field: 'IF', headerName: 'IF', type: "textColumn"},
  { field: 'RC', headerName: 'RC', type: "textColumn"},
  { field: 'address', headerName: 'Adresse', type: "textColumn"},
  { field: 'phone', headerName: 'Téléphone', type: "textColumn"},
  { field: 'email', headerName: 'E-mail', type: "textColumn"},
];

const UserHeaders = [
  { field: 'email', headerName: 'Émail', type: "linkColumn",
    cellRendererParams: (params) => (
        {
          link: `${params?.data?.id}`,
        }
      )
    },
  { field: 'username', headerName: 'Nom d\'utilisateur', type: "textColumn"},
  { headerName: 'Nom complet', type: "textColumn", field: 'firstname',
    valueGetter: (params) => [params.data?.firstname, params.data?.lastname].join(" ")},
  { field: 'phone', headerName: 'Téléphone', type: "textColumn"},
];

export {
  UserHeaders,
  SalePointHeaders,
  CompanieHeaders
};
