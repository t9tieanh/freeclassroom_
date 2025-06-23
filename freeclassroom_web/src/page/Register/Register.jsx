import React from "react";
import  "./style.scss";
import RegisterForm from "~/components/RegisterPage/RegisterForm";
import { Container, Row, Col } from "react-bootstrap";

const RegisterPage = () => {
    return (
        <section className="register-content">
            <div className="px-4 py-5 px-md-5 text-center text-lg-start">
                <Container>
                    <Row className="gx-lg-5 align-items-center">
                        <Col xs={6} className="mb-5 mb-lg-0">
                            <h1 className="my-5 display-3 fw-bold ls-tight">
                                Free <br />
                                <span className="text-primary">classroom</span>
                            </h1>
                            <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                                Developed by Pham Tien Anh @t9tieanh
                            </p>
                        </Col>
                        <Col>
                            <div className="card">
                                <div className="card-body py-5 px-md-5">
                                    <RegisterForm />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export default RegisterPage;
