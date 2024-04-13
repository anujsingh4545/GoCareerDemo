import React from "react";
import FilterListSharpIcon from "@mui/icons-material/FilterListSharp";
import {useRecoilState} from "recoil";
import CompanyAtom from "../../Recoil/CompanyAtom";

const HeadBar = ({setFilterOpen, page}) => {
  const [companyData, setCompanyData] = useRecoilState(CompanyAtom);
  return (
    <main className="  py-3 bg-white mt-3 shadow-md  px-3  lg:px-10 flex items-center justify-between ">
      <section className=" flex items-center justify-center gap-x-2 tracking-wider ">
        <p className="font-medium ">Showing:</p>
        <p>
          {page * 10 - 9} - {page * 10 > companyData.length ? companyData.length : page * 10} Jobs of {companyData.length} Jobs
        </p>
      </section>

      <FilterListSharpIcon className=" cursor-pointer" onClick={() => setFilterOpen(true)} />
    </main>
  );
};

export default HeadBar;
