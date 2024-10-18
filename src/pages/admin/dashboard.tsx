import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface User {
  id: string
  email: string
}

interface Course {
  id: number
  title: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem('adminSession')
    if (!adminSession) {
      router.push('/admin/login')
    }

    fetchUsers()
    fetchCourses()
  }, [])

  async function fetchUsers() {
    const { data, error } = await supabase.from('users').select('id, email')
    if (error) {
      console.error('Error fetching users:', error)
    } else {
      setUsers(data || [])
    }
  }

  async function fetchCourses() {
    const { data, error } = await supabase.from('courses').select('id, title')
    if (error) {
      console.error('Error fetching courses:', error)
    } else {
      setCourses(data || [])
    }
  }

  async function assignCourse() {
    if (!selectedUser || !selectedCourse) return

    const { error } = await supabase
      .from('user_courses')
      .insert({ user_id: selectedUser, course_id: selectedCourse })

    if (error) {
      console.error('Error assigning course:', error)
    } else {
      alert('Course assigned successfully!')
      setSelectedUser('')
      setSelectedCourse('')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Assign Course to User</CardTitle>
          <CardDescription>Select a user and a course to assign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={setSelectedUser} value={selectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>{user.email}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedCourse} value={selectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>{course.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={assignCourse} disabled={!selectedUser || !selectedCourse}>
            Assign Course
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User-Course Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Assigned Courses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {/* Fetch and display assigned courses for each user */}
                    {/* This would require an additional query to the user_courses table */}
                    {/* For brevity, we're not implementing this here */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}