import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LabContext } from "../../context/LabContextProvider";

const LabList = () => {
  const navigate = useNavigate();
  const { labs, deleteLab } = useContext(LabContext);

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-5 md:px-12 py-20 text-gray-800 ">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1b1e7b]">
          Labs Overview
        </h1>
        <button
          onClick={() => navigate("/add-lab")}
          className="bg-gradient-to-r from-[#363fe1] to-[#08116e] hover:scale-105 transition-all text-white font-semibold px-6 py-2.5 rounded-lg shadow-md w-full md:w-auto"
        >
          + Add Lab
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-[#1b1e7b] text-white text-left">
            <tr>
              <th className="py-4 px-5 font-semibold rounded-tl-2xl">#</th>
              <th className="py-4 px-5 font-semibold">Lab Name</th>
              <th className="py-4 px-5 font-semibold">Capacity</th>
              <th className="py-4 px-5 font-semibold">Available</th>
              <th className="py-4 px-5 font-semibold">Location</th>
              <th className="py-4 px-5 font-semibold">Assigned On</th>
              <th className="py-4 px-5 text-center font-semibold rounded-tr-2xl">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {labs.length > 0 ? (
              labs.map((lab, index) => (
                <tr
                  key={lab.id}
                  className="border-b border-gray-200 hover:bg-[#f3f4ff] transition-all duration-200"
                >
                  <td className="py-4 px-5">{index + 1}</td>
                  <td className="py-4 px-5 font-semibold text-[#1b1e7b]">{lab.name}</td>
                  <td className="py-4 px-5">{lab.capacity}</td>
                  <td className="py-4 px-5">
                    {lab.spaceLeft === 0 ? (
                      <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                        Full
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        {lab.spaceLeft}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5">{lab.location}</td>
                  <td className="py-4 px-5 text-gray-600">
                    {lab.createdAt?.toDate
                      ? lab.createdAt.toDate().toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-4 px-5 text-center">
                    <div className="flex justify-center gap-4">
                      <Link
                        to={`/edit-lab/${lab.id}`}
                        className="py-1.5 text-green-500 transition-all"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteLab(lab.id)}
                        className=" py-1.5  text-red-500 font-medium hover:opacity-90 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-gray-600">
                <td colSpan="7" className="py-10">
                  <div className="text-lg font-semibold text-[#1b1e7b]">
                    No labs found
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Add a new lab to get started.
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

export default LabList;
