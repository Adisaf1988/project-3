import { BarChart } from "@mui/x-charts/BarChart";
import AdminGuard from "../../AdminGuard";
import { useEffect, useState } from "react";
import { FollowData } from "../../../@types";
import { getAllFollows } from "./service";

function VacationsReports() {
  const [followData, setFollowData] = useState<FollowData[]>([]);

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        const data = await getAllFollows();
        setFollowData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFollowData();
  }, []);

  function saveReportsToCSV() {
    const filename = "reports.csv";
    let content = `Destination,Follows\n`;
    for (var follow of followData) {
      content += `${follow.destination},${follow.follows}\n`;
    }
    downloadCSV(filename, content);
  }
  function downloadCSV(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/csv" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);

    a.download = filename;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  return (
    <div>
      <BarChart
        series={[{ data: followData.map((f) => f.follows), color: "#1976d2" }]}
        height={290}
        xAxis={[
          { data: followData.map((f) => f.destination), scaleType: "band" },
        ]}
        margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
      />
      <button
        onClick={() => saveReportsToCSV()}
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
        Download to CSV
      </button>
    </div>
  );
}

export default AdminGuard(VacationsReports);
