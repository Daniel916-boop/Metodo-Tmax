"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type QuizHeaderProps = {
  currentStep: number
  totalSteps: number
}

export default function QuizHeader({ currentStep, totalSteps }: QuizHeaderProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutos em segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full mb-8">
      {/* Barra superior com cronômetro */}
      <div className="bg-red-600 text-white p-3 rounded-lg mb-6 text-center">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold text-lg">OFERTA LIMITADA</span>
          </div>
          <div className="text-2xl font-mono font-bold">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm">
            ¡Solo por hoy con 67% de descuento!
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Diagnóstico <span className="text-red-500">Personalizado</span>
        </h1>
        <p className="text-gray-400">
          Pregunta {currentStep + 1} de {totalSteps}
        </p>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
        <motion.div
          className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-400">{Math.round(progress)}% completado</span>
      </div>
    </div>
  )
}

