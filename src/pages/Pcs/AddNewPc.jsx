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
  const { pcId } = useParams(); // will be used for edit

  // Load PC data if editing
  useEffect(() => {
    if (pcId) {
      loadPc();
    }
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
      navigate("/pcs"); // go back to PC list
    } catch (error) {
      console.error(error);
      toast.error("Failed to save PC!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-10">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          {isEdit ? "Edit PC" : "Add New PC"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              PC Name
            </label>
            <input
              id="name"
              value={input.name}
              onChange={handleChange}
              placeholder="Enter PC name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-black focus:border-black block w-full p-2.5 text-sm"
            />
          </div>

          <div>
            <label htmlFor="labId" className="block mb-2 text-sm font-medium text-gray-900">
              Select Lab
            </label>
            <select
              id="labId"
              value={input.labId}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-black focus:border-black block w-full p-2.5 text-sm"
            >
              <option value="">Choose a Lab</option>
              {labs.map((lab) => 
                lab.spaceLeft > 0 ? (
                  <option key={lab.id} value={lab.id}>
                    {lab.name}
                  </option>
                ) : null
              )}
            </select>
          </div>

          <button type="submit"  className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition" >
            {isEdit ? "Update PC" : "Add PC"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPc;
