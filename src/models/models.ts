export enum Gender {
  male = 'male',
  female = 'female',
}

export enum MaritalStatus {
  single = 'single',
  married = 'married',
  divorced = 'divorced',
  widower = 'widower',
}

export interface User {
  _id?: string
  userId: string
  firstName: string
  lastName: string
  gender: Gender
}

export interface UserDetails extends User {
  maritalStatus: MaritalStatus
  age: number
  kids: string[]
}

export interface TableColumn {
  fieldName: string
  title: string
}
