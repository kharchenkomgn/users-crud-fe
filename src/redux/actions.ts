import { UserDetails, User } from '../models/models'
import { apiMap } from '../config/api.map'
import api from '../utils/apiService'

export const GET_ALL_USERS = 'GET_ALL_USERS'
export const GET_USER_DETAILS = 'GET_USER_DETAILS'
export const IS_MODAL_OPEN = 'IS_MODAL_OPEN'
export const SEARCH_USERS = 'SEARCH_USERS'

export const getAllUsersAction = (users: User[]) => ({
  type: GET_ALL_USERS,
  payload: {
    users,
  },
})

export const getUserDetailsAction = (user: UserDetails) => ({
  type: GET_USER_DETAILS,
  payload: {
    user,
  },
})

export const searchUsers = (query: string) => ({
  type: SEARCH_USERS,
  payload: {
    query,
  },
})

export const toggleModal = (open: boolean, editMode?: boolean, data?: User) => ({
  type: IS_MODAL_OPEN,
  payload: {
    open,
    editMode,
    data,
  },
})

export const getAllUsers = () => {
  const { method, url } = apiMap.getAllUsers

  return (dispatch: any) => {
    api({
      method,
      url,
    }).then((res: any) => {
      dispatch(getAllUsersAction(res.data.users))
    })
  }
}

export const getUserDetails = (id: string) => {
  const { method, url } = apiMap.getUserDetails
  const params = { id }

  return (dispatch: any) => {
    api({ method, url, params }).then((res: any) => {
      dispatch(getUserDetailsAction(res.data))
    })
  }
}

export const addUser = (data: UserDetails) => {
  const { method, url } = apiMap.addUser

  return (dispatch: any) => {
    api({ method, url, data }).then(() => {
      dispatch(toggleModal(false))
      dispatch(getAllUsers())
    })
  }
}

export const updateUser = (data: UserDetails) => {
  const { method, url } = apiMap.updateUser

  return (dispatch: any) => {
    api({
      method,
      url,
      data: {
        ...data,
        _id: data?._id,
      },
    }).then(() => {
      dispatch(toggleModal(false))
      dispatch(getAllUsers())
    })
  }
}
