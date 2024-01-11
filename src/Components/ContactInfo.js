
import React, { useEffect, useState } from 'react'
import { deleteInfo, setClose, setEdit, togglePinnedContact, updateContactInfo } from '../Toolkit/InfoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContact, updateContact } from '../Toolkit/ContactSlice'
import moment from "moment"



const ContactInfo = () => {
    const selectedInfo = useSelector((store) => store.InfoSlice.selectedContact)
    const pinnedContacts = useSelector((store) => store.InfoSlice.pinnedContacts);
    const [editData, setEditData] = useState(selectedInfo)
    const editMode = useSelector((store) => store.InfoSlice.editMode)
    const dispatch = useDispatch()
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        setEditData(selectedInfo)
        setIsFavorite(pinnedContacts.includes(selectedInfo.id));
    }, [selectedInfo])

    const handleEdit = () => {
        console.log("start edit")
        dispatch(setEdit(true))
    }

    const handleUpdate = () => {
        dispatch(updateContact(editData))
        dispatch(updateContactInfo(editData))
        dispatch(setEdit(false))
        console.log("update")
    }

    const handleCloseEdit = () => {
        dispatch(setEdit(false))
        setEditData(selectedInfo)
    }

    const handleDelete = () => {
        console.log("deleted")
        dispatch(deleteContact(editData))
        dispatch(deleteInfo())

    }

    const handleClose = () => {
        dispatch(setClose())
    }

    const handleFavorite = () => {
        dispatch(togglePinnedContact(selectedInfo.id));
        setIsFavorite((prevState) => !prevState);
    };


    console.log(selectedInfo)

    // const date = new Date()
    // const dateISO = date.toISOString()

    return (
        <div className='info-div'>
            <div className="tool-bar" style={editMode ? { display: "none" } : { display: "flex" }}>
                <span className={`material-symbols-outlined favorite_icon ${isFavorite ? 'activeFavorite' : ''}`} onClick={handleFavorite}>
                    favorite
                </span>
                <span className="material-symbols-outlined delete-icon" onClick={handleDelete}>
                    delete
                </span>
                <span className="material-symbols-outlined edit-icon" onClick={handleEdit}>
                    edit_square
                </span>
                <span className="material-symbols-outlined close-icon" onClick={handleClose}>
                    close
                </span>
            </div>
            <div className="tool-bar-edit" style={editMode ? { display: "flex" } : { display: "none" }}>
                <span className="material-symbols-outlined cancel-icon" onClick={handleCloseEdit}>
                    close
                </span>
                <span className="material-symbols-outlined done-icon" onClick={handleUpdate}>
                    done
                </span>

            </div>
            <div className="infoDetails">
                <div className="logoDiv">
                    <div className="logoCircleDiv">
                        <div className="logoCircle">
                            <img src={selectedInfo?.avatar} alt="" />
                            <div className="activeCircle" style={selectedInfo?.active === true ? { backgroundColor: "#02d302" } : { backgroundColor: "grey" }}>

                            </div>
                        </div>

                    </div>
                    <div className="nameEmailDiv">
                        <div className="nameDiv">
                            <span>{selectedInfo?.first_name + " " + selectedInfo?.last_name}</span>
                        </div>
                        <div className="emailDiv">
                            <span>{selectedInfo?.email}</span>
                        </div>
                        <div className="joined_at_div">
                            <span>Joined at: {moment(selectedInfo?.joined_at).format("DD/MM/YYYY, h:mm:ss a")}</span>
                        </div>
                    </div>
                </div>
                <div className="personal-info">
                    <div className="personal-head">
                        <span>Personel Info</span>
                    </div>
                    <div className="personal-content">
                        <span>First Name: {editMode ? <input value={editData?.first_name || ""}
                            onChange={(e) => {
                                setEditData({ ...editData, first_name: e?.target?.value })
                            }} /> : selectedInfo?.first_name}</span>
                        <span>Last Name: {editMode ? <input value={editData?.last_name || ""}
                            onChange={(e) => {
                                setEditData({ ...editData, last_name: e?.target?.value })
                            }} /> : selectedInfo?.last_name}
                        </span>
                        <span>Gender: {editMode ? <input value={editData?.gender || ""}
                            onChange={(e) => {
                                setEditData({ ...editData, gender: e?.target?.value })
                            }}
                        /> : selectedInfo?.gender}</span>
                        <span>Job Title: {editMode ? <input value={editData?.job_title || ""}
                            onChange={(e) => {
                                setEditData({ ...editData, job_title: e.target.value })
                            }} /> : selectedInfo?.job_title}</span>
                    </div>
                </div>
                <div className="address">
                    <div className="address-head">
                        <span>Address</span>
                    </div>
                    <div className="address-content">
                        <span>Line 1: {editMode ? <input value={editData?.address?.line1 || ""}
                            onChange={(e) => {
                                setEditData({ ...editData, address: { ...editData?.address, line1: e.target.value } })
                            }}
                        /> : selectedInfo?.address?.line1}</span>
                        <span>City: {editMode ? <input value={editData?.address?.city || ""} onChange={(e) => {
                            setEditData({ ...editData, address: { ...editData?.address, city: e.target.value } })
                        }} /> : selectedInfo?.address?.city}</span>
                        <span>State: {editMode ? <input value={editData?.address?.state || ""} onChange={(e) => {
                            setEditData({ ...editData, address: { ...editData?.address, state: e.target.value } })
                        }} /> : selectedInfo?.address?.state}</span>
                        <span>Country: {editMode ? <input value={editData?.address?.country || ""} onChange={(e) => {
                            setEditData({ ...editData, address: { ...editData?.address, country: e.target.value } })
                        }} /> : selectedInfo?.address?.country}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo
