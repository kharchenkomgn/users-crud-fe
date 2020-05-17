import { User } from '../models/models'
import { GET_ALL_USERS, GET_USER_DETAILS, IS_MODAL_OPEN, SEARCH_USERS } from './actions'

const initialState = {
  users: [],
  initialUsers: [],
  userDetailsModal: {},
}

const users = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_USERS:
      const users = action.payload?.users
      return {
        ...state,
        users,
        initialUsers: users,
      }
    case GET_USER_DETAILS:
      return {
        ...state,
        userDetailsModal: {
          ...state.userDetailsModal,
          data: action.payload?.user,
        },
      }
    case IS_MODAL_OPEN:
      return {
        ...state,
        userDetailsModal: {
          ...state.userDetailsModal,
          open: action.payload.open,
          editMode: action.payload.editMode,
          data: action.payload.data,
        },
      }
    case SEARCH_USERS:
      const { query } = action.payload
      const filteredUsers = searchUsers(state.initialUsers, query)

      return {
        ...state,
        users: filteredUsers,
      }
    default:
      return state
  }
}

function searchUsers(users: User[], query: string): User[] {
  const filteredUsers = !query
    ? users
    : users.filter((user: User) => {
        const userValues = Object.entries(user)
          .filter((field) => field[0] !== '_id')
          .map((field) => field[1])

        const res = userValues.some((val: string) =>
          val.toLowerCase().includes(query?.toLowerCase()),
        )
        return res
      })

  return filteredUsers
}

export default users
