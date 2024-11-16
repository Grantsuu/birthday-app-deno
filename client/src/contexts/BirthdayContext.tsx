import React, { createContext, useContext, useState } from "react";

const BirthdayContext = createContext();

interface BirthdayProviderProps {
    children: React.ReactNode;
}
const BirthdayProvider = ({ children }: BirthdayProviderProps) => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    return (
        <BirthdayContext.Provider
            value={{
                showAddModal,
                setShowAddModal,
                showEditModal,
                setShowEditModal,
                showDeleteModal,
                setShowDeleteModal,
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
