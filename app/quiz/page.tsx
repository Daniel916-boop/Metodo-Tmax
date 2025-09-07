"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [countdownTime, setCountdownTime] = useState(6900) // 1:55:00 em segundos

  const quizData = [
    { question: "¿Cuál es tu nombre?", type: 'text', placeholder: 'Escribe tu respuesta aquí...' },
    { question: "¿Cómo evalúas tu nivel de energía y disposición a lo largo del día?", type: 'radio', options: ['Muy bajo (siempre cansado, falta de iniciativa)', 'Bajo (cansancio frecuente, dificultad para concentrarse)', 'Moderado (energía razonable, algunos picos de cansancio)', 'Alto (lleno de energía, productivo todo el día)'] },
    { question: "¿Has notado cambios en tu masa muscular o dificultad para ganar músculos, incluso entrenando?", type: 'radio', options: ['Pérdida significativa de masa muscular', 'Pequeña pérdida o dificultad para ganar', 'Mantenimiento de la masa muscular', 'Ganancia fácil de masa muscular'] },
    { question: "¿Cómo está la calidad de tu sueño? ¿Te despiertas descansado?", type: 'radio', options: ['Muy mala (insomnio, sueño agitado, despiertas agotado)', 'Mala (dificultad para dormir, sueño ligero)', 'Regular (duermes, pero no siempre despiertas totalmente descansado)', 'Buena (duermes profundamente, despiertas revigorizado)'] },
    { question: "¿Has experimentado alteraciones del humor, como irritabilidad, ansiedad o desánimo?", type: 'radio', options: ['Frecuentemente (irritabilidad, ansiedad, desánimo constante)', 'Ocasionalmente (algunos momentos de irritabilidad o desánimo)', 'Raramente (humor estable, pocas alteraciones)', 'Nunca (siempre de buen humor, positivo)'] },
    { question: "¿Con qué frecuencia sientes deseo sexual (libido)?", type: 'radio', options: ['Casi nunca (libido muy baja o inexistente)', 'Raramente (poco deseo, solo en situaciones específicas)', 'A veces (deseo moderado, varía según el día)', 'Frecuentemente (deseo sexual alto y regular)'] },
    { question: "¿Cómo evalúas la calidad de tus erecciones?", type: 'radio', options: ['Muy insatisfactoria (dificultad para tener o mantener erecciones)', 'Insatisfactoria (erecciones débiles o inconsistentes)', 'Satisfactoria (erecciones razonables, pero podrían ser mejores)', 'Excelente (erecciones fuertes, duraderas y espontáneas)'] },
    { question: "¿Has tenido orgasmos satisfactorios e intensos?", type: 'radio', options: ['No (orgasmos débiles o ausentes)', 'Raramente (orgasmos poco intensos)', 'A veces (orgasmos satisfactorios, pero no siempre intensos)', 'Siempre (orgasmos muy intensos y placenteros)'] },
    { question: "¿Cuál es el tamaño actual de tu pene erecto (en centímetros)?", type: 'radio', options: ['Menos de 12 cm', 'Entre 12 y 14 cm', 'Entre 14 y 16 cm', 'Más de 16 cm'] },
    { question: "¿Cuántos centímetros te gustaría aumentar en el tamaño de tu pene?", type: 'radio', options: ['1 cm', '2 cm', '3 cm', 'Más de 3 cm'] },
  ]

  const totalSteps = quizData.length + 1

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleNext = () => {
    if (currentStep < quizData.length) {
      const questionData = quizData[currentStep]
      let answer: string = ''
      
      if (questionData.type === 'text') {
        const input = document.getElementById('text-answer') as HTMLInputElement
        answer = input?.value?.trim() || ''
        if (!answer) return
      } else {
        const radio = document.querySelector('input[name="answer"]:checked') as HTMLInputElement
        if (!radio) return
        answer = radio.value
      }
      
      setUserAnswers(prev => ({ ...prev, [currentStep]: answer }))
    }
    setCurrentStep(prev => prev + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmitQuiz = () => {
    const selectedOffer = document.querySelector('input[name="oferta"]:checked') as HTMLInputElement
    if (!selectedOffer) {
      alert('Por favor, seleccione una oferta para continuar.')
      return
    }
    router.push("/planos")
  }

  const renderCurrentStep = () => {
    if (currentStep < quizData.length) {
      // Render question
      const questionData = quizData[currentStep]
      const userName = userAnswers[0] || ''
      let questionTitle = questionData.question
      
      if (currentStep > 0 && userName) {
        questionTitle = `${userName}, ${questionData.question.charAt(0).toLowerCase() + questionData.question.slice(1)}`
      }

      return (
        <div className="w-full">
          <div className="w-full mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Diagnóstico <span className="text-red-500">Personalizado</span>
              </h1>
              <p className="text-gray-400">Pregunta {currentStep + 1} de {totalSteps}</p>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-400">
                {Math.round(((currentStep + 1) / totalSteps) * 100)}% completado
              </span>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center leading-tight">
              {questionTitle}
            </h2>
            
            {questionData.type === 'text' ? (
              <div className="mb-6">
                <input 
                  type="text" 
                  id="text-answer" 
                  placeholder={questionData.placeholder} 
                  className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                  defaultValue={userAnswers[currentStep] || ''}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {questionData.options?.map((option, index) => (
                  <label 
                    key={index}
                    className="flex items-center p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white cursor-pointer hover:border-red-500 transition-colors"
                  >
                    <input 
                      type="radio" 
                      name="answer" 
                      value={option} 
                      className="h-5 w-5 text-red-500 bg-gray-700 border-gray-600 focus:ring-red-500 focus:ring-offset-gray-900"
                      defaultChecked={userAnswers[currentStep] === option}
                    />
                    <span className="ml-4">{option}</span>
                  </label>
                ))}
              </div>
            )}
            
            <div className={`flex ${currentStep > 0 ? 'justify-between' : 'justify-end'} items-center mt-8`}>
              {currentStep > 0 && (
                <button 
                  onClick={handlePrev}
                  className="flex items-center px-6 py-3 rounded-lg font-medium transition-all bg-gray-800 text-gray-400 hover:bg-gray-700"
                >
                  Anterior
                </button>
              )}
              <button 
                onClick={handleNext}
                className="flex items-center px-6 py-3 rounded-lg font-medium transition-all bg-red-600 hover:bg-red-700 text-white"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      // Render final page
      const userName = userAnswers[0] || 'Amigo'
      
      return (
        <div className="w-full">
          <div className="w-full mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Diagnóstico <span className="text-red-500">Personalizado</span>
              </h1>
              <p className="text-gray-400">Pregunta 11 de 11</p>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-400">100% completado</span>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
              {userName}, ¿Cuánto te gustaría aumentar tu nivel de testosterona en 30 días?
            </h2>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center leading-tight">
              Tu Oferta Personalizada
            </h3>
            <div>
              <div className="hidden md:grid md:grid-cols-4 gap-4 text-center font-semibold text-gray-400 mb-4 px-4">
                <span>PROTOCOLO</span>
                <span>AUMENTO</span>
                <span>VALOR</span>
                <span>DESCUENTO</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 items-center text-sm">
                  <div className="md:hidden font-semibold text-gray-400">PROTOCOLO</div>
                  <div className="md:hidden font-semibold text-gray-400 text-right">AUMENTO</div>
                  <div className="font-bold text-white text-base md:text-center">400%</div>
                  <div className="text-white md:text-center text-right">4.0 cm</div>
                  <div className="col-span-2 border-t border-gray-700 my-2 md:hidden"></div>
                  <div className="md:hidden font-semibold text-gray-400">VALOR</div>
                  <div className="md:hidden font-semibold text-gray-400 text-right">DESCUENTO</div>
                  <div className="font-bold text-red-500 text-lg md:text-center">$7</div>
                  <div className="text-white md:text-center text-right">
                    <span className="line-through text-gray-500">$17.50</span>
                    <span className="text-green-400 font-semibold ml-2">(60% OFF)</span>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 items-center text-sm">
                  <div className="md:hidden font-semibold text-gray-400">PROTOCOLO</div>
                  <div className="md:hidden font-semibold text-gray-400 text-right">AUMENTO</div>
                  <div className="font-bold text-white text-base md:text-center">100%</div>
                  <div className="text-white md:text-center text-right">2.0 cm</div>
                  <div className="col-span-2 border-t border-gray-700 my-2 md:hidden"></div>
                  <div className="md:hidden font-semibold text-gray-400">VALOR</div>
                  <div className="md:hidden font-semibold text-gray-400 text-right">DESCUENTO</div>
                  <div className="font-bold text-red-500 text-lg md:text-center">$6</div>
                  <div className="text-white md:text-center text-right">
                    <span className="line-through text-gray-500">$15.00</span>
                    <span className="text-green-400 font-semibold ml-2">(60% OFF)</span>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 items-center text-sm">
                  <div className="md:hidden font-semibold text-gray-400">PROTOCOLO</div>
                  <div className="md:hidden font-semibold text-gray-400 text-right">AUMENTO</div>
                  <div className="font-bold text-white text-base md:text-center">50%</div>
                  <div className="text-white md:text-center text-right">1.0 cm</div>
                  <div className="col-span-2 border-t border-gray-700 my-2 md:hidden"></div>
                  <div className="md:hidden font-semibold text-gray-400">VALOR</div>
                  <div className="md:hidden font-semibold text-gray-400 text-right">DESCUENTO</div>
                  <div className="font-bold text-red-500 text-lg md:text-center">$5</div>
                  <div className="text-white md:text-center text-right">
                    <span className="line-through text-gray-500">$12.50</span>
                    <span className="text-green-400 font-semibold ml-2">(60% OFF)</span>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 items-center text-sm">
                  <div className="md:hidden font-semibold text-gray-400">PROTOCOLO</div>
                  <div className="md:hidden font-semibold text-gray-400 text-right">AUMENTO</div>
                  <div className="font-bold text-white text-base md:text-center">25%</div>
                  <div className="text-white md:text-center text-right">0.5 cm</div>
                  <div className="col-span-2 border-t border-gray-700 my-2 md:hidden"></div>
                  <div className="md:hidden font-semibold text-gray-400">VALOR</div>
                  <div className="md:hidden font-semibold text-gray-400 text-right">DESCUENTO</div>
                  <div className="font-bold text-red-500 text-lg md:text-center">$4</div>
                  <div className="text-white md:text-center text-right">
                    <span className="line-through text-gray-500">$10.00</span>
                    <span className="text-green-400 font-semibold ml-2">(60% OFF)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white cursor-pointer hover:border-red-500 transition-colors">
              <input type="radio" name="oferta" className="h-5 w-5 text-red-500 bg-gray-700 border-gray-600" />
              <span className="ml-4">25% (Potencial de aumento de 0.5 cm de lápiz)</span>
            </label>
            <label className="flex items-center p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white cursor-pointer hover:border-red-500 transition-colors">
              <input type="radio" name="oferta" className="h-5 w-5 text-red-500 bg-gray-700 border-gray-600" />
              <span className="ml-4">50% (Potencial de aumento de 1.0 cm de lápiz)</span>
            </label>
            <label className="flex items-center p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white cursor-pointer hover:border-red-500 transition-colors">
              <input type="radio" name="oferta" className="h-5 w-5 text-red-500 bg-gray-700 border-gray-600" />
              <span className="ml-4">100% (Potencial de aumento de 2.0 cm de lápiz)</span>
            </label>
            <label className="flex items-center p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white cursor-pointer hover:border-red-500 transition-colors">
              <input type="radio" name="oferta" className="h-5 w-5 text-red-500 bg-gray-700 border-gray-600" />
              <span className="ml-4">400% (Potencial de aumento de 4.0 cm de lápiz)</span>
            </label>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={handlePrev}
              className="flex items-center px-6 py-3 rounded-lg font-medium transition-all bg-gray-800 text-gray-400 hover:bg-gray-700"
            >
              Anterior
            </button>
            <button 
              onClick={handleSubmitQuiz}
              className="flex items-center px-6 py-3 rounded-lg font-medium transition-all bg-green-600 hover:bg-green-700 text-white"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Banner de Oferta */}
      <div className="w-full bg-red-600 text-white text-center py-2 text-sm font-bold relative">
        <p className="mb-1">
          ¡OFERTA RELÁMPAGO: 60% DE DESCUENTO! Termina en: 
          <span className="font-mono text-lg ml-2">{formatTime(countdownTime)}</span>
        </p>
        <p className="text-xs opacity-80">¡Esta oferta ha estado activa durante 2 semanas y hoy es el último día!</p>
      </div>

      <div className="flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl mx-auto">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  )
}

