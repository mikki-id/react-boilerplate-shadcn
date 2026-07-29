import type { Role, Permission } from "./permission-types";

export interface LoginApiResponse {
  accessToken: string;
  user: {
    name: string;
    email: string;
    phone: string;
    is_active: boolean;
    roles?: Role[];
    permissions?: Permission[];
  };
}
