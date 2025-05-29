import {
  collection,
  addDoc,
  serverTimestamp,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  ContactFormInput,
  ContactFormData,
} from "../interfaces/ContactForm/ContactForm.ts";

/**
 * Submits sanitized contact form data to the Firestore "contact-forms" collection.
 *
 * Trims and normalizes input fields, adds a server-generated timestamp and a default status, and returns the new document's ID upon success.
 *
 * @param formData - The contact form input to be submitted.
 * @returns The Firestore document ID of the newly created contact form entry.
 *
 * @throws {Error} If the contact form submission fails.
 */
export async function submitContactForm(
  formData: ContactFormInput,
): Promise<string> {
  try {
    const contactData: Omit<ContactFormData, "date_created"> & {
      date_created: any;
    } = {
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      phone: formData.phone?.trim(),
      date_created: serverTimestamp(),
      status: "unread",
    };

    const docRef: DocumentReference<DocumentData, DocumentData> = await addDoc(
      collection(db, "contact-forms"),
      contactData,
    );

    console.log("Contact form submitted with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact form: ", error);
    throw new Error("Failed to submit contact form");
  }
}
