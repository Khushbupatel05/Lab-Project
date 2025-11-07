import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { PcContext } from "./PcContextProvider";
import { toast } from "react-toastify";

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const collectionRef = collection(db, "students");

  const { pcs, fetchPc } = useContext(PcContext);


  useEffect(() => {
    fetchStudent();
  },[]);


  const addStudent = async (student) => {
    try {
      const studentData = { ...student, createdAt: new Date() };
      await addDoc(collectionRef, studentData);

   
      if (student.pcId) {
        await updateDoc(doc(db, "pcs", student.pcId), {
          status: "occupied",
        });
      }

      toast.success("Student Added Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }

    await fetchStudent();
    await fetchPc();
  };

 
  const fetchStudent = async () => {
    try {
      const snapshot = await getDocs(collectionRef);
      const allStudents = snapshot.docs.map((doc) => ({
        studentId: doc.id,
        ...doc.data(),
      }));
      setStudents(allStudents);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const studentDoc = await getDoc(doc(db, "students", studentId));
      const studentData = studentDoc.data();

      await deleteDoc(doc(db, "students", studentId));
      toast.success("Student Deleted Successfully!");


      if (studentData?.pcId) {
        await updateDoc(doc(db, "pcs", studentData.pcId), {
          status: "available",
        });
      }

      await fetchStudent();
      await fetchPc();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };


  const updateStudent = async (updatedVal, studentId) => {
    try {
      await updateDoc(doc(db, "students", studentId), updatedVal);
      toast.success("Student Updated Successfully!");
      fetchStudent();
      fetchPc();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  
  const showPcName = (pcId) => {
    if (!pcs || pcs.length === 0) return "Unassigned";
    const pc = pcs.find((pc) => pc.id === pcId);
    return pc ? pc.name : "Unassigned";
  };

  const value = {
    students,
    addStudent,
    fetchStudent,
    showPcName,
    deleteStudent,
    updateStudent,
  };

  return (
  <StudentContext.Provider value={value}>
    {children}
  </StudentContext.Provider>

  )
};

export default StudentContextProvider;
