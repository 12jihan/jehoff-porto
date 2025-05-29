export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  date_created: Date;
  status: "unread" | "read" | "replied";
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phone?: string;
}
