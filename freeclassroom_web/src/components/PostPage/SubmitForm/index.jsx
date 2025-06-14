import React, { useState } from 'react';
import { Button, Badge, Form, Container, Row, Col } from 'react-bootstrap';
import './style.scss'; 

const SubmissionForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Container className="mt-4">
       
        {/* thêm bài nộp */}
    <h6>
        <Badge bg="primary">Thêm bài nộp</Badge>
    </h6>


      <Form>
        <Row className="mb-3">
          <Col>
            <div
              className="border border-dashed p-5 text-center"
              style={{ minHeight: '150px' }}
            >
              <div className="mb-3">
                <i className="bi bi-download" style={{ fontSize: '2rem' }}></i>
              </div>
              <p>Tải lên tập tin</p>
              <Form.Group controlId="formFile" className="d-none">
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Button
                variant="outline-dark"
                onClick={() =>
                  document.getElementById('formFile').click()
                }
              >
                <i class="fa-solid fa-copy"></i>
              </Button>
              {selectedFile && (
                <p className="mt-2">Tệp đã chọn: {selectedFile.name}</p>
              )}
            </div>
          </Col>
        </Row>


        <Row>
          <Col>
            <Button variant="primary" type="submit" className="me-2">
              Lưu chỉnh thay đổi
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SubmissionForm;