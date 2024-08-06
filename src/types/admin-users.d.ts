export interface AdminUsersResponse {
  status: boolean;
  state: string;
  data: UsersResponse;
}

export interface UsersResponse {
  current_page: number;
  data: UsersData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface UsersData {
  id: number;
  client_id: number;
  name: string;
  email?: string;
  email_verified_at: any;
  mobile_no: string;
  fcm_token: any;
  status: number;
  google2fa_secret: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  desktop_fcm: any;
  phone_verified_at: string;
  should_change_password: number;
  should_change_password_message: any;
  user_type_id: number;
  gender: string;
  duplicateFcmReg: any;
  special1: any;
  special2: any;
  special3: any;
  special4: any;
  should_forget_password: number;
  user_category: any;
  twofa_status: number;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  user_id: number;
  role_id: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
