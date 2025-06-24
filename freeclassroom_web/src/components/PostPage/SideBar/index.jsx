import './style.scss'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaNewspaper } from "react-icons/fa";

const SidebarComponent = ({className}) => {
    return (
        <>
        <Sidebar backgroundColor={className}>
            <Menu title='Bài viết liên quan'>
                <MenuItem icon={<FaNewspaper/>}> Documentation </MenuItem>
                <MenuItem icon={<FaNewspaper/>}> Calendar </MenuItem>
            </Menu>
        </Sidebar>
        </>
    )
}

export default SidebarComponent