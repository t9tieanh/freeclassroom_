import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem } from 'react-icons/fa';

const SidebarComponent = ({className}) => {
    return (
        <>
        <Sidebar backgroundColor={className}>
            <Menu>
                <SubMenu label='Class Management' icon={<FaGem />}>
                <MenuItem> Add Class </MenuItem>
                <MenuItem> Class List </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Sidebar>
        </>
    )
}

export default SidebarComponent