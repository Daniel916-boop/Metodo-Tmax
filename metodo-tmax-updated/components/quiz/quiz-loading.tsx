"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function QuizLoading() {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)

  const messages = [
    "Analizando tus respuestas...",
    "Calculando tu nivel hormonal actual...",
    "Determinando tu potencial de crecimiento...",
    "Creando tu protocolo personalizado...",
    "Finalizando tu diagnóstico..."
  ]

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2
      })
    }, 100)

    const messageTimer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 2000)

    return () => {
      clearInterval(progressTimer)
      clearInterval(messageTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 border-4 border-gray-800 rounded-full"
            />
            <motion.div
              className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{progress}%</span>
            </div>
          </div>
        </motion.div>

        <motion.h2
          key={currentMessage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-xl font-bold text-white mb-4"
        >
          {messages[currentMessage]}
        </motion.h2>

        <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <p className="text-gray-400 text-sm">
          Esto tomará solo unos segundos...
        </p>
      </div>
    </div>
  )
}

