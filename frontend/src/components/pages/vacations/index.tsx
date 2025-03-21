import { useCallback, useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import { deleteVacation, followVacation, SendToApiVacations } from "./service";
import AuthGuarded from "../../AuthGuard";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Vacation } from "../../../@types";

function VacationsPage() {
  const { user, addFollow, followedVacations } = useAuth();
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [showOnlyFollowed, setShowOnlyFollowed] = useState<boolean>(false);
  const [showNotStarted, setShowNotStarted] = useState<boolean>(false);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const vacationsPerPage = 10;
  const nav = useNavigate();

  useEffect(() => {
    async function fetchVacations() {
      const data = await SendToApiVacations();
      setVacations(data);
    }
    fetchVacations();
  }, []);

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleFilterChange = () => {
    setShowOnlyFollowed(!showOnlyFollowed);
    setCurrentPage(1);
  };

  const handleNotStartedChange = () => {
    setShowNotStarted(!showNotStarted);
    setCurrentPage(1);
  };

  const handleActiveChange = () => {
    setShowActive(!showActive);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (vacationId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this vacation?"
    );
    if (!isConfirmed) return;

    console.log("Vacation ID to delete:", vacationId);
    try {
      const response = await deleteVacation(vacationId);

      setVacations(vacations.filter((v) => v.id !== vacationId));
      console.log("Delete response:", response);
    } catch (error) {
      console.error("Error deleting vacation:", error);
    }
  };

  const follow = async (vacationId: number) => {
    console.log("Vacation ID to delete:", vacationId);
    try {
      await followVacation(vacationId, +user!.users_id);
      addFollow(vacations.find((v) => v.id == vacationId)!);
    } catch (error) {
      console.error("Error deleting vacation:", error);
    }
  };

  const clearFilters = () => {
    setShowOnlyFollowed(false);
    setShowNotStarted(false);
    setShowActive(false);
    setCurrentPage(1);
  };

  const filteredVacations = vacations.filter((vacation) => {
    const isFollowed = showOnlyFollowed
      ? followedVacations.some((v) => v.id == vacation.id)
      : true;
    const isNotStarted = showNotStarted
      ? new Date(vacation.start_date) > new Date()
      : true;
    const isActive = showActive
      ? new Date(vacation.start_date) <= new Date() &&
        new Date(vacation.end_date) >= new Date()
      : true;
    return isFollowed && isNotStarted && isActive;
  });

  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = filteredVacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const totalPages = Math.ceil(filteredVacations.length / vacationsPerPage);

  const CardActions = useCallback(
    ({ index }: { index: number }) => {
      if (user?.role === "admin") {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 1,
            }}
          >
            <button
              onClick={() =>
                nav("/edit-vacation", { state: currentVacations[index] })
              }
              style={{
                cursor: "pointer",
                borderRadius: "2rem",
                padding: ".5rem",
                border: "1px solid lightgray",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                console.log("Current vacation:", currentVacations[index]);
                handleDelete(currentVacations[index].id);
              }}
              style={{
                cursor: "pointer",
                borderRadius: "2rem",
                padding: ".5rem",
                border: "1px solid lightgray",
              }}
            >
              Delete
            </button>
          </div>
        );
      }
      return (
        <button
          type="button"
          className="btn btn-outline-success btn-floating"
          data-mdb-ripple-init
          data-mdb-ripple-color="dark"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "none",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => follow(currentVacations[index].id)}
        >
          <i
            className="fas fa-star"
            style={{
              color: followedVacations.some(
                (v) => v.id === currentVacations[index].id
              )
                ? "yellow"
                : "white",
            }}
          ></i>

          <span style={{ marginLeft: "2px", color: "white" }}></span>
        </button>
      );
    },
    [followedVacations, follow, vacations, user, currentVacations]
  );

  return (
    <div>
      {user?.role === "admin" && (
        <button
          onClick={() => nav("/add-vacation")}
          style={{
            margin: "15px auto",
            padding: "10px 20px",
            backgroundColor: "rgb(0, 123, 255)",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "block",
          }}
        >
          Add Vacation
        </button>
      )}

      {user?.role !== "admin" && (
        <div className="form-check form-check-inline">
          <input
            style={{ marginTop: 15, marginBottom: 15 }}
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
            checked={showOnlyFollowed}
            onChange={handleFilterChange}
          />
          <label
            style={{ marginTop: 10 }}
            className="form-check-label"
            htmlFor="inlineCheckbox1"
          >
            Show Only Followed Vacations
          </label>
        </div>
      )}

      <div className="form-check form-check-inline">
        <input
          style={{ marginTop: 15, marginBottom: 15 }}
          className="form-check-input"
          type="checkbox"
          id="inlineCheckbox2"
          value="option2"
          checked={showNotStarted}
          onChange={handleNotStartedChange}
        />
        <label
          style={{ marginTop: 10 }}
          className="form-check-label"
          htmlFor="inlineCheckbox2"
        >
          Show Vacations That Have Not Started
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          style={{ marginTop: 15, marginBottom: 15 }}
          className="form-check-input"
          type="checkbox"
          id="inlineCheckbox3"
          value="option3"
          checked={showActive}
          onChange={handleActiveChange}
        />
        <label
          style={{ marginTop: 10 }}
          className="form-check-label"
          htmlFor="inlineCheckbox3"
        >
          Show Currently Active Vacations
        </label>
      </div>
      <button
        onClick={clearFilters}
        style={{
          margin: "15px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear Filters
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {currentVacations.map((vacation, index) => (
          <MDBCard key={index} style={{ position: "relative" }}>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
              <MDBCardImage
                src={`http://localhost:3002/uploads/${vacation.vacation_photo}`}
                fluid
                alt="..."
              />
              <CardActions index={index} />
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
            <MDBCardBody
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <MDBCardTitle>
                  <strong>{vacation.destination}</strong>
                </MDBCardTitle>
                <MDBCardText>
                  {vacation.description}
                  <br />
                  {formatDate(vacation.start_date)} -{" "}
                  {formatDate(vacation.end_date)}
                </MDBCardText>
              </div>
              <MDBBtn style={{ fontSize: "1rem", marginTop: "auto" }}>
                Price: {vacation.price}$
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === page ? "#007bff" : "#ddd",
              color: currentPage === page ? "#fff" : "#000",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AuthGuarded(VacationsPage);
