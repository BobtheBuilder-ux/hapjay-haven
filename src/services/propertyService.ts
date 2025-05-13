
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { Property } from "@/types/property";

const COLLECTION_NAME = "properties";

// Convert Property to Firebase format (remove id for new properties)
const toFirebaseProperty = (property: Property) => {
  const { id, ...propertyData } = property;
  return propertyData;
};

// Convert Firebase document to Property type
const fromFirebaseProperty = (doc: any): Property => {
  return {
    id: doc.id,
    ...doc.data()
  } as Property;
};

// Get all properties
export const getProperties = async (): Promise<Property[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map(fromFirebaseProperty);
};

// Get featured properties
export const getFeaturedProperties = async (): Promise<Property[]> => {
  const q = query(
    collection(db, COLLECTION_NAME), 
    where("featured", "==", true)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(fromFirebaseProperty);
};

// Add a new property
export const addProperty = async (property: Property): Promise<Property> => {
  const docRef = await addDoc(
    collection(db, COLLECTION_NAME), 
    toFirebaseProperty(property)
  );
  
  // Return the new property with the generated ID
  return {
    ...property,
    id: Number(docRef.id) // Convert to number to match your current ID type
  };
};

// Update an existing property
export const updateProperty = async (property: Property): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, property.id.toString());
  await updateDoc(docRef, toFirebaseProperty(property));
};

// Delete a property
export const deleteProperty = async (id: number): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id.toString());
  await deleteDoc(docRef);
};
