import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "reactstrap"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sideText">
        <p>
          <span>Welcome ! </span>
          <span>I'm Sayeed</span>
        </p>
      </div>
      <div className="sidebarlist-div">
        <ul className='sidebar-list'>
          <li><Link to="/">
            <div className='side-btn-div'>
              <Button>
                Home
              </Button>
            </div>
          </Link>
          </li>
          <li><Link to="/contacts">
            <div className="side-btn-div">
              <Button>
                Contacts
              </Button>
            </div>
          </Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
