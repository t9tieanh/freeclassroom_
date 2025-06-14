import Card from 'react-bootstrap/Card';
import { CiTimer } from "react-icons/ci";
import './style.scss'

const Description = () => {
    return (
        <div className='description-container row align-items-start' >
            <Card className="text-start">
                <Card.Body className='row align-items-start'>
                    <Card.Title className="fs-6"><CiTimer /> Opened: Thứ Tư, 12 tháng 2 2025, 12:00 AM</Card.Title>
                    <hr style={{ border: '1px solid black', width: '100%' }} />
                    <Card.Text>
                        <ul>
                            Số lượng usecase càng nhiều càng tốt
                            <li>Có đủ 2 loại actor: user và hệ thống ngoài</li>
                            <li>Có đủ 2 loại actor: user và hệ thống ngoài</li>
                            <li>Có đủ 2 loại actor: user và hệ thống ngoài</li>
                            <li>Có đủ 2 loại actor: user và hệ thống ngoài</li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Description