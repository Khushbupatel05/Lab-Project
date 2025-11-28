import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LabContext } from "../../context/LabContextProvider";
import { PcContext } from "../../context/PcContextProvider";
import { StudentContext } from "../../context/StudentContextProvider";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const AddNewStudents = () => {
  const [input, setInput] = useState({ name: "", email: "", grid: "", labId: "", pcId: "" });
  const [filteredPc, setFilteredPc] = useState([]);

  const { labs } = useContext(LabContext);
  const { pcsList } = useContext(PcContext);
  const { addStudent, updateStudent } = useContext(StudentContext);

  const navigate = useNavigate();
  const { studentId } = useParams();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (isEdit) loadStudent();
  }, [isEdit]);

  const loadStudent = async () => {
    try {
      const docRef = doc(db, "students", studentId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setInput({ ...snap.data() });
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to load student details!");
    }
  };

  useEffect(() => {
    if (input.labId) {
      const availablePcs = pcsList.filter(
        (pc) => pc.labId === input.labId && pc.status.toLowerCase() === "available"
      );
      setFilteredPc(availablePcs);
    }
  }, [input.labId, pcsList]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      input.name.trim() === "" ||
      input.email.trim() === "" ||
      input.grid.trim() === "" ||
      input.labId.trim() === "" ||
      input.pcId.trim() === ""
    ) {
      toast.error("Enter all student details correctly!");
      return;
    }

    try {
      if (!isEdit) {
        await addStudent(input);
        toast.success("Student Added Successfully!");
      } else {
        await updateStudent(input, studentId);
        toast.success("Student Updated Successfully!");
      }

      setInput({ name: "", email: "", grid: "", labId: "", pcId: "" });
      navigate("/students");

    } catch (error) {
      toast.error("Something Went Wrong! Please Try Again.");
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6">
      <div className="relative max-w-lg w-full bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-50 to-pink-50 blur-3xl -z-10"></div>

        <h1 className="text-center text-3xl font-extrabold mb-8 text-gray-800 tracking-wide">
          {isEdit ? "Update Student" : "Add New Student"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">

          <div className="relative">
            <input type="text" id="name" value={input.name} onChange={handleChange}
              placeholder="Student Name"
              className="peer w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none py-3"
            />
            <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all
              peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
              peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm 
              peer-focus:text-indigo-500">
              Student Name
            </label>
          </div>

          <div className="relative">
            <input type="email" id="email" value={input.email} onChange={handleChange}
              placeholder="Email"
              className="peer w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none py-3"
            />
            <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all
              peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
              peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm 
              peer-focus:text-indigo-500">
              Email
            </label>
          </div>

          <div className="relative">
            <input type="number" id="grid" value={input.grid} onChange={handleChange}
              placeholder="GR Number"
              className="peer w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none py-3"
            />
            <label htmlFor="grid" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
              peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-500">
              GR Number
            </label>
          </div>

          <div className="relative">
            <select id="labId" value={input.labId} onChange={handleChange}
              className="peer w-full bg-transparent border-b-2 border-gray-300 text-gray-900 focus:border-indigo-500 focus:outline-none py-3"
            >
              <option value="">Choose a Lab</option>
              {labs.map((lab) => (
                <option key={lab.id} value={lab.id}>{lab.name}</option>
              ))}
            </select>
            <label htmlFor="labId" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
              peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm 
              peer-focus:text-indigo-500">
              Select Lab
            </label>
          </div>

          <div className="relative">
            <select id="pcId" value={input.pcId} onChange={handleChange}
              className="peer pt-4 w-full bg-transparent border-b-2 border-gray-300 text-gray-900 focus:border-indigo-500 focus:outline-none py-3"
            >
              <option value="">Choose a PC</option>
              {filteredPc.map((pc) => (
                <option key={pc.id} value={pc.id}>{pc.name}</option>
              ))}
            </select>
            <label htmlFor="pcId" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
              peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm 
              peer-focus:text-indigo-500">
              Select PC
            </label>
          </div>

          <button type="submit"
            className="w-full mt-4 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-blue-800 hover:from-purple-700 hover:to-indigo-500 
            text-white shadow-md transition-all duration-300 transform hover:scale-105">
            {isEdit ? "Update Student" : "Add New Student"}
          </button>

        </form>
      </div>
    </section>
  );
};

export default AddNewStudents;
