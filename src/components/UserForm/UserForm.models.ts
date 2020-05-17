import { Gender, MaritalStatus, User, UserDetails } from '../../models/models'

export interface UserFormProps {
  isOpen: boolean
  editMode?: boolean
  user?: any
  closeModal?: () => void
}

export interface GenderSelectOption {
  value: Gender
  title: String
}

export interface MarialSelectOption {
  value: MaritalStatus
  title: String
}
