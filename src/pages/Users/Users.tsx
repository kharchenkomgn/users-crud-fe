import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Searchbar from "../../components/Searchbar";
import UsersTable from "../../components/UsersTable/UsersTable";
import UserForm from "../../components/UserForm";
import { User } from "../../models/models";
import {
  getAllUsers,
  toggleModal,
  getUserDetails,
  searchUsers,
} from "../../redux/actions";
import "./Users.scss";

function Users() {
  const users = useSelector((state: any) => state.users);
  const userDetailsModal = useSelector((state: any) => state.userDetailsModal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onSearchChange = (val: string) => {
    dispatch(searchUsers(val));
  };

  const openModal = (editMode?: boolean, data?: User) => {
    dispatch(toggleModal(true, editMode, data));
  };

  return (
    <div className="users-page">
      <div className="users-page__actions">
        <Searchbar onSearch={onSearchChange} />
        <button
          className="actions__button submit-btn"
          onClick={() => openModal()}
        >
          + New Member
        </button>
      </div>
      <UsersTable
        users={users}
        openEditUserModal={(user: any) => {
          openModal(true, user);
          dispatch(getUserDetails(user._id));
        }}
      />
      {userDetailsModal?.open && (
        <UserForm
          user={userDetailsModal.data}
          isOpen={userDetailsModal?.open}
          editMode={userDetailsModal.editMode}
        />
      )}
    </div>
  );
}

export default React.memo(Users);
