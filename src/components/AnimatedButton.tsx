// AnimatedButton.tsx
import React from 'react'
import './button.css'

interface AnimatedButtonProps {
  text: string
  onClick?: () => void
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-auto h-[50px] text-white font-semibold py-2 px-4 rounded-lg shadow-md whitespace-normal transition-all duration-200 ease-in-out transform hover:scale-105 animated-bg hover-animated-bg"
    >
      {text}
    </button>
  )
}

export default AnimatedButton
