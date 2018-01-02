
export class User {
  id: number;
  username: string;
  password?: string;
  remember?: boolean;
  token?: string;

  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phoneNumber: string;

  user_entry?: {
    // id: number;
    // username: string;
    // email: string;
    is_superuser: boolean;
  }
}
