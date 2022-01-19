import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ROLES } from '@tanglass-erp/store/app';

interface IMenuItem {
  type: string; // Possible values: link/dropDown/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
  roles?: Array<ROLES>;
}

interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  constructor() {
  }

  iconMenu: IMenuItem[] = [

    {
      name: 'Dashboard',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard/analytics',
      roles: [ROLES.admin,ROLES.comptable]
    },
    // *** Management ***
    {
      name: 'Management',
      type: 'separator',
      roles: [ROLES.admin,ROLES.comptable]
    },
    {
      name: 'Employées',
      type: 'link',
      icon: 'badge',
      state: 'management/users',
      roles: [ROLES.admin,ROLES.comptable]
    },
    {
      name: 'Sociétés',
      type: 'link',
      icon: 'business',
      state: 'management/companies',
      roles: [ROLES.admin,ROLES.comptable]
    },
    {
      name: 'Points de vente',
      type: 'link',
      icon: 'store',
      state: 'management/salePoints',
      roles: [ROLES.admin,ROLES.comptable]
    },
    // *** Contact ***
    {
      name: 'Contact',
      type: 'separator',
      roles: [ROLES.admin,ROLES.commercial,ROLES.caissier,ROLES.responsable_pv,ROLES.comptable]
    },
    {
      name: 'Contacts',
      type: 'link',
      icon: 'contacts',
      state: 'contact/contact',
      roles: [ROLES.admin,ROLES.commercial,ROLES.caissier,ROLES.responsable_pv,ROLES.comptable]
    },
    {
      name: 'Fournisseurs',
      type: 'link',
      icon: 'production_quantity_limits',
      state: 'contact/provider',
      roles: [ROLES.admin,ROLES.commercial,ROLES.caissier,ROLES.responsable_pv,ROLES.comptable]
    },
    {
      name: 'Clients',
      type: 'link',
      icon: 'assignment_ind',
      state: 'contact/customer',
      roles: [ROLES.admin,ROLES.commercial,ROLES.caissier,ROLES.responsable_pv,ROLES.comptable]
    },
    // *** Inventory ***
    {
      name: 'Stock',
      type: 'separator',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier]
    },
    {
      name: 'Emplacements',
      type: 'link',
      icon: 'assignment_ind',
      state: 'inventory/warehouses',
      roles: [ROLES.admin,ROLES.commercial,ROLES.caissier,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier]
    },
    {
      name: 'Etat de stock',
      type: 'dropDown',
      icon: 'assignment_ind',
      tooltip: 'Pages',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier],
      // badges: [{color: 'primary', value: '6'}],
      // state: "inventory/warehouses",
      sub: [
        { name: 'Produit Stockable', state: 'inventory/warehouse-glasse' },
        { name: 'Accessoires ', state: 'inventory/warehouse-accessory' },
        { name: 'Consommables && MP', state: 'inventory/warehouse-consumable' }
      ]
    },


    {
      name: 'Transfert',
      type: 'dropDown',
      icon: 'assignment_ind',
      tooltip: 'Pages',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier],
      sub: [
        { name: "Commande transfert", state: "inventory/transfer" },
        { name: "Transferts réalisés", state: "inventory/transferred" },
      ]
    },
    {
      name: 'Mouvement de stock',
      type: 'dropDown',
      icon: 'assignment_ind',
      tooltip: 'Pages',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier],
      sub: [
        { name: "Réception fournisseur", state: "purchase/reception" },
        { name: "Retour fournisseur", state: "purchase/returned" },
        { name: "Ajustements de Stock", state: "inventory/stockAdjustment" },

      ]
    },
    // *** Product ***
    {
      name: 'Product',
      type: 'separator',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier],
    },
    {
      name: 'Produit Stockable',
      type: 'link',
      icon: 'assignment_ind',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier],
      state: 'product/glass'
    },
    {
      name: 'Accessoires',
      type: 'link',
      icon: 'assignment_ind',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier],
      state: 'product/accessory'
    },
    {
      name: "Article Clients",
      type: "link",
      icon: "assignment_ind",
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier],
      state: "product/customerProduct"
    },
    {
      name: 'Fournitures',
      type: 'link',
      icon: 'assignment_ind',
      roles: [ROLES.admin,ROLES.comptable,ROLES.magazinier],
      state: 'product/supplies'
    },
    {
      name: 'Consommables && MP',
      type: 'link',
      icon: 'assignment_ind',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier],
      state: 'product/consumable'
    },
    {
      name: 'Service',
      type: 'link',
      icon: 'assignment_ind',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.magazinier],
      state: 'product/service'
    },
    // *** Sales ***
    {
      name: 'Ventes',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.caissier],
      type: 'separator'
    },
    // {
    //   name: 'Brouillons',
    //   type: 'link',
    //   icon: 'assignment_ind',
    //   roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.caissier],
    //   state: 'sales/draft'
    // },
    {
      name: 'Devis',
      type: 'link',
      icon: 'assignment_ind',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.caissier],
      state: 'sales/quotation'
    },
    {
      name: 'Commandes',
      type: 'link',
      icon: 'assignment_ind',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.caissier],
      state: 'sales/order'
    },
    {
      name: 'Livraison',
      type: 'link',
      icon: 'assignment_ind',
      tooltip: 'Livraison',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable],
      state: 'sales/delivery'
    },
    {
      name: 'Factures',
      type: 'link',
      icon: 'assignment_ind',
      tooltip: 'Factures',
      roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable],
      state: 'sales/invoice'
    },

       // *** Cash Register ***
       {
        name: 'Caisse',
        type: 'separator',
        roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.caissier],

      },
      {
        name: 'Caisse',
        type: 'link',
        icon: 'assignment_ind',
        roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable,ROLES.caissier],
        state: 'cash-register'
      },
    // *** Manufacturing ***
       {
        name: 'Fabrication',
        type: 'separator',
        roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable],
      },
      {
        name: 'Ordres de fabrication',
        type: 'link',
        icon: 'assignment_ind',
        roles: [ROLES.admin,ROLES.commercial,ROLES.responsable_pv,ROLES.comptable],
        state: 'manufacturing/jobOrders'
      },
  ];


  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    this.menuItems.next(this.iconMenu);
  }
}
