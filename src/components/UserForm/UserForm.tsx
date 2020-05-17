import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";

import patters from "../../utils/patterns";
import { UserDetails } from "../../models/models";
import { addUser, updateUser, toggleModal } from "../../redux/actions";
import {
  UserFormProps,
  GenderSelectOption,
  MarialSelectOption,
} from "./UserForm.models";
import { GENDER_OPTIONS, MARIAL_OPTIONS } from "./UserForm.consts";
import "./UserForm.scss";

Modal.setAppElement("#root");

const getFormConfig = (editMode?: boolean, user?: Partial<UserDetails>) => {
  return {
    defaultValues: {
      userId: editMode ? user?.userId : null,
      firstName: editMode ? user?.firstName : null,
      lastName: editMode ? user?.lastName : null,
      gender: editMode ? user?.gender : null,
      age: null,
      maritalStatus: null,
      kids: ["", ""],
    },
  };
};

function UserForm({ isOpen, user, editMode }: UserFormProps) {
  const dispatch = useDispatch();
  const cfg = getFormConfig(editMode, user);
  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    errors,
  } = useForm(cfg);
  const { fields, append, /*remove*/ } = useFieldArray({
    control,
    name: "kids",
  });

  useEffect(() => {
    user &&
      setValue([
        { age: user.age },
        { maritalStatus: user.maritalStatus },
        { kids: user.kids },
      ]);
  }, [user, setValue]);

  const onSubmit = (data: any) => {
    if (editMode) {
      dispatch(
        updateUser({
          ...data,
          _id: user._id,
        })
      );
    } else {
      dispatch(addUser(data));
    }
  };

  const onKidsInputChange = () => {
    const val = getValues({ nest: true });
    const allInputsFilled = val.kids?.every((n) => !!n);
    allInputsFilled && append({});
  };

  const closeModal = () => {
    dispatch(toggleModal(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal-content"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
    >
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <p className="user-form__title">New Member</p>
        <div className="user-form__title-divider"></div>
        <div className="user-form__body">
          <section className="">
            <label htmlFor="userId">ID:</label>
            <input
              className={errors.userId && "error"}
              id="userId"
              name="userId"
              type="number"
              maxLength={50}
              ref={register({ pattern: patters.numbersOnly, required: true })}
            />
          </section>
          <section>
            <label htmlFor="firstName">First Name:</label>
            <input
              className={errors.firstName && "error"}
              id="firstName"
              name="firstName"
              maxLength={20}
              ref={register({ required: true })}
            />
          </section>
          <section>
            <label htmlFor="lastName">Last Name:</label>
            <input
              className={errors.lastName && "error"}
              id="lastName"
              name="lastName"
              maxLength={20}
              ref={register({ required: true })}
            />
          </section>
          <section>
            <label htmlFor="age">Age:</label>
            <input
              className={errors.age && "error"}
              id="age"
              name="age"
              type="number"
              max={120}
              ref={register({ required: true })}
            />
          </section>
          <section>
            <label htmlFor="gender">Gender:</label>
            <select
              className={errors.gender && "error"}
              id="gender"
              name="gender"
              ref={register({ required: true })}
            >
              {GENDER_OPTIONS.map((opt: GenderSelectOption, idx: number) => (
                <option key={idx} value={opt.value}>
                  {opt.title}
                </option>
              ))}
            </select>
          </section>
          <section>
            <label htmlFor="marial-status">Marial Status:</label>
            <select
              className={errors.maritalStatus && "error"}
              id="marial-status"
              name="maritalStatus"
              ref={register({ required: true })}
            >
              {MARIAL_OPTIONS.map((opt: MarialSelectOption, idx: number) => (
                <option key={idx} value={opt.value}>
                  {opt.title}
                </option>
              ))}
            </select>
          </section>

          <section className="kids">
            <div className="kids__header">
              <label>Kids:</label>
              {/* <button type="button" onClick={() => append({})}>
                +
              </button> */}
            </div>
            <div className="kids__inputs">
              {fields.map((item, index) => (
                <div key={item.id}>
                  <input
                    name={`kids[${index}]`}
                    placeholder="Name of child"
                    maxLength={50}
                    onChange={onKidsInputChange}
                    ref={register()}
                  />
                  {/* <button type="button" onClick={() => remove(index)}>
                    -
                  </button> */}
                </div>
              ))}
            </div>
          </section>
          <button className="user-form__button submit-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default React.memo(UserForm);
