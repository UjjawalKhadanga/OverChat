import React from 'react'

function SideBar(props) {
  return (
    <div className="container bg-light">
      <div className="p-3 bg-light position-fixed h-100 col-2">
        <button className="btn d-flex align-items-center me-md-auto">
          <span className="fs-4">{props.roomName}</span>
        </button>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            Active Users
          </li>
            {
             props.roomMembers.map((member)=>{
                return <li className="nav-item">
                        {member.username}
                        <span className="text-muted small"> {member.userID} </span>
                       </li>
             }) 
            }
        </ul>
        <hr />
      </div>
    </div>
  )
}

export default SideBar