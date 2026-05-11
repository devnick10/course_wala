import React from 'react'

export const Home: React.FC = () => {
  return (
    <section className=" flex items-center justify-center px-6">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center sm:pt-10">
        <div>
          <p className="text-blue-400 font-semibold mb-4 tracking-wide uppercase">
            Modern Learning Platform
          </p>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Master Skills <br />
            That Matter
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-xl">
            Learn modern development with practical courses, real-world projects,
            and expert-led content designed for future developers.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-xl font-semibold"
            >
              Start Learning
            </button>

            <button
              className="border border-gray-700 hover:border-gray-500 transition px-6 py-3 rounded-xl font-semibold"
            >
              Explore Courses
            </button>
          </div>

          <div className="flex gap-10 mt-12">
            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="text-gray-400">Students</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">150+</h2>
              <p className="text-gray-400">Courses</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">4.9★</h2>
              <p className="text-gray-400">Ratings</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl p-1"
          >
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt="Learning Platform"
              className="rounded-3xl object-cover w-full h-125"
            />
          </div>

          <div
            className="absolute -bottom-6 -left-6 bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-2xl"
          >
            <p className="text-sm text-gray-100">Active Learners</p>
            <h3 className="text-2xl font-bold mt-1 text-white">+2,500 This Week</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
