import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { LabContext } from "../context/LabContextProvider";
import { PcContext } from "../context/PcContextProvider";
import { StudentContext } from "../context/StudentContextProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { labs = [], fetchLab } = useContext(LabContext);
  const { pcs = [], fetchPc } = useContext(PcContext);
  const { students = [], fetchStudent } = useContext(StudentContext);

  useEffect(() => {
    if (fetchLab) fetchLab();
    if (fetchPc) fetchPc();
    if (fetchStudent) fetchStudent();
  }, []);

  const safeLabs = Array.isArray(labs) ? labs : [];
  const safePcs = Array.isArray(pcs) ? pcs : [];
  const safeStudents = Array.isArray(students) ? students : [];

  const pcCounts = labs.map((lab) =>
    pcs.filter((pc) => pc.labId === lab.id).length
  );

  const statusCount = { Available: 0, Occupied: 0, "In-Repairing": 0 };
 safePcs.forEach((pc) => {
  const status = pc.status?.toLowerCase();
  if (status === "available") statusCount.Available++;
  else if (status === "occupied") statusCount.Occupied++;
  else if (status === "in-repair" || status === "in-repairing") statusCount["In-Repairing"]++;
});


  const isLoading =
    safeLabs.length === 0 &&
    safePcs.length === 0 &&
    safeStudents.length === 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-6 md:px-12 py-10 text-gray-800">

      <div className="bg-gradient-to-r from-[#1a0e9e] to-[#463eda] text-white p-8 rounded-2xl shadow-md mb-10">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.displayName || "Admin"} 👋
        </h1>
        <p className="text-white/80 mt-2 text-sm">
          Here’s a quick overview of your system activity and performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all">
          <h3 className="text-[#1b1e7b] font-semibold text-lg">Total Labs</h3>
          <p className="text-4xl font-bold text-[#893eda] mt-3">
            {safeLabs.length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all">
          <h3 className="text-[#1b1e7b] font-semibold text-lg">Total PCs</h3>
          <p className="text-4xl font-bold text-[#9d4d6a] mt-3">
            {safePcs.length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all">
          <h3 className="text-[#1b1e7b] font-semibold text-lg">
            Total Students
          </h3>
          <p className="text-4xl font-bold text-[#1b1e7b] mt-3">
            {safeStudents.length}
          </p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-[#1b1e7b] mb-4">
            💻 PCs per Lab (Trend)
          </h3>
          <div className="h-[300px]">
            <Line
              data={{
                labels: safeLabs.map((lab) => lab.name),
                datasets: [
                  {
                    label: "PCs Count",
                    data: pcCounts,
                    borderColor: "#893eda",
                    backgroundColor: "rgba(137, 62, 218, 0.2)",
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: "#9d4d6a",
                    pointBorderColor: "#fff",
                    pointHoverRadius: 6,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: true },
                },
                scales: {
                  x: { ticks: { color: "#1b1e7b" } },
                  y: {
                    beginAtZero: true,
                    ticks: { color: "#1b1e7b", stepSize: 1 },
                    grid: { color: "#e5e7eb" },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-[#1b1e7b] mb-4">
            🖥️ PC Status Overview
          </h3>
          <div className="w-[80%] h-[300px]">
            <Radar
              data={{
                labels: ["Available", "Occupied", "In-Repairing"],
                datasets: [
                  {
                    label: "PC Status",
                    data: [
                      statusCount.Available,
                      statusCount.Occupied,
                      statusCount["In-Repairing"],
                    ],
                    backgroundColor: "rgba(157, 77, 106, 0.3)",
                    borderColor: "#9d4d6a",
                    pointBackgroundColor: "#893eda",
                    pointBorderColor: "#fff",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    angleLines: { color: "#e5e7eb" },
                    grid: { color: "#e5e7eb" },
                    pointLabels: { color: "#1b1e7b" },
                    ticks: { display: false },
                  },
                },
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

