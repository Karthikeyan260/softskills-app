import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import FastChatBot from './components/FastChatBot'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <FastChatBot />
        </div>
      </Router>
    </ClerkProvider>
  )
}