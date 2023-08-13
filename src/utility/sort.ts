import { IContact } from "../constant/form-contant";

export default function sortData(data: IContact[]) {
  return [...data].sort((a, b) => a.first_name.localeCompare(b.first_name));
}
