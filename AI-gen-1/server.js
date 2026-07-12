import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/ai', async (req, res) => {
  const { systemContent, userContent, model = 'llama-3.1-8b-instant', temperature = 0.6 } = req.body

  const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key is not configured.' })
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemContent },
          { role: 'user', content: userContent }
        ],
        temperature
      })
    })

    const text = await response.text()
    let data = {}

    if (text) {
      try {
        data = JSON.parse(text)
      } catch {
        data = { error: text }
      }
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || data.error || 'Groq request failed.' })
    }

    return res.json({
      result: data.choices?.[0]?.message?.content || 'No response returned.'
    })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error.' })
  }
})

app.listen(port, () => {
  console.log(`AI backend running on http://localhost:${port}`)
})
