import React, { createContext, useContext, useState } from "react";

const BirthdayContext = createContext();

interface BirthdayProviderProps {
    children: React.ReactNode;
}
const BirthdayProvider = ({ children }: BirthdayProviderProps) => {
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
                setDeleteID
            }}
        >
            {children}
        </BirthdayContext.Provider>
    );
};

const useBirthdayContext = () => {
    return useContext(BirthdayContext);
};

export { BirthdayProvider, useBirthdayContext };
