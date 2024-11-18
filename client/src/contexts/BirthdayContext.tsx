import React, {createContext, useContext, useRef, useState} from "react";
import { FormikProps} from "formik";
import { BirthdayFormFields} from "../helpers/interfaces.ts";

interface BirthdayContext {
    showAddModal: boolean,
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>,
    showEditModal: boolean,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    showDeleteModal: boolean,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    editID: number,
    setEditID: React.Dispatch<React.SetStateAction<number>>,
    deleteID: number,
    setDeleteID: React.Dispatch<React.SetStateAction<number>>,
    birthdayFormikRef: React.RefObject<FormikProps<Record<string, never> | BirthdayFormFields>>
}

const BirthdayContext = createContext<BirthdayContext>({} as BirthdayContext);

interface BirthdayProviderProps {
    children: React.ReactNode;
}

const BirthdayProvider = ({children}: BirthdayProviderProps) => {
    // Add birthday modal state
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    // Edit birthday modal state
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    // Delete birthday modal state
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    // ID of birthday being edited
    const [editID, setEditID] = useState(-1);
    // ID of birthday being deleted
    const [deleteID, setDeleteID] = useState(-1);

    // Formik form ref
    const birthdayFormikRef = useRef<FormikProps<BirthdayFormFields>>() as React.RefObject<FormikProps<Record<string, never> | BirthdayFormFields>>;

    return (
        <BirthdayContext.Provider
            value={{
                showAddModal,
                setShowAddModal,
                showEditModal,
                setShowEditModal,
                showDeleteModal,
                setShowDeleteModal,
                editID,
                setEditID,
                deleteID,
                setDeleteID,
                birthdayFormikRef
            }}
        >
            {children}
        </BirthdayContext.Provider>
    );
};

const useBirthdayContext = () => {
    return useContext(BirthdayContext);
};

export {BirthdayProvider, useBirthdayContext};
