import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PcContext } from "../../context/PcContextProvider";
import { LabContext } from "../../context/LabContextProvider";

const PcList = () => {
  const navigate = useNavigate();
  const { pcsList, deletePc, getLabNameForPc, markPcInRepair, markPcAvailable } =
    useContext(PcContext);
  const { labs } = useContext(LabContext);

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12 text-gray-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">PC Inventory</h1>
        <button
          onClick={() => navigate("/add-pc")}
          className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 transition w-full md:w-auto"
        >
          + Add PC
        </button>
      </div>

      {/* PC Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-black text-white uppercase text-left">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">PC Name</th>
              <th className="px-4 py-3">Lab</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-center">Actions</th>
              <th className="px-4 py-3 text-center">Toggle Status</th>
            </tr>
          </thead>
          <tbody>
            {pcsList.length > 0 ? (
              pcsList.map((pc, idx) => (
                <tr key={pc.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{pc.name}</td>
                  <td className="px-4 py-3">{getLabNameForPc(pc.labId)}</td>
                  <td className="px-4 py-3 capitalize">{pc.status}</td>
                  <td className="px-4 py-3">
                    {pc.createdAt?.toDate
                      ? pc.createdAt.toDate().toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => navigate(`/edit-pc/${pc.id}`)}
                        className="text-blue-700 hover:underline font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePc(pc.id)}
                        className="text-red-600 hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {pc.status !== "In-Repair" ? (
                      <button
                        onClick={() => markPcInRepair(pc.id)}
                        className="text-yellow-600 hover:underline font-medium"
                      >
                        Mark In-Repair
                      </button>
                    ) : (
                      <button
                        onClick={() => markPcAvailable(pc.id)}
                        className="text-green-600 hover:underline font-medium"
                      >
                        Make Available
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No PCs found.
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
