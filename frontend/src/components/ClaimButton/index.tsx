"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Coin {
  id: number
  x: number
  delay: number
}

interface Props {
  onPress?: () => void
}

export default function ClaimButton({ onPress }: Props) {
  const [coins, setCoins] = useState<Coin[]>([])
  const [totalCoins, setTotalCoins] = useState(0)

  const handleDrop = () => {
    onPress?.()

    const newCoins = Array.from({ length: 10 }, (_, i) => ({
      id: totalCoins + i,
      x: Math.random() * 100 - 50, // Random x position between -50 and 50
      delay: Math.random() * 2, // Increase max delay to 2 seconds
    }))
    setCoins((prevCoins) => [...prevCoins, ...newCoins])
    setTotalCoins((prev) => prev + 10)

    // Remove coins after animation
    setTimeout(() => {
      setCoins((prevCoins) => prevCoins.slice(10))
    }, 12000) // Increase to 12 seconds
  }

  return (
    <div className="">
      <div className="mb-8 space-y-4 text-center">
        <button
          onClick={handleDrop}>
          Claim more Coins
        </button>
      </div>
      
      <div className="relative w-64 h-96 border-4 border-gray-700 rounded-lg bg-opacity-50 bg-gray-200 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {coins.map((coin) => (
            <motion.svg
              key={coin.id}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              initial={{ y: -50, x: coin.x, opacity: 0 }}
              animate={{ y: 400, opacity: 1 }}
              exit={{
                y: 450,
                opacity: 0,
                transition: { duration: 2 } // 2-second exit animation
              }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 10,
                mass: 1,
                delay: coin.delay,
                duration: 5, // Increase duration to 5 seconds
              }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
            >
              <circle cx="20" cy="20" r="18" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
              <text x="20" y="25" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#DAA520">$</text>
            </motion.svg>
          ))}
        </AnimatePresence>
        
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-12 bg-gray-300 rounded-t-full overflow-hidden">
          <div className="w-full h-full bg-gray-400 rounded-t-full transform translate-y-1/2"></div>
        </div>
      </div>
    </div>
  )
}

export { ClaimButton };