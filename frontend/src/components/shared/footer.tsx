import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div
        className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CourseWala</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Learn modern skills with practical courses.
          </p>
        </div>

        {/* <nav className="flex gap-6 text-gray-600 font-medium">
          <a href="#" className="hover:text-black transition">Home</a>
          <a href="#" className="hover:text-black transition">Courses</a>
          <a href="#" className="hover:text-black transition">About</a>
          <a href="#" className="hover:text-black transition">Contact</a>
        </nav> */}
      </div>

      
      <div className="border-t border-gray-100">
        <div
          className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-3"
        >
          <p>© 2026 CodeLearn. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-black transition">Privacy</a>
            <a href="#" className="hover:text-black transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
