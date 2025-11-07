import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LabContext } from "../../context/LabContextProvider";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const AddNewLab = () => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    location: "",
  });

  const { addLab, updateLab } = useContext(LabContext);
  const [editMode, setEditMode] = useState(false);
  const { labId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (labId) loadLab();
  }, [labId]);

  const loadLab = async () => {
    try {
      const docRef = doc(db, "labs", labId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setFormData(snapshot.data());
        setEditMode(true);
      }
    } catch (error) {
      console.log("Load Lab Error:", error);
      toast.error("Unable to load lab details.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.capacity.trim() || !formData.location.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (editMode) {
      await updateLab(labId, formData);
    } else {
      await addLab(formData);
    }

    navigate("/labs");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-xl p-10">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-50 to-pink-50 blur-3xl -z-10"></div>

        <h1 className="text-center text-3xl font-extrabold mb-8 text-gray-800 tracking-wide">
          {editMode ? "Update Laboratory Details" : "Create New Laboratory"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="relative">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="peer w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none py-3"
              placeholder="Lab Name"
            />
            <label
              htmlFor="name"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-500"
            >
              Lab Name
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              id="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="peer w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none py-3"
              placeholder="Capacity"
            />
            <label
              htmlFor="capacity"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-500"
            >
              Capacity
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="peer w-full bg-transparent border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-indigo-500 focus:outline-none py-3"
              placeholder="Location"
            />
            <label
              htmlFor="location"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-500"
            >
              Location
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white shadow-md transition-all duration-300 transform hover:scale-105"
          >
            {editMode ? "Update Lab" : "Add Lab"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewLab;
