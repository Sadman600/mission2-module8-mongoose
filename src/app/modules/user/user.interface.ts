export type TUser = {
  id: string;
  password: string;
  needChangePassword: string;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDelete: boolean;
};
