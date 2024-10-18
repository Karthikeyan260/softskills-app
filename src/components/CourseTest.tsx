import  { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

interface TestProps {
  courseId: number
  onComplete: (score: number) => void
}

export default function CourseTest({ courseId, onComplete }: TestProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    fetchQuestions()
  }, [courseId])

  async function fetchQuestions() {
    const { data, error } = await supabase
      .from('course_questions')
      .select('*')
      .eq('course_id', courseId)

    if (error) {
      console.error('Error fetching questions:', error)
    } else {
      setQuestions(data || [])
    }
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers, answerIndex]
    setUserAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      const correctAnswers = newAnswers.filter(
        (answer, index) => answer === questions[index].correctAnswer
      )
      const finalScore = (correctAnswers.length / questions.length) * 100
      setScore(finalScore)
      onComplete(finalScore)
    }
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>
  }

  if (score !== null) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Test Completed</h2>
        <p className="text-lg">Your score: {score.toFixed(2)}%</p>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1} of {questions.length}</h2>
      <p className="text-lg mb-4">{question.text}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}