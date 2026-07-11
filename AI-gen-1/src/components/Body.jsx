import { useState } from 'react'
import './Body.css'

const GROQ_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const cards = [
  {
    title: 'AI Chat Assistant',
    text: 'Try a simple AI-style conversation inside the first card.',
    type: 'chat'
  },
  {
    title: 'Translation AI Tool',
    text: 'Translate text quickly with a simple and clean interface.',
    type: 'translation'
  },
  {
    title: 'Text Humanizer',
    text: 'Turn stiff or robotic text into a natural, human-sounding version.',
    type: 'humanizer'
  },
  {
    title: 'Fast Performance',
    text: 'A simple layout keeps the interface lightweight, smooth, and responsive.'
  },
  {
    title: 'Easy Maintenance',
    text: 'Reusable sections and readable code make future updates straightforward.'
  },
  {
    title: 'Accessible Design',
    text: 'Readable text, strong contrast, and semantic markup improve the experience for all users.'
  },
  {
    title: 'Scalable Content',
    text: 'You can expand the page with new services or sections without rebuilding the structure.'
  },
  {
    title: 'Modern User Experience',
    text: 'A clean visual approach builds trust while keeping the page professional and easy to scan.'
  }
]

function Body() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: 'Hello! Ask me anything about your AI idea.'
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [translationInput, setTranslationInput] = useState('')
  const [humanizerInput, setHumanizerInput] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [humanizedText, setHumanizedText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('English')
  const [targetLanguage, setTargetLanguage] = useState('Arabic')
  const [isLoading, setIsLoading] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedInput = chatInput.trim()
    if (!trimmedInput || !GROQ_API_KEY) {
      return
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: trimmedInput
    }

    setMessages((previousMessages) => [...previousMessages, userMessage])
    setChatInput('')
    setIsLoading(true)

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant.'
            },
            {
              role: 'user',
              content: trimmedInput
            }
          ],
          temperature: 0.7
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Unable to reach the AI service.')
      }

      const aiText = data.choices?.[0]?.message?.content || 'No response received.'

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: aiText
        }
      ])
    } catch (error) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now() + 2,
          role: 'assistant',
          text: error.message || 'Something went wrong. Please try again.'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleTranslation = async (event) => {
    event.preventDefault()

    const trimmedInput = translationInput.trim()
    if (!trimmedInput || !GROQ_API_KEY) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: `You are a professional translator. Translate the user text from ${sourceLanguage} to ${targetLanguage}. Return only the translated text.`
            },
            {
              role: 'user',
              content: trimmedInput
            }
          ],
          temperature: 0.2
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Unable to translate your text right now.')
      }

      setTranslatedText(data.choices?.[0]?.message?.content || 'No translation returned.')
    } catch (error) {
      setTranslatedText(error.message || 'Translation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefreshTranslation = () => {
    setTranslationInput('')
    setTranslatedText('')
  }

  const handleRefreshHumanizer = () => {
    setHumanizerInput('')
    setHumanizedText('')
  }

  const handleHumanize = async (event) => {
    event.preventDefault()

    const trimmedInput = humanizerInput.trim()
    if (!trimmedInput || !GROQ_API_KEY) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: 'You are a writing assistant. Rewrite the text so it sounds more natural, clear, and human. Keep the meaning the same and return only the rewritten text.'
            },
            {
              role: 'user',
              content: trimmedInput
            }
          ],
          temperature: 0.6
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Unable to humanize your text right now.')
      }

      setHumanizedText(data.choices?.[0]?.message?.content || 'No humanized text returned.')
    } catch (error) {
      setHumanizedText(error.message || 'Humanizing failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="body-section" id="about">
      <section className="body-intro" aria-labelledby="body-title">
        <p className="section-tag">Why this layout works</p>
        <h2 id="body-title">Simple content that is easy to read and grow</h2>
        <p>
          These cards highlight the core benefits of a well-structured, SEO-friendly homepage.
        </p>
      </section>

      <div className="body-grid">
        {cards.map((card) => {
          const isChatCard = card.type === 'chat'
          const isTranslationCard = card.type === 'translation'
          const isHumanizerCard = card.type === 'humanizer'

          return (
            <article className={`card${isChatCard ? ' chat-card' : ''}${isTranslationCard ? ' translation-card' : ''}${isHumanizerCard ? ' translation-card' : ''}`} key={card.title}>
              <div className="card-header">
                <h3>{card.title}</h3>
                {isChatCard ? (
                  <button
                    type="button"
                    className="collapse-toggle"
                    onClick={() => setIsCollapsed((previous) => !previous)}
                    aria-expanded={!isCollapsed}
                  >
                    {isCollapsed ? 'Expand' : 'Collapse'}
                  </button>
                ) : null}
              </div>
              {isChatCard ? (
                !isCollapsed ? (
                  <>
                    <p className="card-description">{card.text}</p>
                    <div className="chat-window" aria-live="polite">
                      {messages.map((message) => (
                        <div key={message.id} className={`chat-bubble ${message.role}`}>
                          {message.text}
                        </div>
                      ))}
                    </div>
                    <form className="chat-form" onSubmit={handleSubmit}>
                      <label className="sr-only" htmlFor="ai-chat-input">
                        Ask the AI assistant
                      </label>
                      <input
                        id="ai-chat-input"
                        type="text"
                        value={chatInput}
                        onChange={(event) => setChatInput(event.target.value)}
                        placeholder="Ask something..."
                        disabled={isLoading}
                      />
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Thinking...' : 'Send'}
                      </button>
                    </form>
                  </>
                ) : null
              ) : isTranslationCard ? (
                <>
                  <p className="card-description">{card.text}</p>
                  <form className="translation-form" onSubmit={handleTranslation}>
                    <label className="sr-only" htmlFor="translation-input">
                      Enter text to translate
                    </label>
                    <textarea
                      id="translation-input"
                      rows="4"
                      value={translationInput}
                      onChange={(event) => setTranslationInput(event.target.value)}
                      placeholder="Type text to translate..."
                    />
                    <div className="select-row">
                      <select value={sourceLanguage} onChange={(event) => setSourceLanguage(event.target.value)}>
                        <option>English</option>
                        <option>Arabic</option>
                        <option>French</option>
                        <option>Spanish</option>
                        <option>German</option>
                        <option>Italian</option>
                        <option>Portuguese</option>
                        <option>Turkish</option>
                        <option>Hindi</option>
                        <option>Japanese</option>
                        <option>Korean</option>
                        <option>Chinese</option>
                        <option>Russian</option>
                        <option>Dutch</option>
                        <option>Swedish</option>
                        <option>Polish</option>
                        <option>Ukrainian</option>
                        <option>Greek</option>
                        <option>Hebrew</option>
                        <option>Thai</option>
                      </select>
                      <select value={targetLanguage} onChange={(event) => setTargetLanguage(event.target.value)}>
                        <option>Arabic</option>
                        <option>English</option>
                        <option>French</option>
                        <option>Spanish</option>
                        <option>German</option>
                        <option>Italian</option>
                        <option>Portuguese</option>
                        <option>Turkish</option>
                        <option>Hindi</option>
                        <option>Japanese</option>
                        <option>Korean</option>
                        <option>Chinese</option>
                        <option>Russian</option>
                        <option>Dutch</option>
                        <option>Swedish</option>
                        <option>Polish</option>
                        <option>Ukrainian</option>
                        <option>Greek</option>
                        <option>Hebrew</option>
                        <option>Thai</option>
                      </select>
                    </div>
                    <div className="action-row">
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Translating...' : 'Translate'}
                      </button>
                      <button type="button" className="secondary-btn" onClick={handleRefreshTranslation}>
                        Refresh
                      </button>
                    </div>
                  </form>
                  <div className="translation-output" aria-live="polite">
                    <strong>Translation:</strong>
                    <p>{translatedText || 'Your translation will appear here.'}</p>
                  </div>
                </>
              ) : isHumanizerCard ? (
                <>
                  <p className="card-description">{card.text}</p>
                  <form className="translation-form" onSubmit={handleHumanize}>
                    <label className="sr-only" htmlFor="humanizer-input">
                      Enter text to humanize
                    </label>
                    <textarea
                      id="humanizer-input"
                      rows="4"
                      value={humanizerInput}
                      onChange={(event) => setHumanizerInput(event.target.value)}
                      placeholder="Paste AI-like text here..."
                    />
                    <div className="action-row">
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Humanizing...' : 'Humanize'}
                      </button>
                      <button type="button" className="secondary-btn" onClick={handleRefreshHumanizer}>
                        Refresh
                      </button>
                    </div>
                  </form>
                  <div className="translation-output" aria-live="polite">
                    <strong>Humanized Text:</strong>
                    <p>{humanizedText || 'Your improved text will appear here.'}</p>
                  </div>
                </>
              ) : (
                <p>{card.text}</p>
              )}
            </article>
          )
        })}
      </div>
    </main>
  )
}

export default Body
