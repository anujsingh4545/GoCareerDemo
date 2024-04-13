import {atom} from "recoil";
import Api from "../Api/api.json";

const CompanyAtom = atom({
  key: "CompanyAtom",
  default: Api.jobs,
});

export default CompanyAtom;
