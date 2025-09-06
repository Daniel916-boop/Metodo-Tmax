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
    // Pergunta inicial: Nome
    {
      id: "name",
      question: "¿Cuál es tu nombre?",
      options: [],
      type: "text",
    },
    // Categoría 1: Nivel de Testosterona y Síntomas
    {
      id: "energy",
      question: `${answers.name ? `${answers.name}, ` : ""}¿Cómo evalúas tu nivel de energía y disposición a lo largo del día?`,
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
      question: `${answers.name ? `${answers.name}, ` : ""}¿Has notado cambios en tu masa muscular o dificultad para ganar músculos, incluso entrenando?`,
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
      question: `${answers.name ? `${answers.name}, ` : ""}¿Cómo está la calidad de tu sueño? ¿Te despiertas descansado?`,
      options: [
        { value: "very_poor", label: "Muy mala (insomnio, sueño agitado, despiertas agotado)", percentage: 15 },
        { value: "poor", label: "Mala (dificultad para dormir, sueño ligero)", percentage: 30 },
        { value: "fair", label: "Regular (duermes, pero no siempre despiertas totalmente descansado)", percentage: 55 },
        { value: "good", label: "Buena (duermes profundamente, despiertas revigorizado)", percentage: 85 },
      ],
      type: "single",
    },
    {
      id: "mood",
      question: `${answers.name ? `${answers.name}, ` : ""}¿Has experimentado alteraciones del humor, como irritabilidad, ansiedad o desánimo?`,
      options: [
        { value: "frequently", label: "Frecuentemente (irritabilidad, ansiedad, desánimo constante)", percentage: 10 },
        { value: "occasionally", label: "Ocasionalmente (algunos momentos de irritabilidad o desánimo)", percentage: 25 },
        { value: "rarely", label: "Raramente (humor estable, pocas alteraciones)", percentage: 50 },
        { value: "never", label: "Nunca (siempre de buen humor, positivo)", percentage: 80 },
      ],
      type: "single",
    },
    // Categoría 2: Vida Sexual y Libido
    {
      id: "libido",
      question: `${answers.name ? `${answers.name}, ` : ""}¿Con qué frecuencia sientes deseo sexual (libido)?`,
      options: [
        { value: "almost_never", label: "Casi nunca (libido muy baja o inexistente)", percentage: 10 },
        { value: "rarely", label: "Raramente (poco deseo, solo en situaciones específicas)", percentage: 25 },
        { value: "sometimes", label: "A veces (deseo moderado, varía según el día)", percentage: 50 },
        { value: "frequently", label: "Frecuentemente (deseo sexual alto y regular)", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "erection_quality",
      question: `${answers.name ? `${answers.name}, ` : ""}¿Cómo evalúas la calidad de tus erecciones?`,
      options: [
        { value: "very_unsatisfactory", label: "Muy insatisfactoria (dificultad para tener o mantener erecciones)", percentage: 10 },
        { value: "unsatisfactory", label: "Insatisfactoria (erecciones débiles o inconsistentes)", percentage: 25 },
        { value: "satisfactory", label: "Satisfactoria (erecciones razonables, pero podrían ser mejores)", percentage: 50 },
        { value: "excellent", label: "Excelente (erecciones fuertes, duraderas y espontáneas)", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "orgasm_quality",
      question: `${answers.name ? `${answers.name}, ` : ""}¿Has tenido orgasmos satisfactorios e intensos?`,
      options: [
        { value: "no", label: "No (orgasmos débiles o ausentes)", percentage: 10 },
        { value: "rarely", label: "Raramente (orgasmos poco intensos)", percentage: 25 },
        { value: "sometimes", label: "A veces (orgasmos satisfactorios, pero no siempre intensos)", percentage: 50 },
        { value: "always", label: "Siempre (orgasmos muy intensos y placenteros)", percentage: 80 },
      ],
      type: "single",
    },
    // Categoría 3: Tamaño del Pene y Potencial de Crecimiento
    {
      id: "current_size",
      question: `${answers.name ? `${answers.name}, ` : ""}¿Cuál es el tamaño actual de tu pene erecto (en centímetros)?`,
      options: [
        { value: "below_12", label: "Menos de 12 cm", percentage: 20 },
        { value: "12_to_14", label: "Entre 12 y 14 cm", percentage: 40 },
        { value: "14_to_16", label: "Entre 14 y 16 cm", percentage: 60 },
        { value: "above_16", label: "Más de 16 cm", percentage: 80 },
      ],
      type: "single",
    },
    {
      id: "desired_increase",
      question: `${answers.name ? `${answers.name}, ` : ""}¿Cuántos centímetros te gustaría aumentar en el tamaño de tu pene?`,
      options: [
        { value: "1", label: "1 cm", percentage: 25 },
        { value: "2", label: "2 cm", percentage: 50 },
        { value: "3", label: "3 cm", percentage: 75 },
        { value: "more_than_3", label: "Más de 3 cm", percentage: 100 },
      ],
      type: "single",
    },
    // Categoría 4: Objetivo de Aumento de Testosterona y Relación con Crecimiento
    {
      id: "testosterone_goal",
      question: `${answers.name ? `${answers.name}, ` : ""}¿Cuánto te gustaría aumentar tu nivel de testosterona en 30 días?`,
      options: [
        { value: "400", label: "400% (Potencial de aumento de 4.0 cm de lápiz)", percentage: 400 },
        { value: "100", label: "100% (Potencial de aumento de 2.0 cm de lápiz)", percentage: 100 },
        { value: "50", label: "50% (Potencial de aumento de 1.0 cm de lápiz)", percentage: 50 },
        { value: "25", label: "25% (Potencial de aumento de 0.5 cm de lápiz)", percentage: 25 },
      ],
      type: "single",
      showTable: false,
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

  const handleStartPlan = (url: string) => {
    window.open(url, '_blank')
  }

  const calculateCurrentTestosteroneLevel = () => {
    let totalPercentage = 0
    let questionCount = 0

    // Calcular o nível atual baseado nas respostas (excluindo a pergunta do objetivo)
    Object.keys(answers).forEach((questionId) => {
      if (questionId !== "testosterone_goal") {
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

  const getDesiredIncrease = () => {
    const goalAnswer = answers.testosterone_goal
    const question = questions.find(q => q.id === "testosterone_goal")
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === goalAnswer)
      if (selectedOption && selectedOption.percentage !== undefined) {
        return selectedOption.percentage
      }
    }
    return 50 // default fallback
  }

  if (isLoading) {
    return <QuizLoading />
  }

  if (showResult) {
    const currentLevel = calculateCurrentTestosteroneLevel()
    const desiredIncrease = getDesiredIncrease()
    return (
      <QuizResult 
        currentLevel={currentLevel} 
        desiredIncrease={desiredIncrease} 
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
            showTable={questions[currentStep].showTable}
          />
        </div>
      </div>
    </div>
  )
}

