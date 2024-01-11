import { createSlice } from "@reduxjs/toolkit"

const InfoSlice = createSlice({
    name: "ContactInfo",
    initialState: {
        selectedContact: null,
        editMode: false,
        pinnedContacts: []
    },

    reducers: {
        setSelectedContact: (state, action) => {
            return {
                ...state,
                selectedContact: action?.payload
            }
        },
        setClose: (state) => {
            return {
                ...state,
                selectedContact: null
            }
        },

        setEdit: (state, action) => {
            return {
                ...state,
                editMode: action?.payload
            }
        },
        updateContactInfo: (state, action) => {
            return {
                ...state,
                selectedContact: action?.payload
            }
        },
        deleteInfo: (state) => {
            return {
                ...state,
                selectedContact: null
            }
        },
        togglePinnedContact: (state, action) => {
            const contactId = action.payload;
            if (state.pinnedContacts.includes(contactId)) {
                state.pinnedContacts = state.pinnedContacts.filter(
                    (id) => id !== contactId
                );
            } else {
                state.pinnedContacts.push(contactId);
            }
        },
    }
})

export const { setSelectedContact, setClose, setEdit, updateContactInfo, deleteInfo, resetContact, togglePinnedContact } = InfoSlice.actions;

export default InfoSlice.reducer