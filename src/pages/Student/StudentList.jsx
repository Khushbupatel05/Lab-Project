import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/StudentContextProvider";
import { PcContext } from "../../context/PcContextProvider";

const StudentList = () => {
  const navigate = useNavigate();
  const { students, showPcName, deleteStudent } = useContext(StudentContext);
  const { showLabName } = useContext(PcContext);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-10 text-black">
     
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Student Details</h2>
        <button
          onClick={() => navigate("/add-student")}
          className="px-5 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition w-full sm:w-auto"
        >
          + Add Student
        </button>
      </div>

      
      <div className="relative overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm sm:text-base text-left bg-white rounded-lg min-w-max">
          <thead className="text-xs sm:text-sm uppercase bg-black text-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4">No</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4">Student Name</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4">Email</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4">GRID</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4">Lab Name</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4">PC Name</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4">Assigned Date</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, idx) => (
              <tr
                key={student.studentId}
                className="bg-white border-b border-gray-300 hover:bg-gray-50 transition"
              >
                <td className="px-4 sm:px-6 py-3 sm:py-4">{idx + 1}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium">{student.name}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">{student.email}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">{student.grid}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">{showLabName(student.labId) || "Unassigned"}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">{showPcName(student.pcId) || "Unassigned"}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">{student.createdAt.toDate().toLocaleDateString()}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex justify-center gap-3 sm:gap-4">
                    {/* Edit Button */}
                    <button
                      onClick={() => navigate(`/edit-student/${student.studentId}`)}
                      className="hover:scale-110 transition-transform"
                      title="Edit"
                    >
                      <svg
                        className="w-5 sm:w-6 h-5 sm:h-6 text-[#014e4e]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                        />
                      </svg>
                    </button>

                   
                    <button
                      onClick={() => deleteStudent(student.studentId)}
                      className="hover:scale-110 transition-transform"
                      title="Delete"
                    >
                      <svg
                        className="w-5 sm:w-6 h-5 sm:h-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
