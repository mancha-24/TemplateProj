export interface User {
  displayName: string
  roles: Role[]
  token: string
  userName: string
}

export interface UserFormValues {
  email: string
  password: string
  displayName?: string
  userName?: string
}

export interface Role {
  userRoleId: string
  userRoleName: string
}
