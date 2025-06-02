import { useState } from "react";
import {
  collection,
  addDoc,
  Timestamp,
  documentId,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  IContactFormInput,
  IUseContactFormReturn,
} from "../interfaces/ContactForm/IContactForm";

export function useSubmitContactForm(): IUseContactFormReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submitContact(data: IContactFormInput): Promise<any> {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const docRef = doc(collection(db, "contacts"));
      const contactInfo = {
        ...data,
        id: docRef.id,
        dateCreated: Timestamp.now(),
        dateModified: Timestamp.now(),
        canContact: true,
      };
      await setDoc(docRef, contactInfo);

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return { submitContact, isLoading, error, success };
}
