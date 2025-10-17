import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function GoBackButton() {
  const navigate = useNavigate()
  return (
    <motion.button
      onClick={() => navigate(-1)}
      className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      ← Go Back
    </motion.button>
  )
}
