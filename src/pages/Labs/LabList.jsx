import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LabContext } from "../../context/LabContextProvider";

const LabList = () => {
  const navigate = useNavigate();
  const { labs, deleteLab } = useContext(LabContext);

  return (
    <div className="min-h-screen bg-[#f4f5f7] px-5 md:px-12 py-20 text-gray-800">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-gray-900">
          Labs Overview
        </h1>
        <button
          onClick={() => navigate("/add-lab")}
          className="bg-[#1f2937] hover:bg-[#374151] transition-all text-white font-medium px-6 py-2.5 rounded-lg shadow-md w-full md:w-auto"
        >
          + Add Lab
        </button>
      </div>


      <div className="overflow-x-auto border border-gray-300 rounded-xl bg-white shadow-md">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-[#1f2937] text-white text-left">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Lab Name</th>
              <th className="py-3 px-4">Capacity</th>
              <th className="py-3 px-4">Available</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Assigned On</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {labs.length > 0 ? (
              labs.map((lab, index) => (
                <tr
                  key={lab.id}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {lab.name}
                  </td>
                  <td className="py-3 px-4">{lab.capacity}</td>
                  <td className="py-3 px-4">
                    {lab.spaceLeft === 0 ? (
                      <span className="text-red-600 font-medium">Full</span>
                    ) : (
                      lab.spaceLeft
                    )}
                  </td>
                  <td className="py-3 px-4">{lab.location}</td>
                  <td className="py-3 px-4">
                    {lab.createdAt?.toDate
                      ? lab.createdAt.toDate().toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-5">
                   
                      <Link
                        to={`/edit-lab/${lab.id}`}
                        className="text-blue-700 hover:text-blue-900"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 3.487a2.132 2.132 0 0 1 3.01 3.02L8.823 17.558l-3.39.377.378-3.392L16.862 3.487z"
                          />
                        </svg>
                      </Link>

             
                      <button
                        onClick={() => deleteLab(lab.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7h12M10 11v6m4-6v6M9 4h6a1 1 0 0 1 1 1v2H8V5a1 1 0 0 1 1-1ZM5 7h14v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-gray-600">
                <td colSpan="7" className="py-6">
                  No labs found.
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
