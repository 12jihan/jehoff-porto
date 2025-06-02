export interface IContactFormData {
  name: string;
  email: string;
  message: string;
  contact: boolean;
  status: "unread" | "read" | "replied";
  dateCreated: Date;
  dateModified: Date;
  // subject: string;
  // phone?: string;
}

export interface IContactFormInput {
  name: string;
  email: string;
  message: string;
  // subject: string;
  // phone?: string;
}

export interface IFormErrors {
  name?: string;
  email?: string;
  message?: string;
  // subject?: string;
  // phone?: string;
}

export interface IUseContactFormReturn {
  submitContact: (data: IContactFormInput) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}
