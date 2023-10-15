const Sidebar = () => {
  return (
    <div className="max-w-[24rem] hidden lg:block">
      <div className="mx-auto mt-10 px-4">
        <div className="bg-light dark:bg-secondary dark:text-slate-300 px-6 py-6 rounded-xl text-center my-5">
          <h3 className="text-lg font-medium text-primary dark:text-light">
            Capabilities
          </h3>
          <p className="mt-2 text-[0.9rem] leading-snug text-secondary dark:text-lowlight">
            Understanding user queries and analyzing their specific health
            concerns, and generates personalized recommendations aligned with
            Ayurvedic principles.
          </p>
        </div>
        <div className="bg-light dark:bg-secondary dark:text-slate-300 px-6 py-6 rounded-xl text-center  my-5">
          <h3 className="text-lg font-medium text-primary dark:text-light">
            Limitations
          </h3>
          <p className="mt-2 text-[0.9rem] leading-snug text-secondary dark:text-lowlight">
            Providing outcomes based on the available restricted understanding
            and insights of Ayurveda.
          </p>
        </div>
        <div className="bg-light dark:bg-secondary dark:text-slate-300 px-6 py-6 rounded-xl text-center my-5">
          <h3 className="text-lg font-medium text-primary dark:text-light">
            Try this!
          </h3>
          <p className="mt-2 text-[0.9rem] leading-normal text-secondary dark:text-lowlight">
            Q. What are the benefits of Ayurveda?
            <br />
            Q. What are some of the most common Ayurvedic treatments?
            <br />
            Q. How to live a healthy life?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
