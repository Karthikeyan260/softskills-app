/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

type Course = {
  id: number
  title: string
  description: string
}

const CourseList = () => {
  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: "Leadership",
      description: "It improves the leadership Skills"
    },
    {
      id: 2,
      title: "Communication",
      description: "It improves the Communication Skills"
    },
    {
      id: 3,
      title: "Teamwork",
      description: "It improves the Teamwork Skills"
    },
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Soft Skill Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Start Course
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseList;