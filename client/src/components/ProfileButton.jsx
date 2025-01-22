// import React from "react";
// import { Dropdown } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";

// const ProfileButton = ({ onLogout, profileImage }) => {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="white" className="d-flex align-items-center shadow-none border-0">
//         {profileImage ? (
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="rounded-circle me-2"
//             style={{ width: '25px', height: '25px', objectFit: 'cover' }}
//           />
//         ) : (
//           <FaUserCircle className="fs-3 text-primary me-2" />
//         )}
//         <span className="fw-bold">Profile</span>
//       </Dropdown.Toggle>

//       <Dropdown.Menu align="end" className="mt-2 shadow-lg">
//         <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
//         <Dropdown.Item href="/settings">Settings</Dropdown.Item>
//         <Dropdown.Divider />
//         <Dropdown.Item onClick={onLogout} className="text-danger">
//           Logout
//         </Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// export default ProfileButton;

import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const ProfileButton = ({ onLogout, profileImage }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="white" className="d-flex align-items-center shadow-none border-0">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle me-2"
            style={{ width: '25px', height: '25px', objectFit: 'cover' }}
          />
        ) : (
          <FaUserCircle className="fs-3 text-primary me-2" /> // Show icon if no profile image
        )}
        <span className="fw-bold">Profile</span>
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="mt-2 shadow-lg">
        <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
        <Dropdown.Item href="/settings">Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onLogout} className="text-danger">
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileButton;

