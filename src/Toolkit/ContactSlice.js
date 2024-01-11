import { createSlice } from "@reduxjs/toolkit"
// import ContactData from "../JSON/MockData.json"
const ContactSlice = createSlice({
    name: "ContactList",
    initialState: {
        contactData: [],
        countries: []
    },
    reducers: {
        getContacts: (state, action) => {
            console.log(action?.payload)
            return {
                ...state,
                contactData: action?.payload
            }
        },
        updateContact: (state, action) => {
            return {
                ...state,
                contactData: state?.contactData?.map((contact) => {
                    if (contact?.id === action?.payload.id) {
                        return action?.payload
                    } else {
                        return contact
                    }
                })
            }

        },

        deleteContact: (state, action) => {
            console.log(state);
            console.log("del_contact", action?.payload);
            return {
                ...state,
                contactData: state?.contactData.filter((contact) => contact?.id !== action?.payload.id)

            }
        },
        getCountries: (state, action) => {
            return {
                ...state,
                countries: action?.payload
            }
        },
        addContact: (state, action) => {
            return {
                ...state,
                contactData: [...state.contactData, action.payload]
            }
        }
    }
});

export const { getContacts, updateContact, deleteContact, getCountries, addContact } = ContactSlice.actions;

export default ContactSlice.reducer;