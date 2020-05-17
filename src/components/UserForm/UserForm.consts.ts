import { MarialSelectOption, GenderSelectOption } from './UserForm.models'
import { Gender, MaritalStatus } from '../../models/models'

export const GENDER_OPTIONS: GenderSelectOption[] = [
  { value: Gender.male, title: 'Male' },
  { value: Gender.female, title: 'Female' },
]

export const MARIAL_OPTIONS: MarialSelectOption[] = [
  { value: MaritalStatus.single, title: 'Single' },
  { value: MaritalStatus.married, title: 'Married' },
  { value: MaritalStatus.divorced, title: 'Divorced' },
  { value: MaritalStatus.widower, title: 'Widower' },
]
