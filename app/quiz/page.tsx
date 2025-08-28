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

  const questions = [
    {
      id: "energy",
      question: "¿Cómo describirías tu nivel de energía durante el día?",
      options: [
        { value: "very_low", label: "Muy bajo - me siento cansado constantemente" },
        { value: "low", label: "Bajo - necesito cafeína para funcionar" },
        { value: "moderate", label: "Moderado - tengo altibajos durante el día" },
        { value: "high", label: "Alto - me siento energético la mayor parte del día" },
      ],
      type: "single",
    },
    {
      id: "libido",
      question: "¿Cómo está tu libido/deseo sexual?",
      options: [
        { value: "very_low", label: "Muy bajo - casi inexistente" },
        { value: "low", label: "Bajo - rara vez tengo ganas" },
        { value: "moderate", label: "Moderado - a veces sí, a veces no" },
        { value: "high", label: "Alto - tengo deseo sexual regular" },
      ],
      type: "single",
    },
    {
      id: "muscle_mass",
      question: "¿Has notado cambios en tu masa muscular?",
      options: [
        { value: "significant_loss", label: "He perdido mucha masa muscular" },
        { value: "some_loss", label: "He perdido algo de músculo" },
        { value: "maintained", label: "Se mantiene igual" },
        { value: "gaining", label: "Estoy ganando músculo fácilmente" },
      ],
      type: "single",
    },
    {
      id: "mood",
      question: "¿Cómo describirías tu estado de ánimo general?",
      options: [
        { value: "depressed", label: "Deprimido o muy bajo" },
        { value: "irritable", label: "Irritable y de mal humor frecuentemente" },
        { value: "neutral", label: "Neutral, sin grandes cambios" },
        { value: "positive", label: "Positivo y motivado" },
      ],
      type: "single",
    },
    {
      id: "sleep_quality",
      question: "¿Cómo es la calidad de tu sueño?",
      options: [
        { value: "very_poor", label: "Muy mala - me despierto cansado" },
        { value: "poor", label: "Mala - me cuesta conciliar el sueño" },
        { value: "fair", label: "Regular - duermo pero no profundamente" },
        { value: "good", label: "Buena - duermo profundo y descanso bien" },
      ],
      type: "single",
    },
    {
      id: "body_fat",
      question: "¿Has notado cambios en tu grasa corporal?",
      options: [
        { value: "significant_gain", label: "He ganado mucha grasa, especialmente en el abdomen" },
        { value: "some_gain", label: "He ganado algo de peso" },
        { value: "maintained", label: "Se mantiene igual" },
        { value: "losing", label: "Estoy perdiendo grasa fácilmente" },
      ],
      type: "single",
    },
    {
      id: "age",
      question: "¿Qué edad tienes?",
      options: [
        { value: "18_to_25", label: "Entre 18 y 25 años" },
        { value: "26_to_35", label: "Entre 26 y 35 años" },
        { value: "36_to_45", label: "Entre 36 y 45 años" },
        { value: "above_45", label: "Más de 45 años" },
      ],
      type: "single",
    },
    {
      id: "lifestyle",
      question: "¿Cómo describirías tu estilo de vida?",
      options: [
        { value: "sedentary", label: "Sedentario - paso la mayor parte del día sentado" },
        { value: "lightly_active", label: "Ligeramente activo - camino ocasionalmente" },
        { value: "moderately_active", label: "Moderadamente activo - ejercicio 2-3 veces por semana" },
        { value: "very_active", label: "Muy activo - ejercicio regular y vida activa" },
      ],
      type: "single",
    },
    {
      id: "testosterone_goal",
      question: "¿Cuánto te gustaría aumentar tu nivel de testosterona en 30 días?",
      options: [
        { value: "400", label: "400%" },
        { value: "100", label: "100%" },
        { value: "50", label: "50%" },
        { value: "25", label: "25%" },
      ],
      type: "single",
    },
  ]

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Last question completed, show loading
      setIsLoading(true)
      // Simulate loading and calculation
      setTimeout(() => {
        setIsLoading(false)
        setShowResult(true)
      }, 10000)
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

  const getDesiredIncrease = () => {
    const goalAnswer = answers.testosterone_goal
    if (goalAnswer === "400") return 400
    if (goalAnswer === "100") return 100
    if (goalAnswer === "50") return 50
    if (goalAnswer === "25") return 25
    return 50 // default fallback
  }

  if (isLoading) {
    return <QuizLoading />
  }

  if (showResult) {
    return <QuizResult height={0} desiredIncrease={getDesiredIncrease()} onContinue={handleStartPlan} />
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
