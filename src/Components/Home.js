import { useDispatch, useSelector } from "react-redux";
import { togglePinnedContact } from "../Toolkit/InfoSlice";
import PerfectScrollbar from 'react-perfect-scrollbar'

const Home = () => {
    const pinnedContacts = useSelector((store) => store.InfoSlice.pinnedContacts);
    const contactData = useSelector((store) => store.ContactSlice.contactData);
    const dispatch = useDispatch();


    const handleFavoriteHome = (contactId) => {
        dispatch(togglePinnedContact(contactId));
    };

    return (
        <div className="content d-flex flex-column">
            <div className="home_page_header d-flex flex-column">
                <div className="home_Page_title d-flex justify-content-center align-item-center">Home Page</div>
                <div className="favorites_homepage d-flex p-3 ps-5 fw-bold">Favorite Contacts will Appper here</div>
            </div>
            <div className="pinned_contacts_home">
                <PerfectScrollbar id="scroll_favorite_home">
                    {pinnedContacts.map((contactId) => {
                        const contact = contactData.find((c) => c.id === contactId);
                        return (
                            <div className="favorite_home_div ms-3 mb-3 mt-3" key={contact.id}>
                                <span className="me-3">  {contact.first_name} {contact.last_name} {" "}
                                </span>
                                <span onClick={() => handleFavoriteHome(contact.id)}>
                                    <span className="material-symbols-outlined favorite_icon_home d-flex justify-content-center">
                                        favorite
                                    </span>
                                </span>
                            </div>
                        );
                    })}
                </PerfectScrollbar>
            </div>
        </div>
    );
};

export default Home;
