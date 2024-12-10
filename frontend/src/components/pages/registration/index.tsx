import React, { useEffect, useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { RegisterData } from "../../../@types";

function RegisterPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = Object.fromEntries(
        new FormData(e.target as HTMLFormElement).entries()
      ) as any as RegisterData;
      const response = await register(data);
      setMessage("Registration successful!");
      console.log("Registration successful:", response);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        console.error("Registration failed:", error.message);
      } else {
        setMessage("An unknown error occurred.");
        console.error("Registration failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/vacations");
    }
  }, [user]);

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>

              <form onSubmit={handleSubmit} className="w-100">
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="First Name"
                    id="form1"
                    type="text"
                    name="firstName"
                    className="w-100"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Last Name"
                    id="form2"
                    type="text"
                    name="lastName"
                    className="w-100"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    id="form3"
                    type="email"
                    name="email"
                    className="w-100"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form4"
                    type="password"
                    name="password"
                    className="w-100"
                  />
                </div>

                <MDBBtn className="mb-4" size="lg" disabled={loading}>
                  {loading ? (
                    <div className="spinner-border spinner-border-sm text-light" />
                  ) : (
                    "Register"
                  )}
                </MDBBtn>
              </form>

              {message && <p>{message}</p>}

              <MDBBtn
                onClick={() => navigate("/login")}
                className="mb-4"
                size="lg"
              >
                Already a member? Login
              </MDBBtn>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default RegisterPage;
