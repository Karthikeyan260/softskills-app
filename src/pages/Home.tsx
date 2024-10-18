const Home = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex flex-row">
      <div className="m-8 pr-4 pt-20">
      <h1 className="text-5xl font-bold mb-4">Welcome to SoftSkill Enhance</h1>
      <p className="text-xl mb-8">Unlock your potential with AI-powered learning</p>
      </div>
      <div className="m-8 pl-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Featured Courses</h2>
        <ul className="list-none mb-0">
          <li className="mb-2">Effective Communication</li>
          <li className="mb-2">Leadership Skills</li>
          <li className="mb-2">Time Management</li>
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">AI-Powered Tools</h2>
        <ul className="list-none mb-0">
          <li className="mb-2">Personalized Learning Paths</li>
          <li className="mb-2">AI-Driven Feedback</li>
          <li className="mb-2">Virtual Mentorship</li>
        </ul>
      </section>
      <a href="/admin/login">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
      </a>
      
      </div>
      
      
      
    </div>
  )
}

export default Home