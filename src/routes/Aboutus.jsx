// import React from 'react'

// const Aboutus = () => {
//   return (
//     <div>Aboutus</div>
//   )
// }

// export default Aboutus


import React from "react";

const Aboutus = () => {
  return (
    <div className="min-h-screen bg-[#E8F0E2] flex flex-col items-center p-8">
      {/* Header Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg">
          We are committed to providing top-quality services to our customers. Our mission is to
          connect professionals with clients seamlessly, ensuring efficiency and satisfaction.
        </p>
      </div>

      {/* Team Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Abhijeet</h3>
            <p className="text-gray-500">Founder & CEO</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Deepak</h3>
            <p className="text-gray-500">Lead Developer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-64 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Aditi</h3>
            <p className="text-gray-500">Lead Developer</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Join Us Today!</h2>
        <p className="text-gray-500 mt-2">
          Want to work with us? Get in touch and become part of our journey.
        </p>
        <button className="mt-4 bg-[#52AE75] text-white px-6 py-2 rounded-md hover:bg-[#52AE80]">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Aboutus;

