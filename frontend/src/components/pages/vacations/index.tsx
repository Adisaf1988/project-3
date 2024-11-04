import { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import { SendToApiVacations } from "./service";
import AuthGuarded from "../../AuthGuard";

function VacationsPage() {
  interface Vacation {
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    price: number;
  }

  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [liked, setLiked] = useState<boolean[]>([]);
  const [showOnlyFollowed, setShowOnlyFollowed] = useState<boolean>(false);
  const [showNotStarted, setShowNotStarted] = useState<boolean>(false);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const vacationsPerPage = 10;

  useEffect(() => {
    async function fetchVacations() {
      const data = await SendToApiVacations();
      setVacations(data);
      setLikes(new Array(data.length).fill(0));
      setLiked(new Array(data.length).fill(false));
    }
    fetchVacations();
  }, []);

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLike = (index: number) => {
    const newLikes = [...likes];
    const newLiked = [...liked];
    if (newLiked[index]) {
      newLikes[index]--;
    } else {
      newLikes[index]++;
    }
    newLiked[index] = !newLiked[index];
    setLikes(newLikes);
    setLiked(newLiked);
  };

  const handleFilterChange = () => {
    setShowOnlyFollowed(!showOnlyFollowed);
  };

  const handleNotStartedChange = () => {
    setShowNotStarted(!showNotStarted);
  };

  const handleActiveChange = () => {
    setShowActive(!showActive);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const clearFilters = () => {
    setShowOnlyFollowed(false);
    setShowNotStarted(false);
    setShowActive(false);
  };

  const filteredVacations = vacations.filter((vacation, index) => {
    const isFollowed = showOnlyFollowed ? liked[index] : true;
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

  return (
    <div>
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
                src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                fluid
                alt="..."
              />
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
                onClick={() => handleLike(index)}
              >
                <i
                  className="fas fa-star"
                  style={{ color: liked[index] ? "yellow" : "white" }}
                ></i>
                <span style={{ marginLeft: "2px", color: "white" }}>
                  {likes[index]}
                </span>
              </button>
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            </MDBRipple>
            <MDBCardBody>
              <MDBCardTitle>
                <strong>{vacation.destination}</strong>
              </MDBCardTitle>
              <MDBCardText>
                {vacation.description}
                <br />
                {formatDate(vacation.start_date)} -{" "}
                {formatDate(vacation.end_date)}
              </MDBCardText>
              <MDBBtn style={{ fontSize: "1rem" }}>
                Price: {vacation.price}$
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === index + 1 ? "#007bff" : "#fff",
              color: currentPage === index + 1 ? "#fff" : "#000",
              border: "1px solid #007bff",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AuthGuarded(VacationsPage);
