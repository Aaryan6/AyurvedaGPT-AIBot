const Sidebar = () => {
  return (
    <div className="max-w-[24rem] hidden lg:block">
      <div className="mx-auto mt-10 px-4">
        <div className="bg-light dark:bg-secondary px-6 py-6 rounded-xl text-center my-5">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            What is AyurvedaGPT
          </h3>
          <p className="mt-2 text-[0.9rem] leading-normal text-gray-600 dark:text-gray-400">
            AyurvedaGPT is a virtual assistant that can help you learn about and
            use Ayurveda to improve your health and well-being.
          </p>
        </div>
        <div className="bg-light dark:bg-secondary  px-6 py-6 rounded-xl text-center  my-5">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Limitations
          </h3>
          <p className="mt-2 text-[0.9rem] leading-normal text-gray-600 dark:text-gray-400">
            Providing outcomes based on the available restricted understanding
            and knowledge of Ayurveda.
          </p>
        </div>
        <div className="bg-light dark:bg-secondary  px-6 py-6 rounded-xl text-center my-5">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Try this!
          </h3>
          <p className="mt-2 text-[0.9rem] leading-normal text-gray-600 dark:text-gray-400">
            Q. How different is Ayurveda from modern medical science?
          </p>
          <p className="mt-2 text-center text-[0.9rem] leading-normal text-gray-600 dark:text-gray-400">
            Q. What are the chakras?
          </p>
          <p className="mt-2 text-[0.9rem] leading-normal text-gray-600 dark:text-gray-400">
            Q. How to digest food quickly?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
