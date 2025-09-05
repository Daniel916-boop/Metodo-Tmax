"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function PlanosPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const checkoutUrl = "https://pay.hotmart.com/L101274511Q?checkoutMode=10"

  const handleCheckout = () => {
    window.open(checkoutUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Acceso Completo al Método Tmax</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Aumenta tu testosterona naturalmente con nuestro protocolo científicamente comprobado
          </p>
        </motion.div>

        {/* Plan Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-red-600 to-red-700 p-1 rounded-2xl">
            <div className="bg-gray-900 rounded-2xl p-8 relative overflow-hidden">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Plan Método Tmax</h3>
                <p className="text-gray-400 mb-6">Protocolo completo de optimización hormonal</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {[
                  "Protocolo completo Método Tmax de 21 días",
                  "Rutina de ejercicios específicos para testosterona",
                  "Plan nutricional para optimización hormonal",
                  "Suplementación natural recomendada",
                  "Técnicas de manejo del estrés y cortisol",
                  "Protocolo de sueño para máxima recuperación",
                  "Acceso a la comunidad privada de hombres",
                  "Soporte 24/7 por WhatsApp",
                  "Garantía de resultados en 30 días",
                  "Actualizaciones gratuitas de por vida",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                AUMENTAR MI TESTOSTERONA AHORA
              </motion.button>

              <p className="text-center text-gray-500 text-sm mt-4">Pago seguro procesado por Hotmart</p>
            </div>
          </div>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">Garantía de Resultados en 30 Días</h3>
            <p className="text-gray-400">
              Si no sientes un aumento significativo en tu energía, libido y vitalidad, te devolvemos el 100% de tu
              dinero.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
