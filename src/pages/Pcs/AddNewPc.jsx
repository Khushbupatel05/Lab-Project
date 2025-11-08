import { useContext, useEffect, useState } from "react";
import { PcContext } from "../../context/PcContextProvider";
import { LabContext } from "../../context/LabContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const AddNewPc = () => {
  const [input, setInput] = useState({
    name: "",
    labId: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const { addPc, updatedPc } = useContext(PcContext);
  const { labs } = useContext(LabContext);
  const navigate = useNavigate();
  const { pcId } = useParams();

  // Fetch PC data for editing
  useEffect(() => {
    if (pcId) loadPc();
  }, [pcId]);

  const loadPc = async () => {
    try {
      const pcSnap = await getDoc(doc(db, "pcs", pcId));
      if (pcSnap.exists()) {
        setIsEdit(true);
        setInput(pcSnap.data());
      }
    } catch (error) {
      console.error("Failed to fetch PC:", error);
      toast.error("Failed to fetch PC details");
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.name.trim() || !input.labId.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      if (isEdit) {
        await updatedPc(pcId, input);
        toast.success("PC updated successfully!");
      } else {
        await addPc(input);
        toast.success("PC added successfully!");
      }
      navigate("/pcs");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save PC!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6">
      <div className="relative max-w-lg w-full bg-white border border-gray-200 rounded-3xl shadow-xl p-10 overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-pink-50 blur-3xl -z-10 rounded-3xl"></div>

        <h1 className="text-center text-3xl font-extrabold mb-10 text-gray-800 tracking-wide">
          {isEdit ? "Update PC Details" : "Add New PC"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PC Name */}
          <div className="relative">
            <input
              type="text"
              id="name"
              value={input.name}
              onChange={handleChange}
              placeholder="PC Name"
              className="peer w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none py-3"
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
              peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm 
              peer-focus:text-indigo-500"
            >
              PC Name
            </label>
          </div>

          {/* Lab Selection */}
          <div className="relative">
            <select
              id="labId"
              value={input.labId}
              onChange={handleChange}
              className="peer w-full bg-transparent border-b-2 border-gray-300 text-gray-900 focus:border-indigo-500 focus:outline-none py-3"
            >
              <option value="">Choose a Lab</option>
              {labs.map(
                (lab) =>
                  lab.spaceLeft > 0 && (
                    <option key={lab.id} value={lab.id}>
                      {lab.name}
                    </option>
                  )
              )}
            </select>
            <label
              htmlFor="labId"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
              peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm 
              peer-focus:text-indigo-500"
            >
              Select Lab
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 text-lg font-semibold rounded-xl 
            bg-gradient-to-r from-indigo-500 to-blue-800 hover:from-purple-700 hover:to-indigo-500 
            text-white shadow-md transition-all duration-300 transform hover:scale-105"
          >
            {isEdit ? "Update PC" : "Add PC"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewPc;
