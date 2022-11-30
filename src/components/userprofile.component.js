import React from "react";
import "./userprofile.component.css";

import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react'
import { FaUserCircle } from "react-icons/fa";
// import { Button } from "bootstrap";

function Userprofile(){
        return(
            <CDropdown variant="btn-group">
            <CDropdownToggle color="white" size="lg"> <FaUserCircle color="#231f20" fontSize="1.9em" /></CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="/profile">My Profile</CDropdownItem>
              {/* <CDropdownItem href="#">Another action</CDropdownItem> */}
              {/* <CDropdownItem href="#">Something else here</CDropdownItem> */}
              <CDropdownDivider/>
              <CDropdownItem href="/rewards" >
                  {/* Logout */}
                  Rewards
              </CDropdownItem>
              {/* <CDropdownDivider/> */}
              {/* <CDropdownItem href="/login">Logout</CDropdownItem> */}

            </CDropdownMenu>
          </CDropdown>
    );
}

export default Userprofile;