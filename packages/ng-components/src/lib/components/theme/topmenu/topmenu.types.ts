import type { WritableSignal } from '@angular/core';

export interface AcpTopmenuTag {
  color: string;
  value: string;
}

export interface AcpTopmenuPermissions {
  only?: string | string[];
  except?: string | string[];
}

export interface AcpTopmenuChildItem {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: AcpTopmenuChildItem[];
  permissions?: AcpTopmenuPermissions;
  active?: WritableSignal<boolean>;
}

export interface AcpTopmenuItem {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  label?: AcpTopmenuTag;
  badge?: AcpTopmenuTag;
  children?: AcpTopmenuChildItem[];
  permissions?: AcpTopmenuPermissions;
  active?: WritableSignal<boolean>;
}
