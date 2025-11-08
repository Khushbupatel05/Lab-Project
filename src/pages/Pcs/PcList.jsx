import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PcContext } from "../../context/PcContextProvider";
import { LabContext } from "../../context/LabContextProvider";

const PcList = () => {
  const navigate = useNavigate();
  const { pcsList, deletePc, getLabNameForPc, markPcInRepair, markPcAvailable } =
    useContext(PcContext);
  const { labs } = useContext(LabContext);

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-5 md:px-12 py-20 text-gray-800">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1b1e7b]">
          PC Inventory
        </h1>
        <button
          onClick={() => navigate("/add-pc")}
          className="bg-gradient-to-r from-[#8840d4] to-[#420682] hover:scale-105 transition-all text-white font-semibold px-6 py-2.5 rounded-lg shadow-md w-full md:w-auto"
        >
          + Add PC
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-[#1b1e7b] text-white text-left">
            <tr>
              <th className="py-4 px-5 font-semibold rounded-tl-2xl">#</th>
              <th className="py-4 px-5 font-semibold">PC Name</th>
              <th className="py-4 px-5 font-semibold">Lab</th>
              <th className="py-4 px-5 font-semibold">Status</th>
              <th className="py-4 px-5 font-semibold">Created On</th>
              <th className="py-4 px-5 text-center font-semibold">Actions</th>
              <th className="py-4 px-5 text-center font-semibold rounded-tr-2xl">
                Toggle Status
              </th>
            </tr>
          </thead>

          <tbody>
            {pcsList.length > 0 ? (
              pcsList.map((pc, index) => (
                <tr
                  key={pc.id}
                  className="border-b border-gray-200 hover:bg-[#f3f4ff] transition-all duration-200"
                >
                  <td className="py-4 px-5">{index + 1}</td>
                  <td className="py-4 px-5 font-semibold text-[#1b1e7b]">
                    {pc.name}
                  </td>
                  <td className="py-4 px-5">{getLabNameForPc(pc.labId)}</td>
                  <td className="py-4 px-5">
                    {pc.status === "In-Repair" ? (
                      <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                        In Repair
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        Available
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-gray-600">
                    {pc.createdAt?.toDate
                      ? pc.createdAt.toDate().toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => navigate(`/edit-pc/${pc.id}`)}
                        className="text-green-500 hover:opacity-90 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePc(pc.id)}
                        className="text-red-500 font-medium hover:opacity-90 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-center">
                    {pc.status !== "In-Repair" ? (
                      <button
                        onClick={() => markPcInRepair(pc.id)}
                        className="text-yellow-600 font-medium hover:opacity-90 transition-all"
                      >
                        Mark In-Repair
                      </button>
                    ) : (
                      <button
                        onClick={() => markPcAvailable(pc.id)}
                        className="text-blue-600 font-medium hover:opacity-90 transition-all"
                      >
                        Make Available
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-gray-600">
                <td colSpan="7" className="py-10">
                  <div className="text-lg font-semibold text-[#1b1e7b]">
                    No PCs found
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Add a new PC to get started.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PcList;
