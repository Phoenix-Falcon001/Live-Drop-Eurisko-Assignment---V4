import React, { useState } from "react"
import groundTruth from "../assistant/ground-truth.json"
import { getOrderStatus } from "../lib/api"

export default function AskSupport() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const handleAsk = () => {
    if (!question.trim()) return

    const orderIdMatch = question.match(/[A-Z0-9]{10,}/)
    if (orderIdMatch) {
      const orderId = orderIdMatch[0]
      const order = getOrderStatus(orderId)
      setAnswer(`Order ****${orderId.slice(-4)}: Status ${order.status} [Q00]`)
      setQuestion("")
      return
    }

    const keywords = question.toLowerCase().split(/\s+/)
    let bestMatch = null
    let score = 0
    for (const qa of groundTruth) {
      const qWords = qa.question.toLowerCase().split(/\s+/)
      const intersect = qWords.filter((w) => keywords.includes(w))
      if (intersect.length > score) {
        score = intersect.length
        bestMatch = qa
      }
    }
    setAnswer(!bestMatch ? "Sorry, I cannot answer that question. [Q00]" : `${bestMatch.answer} [${bestMatch.qid}]`)
    setQuestion("")
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-xl shadow-lg p-4 w-full sm:w-80">
      <h2 className="text-lg font-bold mb-2">Ask Support 💬</h2>
      <textarea
        className="w-full border p-2 rounded mb-2 text-sm"
        rows={3}
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm w-full hover:bg-blue-700 transition"
      >
        Ask
      </button>
      {answer && <p className="text-sm mt-2 pt-2 text-gray-700">{answer}</p>}
    </div>
  )
}
