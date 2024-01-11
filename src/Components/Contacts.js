import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContact, getContacts } from "../Toolkit/ContactSlice"
import FetchContacts from "../JSON/MockData.json"
import { setEdit, setSelectedContact } from '../Toolkit/InfoSlice'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Col, FormGroup, Label, Input, Row, Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';
import ContactInfo from './ContactInfo'
import InitialInfo from './InitialInfo'
import FeatherIcon from 'feather-icons-react';
import CountryAPI from './CountryAPI'
import { toast } from 'react-toastify';
import PerfectScrollbar from 'react-perfect-scrollbar'




const Contacts = () => {
    // dispatch
    const dispatch = useDispatch();
    //useSelector
    const data = useSelector((store) => store.ContactSlice.contactData)
    const countries = useSelector((store) => store.ContactSlice.countries)
    const selectedContact = useSelector((store) => store.InfoSlice?.selectedContact)
    //useState
    const [searchValue, setSearchItem] = useState('')
    const [modal, setModal] = useState(false);
    const [inputData, setInputData] = useState(data)
    const [status, setStatus] = useState("all")
    const sliceContacts = data.slice(0, 5)
    const [pageContacts, setPageContacts] = useState(sliceContacts)
    const [test, setTest] = useState(false)
    const [sort, setSort] = useState("")
    const [filterModal, setFilterModal] = useState(false);
    const [arr, setArr] = useState([])
    const [activeFilters, setActiveFilters] = useState(false)
    const [maleFilters, setMaleFilters] = useState(false)

    useEffect(() => {
        dispatch(getContacts(FetchContacts))
        dispatch(CountryAPI())
        setPageContacts(data.slice(0, 5))

    }, [])

    const handleContactList = (e) => {
        console.log(e)
        dispatch(setSelectedContact(e))
        dispatch(setEdit(false))
    }

    // console.log(data)

    // Combined function

    const combine_sort_filter_search = (status, sort, searchValue) => {
        return data
            .filter((e) => {
                // search
                const nameMatches = e?.first_name?.toLowerCase()?.includes(searchValue.toLowerCase()) || e?.last_name?.toLowerCase()?.includes(searchValue?.toLowerCase());
                // onStatus
                if (status === "all") {
                    return nameMatches;
                } else if (status === "active") {
                    return e.active === true && nameMatches;
                } else if (status === "inactive") {
                    return e.active === false && nameMatches;
                }
            })
            .filter((e) => {
                if (arr.length === 0) {
                    return true;
                } else if (arr.includes("filter_active") && arr.includes("filter_male")) {
                    return e.active && e.gender === "Male";
                } else if (arr.includes("filter_active")) {
                    return e.active
                } else if (arr.includes("filter_male")) {
                    return e.gender === "Male"
                }
                return false;
            })
            .sort((a, b) => {
                if (sort === "a_z") {
                    return a.first_name.localeCompare(b.first_name);
                } else if (sort === "z_a") {
                    return b.first_name.localeCompare(a.first_name);
                } else {
                    return 0;
                }
            });
    };



    const handleAdd = () => {
        console.log("add")
        setModal(!modal);
    }


    const handleFilterModal = () => {
        console.log("filter");
        setFilterModal(!filterModal);
    }


    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    // Add modal
    const handleAddContact = () => {
        if (!inputData?.first_name || !inputData?.last_name || !inputData?.email || !inputData?.gender || !inputData?.job_title || !inputData?.avatar || !inputData?.active || !inputData?.address?.line1 || !inputData?.address?.city || !inputData?.address?.state || !inputData?.address?.country) {
            return (
                toast.error("fill all the details")
            )
        }

        else if ((inputData?.first_name.length < 3) || (inputData?.last_name.length < 3)) {
            return (
                toast.error("The first and last name should be atleast 3 characters")
            )
        }
        else if (isValidEmail(inputData?.email) === false) {
            return (
                toast.error("The email should include ' @ '")

            )
        }
        else {
            dispatch(addContact({ ...inputData, id: data.length + 1 }))
            toast.success("Contact Added!!")
            setModal(false);
            setInputData({})
        }
    }

    const handleAddScroll2 = () => {
        if (test) {
            const nextIndex = pageContacts.length
            const nextData = data.slice(nextIndex, nextIndex + 5)
            setPageContacts(prevData => [...prevData, ...nextData])
        } else {
            setTest(true)
            const nextIndex = pageContacts?.length
            const nextData = data?.slice(nextIndex, nextIndex + 10)
            setPageContacts(prevData => [...prevData, ...nextData])
        }
    }


    const handleFilters = () => {
        const checkedItems = document.querySelectorAll("#filter_active, #filter_male");
        const checkedFilters = [];
        checkedItems?.forEach((item) => {
            if (item?.checked) {
                checkedFilters?.push(item?.id);
            }
        });
        setArr(checkedFilters);
        setFilterModal(false);
    };


    console.log(pageContacts)


    return (
        <>
            <div className='content'>
                <div className="contactList">
                    <div className="onStatus_div mb-3 mt-2">
                        <div className="all_button d-flex flex-fill"

                        >
                            {/* Dropdown */}
                            <Col md={12}>
                                <FormGroup>

                                    <Input
                                        id="onStatus"
                                        name="onStatus"
                                        type="select"
                                        value={status}
                                        onChange={(e) => setStatus(e?.target?.value)}

                                    >
                                        <option value={"all"}>All</option>
                                        <option value={"active"}>Active</option>
                                        <option value={"inactive"}>Inactive</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </div>
                        <div className="active_button d-flex flex-fill ms-2 me-2">
                            <Col md={12}>
                                <FormGroup>

                                    <Input
                                        id="sort"
                                        name="sort"
                                        type="select"
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                    >
                                        <option value={"sort"}>Sort</option>
                                        <option value={"a_z"}>A-Z</option>
                                        <option value={"z_a"}>Z-A</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </div>
                        <div className="inactive_button d-flex flex-fill">
                            <Button className={`w-100 ${activeFilters ? "activeFilterBtn" : ""}`} onClick={handleFilterModal}>
                                <span className={(activeFilters || maleFilters) ? "activeFilterBtn" : ""}>
                                    <FeatherIcon icon="filter"
                                    />
                                </span>
                            </Button>
                            <Offcanvas
                                isOpen={filterModal}
                                toggle={handleFilterModal}
                                direction={'end'}
                            >
                                <OffcanvasHeader toggle={handleFilterModal}>
                                    <strong>Filter Contacts</strong>
                                </OffcanvasHeader>
                                <OffcanvasBody>
                                    <strong>
                                        <FormGroup check>
                                            <Input type="checkbox"
                                                id='filter_active'
                                                checked={activeFilters}
                                                onChange={() => setActiveFilters(!activeFilters)}
                                            />
                                            {' '}
                                            <Label check htmlFor='filter_active'>
                                                Active
                                            </Label>
                                        </FormGroup>
                                    </strong>

                                    <strong>
                                        <FormGroup check>
                                            <Input type="checkbox"
                                                id='filter_male'
                                                checked={maleFilters}
                                                onChange={() => setMaleFilters(!maleFilters)}
                                            />
                                            {' '}
                                            <Label check htmlFor='filter_male'>
                                                Male
                                            </Label>
                                        </FormGroup>
                                    </strong>




                                    <Button className='mt-5' color='primary' onClick={handleFilters}>
                                        Add Filters
                                    </Button>
                                </OffcanvasBody>
                            </Offcanvas>
                        </div>
                    </div>
                    <div className="search_contact_list">
                        <div className="searchAddDiv mb-2 mt-1">
                            <div className="searchDiv me-3">
                                <span><FeatherIcon icon="search" /></span>
                                <input type="text" placeholder='Search a contact..' className='ps-5' onChange={(e) => { setSearchItem(e?.target?.value) }} />
                            </div>
                            {/* <div className="addDiv" onClick={handleAdd}> */}
                            <div className="addDiv" onClick={handleAdd}>
                                <span>  <FeatherIcon icon="plus" /></span>
                            </div>
                            {/* Modal */}
                            <Modal isOpen={modal} toggle={handleAdd}>
                                <ModalHeader toggle={handleAdd}><span className='fw-bold'>Adding Contact..</span></ModalHeader>
                                <ModalBody>
                                    <span className='fw-bold mb-3'>Personal Info:</span>
                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Input
                                                        id="First_Name"
                                                        name="First Name"
                                                        placeholder="First Name"
                                                        type="text"
                                                        value={inputData?.first_name || ""}
                                                        onChange={(e) => {
                                                            setInputData({ ...inputData, first_name: e?.target?.value })
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Input
                                                        id="Last_Name"
                                                        name="Last Name"
                                                        placeholder="Last Name"
                                                        type="text"
                                                        value={inputData?.last_name || ""}
                                                        onChange={(e) => {
                                                            setInputData({ ...inputData, last_name: e?.target?.value })
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Input
                                                        id="Email"
                                                        name="email"
                                                        placeholder="email"
                                                        type="email"
                                                        value={inputData?.email || ""}
                                                        onChange={(e) => {
                                                            setInputData({ ...inputData, email: e?.target?.value })
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>

                                                    <Input
                                                        id="Gender"
                                                        name="Gender"
                                                        placeholder="Gender"
                                                        type="select"
                                                        value={inputData?.gender || ""}
                                                        onChange={(e) => {
                                                            setInputData({ ...inputData, gender: e?.target?.value })
                                                        }}

                                                    >
                                                        <option value="">Gender</option>
                                                        <option >Male</option>
                                                        <option>Female</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <FormGroup>
                                                <Input
                                                    id="Job_title"
                                                    name="Job_title"
                                                    placeholder="Job title"
                                                    type='text'
                                                    value={inputData?.job_title || ""}
                                                    onChange={(e) => {
                                                        setInputData({ ...inputData, job_title: e?.target?.value })
                                                    }}

                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    id="image_url"
                                                    name="image_url"
                                                    placeholder="Image URL"
                                                    type="text"
                                                    value={inputData?.avatar || ""}
                                                    onChange={(e) => {
                                                        setInputData({ ...inputData, avatar: e?.target?.value })
                                                    }}

                                                />
                                            </FormGroup>
                                        </Row>

                                        <Row>
                                            <Col md={4}>
                                                <Label>
                                                    <span className='fw-bold'>  Active:</span>
                                                </Label>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup check>
                                                    <Input
                                                        id="active"
                                                        name="active"
                                                        type='select'

                                                        value={inputData?.active || ""}
                                                        onChange={(e) => {
                                                            setInputData({ ...inputData, active: e?.target?.value === "true" || "false" })
                                                        }}
                                                    >
                                                        <option value="">active</option>
                                                        <option value="true">true</option>
                                                        <option value="false">false</option>
                                                    </Input>
                                                </FormGroup>


                                            </Col>
                                        </Row>

                                        {/* Address */}
                                        <FormGroup>
                                            <Label for="Address">
                                                <span className='fw-bold'>Address:</span>
                                            </Label>
                                            <Input
                                                id="Address"
                                                name="Address"
                                                placeholder="Line 1"
                                                value={inputData?.address?.line1 || ""}
                                                onChange={(e) => {
                                                    setInputData({
                                                        ...inputData, address: {
                                                            ...inputData?.address, line1: e.target.value
                                                        }
                                                    })
                                                }}

                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                id="City"
                                                name="city"
                                                placeholder="City"
                                                value={inputData?.address?.city || ""}
                                                onChange={(e) => {
                                                    setInputData({ ...inputData, address: { ...inputData?.address, city: e.target.value } })
                                                }}

                                            />
                                        </FormGroup>

                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Input
                                                        id="state"
                                                        name="state"
                                                        placeholder="State"
                                                        value={inputData?.address?.state || ""}
                                                        onChange={(e) => {
                                                            setInputData({ ...inputData, address: { ...inputData?.address, state: e.target.value } })
                                                        }}

                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Input
                                                        id="Country"
                                                        name="Country"
                                                        type='select'
                                                        value={inputData?.address?.country || ""}
                                                        onChange={(e) => {
                                                            setInputData({ ...inputData, address: { ...inputData?.address, country: e.target.value } })
                                                        }}

                                                    >
                                                        <option value="">Countries</option>
                                                        {countries?.map((c, index) => {
                                                            return (
                                                                <option key={index}>{c?.name?.common}</option>
                                                            )
                                                        })}

                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <div>
                                        <Button color="primary" onClick={handleAddContact}>
                                            Add Contact
                                        </Button>
                                    </div>
                                    <Button color="secondary" onClick={handleAdd}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div className="total_contacts">
                            <span><span className='fw-bold'>Total Contacts:</span> {data.length}</span>
                        </div>
                        {/* {(searchValue ? filterContacts ? status : statusData : data).map((e) => { */}
                        <PerfectScrollbar
                        // onYReachEnd={() => {
                        //     pageContacts[pageContacts?.length - 1]?.id !== data[data?.length - 1]?.id && handleAddScroll2()
                        // }
                        // }
                        >
                            <div className="contact_list_scroll">
                                {/* {(searchValue ? filterContacts : test ? pageContacts : data.slice(0, 10)).map((e) => { */}
                                {combine_sort_filter_search(status, sort, searchValue).map((e) => {
                                    return (
                                        <>
                                            <div key={e.id} className='contactSlab' onClick={() => { handleContactList(e) }}>
                                                <div className="profile-div" >
                                                    <div className="img-div">
                                                        <img src={e.avatar} alt="" />
                                                        <div className="contact_list_active" style={e?.active === true ? { backgroundColor: "#02d302" } : { backgroundColor: "grey" }}>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="name-email-div">
                                                    <p><strong>{e.first_name + " " + e.last_name}</strong></p>
                                                    <p>{e.email}</p>
                                                </div>
                                                <br />

                                            </div>

                                        </>
                                    )
                                })}
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
                <div className="subContent">

                    {/* {selectedContact !== null && <ContactInfo info={selectedContact} />} */}

                    {/* {selectedContact !== null ? <ContactInfo info={selectedContact} /> : <InitialInfo />} */}
                    {selectedContact !== null ? <ContactInfo /> : <InitialInfo />}

                </div>
            </div >

        </>
    )
}


export default Contacts;


// I want the values of the checked items in the Offcanvas to be pushed in arr empty array and whenever the arr.length !== 0 create a state and use that in combined function 