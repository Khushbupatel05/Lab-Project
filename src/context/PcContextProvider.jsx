import React, { createContext, useContext, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, increment, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { LabContext } from "./LabContextProvider";

export const PcContext = createContext();

const PcContextProvider = ({ children }) => {
  const [pcsList, setPcsList] = useState([]);
  const pcsCollectionRef = collection(db, "pcs");
  const { labs, fetchLab } = useContext(LabContext);

  useEffect(() => {
    if (fetchPc) fetchPc();
  }, []);

  const addPc = async (pcData) => {
    try {
      const pcObj = {
        ...pcData,
        createdAt: new Date(),
        status: "Available",
      };
      await addDoc(pcsCollectionRef, pcObj);

      await updateDoc(doc(db, "labs", pcData.labId), { spaceLeft: increment(-1) });
      fetchPc();
      fetchLab();
      toast.success("PC added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add PC!");
    }
  };

  const fetchPc = async () => {
    try {
      const { docs } = await getDocs(pcsCollectionRef);
      const allPcs = docs.map((pc) => {
        return {
          id: pc.id,
          ...pc.data()
        }
      });
      setPcsList(allPcs);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !");
    }
  };


  const deletePc = async (pcId) => {
    try {

      const studentQuery = query(collection(db, "students"), where("pcId", "==", pcId));
      const studentSnapshot = await getDocs(studentQuery);

      const batch = writeBatch(db);
      studentSnapshot.forEach(studentDoc => {
        batch.update(studentDoc.ref, { pcId: null, pcName: "Not Assigned" });
      });
      await batch.commit();


      await deleteDoc(doc(db, "pcs", pcId));
      fetchPc();
      toast.success("PC deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete PC!");
    }
  };


  const updatePc = async (pcId, updatedData) => {
    try {
      await updateDoc(doc(db, "pcs", pcId), updatedData);
      fetchPc();
      toast.success("PC updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update PC!");
    }
  };


  const getLabNameForPc = (labId) => {
    const lab = labs.find(l => l.id === labId);
    return lab ? lab.name : "Not Assigned";
  };


  const markPcInRepair = async (pcId) => {
    try {
      await updateDoc(doc(db, "pcs", pcId), { status: "In-Repair", updatedAt: new Date() });


      const studentQuery = query(collection(db, "students"), where("pcId", "==", pcId));
      const studentSnapshot = await getDocs(studentQuery);
      const batch = writeBatch(db);
      studentSnapshot.forEach(studentDoc => {
        batch.update(studentDoc.ref, { pcId: null, pcName: "Not Assigned", labName: "Not Assigned", updatedAt: new Date() });
      });
      await batch.commit();

      fetchPc();
      toast.success("PC marked as In-Repair!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark PC as In-Repair!");
    }
  };


  const markPcAvailable = async (pcId) => {
    try {
      await updateDoc(doc(db, "pcs", pcId), { status: "Available", updatedAt: new Date() });
      fetchPc();
      toast.success("PC marked as Available!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark PC as Available!");
    }
  };

  const value = {
    pcs: pcsList,
    addPc,
    deletePc,
    updatePc,
    getLabNameForPc,
    fetchPc,
    markPcInRepair,
    markPcAvailable
  };

  return (
    <PcContext.Provider value={value}>
      {children}
    </PcContext.Provider>
  )
}

export default PcContextProvider;
