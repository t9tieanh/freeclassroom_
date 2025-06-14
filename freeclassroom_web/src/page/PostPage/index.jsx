import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Description from '../../components/PostPage/DescriptionComponent';
import SubmissionForm from '../../components/PostPage/SubmitForm/index.jsx';
import { useState } from 'react';
import SubmissionStatus from '../../components/PostPage/SubmitStatus/index.jsx';

const PostPage = () => {


    const [isAddPage, setIsAddPage] = useState(true)

    return (
        <Card>
            <Card.Body className='align-items-start'>


            {/* description */}
            <Description />

                {isAddPage && <>
                    <Button variant="outline-dark" onClick={() => {setIsAddPage(false)}}>Hủy bỏ</Button>
                    <SubmissionForm />
                </>}

                {!isAddPage && <>
                    <Button variant="primary" onClick={() => {setIsAddPage(true)}}>Thêm bài nộp</Button>
                    <SubmissionStatus />
                </>}


            </Card.Body>
        </Card>
    )
}

export default PostPage