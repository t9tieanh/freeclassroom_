import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem } from 'react-icons/fa';

const SidebarComponent = ({className}) => {
    return (
        <>
        <Sidebar backgroundColor={className}>
            <Menu>
                <SubMenu label='@Free Class Room' icon={<FaGem />}>
                <MenuItem> Tìm kiếm thêm </MenuItem>
                <MenuItem> Class List </MenuItem>
                </SubMenu>
                <MenuItem> Tìm kiếm thêm </MenuItem>
                <MenuItem> Lọc thêm </MenuItem>
            </Menu>
        </Sidebar>
        </>
    )
}

export default SidebarComponent