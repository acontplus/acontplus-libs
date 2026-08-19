export interface MenuTag {
  color: string;
  value: string;
}

export interface MenuPermissions {
  only?: string | string[];
  except?: string | string[];
}

export interface MenuItem {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon?: string;
  label?: MenuTag;
  badge?: MenuTag;
  children?: MenuItem[];
  permissions?: MenuPermissions;
}
