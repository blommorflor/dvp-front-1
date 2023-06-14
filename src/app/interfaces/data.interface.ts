import { PerfilInterface } from "./perfile.interface";

export interface DataInterface<T> {
  total_count: number;
  incomplete_results: boolean;
  items: Array<PerfilInterface>
}
