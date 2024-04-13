import React from "react";
import Banner from "../Components/Home/Banner";
import FeaturedJobs from "../Components/Home/FeaturedJobs";
import {Link} from "react-router-dom";

import Api from "../Api/api.json";

const Home = () => {
  return (
    <main>
      {/* Banner Section */}

      <Banner />

      {/* Featured Jobs */}

      <section className=" mt-6 w-full ">
        <h2 className=" w-full  text-center text-[1.8rem] lg:text-[3.5rem] font-Syne font-semibold  ">Featured Jobs</h2>
        <p className="  text-[0.9rem] px-2  lg:text-[1.2rem] tracking-wide  text-zinc-700 w-full text-center ">These jobs are hot. Get in there before they're gone.</p>

        <div className=" grid w-full mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 px-3 md:px-10  ">
          {[...Api.Featuredjobs]
            .sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at))
            .map((company) => (
              <FeaturedJobs key={company.job_id} id={company.job_id} title={company.job_title} name={company.company_name} description={company.job_description} location={company.location} posted={company.posted_at} type={company.type} experience={company.experience} />
            ))}
        </div>
      </section>

      {/* Explore more jobs */}
      <Link to="/jobs">
        <p className="  w-full text-center  mb-10 mt-5 text-yellow-500 hover:text-yellow-700  tracking-wider cursor-pointer  hover:underline underline-offset-4">explore more jobs</p>
      </Link>

      {/* Footer not added :( */}

      {/*  */}
    </main>
  );
};

export default Home;
