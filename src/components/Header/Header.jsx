import React from 'react';
import './Header.css';
import { Box, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Dropdown } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

const Header = () => {
    return (
        <div className='boxContainer'>
            <Box display="flex" justifyContent="space-between" p={2}>
                {/* SEARCH BAR */}
                <Box
                    display="flex"
                    borderRadius="3px"
                >
                </Box>

                {/* ICONS */}
                <Box display="flex" sx={{ marginLeft: 'auto', gap: '8px' }}>

                    {/* Notification Icon */}
                    <IconButton>
                        <NotificationsOutlinedIcon />
                    </IconButton>

                    {/* User Icon with Dropdown */}
                    <Dropdown>
                        <Dropdown.Toggle as={IconButton} id="dropdown-user">
                            <PersonOutlinedIcon />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='dropdown-menu'>
                            <Dropdown.Item href="#/action-1"> <CgProfile /> My Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2"> <IoSettingsOutline /> Settings</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" className='logout-menu'><LuLogOut className='icon-logout' /> Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Box>
            </Box>
        </div>
    );
};

export default Header;