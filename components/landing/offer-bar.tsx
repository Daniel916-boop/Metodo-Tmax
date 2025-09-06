"use client"

import React, { useEffect, useState } from 'react';

const OfferBar: React.FC = () => {
  const calculateTimeLeft = () => {
    // Definir 2 horas a partir do momento atual
    const now = new Date();
    const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 horas em milissegundos
    const difference = +endTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {


    timerComponents.push(
      <span key={interval}>
        {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}{interval === 'hours' || interval === 'minutes' ? ':' : ''}
      </span>
    );
  });

  return (
    <div className="w-full bg-red-600 text-white text-center py-2 text-sm font-bold relative">
      <p className="mb-1">¡OFERTA RELÁMPAGO: 60% DE DESCUENTO! Termina en:  {timerComponents.length ? timerComponents : <span>¡Tiempo agotado!</span>}</p>
      <p className="text-xs opacity-80">¡Esta oferta ha estado activa durante 2 semanas y hoy es el último día!</p>
    </div>
  );
};

export default OfferBar;


