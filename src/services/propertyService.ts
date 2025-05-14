
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where, DocumentData, setDoc, writeBatch } from "firebase/firestore";
import { Property } from "@/types/property";

const COLLECTION_NAME = "properties";

// Convert Property to Firebase format (remove id for new properties)
const toFirebaseProperty = (property: Property) => {
  const { id, ...propertyData } = property;
  return propertyData;
};

// Convert Firebase document to Property type
const fromFirebaseProperty = (doc: DocumentData): Property => {
  return {
    id: doc.id ? Number(doc.id) : Date.now(), // Ensure id is always a number
    ...doc.data()
  } as Property;
};

// Get all properties
export const getProperties = async (): Promise<Property[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(fromFirebaseProperty);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

// Get featured properties
export const getFeaturedProperties = async (): Promise<Property[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("featured", "==", true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(fromFirebaseProperty);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
};

// Add a new property
export const addProperty = async (property: Property): Promise<Property> => {
  try {
    // Ensure property has a unique ID if not provided
    if (!property.id) {
      property.id = Date.now();
    }
    
    const propertyToSave = toFirebaseProperty(property);
    
    // Use setDoc with the property.id as the document ID to ensure consistency
    await setDoc(
      doc(db, COLLECTION_NAME, property.id.toString()), 
      propertyToSave
    );
    
    // Return the new property with the generated ID
    return {
      ...property,
      id: property.id // Use the original numeric ID
    };
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
};

// Update an existing property
export const updateProperty = async (property: Property): Promise<void> => {
  try {
    if (!property.id) {
      throw new Error("Property ID is required for updating");
    }
    
    const docRef = doc(db, COLLECTION_NAME, property.id.toString());
    await updateDoc(docRef, toFirebaseProperty(property));
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

// Delete a property
export const deleteProperty = async (id: number): Promise<void> => {
  try {
    if (!id) {
      throw new Error("Property ID is required for deletion");
    }
    
    const docRef = doc(db, COLLECTION_NAME, id.toString());
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

// Bulk upload properties - will replace existing ones with same ID
export const bulkUploadProperties = async (properties: Property[]): Promise<void> => {
  try {
    const batch = writeBatch(db);
    
    // Process each property
    for (const property of properties) {
      if (!property.id) {
        property.id = Date.now() + Math.floor(Math.random() * 1000);
      }
      
      const docRef = doc(db, COLLECTION_NAME, property.id.toString());
      batch.set(docRef, toFirebaseProperty(property));
    }
    
    // Commit the batch
    await batch.commit();
  } catch (error) {
    console.error("Error bulk uploading properties:", error);
    throw error;
  }
};
