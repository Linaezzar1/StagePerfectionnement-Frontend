import React from 'react';
import './Header.css';
import { Box, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Dropdown } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";

const Header = () => {

    const navigate = useNavigate();

    return (
        <div className='boxContainer'>
            <Box display="flex" justifyContent="space-between" p={2} >
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
                            <Dropdown.Item onClick={ ()=>  navigate('/profile') }> <CgProfile /> My Profile </Dropdown.Item>
                            <Dropdown.Item onClick={ ()=>  navigate('/dashboard/maindash') }> <MdOutlineDashboard /> Dashboard</Dropdown.Item>
                            <Dropdown.Item onClick={ ()=>  navigate('/mainAnalytics') }> <MdOutlineAnalytics /> Analytics</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" className='logout-menu'><LuLogOut className='icon-logout' /> Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Box>
            </Box>
        </div>
    );
};

export default Header;