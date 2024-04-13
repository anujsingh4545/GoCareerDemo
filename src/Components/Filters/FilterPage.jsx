import React, {useEffect, useState} from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomizedHook from "./LocationCustomized";

import Api from "../../Api/api.json";
import {useRecoilState} from "recoil";
import CompanyAtom from "../../Recoil/CompanyAtom";
import SearchAtom from "../../Recoil/SearchAtom";

const FilterPage = ({setFilterOpen, FilterOpen}) => {
  const [Experience, setExperience] = useState("");
  const [Locations, setLocations] = useState("");
  const [Internship, setInternship] = useState(false);
  const [FullTime, setFullTIme] = useState(false);
  const [companyData, setCompanyData] = useRecoilState(CompanyAtom);
  const [search, setSearch] = useRecoilState(SearchAtom);

  const ApplyFilters = async () => {
    let newData = Api.jobs;
    if (FullTime || Internship) {
      newData = newData.filter((company) => {
        return (FullTime && company.type == "Full Time") || (Internship && company.type == "Internship");
      });
    }

    if (Experience) {
      newData = newData.filter((comapny) => {
        return Experience.key == comapny.experience;
      });
    }

    if (Locations.length > 0) {
      newData = newData.filter((company) => {
        return Locations.some((location) => company.location.toLowerCase().includes(location.toLowerCase()));
      });
    }

    if (search.length > 0) {
      newData = newData.filter((company) => {
        return company.job_title.toLowerCase().includes(search.toLowerCase());
      });
    }

    setCompanyData(newData);
  };

  const RestoreDefault = async () => {
    setExperience("");
    setInternship(false);
    setFullTIme(false);
    setLocations("");
    setSearch("");
    setCompanyData(Api.jobs);
  };

  return (
    <>
      {/* Rest light bg area */}
      {FilterOpen && <section className=" flex-1 bg-black/10 w-full h-screen cursor-pointer fixed top-0 left-0  " onClick={() => setFilterOpen(false)}></section>}

      {/* Main Filter section */}

      <section className={` bg-white   w-[20rem] lg:w-[25rem] fixed top-0 h-screen   ${FilterOpen ? "right-0" : "right-[-500px]"} ease-in-out duration-300 transform z-40 py-5 pl-5 pr-2`}>
        {/*  */}

        <div className=" flex items-center justify-between ">
          <section className=" flex items-center justify-center gap-x-1 text-zinc-700 ">
            <FilterAltRoundedIcon />
            <p className=" font-medium italic font-Syne ">Add Filters</p>
          </section>
          <CloseRoundedIcon className=" cursor-pointer font-semibold text-zinc-800" onClick={() => setFilterOpen(false)} />
        </div>

        <p className=" mt-3 italic text-zinc-500 tracking-wider text-[0.8rem] ">* Already sorted on basis of upload time!</p>

        {/* employment type */}

        <div className=" w-full mt-6 pr-3">
          <p className=" font-semibold  tracking-wider font-Syne mb-3   ">Employment type</p>
          <section className=" grid grid-cols-2 gap-x-5 items-center justify-between  ">
            <button className={` filterButton ${Internship ? "bg-yellow-500" : "bg-white"} `} onClick={() => setInternship(!Internship)}>
              Internship
            </button>
            <button className={` filterButton ${FullTime ? "bg-yellow-500" : "bg-white"} `} onClick={() => setFullTIme(!FullTime)}>
              Full Time
            </button>
          </section>
        </div>

        {/* Location Filter */}

        <div className=" w-full mt-8 pr-3">
          <p className=" font-semibold  tracking-wider font-Syne mb-2 ">Location</p>

          <section className=" w-full flex-1 ">
            <CustomizedHook setLocations={setLocations} Locations={Locations} />
          </section>
        </div>

        {/* Years of Experience */}

        <div className=" w-full mt-8 pr-3">
          <p className=" font-semibold  tracking-wider font-Syne mb-2 ">Years Of Experience</p>

          <section className=" w-full flex-1 ">
            <Autocomplete
              value={Experience}
              onChange={(event, newValue) => {
                setExperience(newValue);
              }}
              disablePortal
              id="combo-box-demo"
              size="small"
              options={Api["Experience "]}
              renderInput={(params) => <TextField {...params} label="Experience" />}
            />
          </section>
        </div>

        {/* Save and restore button */}

        <div className=" px-3 grid grid-cols-2 gap-x-5 absolute bottom-3 w-full left-0 ">
          <button className=" col-span-1 border-[0.1px] border-yellow-500 py-2 tracking-wider" onClick={RestoreDefault}>
            Restore
          </button>
          <button className=" col-span-1 border-[0.1px] border-yellow-500 bg-yellow-500 text-white tracking-wider py-2" onClick={ApplyFilters}>
            Apply
          </button>
        </div>

        {/*  */}
      </section>
    </>
  );
};

export default FilterPage;
