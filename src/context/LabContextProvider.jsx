import { createContext, useEffect, useState } from "react"
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where, writeBatch, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { toast } from "react-toastify"

export const LabContext = createContext();

const LabContextProvider = ({ children }) => {

  const [labs, setLabs] = useState([])

  const collectionRef = collection(db, "labs")

  useEffect(() => {
    fetchLab()
  }, [])

  const addLab = async (input) => {
    try {
      const { capacity, ...data } = input
      const obj = {
        ...data,
        capacity: Number(capacity),
        createdAt: new Date(),
        spaceLeft: Number(capacity)
      }
      await addDoc(collectionRef, obj)
      await fetchLab()
      toast.success("New lab added successfully!")
    } catch (error) {
      console.log("Add Lab Error:", error)
      toast.error("Failed to add lab. Check Firestore permissions.")
    }
  }

  const fetchLab = async () => {
    try {
      const { docs } = await getDocs(collectionRef)
      const allLabs = docs.map((lab) => ({
        id: lab.id,
        ...lab.data()
      }))
      setLabs(allLabs)
    } catch (error) {
      console.log("Fetch Lab Error:", error)
      toast.error("Unable to fetch labs. Check Firestore rules.")
    }
  }

  const deleteLab = async (labId) => {
    try {
      const pcsQuery = query(collection(db, "pcs"), where("labId", "==", labId))
      const pcsSnap = await getDocs(pcsQuery)

      const batch = writeBatch(db)
      pcsSnap.forEach((pcDoc) => {
        batch.update(pcDoc.ref, { labId: null })
      })
      await batch.commit()

      await deleteDoc(doc(db, "labs", labId))
      fetchLab()
      toast.success("Lab deleted successfully!")
    } catch (error) {
      console.log("Delete Lab Error:", error)
      toast.error("Failed to delete lab. Check permissions.")
    }
  }

  const updateLab = async (labId, updatedVal) => {
    try {
      const docRef = doc(db, "labs", labId)
      const snap = await getDoc(docRef)

      if (!snap.exists()) {
        toast.error("Lab not found!")
        return
      }

      await updateDoc(docRef, {
        ...updatedVal,
        capacity: Number(updatedVal.capacity)
      })

      await fetchLab()
      toast.success("Lab updated successfully!")
    } catch (error) {
      console.log("Update Lab Error:", error)
      toast.error("Failed to update lab. Check Firestore permissions.")
    }
  }

  const value = { addLab, labs, deleteLab, updateLab, fetchLab }

  return (
    <LabContext.Provider value={value}>
      {children}
    </LabContext.Provider>
  )
}

export default LabContextProvider
