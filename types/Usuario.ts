export interface Usuario {
  uid: string;
  email: string;
  nome?: string;
  cargo: "admin" | "funcionario";
}
