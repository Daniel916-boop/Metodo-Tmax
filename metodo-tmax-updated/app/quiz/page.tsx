"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import QuizHeader from "@/components/quiz/quiz-header"
import QuizQuestion from "@/components/quiz/quiz-question"
import QuizLoading from "@/components/quiz/quiz-loading"
import QuizResult from "@/components/quiz/quiz-result"

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [userName, setUserName] = useState("")

  const questions = [
    // Pergunta inicial para capturar o nome
    {
      id: "name",
      question: "¿Cuál es tu nombre?",
      options: [],
      type: "text",
    },
    // Categoría 1: Nivel de Testosterona y Síntomas
    {
      id: "energy",
      question: `${userName ? userName + ", " : ""}¿Cómo evalúas tu nivel de energía y disposición a lo largo del día?`,
      options: [
        { value: "very_low", label: "Muy bajo (siempre cansado, falta de iniciativa)", percentage: 10 },
        { value: "low", label: "Bajo (cansancio frecuente, dificultad para concentrarse)", percentage: 25 },
        { value: "moderate", label: "Moderado (energía razonable, algunos picos de cansancio)", percentage: 50 },
        { value: "high", label: "Alto (lleno de energía, productivo todo el día)", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "muscle_mass",
      question: `${userName ? userName + ", " : ""}¿Has notado cambios en tu masa muscular o dificultad para ganar músculos, incluso entrenando?`,
      options: [
        { value: "significant_loss", label: "Pérdida significativa de masa muscular", percentage: 15 },
        { value: "some_loss", label: "Pequeña pérdida o dificultad para ganar", percentage: 30 },
        { value: "maintained", label: "Mantenimiento de la masa muscular", percentage: 55 },
        { value: "gaining", label: "Ganancia fácil de masa muscular", percentage: 85 },
      ],
      type: "single",
    },
    {
      id: "sleep_quality",
      question: `${userName ? userName + ", " : ""}¿Cómo está la calidad de tu sueño? ¿Te despiertas descansado?`,
      options: [
        { value: "very_poor", label: "Muy mala (insomnio, sueño agitado, despiertas agotado)", percentage: 15 },
        { value: "poor", label: "Mala (dificultad para dormir, sueño ligero)", percentage: 30 },
        { value: "fair", label: "Regular (duermes, pero no siempre despiertas totalmente descansado)", percentage: 55 },
        { value: "good", label: "Buena (duermes profundamente, despiertas revigorizado)", percentage: 85 },
      ],
      type: "single",
    },
    // Pergunta final com redirecionamentos
    {
      id: "final_question",
      question: `${userName ? userName + ", " : ""}¿Cuál es tu principal objetivo con el Método Tmax?`,
      options: [
        { 
          value: "energy_focus", 
          label: "Aumentar mi energía y vitalidad", 
          percentage: 70,
          redirect: "https://pay.hotmart.com/L101274511Q?checkoutMode=10&src=energy"
        },
        { 
          value: "muscle_focus", 
          label: "Ganar masa muscular y fuerza", 
          percentage: 75,
          redirect: "https://pay.hotmart.com/L101274511Q?checkoutMode=10&src=muscle"
        },
        { 
          value: "libido_focus", 
          label: "Mejorar mi libido y vida sexual", 
          percentage: 80,
          redirect: "https://pay.hotmart.com/L101274511Q?checkoutMode=10&src=libido"
        },
        { 
          value: "complete_focus", 
          label: "Transformación completa (energía + músculo + libido)", 
          percentage: 90,
          redirect: "https://pay.hotmart.com/L101274511Q?checkoutMode=10&src=complete"
        },
      ],
      type: "single",
    },
  ]

  const handleAnswer = (questionId: string, answer: any) => {
    if (questionId === "name") {
      setUserName(answer)
    }
    
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Última pergunta - redirecionar baseado na resposta
      const finalAnswer = answers["final_question"]
      const selectedOption = questions[questions.length - 1].options.find(opt => opt.value === finalAnswer)
      
      if (selectedOption && selectedOption.redirect) {
        window.open(selectedOption.redirect, "_blank")
      } else {
        // Fallback para planos
        router.push("/planos")
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleStartPlan = () => {
    router.push("/planos")
  }

  const calculateCurrentTestosteroneLevel = () => {
    let totalPercentage = 0
    let questionCount = 0

    // Calcular o nível atual baseado nas respostas (excluindo a pergunta do nome e objetivo)
    Object.keys(answers).forEach((questionId) => {
      if (questionId !== "name" && questionId !== "final_question") {
        const question = questions.find(q => q.id === questionId)
        if (question) {
          const selectedOption = question.options.find(opt => opt.value === answers[questionId])
          if (selectedOption && selectedOption.percentage !== undefined) {
            totalPercentage += selectedOption.percentage
            questionCount++
          }
        }
      }
    })

    return questionCount > 0 ? Math.round(totalPercentage / questionCount) : 50
  }

  if (isLoading) {
    return <QuizLoading />
  }

  if (showResult) {
    const currentLevel = calculateCurrentTestosteroneLevel()

    return (
      <QuizResult 
        currentLevel={currentLevel} 
        userName={userName}
        onContinue={handleStartPlan} 
      />
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-4">
      <div className="container mx-auto px-4 max-w-3xl">
        <QuizHeader currentStep={currentStep} totalSteps={questions.length} />

        <div className="w-full">
          <QuizQuestion
            question={questions[currentStep].question}
            options={questions[currentStep].options}
            type={questions[currentStep].type}
            value={answers[questions[currentStep].id] || null}
            onChange={(answer) => handleAnswer(questions[currentStep].id, answer)}
            onNext={handleNext}
            onBack={handleBack}
            showBack={currentStep > 0}
          />
        </div>
      </div>
    </div>
  )
}

