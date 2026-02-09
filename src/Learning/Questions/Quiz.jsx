import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { quizData } from '../../data/quizData'
import icSantai from '../../assets/ic_santai.png'

const Quiz = () => {
  const navigate = useNavigate()
  const { quizId } = useParams()
  
  // Validate quiz ID and redirect if invalid
  const currentQuiz = quizData[quizId]
  useEffect(() => {
    if (!currentQuiz) {
      navigate('/latihan')
    }
  }, [currentQuiz, navigate])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  
  const totalQuestions = currentQuiz?.questions.length || 10
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex]

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswered) {
      // Timer habis, belum jawab - anggap salah
      setIsAnswered(true)
      setIncorrectCount(incorrectCount + 1)
      
      // Auto advance setelah 2 detik
      setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setSelectedAnswer(null)
          setIsAnswered(false)
          setTimeLeft(30)
        } else {
          setIsQuizCompleted(true)
        }
      }, 2000)
    }
  }, [timeLeft, isAnswered, incorrectCount, currentQuestionIndex, totalQuestions, navigate])

  // Calculate circular progress
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const progress = ((30 - timeLeft) / 30) * circumference

  const handleAnswerClick = (index) => {
    if (isAnswered) return // Prevent clicking after answered
    
    setSelectedAnswer(index)
    setIsAnswered(true)
    
    // Check if answer is correct
    const isCorrect = index === currentQuestion.correctAnswer
    if (isCorrect) {
      setCorrectCount(correctCount + 1)
    } else {
      setIncorrectCount(incorrectCount + 1)
    }

    // Auto advance to next question after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
        setTimeLeft(30)
      } else {
        // Quiz completed, show result screen
        setIsQuizCompleted(true)
      }
    }, 2000)
  }

  const getButtonStyle = (index) => {
    if (!isAnswered) {
      // Before answering
      return 'bg-white border-2 border-purple-200 text-gray-800 hover:border-purple-400 hover:shadow-md'
    }
    
    // After answering
    if (index === currentQuestion.correctAnswer) {
      // Correct answer - always green
      return 'bg-green-500 border-2 border-green-500 text-white shadow-lg'
    }
    
    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      // Wrong answer that was selected - red
      return 'bg-red-500 border-2 border-red-500 text-white shadow-lg'
    }
    
    // Other options - dimmed
    return 'bg-gray-100 border-2 border-gray-200 text-gray-400'
  }

  if (!currentQuiz) {
    return null // Will redirect in useEffect
  }

  // Show result screen when quiz is completed
  if (isQuizCompleted) {
    const totalPoints = correctCount * 10
    
    return (
      <section className='relative min-h-screen bg-purple-main overflow-hidden flex flex-col items-center justify-center px-6'>
        {/* Result Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Image - ic_santai.png */}
          <div className="w-64 h-64 mb-8">
            <img 
              src={icSantai} 
              alt="Selesai" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Text "Selesai!" */}
          <h1 className="text-5xl font-bold text-white mb-4">Selesai!</h1>

          {/* Point Display */}
          <p className="text-white text-xl font-medium">Point: <span className="text-4xl font-bold">{totalPoints}</span></p>
        </div>

        {/* Back Button */}
        <div className="pb-8 w-full px-6">
          <button
            onClick={() => navigate('/latihan')}
            className="w-full bg-white text-purple-main py-4 rounded-2xl font-semibold text-lg hover:bg-purple-50 transition-all duration-200 shadow-lg"
          >
            Kembali ke Latihan
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className='relative min-h-screen bg-white overflow-hidden'>
      <div className="absolute top-0 left-0 w-full h-[35%] bg-purple-main rounded-b-[50px] px-2 z-0"></div>
      
      {/* Circular Timer */}
      <div className="relative flex justify-center mt-8 mb-12 z-10">
        <div className="relative">
          <svg width="120" height="120" className="transform -rotate-90">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-bold text-white">{timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="relative px-6 z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-purple-600">
              Soal {currentQuestionIndex + 1} <span className="text-gray-400">/{totalQuestions}</span>
            </h2>
            <div className="flex gap-2">
              {/* jumlah jawaban salah */}
              <div className="flex items-center gap-1 px-3 py-1 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-500 font-semibold">{incorrectCount}</span>
                <div className="w-4 h-1 bg-red-500 rounded"></div>
              </div>
              {/* jumlah jawaban benar */}
              <div className="flex items-center gap-1 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-500 font-semibold">{correctCount}</span>
                <div className="w-4 h-1 bg-green-500 rounded"></div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-purple-100 rounded-full mb-6">
            <div 
              className="h-full bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
              {currentQuestion.question}
            </p>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-4 pb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-2xl text-center font-medium transition-all duration-200 ${getButtonStyle(index)} ${
                isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
    </section>
  )
}

export default Quiz