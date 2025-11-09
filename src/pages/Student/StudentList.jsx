import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/StudentContextProvider";
import { LabContext } from "../../context/LabContextProvider";

const StudentList = () => {
  const navigate = useNavigate();
  const { students, deleteStudent, showPcName } = useContext(StudentContext);
  const { showLabName } = useContext(LabContext);

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-5 md:px-12 py-20 text-gray-800">
    
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[#1b1e7b]">
           Student Overview
        </h1>
        <button
          onClick={() => navigate("/add-student")}
          className="bg-gradient-to-r from-[#4742b3] to-[#0c0774] hover:scale-105 transition-all text-white font-semibold px-6 py-2.5 rounded-lg shadow-md w-full md:w-auto"
        >
          + Add Student
        </button>
      </div>

    
      <div className="overflow-x-auto border border-gray-200 rounded-2xl bg-white shadow-lg">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-[#1b1e7b] text-white text-left">
            <tr>
              <th className="py-4 px-5 font-semibold rounded-tl-2xl">#</th>
              <th className="py-4 px-5 font-semibold">Student Name</th>
              <th className="py-4 px-5 font-semibold">Email</th>
              <th className="py-4 px-5 font-semibold">GRID</th>
              <th className="py-4 px-5 font-semibold">Lab Name</th>
              <th className="py-4 px-5 font-semibold">PC Name</th>
              <th className="py-4 px-5 font-semibold">Assigned On</th>
              <th className="py-4 px-5 text-center font-semibold rounded-tr-2xl">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student, idx) => (
                <tr
                  key={student.studentId}
                  className="border-b border-gray-200 hover:bg-[#f3f4ff] transition-all duration-200"
                >
                  <td className="py-4 px-5 font-semibold">{idx + 1}</td>
                  <td className="py-4 px-5 text-[#1b1e7b] font-medium">
                    {student.name}
                  </td>
                  <td className="py-4 px-5">{student.email}</td>
                  <td className="py-4 px-5">{student.grid}</td>
                  <td className="py-4 px-5">{showLabName(student.labId)}</td>
                  <td className="py-4 px-5">{showPcName(student.pcId)}</td>
                  <td className="py-4 px-5 text-gray-600">
                    {student.createdAt?.toDate
                      ? student.createdAt.toDate().toLocaleDateString()
                      : "N/A"}
                  </td>

                 
                  <td className="py-4 px-5 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() =>
                          navigate(`/edit-student/${student.studentId}`)
                        }
                        className="text-green-500 font-medium hover:scale-110 transition-transform"
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStudent(student.studentId)}
                        className="text-red-500 font-medium hover:scale-110 transition-transform"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-gray-600">
                <td colSpan="8" className="py-10">
                  <div className="text-lg font-semibold text-[#1b1e7b]">
                    No students found
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Add a new student to get started.
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

export default StudentList;
