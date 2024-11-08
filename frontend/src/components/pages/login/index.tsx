import { FormEvent, useEffect, useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
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
import { LoginData } from "../../../@types";

function LoginPage() {
  const navigate = useNavigate();

  const { login, user } = useAuth();
  const [message, setMessage] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = Object.fromEntries(
        new FormData(e.target as HTMLFormElement).entries()
      ) as any as LoginData;
      const response = await login(data);
      setMessage("Login successful!");
      console.log("Login successful:", response);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        console.error("Login failed:", error.message);
      } else {
        setMessage("An unknown error occurred.");
        console.error("Login failed:", error);
      }
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
                Sign in
              </p>
              <form onSubmit={handleLogin} className="w-100">
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    name="email"
                    label="Your Email"
                    id="form2"
                    type="email"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    name="password"
                    label="Password"
                    id="form3"
                    type="password"
                  />
                </div>

                <MDBBtn className="mb-4" size="lg">
                  Login
                </MDBBtn>

                <MDBBtn
                  href="http://localhost:5173/register"
                  className="mb-4"
                  size="lg"
                >
                  Don't have an account? Register now!
                </MDBBtn>

                {message && <p>{message}</p>}
              </form>
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

export default LoginPage;
