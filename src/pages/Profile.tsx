/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { supabase } from '../lib/supabase'

interface UserProgress {
  coursesCompleted: number
  testsCompleted: number
  averageScore: number
}

export default function Profile() {
  const { user } = useUser()
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserProgress()
    }
  }, [user])

  async function fetchUserProgress() {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user?.id)

    if (error) {
      console.error('Error fetching user progress:', error)
    } else {
      // Calculate progress metrics
      const coursesCompleted = new Set(data?.map(item => item.course_id)).size
      const testsCompleted = data?.length || 0
      const averageScore = data?.reduce((sum, item) => sum + item.score, 0) / testsCompleted || 0

      setProgress({
        coursesCompleted,
        testsCompleted,
        averageScore
      })
    }
  }

  if (!user || !progress) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <p><strong>Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-lg font-medium">{progress.coursesCompleted}</p>
            <p className="text-sm text-gray-600">Courses Completed</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-lg font-medium">{progress.testsCompleted}</p>
            <p className="text-sm text-gray-600">Tests Completed</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-lg font-medium">{progress.averageScore.toFixed(2)}%</p>
            <p className="text-sm text-gray-600">Average Score</p>
          </div>
        </div>
      </div>
    </div>
  )
}