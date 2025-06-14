import React, { useState } from 'react';
import { Container, Table, Button, Dropdown, Badge } from 'react-bootstrap';
import './style.scss'; 

const SubmissionStatus = () => {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      status: 'Đã chấm xong',
      submittedAt: '2025-03-20 14:30',
      score: 8.5,
      note: 'Bài làm tốt, cần cải thiện phần trình bày.',
      file: 'bai_nop_1.pdf',
    },
    {
      id: 2,
      status: 'Trễ hạn',
      submittedAt: '2025-03-21 09:15',
      score: null,
      note: 'Nộp muộn, cần xem lại thời gian.',
      file: 'bai_nop_2.pdf',
    },
  ]);

  // Hàm để hiển thị màu sắc trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Đã chấm xong':
        return <Badge bg="success">{status}</Badge>;
      case 'Trễ hạn':
        return <Badge bg="danger">{status}</Badge>;
      case 'Đang chấm':
        return <Badge bg="warning">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6><Badge bg="primary"> Trạng thái bài nộp</Badge></h6>
      </div>

      {/* Nếu không có bài nộp */}
      {submissions.length === 0 ? (
        <div className="text-center p-4 bg-light border rounded">
          <p>Chưa có bài nộp nào.</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Trạng thái bài nộp</th>
              <th>Thời gian nộp</th>
              <th>Điểm số</th>
              <th>Ghi chú</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{getStatusBadge(submission.status)}</td>
                <td>{submission.submittedAt}</td>
                <td>{submission.score ? submission.score : '-'}</td>
                <td>{submission.note || '-'}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    href={`/download/${submission.file}`}
                  >
                    Tải xuống
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default SubmissionStatus;