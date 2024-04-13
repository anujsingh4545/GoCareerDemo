import React, {useEffect, useState} from "react";
import HeadBar from "../Components/JobPortal/HeadBar";
import Pagination from "@mui/material/Pagination";
import PortalJobs from "../Components/JobPortal/PortalJobs";
import FilterPage from "../Components/Filters/FilterPage";
import Api from "../Api/api.json";
import {useSearchParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import CompanyAtom from "../Recoil/CompanyAtom";
import SearchAtom from "../Recoil/SearchAtom";

const JobProtal = () => {
  const [FilterOpen, setFilterOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [companyData, setCompanyData] = useRecoilState(CompanyAtom);
  const [search, setSearch] = useRecoilState(SearchAtom);

  useEffect(() => {
    const pageno = searchParams.get("page");
    pageno ? setPage(parseInt(pageno, 0)) : setPage(1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [searchParams]);

  useEffect(() => {
    if (search.length == 0) setCompanyData(Api.jobs);
    else {
      const filtersearch = companyData.filter((company) => {
        return company.job_title.toLowerCase().includes(search.toLowerCase());
      });
      setCompanyData(filtersearch);
    }
  }, [search]);

  const handleChange = (event, value) => {
    setPage(value);
    setSearchParams({page: value});
  };

  return (
    <main className=" w-full  bg-zinc-100  flex flex-col h-full ">
      {/*  */}

      {/* HeadBar */}
      <HeadBar setFilterOpen={setFilterOpen} page={page} />
      <FilterPage setFilterOpen={setFilterOpen} FilterOpen={FilterOpen} />

      {companyData.length == 0 ? (
        <main className=" w-full h-[80vh] flex items-center justify-center ">
          <p className=" font-Syne text-[1.2rem] tracking-wider font-medium ">No Jobs Found :(</p>
        </main>
      ) : (
        <div className=" grid w-full mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 px-3 md:px-10  ">
          {/*  */}

          {[...companyData]
            .sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at))
            .slice(page * 10 - 10, page * 10)
            .map((company) => (
              <PortalJobs key={company.job_id} id={company.job_id} title={company.job_title} name={company.company_name} description={company.job_description} location={company.location} posted={company.posted_at} type={company.type} experience={company.experience} />
            ))}

          {/*  */}
        </div>
      )}

      {/* Pagination component */}

      <section className=" my-10 w-full items-center justify-center flex  ">
        <Pagination count={Math.round(companyData.length / 10)} variant="outlined" page={page} onChange={handleChange} color="standard" />
      </section>

      {/*  */}
    </main>
  );
};

export default JobProtal;
