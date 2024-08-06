export interface RolesResponse {
  status: boolean;
  state: string;
  data: RolesPaginatedData;
}

export interface SingleRolesResponse {
  status: boolean;
  state: string;
  data: RolesData;
}

export interface RolesPaginatedData {
  current_page: number;
  data: RolesData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface RolesData {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  role_id: number;
  permission_id: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
