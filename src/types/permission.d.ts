export interface PermissionResponse {
  status: boolean;
  state: string;
  data: PermissionData[];
}

export interface PermissionData {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}
