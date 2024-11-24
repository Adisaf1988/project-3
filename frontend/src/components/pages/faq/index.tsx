import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function FaqPage() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>How do I register for the website?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "left" }}>
            To register for the website, click the "Sign Up" button on the main
            page, fill in your personal details (first name, last name, email,
            and password), and click "Register." After that, you can log in and
            enjoy all our features.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>
            Are there any promotions or discounts on specific vacations?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "left" }}>
            Yes, from time to time, we offer special promotions and discounts.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography>
            What should I do if I encounter a technical issue on the website?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "left" }}>
            In case of a technical issue, we recommend first checking if there’s
            an updated version of your browser. If the issue persists, you can
            contact our technical support team.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography>How can I follow vacations that interest me?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "left" }}>
            To follow vacations, click on the "Star" icon next to the vacation
            you like. All the vacations you select will appear on the "My
            Favorite Vacations" page.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
