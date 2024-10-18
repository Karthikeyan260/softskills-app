import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { supabase } from '../lib/supabase'

interface Course {
  id: number
  title: string
  enrollments: number
}

interface User {
  id: string
  email: string
  coursesCompleted: number
}

export default function Admin() {
  const { user } = useUser()
  const [courses, setCourses] = useState<Course[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    if (user?.publicMetadata.role === 'admin') {
      fetchCourses()
      fetchUsers()
    }
  }, [user])

  async function fetchCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('id, title, enrollments')

    if (error) {
      console.error('Error fetching courses:', error)
    } else {
      setCourses(data || [])
    }
  }

  async function fetchUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, courses_completed')

    if (error) {
      console.error('Error fetching users:', error)
    } else {
      setUsers(data || [])
    }
  }

  if (user?.publicMetadata.role !== 'admin') {
    return <div>Access denied. Admin only.</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollments</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.enrollments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Overview</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses Completed</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.coursesCompleted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}