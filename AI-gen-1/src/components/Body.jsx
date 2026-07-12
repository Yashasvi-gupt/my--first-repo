import { useState } from 'react'
import './Body.css'

const API_URL = '/api/ai'

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
    title: 'Summarizer',
    text: 'Turn long text into a short, clear summary.',
    type: 'summarizer'
  },
  {
    title: 'Grammar Fixer',
    text: 'Improve grammar, clarity, and flow in your writing.',
    type: 'grammar'
  },
  {
    title: 'Email Writer',
    text: 'Turn rough notes into a polished email message.',
    type: 'email'
  }
]

function Body({ isDarkMode }) {
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
  const [summaryInput, setSummaryInput] = useState('')
  const [summaryOutput, setSummaryOutput] = useState('')
  const [grammarInput, setGrammarInput] = useState('')
  const [grammarOutput, setGrammarOutput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [emailOutput, setEmailOutput] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('English')
  const [targetLanguage, setTargetLanguage] = useState('Arabic')
  const [isLoading, setIsLoading] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedInput = chatInput.trim()
    if (!trimmedInput) {
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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemContent: 'You are a helpful AI assistant.',
          userContent: trimmedInput,
          temperature: 0.7
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
        throw new Error(data.error?.message || data.error || 'Unable to reach the AI service.')
      }

      const aiText = data.result || 'No response received.'

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
    if (!trimmedInput) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemContent: `You are a professional translator. Translate the user text from ${sourceLanguage} to ${targetLanguage}. Return only the translated text.`,
          userContent: trimmedInput,
          temperature: 0.2
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
        throw new Error(data.error?.message || data.error || 'Unable to translate your text right now.')
      }

      setTranslatedText(data.result || 'No translation returned.')
    } catch (error) {
      setTranslatedText(error.message || 'Translation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const callGroq = async (systemContent, userContent) => {
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
            content: systemContent
          },
          {
            role: 'user',
            content: userContent
          }
        ],
        temperature: 0.6
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Unable to complete your request right now.')
    }

    return data.choices?.[0]?.message?.content || 'No response returned.'
  }

  const handleRefreshChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        text: 'Hello! Ask me anything about your AI idea.'
      }
    ])
    setChatInput('')
  }

  const handleRefreshTranslation = () => {
    setTranslationInput('')
    setTranslatedText('')
  }

  const handleRefreshHumanizer = () => {
    setHumanizerInput('')
    setHumanizedText('')
  }

  const handleRefreshSummary = () => {
    setSummaryInput('')
    setSummaryOutput('')
  }

  const handleRefreshGrammar = () => {
    setGrammarInput('')
    setGrammarOutput('')
  }

  const handleRefreshEmail = () => {
    setEmailInput('')
    setEmailOutput('')
  }

  const handleHumanize = async (event) => {
    event.preventDefault()

    const trimmedInput = humanizerInput.trim()
    if (!trimmedInput) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemContent: 'You are a writing assistant. Rewrite the text so it sounds more natural, clear, and human. Keep the meaning the same and return only the rewritten text.',
          userContent: trimmedInput,
          temperature: 0.6
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
        throw new Error(data.error?.message || data.error || 'Unable to humanize your text right now.')
      }

      setHumanizedText(data.result || 'No humanized text returned.')
    } catch (error) {
      setHumanizedText(error.message || 'Humanizing failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSummarize = async (event) => {
    event.preventDefault()

    const trimmedInput = summaryInput.trim()
    if (!trimmedInput) {
      return
    }

    setIsLoading(true)

    try {
      const result = await callGroq(
        'You are a concise summarizer. Rewrite the text into a short, clear summary while keeping the main meaning. Return only the summary.',
        trimmedInput
      )
      setSummaryOutput(result)
    } catch (error) {
      setSummaryOutput(error.message || 'Summarizing failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGrammar = async (event) => {
    event.preventDefault()

    const trimmedInput = grammarInput.trim()
    if (!trimmedInput) {
      return
    }

    setIsLoading(true)

    try {
      const result = await callGroq(
        'You are a grammar editor. Improve the grammar, clarity, and flow of the text without changing the meaning. Return only the corrected text.',
        trimmedInput
      )
      setGrammarOutput(result)
    } catch (error) {
      setGrammarOutput(error.message || 'Grammar fixing failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmail = async (event) => {
    event.preventDefault()

    const trimmedInput = emailInput.trim()
    if (!trimmedInput) {
      return
    }

    setIsLoading(true)

    try {
      const result = await callGroq(
        'You are an email writing assistant. Turn the notes into a polished, professional email. Return only the email text.',
        trimmedInput
      )
      setEmailOutput(result)
    } catch (error) {
      setEmailOutput(error.message || 'Email writing failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className={`body-section ${isDarkMode ? 'dark' : ''}`} id="about">
      <section className="body-intro" aria-labelledby="body-title">
        <div className="body-intro-top">
          <div>
            <p className="section-tag">AI tools</p>
            <h2 id="body-title">A practical collection of AI-powered features</h2>
            <p>
              Each card is designed as a lightweight app experience for real everyday tasks such as translation, writing, and summarizing.
            </p>
          </div>
        </div>
      </section>

      <div className="body-grid">
        {cards.map((card) => {
          const isChatCard = card.type === 'chat'
          const isTranslationCard = card.type === 'translation'
          const isHumanizerCard = card.type === 'humanizer'
          const isSummarizerCard = card.type === 'summarizer'
          const isGrammarCard = card.type === 'grammar'
          const isEmailCard = card.type === 'email'

          return (
            <article className={`card${isChatCard ? ' chat-card' : ''}${(isTranslationCard || isHumanizerCard || isSummarizerCard || isGrammarCard || isEmailCard) ? ' translation-card' : ''}`} key={card.title}>
              <div className="card-header">
                <div>
                  <h3>{card.title}</h3>
                  <div className="example-row">
                    {isChatCard ? (
                      <><span className="example-pill">Ask anything</span><span className="example-pill">Get help</span></>
                    ) : isTranslationCard ? (
                      <><span className="example-pill">Translate text</span><span className="example-pill">Switch languages</span></>
                    ) : isHumanizerCard ? (
                      <><span className="example-pill">Humanize writing</span><span className="example-pill">Sound natural</span></>
                    ) : isSummarizerCard ? (
                      <><span className="example-pill">Summarize text</span><span className="example-pill">Condense notes</span></>
                    ) : isGrammarCard ? (
                      <><span className="example-pill">Fix grammar</span><span className="example-pill">Improve flow</span></>
                    ) : isEmailCard ? (
                      <><span className="example-pill">Draft emails</span><span className="example-pill">Polish messages</span></>
                    ) : null}
                  </div>
                </div>
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
                      <div className="action-row">
                        <button type="submit" disabled={isLoading}>
                          {isLoading ? 'Thinking...' : 'Send'}
                        </button>
                        <button type="button" className="secondary-btn" onClick={handleRefreshChat}>
                          Refresh
                        </button>
                      </div>
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
              ) : isSummarizerCard ? (
                <>
                  <p className="card-description">{card.text}</p>
                  <form className="translation-form" onSubmit={handleSummarize}>
                    <label className="sr-only" htmlFor="summary-input">
                      Enter text to summarize
                    </label>
                    <textarea
                      id="summary-input"
                      rows="4"
                      value={summaryInput}
                      onChange={(event) => setSummaryInput(event.target.value)}
                      placeholder="Paste a long paragraph here..."
                    />
                    <div className="action-row">
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Summarizing...' : 'Summarize'}
                      </button>
                      <button type="button" className="secondary-btn" onClick={handleRefreshSummary}>
                        Refresh
                      </button>
                    </div>
                  </form>
                  <div className="translation-output" aria-live="polite">
                    <strong>Summary:</strong>
                    <p>{summaryOutput || 'Your summary will appear here.'}</p>
                  </div>
                </>
              ) : isGrammarCard ? (
                <>
                  <p className="card-description">{card.text}</p>
                  <form className="translation-form" onSubmit={handleGrammar}>
                    <label className="sr-only" htmlFor="grammar-input">
                      Enter text to improve
                    </label>
                    <textarea
                      id="grammar-input"
                      rows="4"
                      value={grammarInput}
                      onChange={(event) => setGrammarInput(event.target.value)}
                      placeholder="Paste text that needs polishing..."
                    />
                    <div className="action-row">
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Editing...' : 'Fix Grammar'}
                      </button>
                      <button type="button" className="secondary-btn" onClick={handleRefreshGrammar}>
                        Refresh
                      </button>
                    </div>
                  </form>
                  <div className="translation-output" aria-live="polite">
                    <strong>Improved Text:</strong>
                    <p>{grammarOutput || 'Your corrected text will appear here.'}</p>
                  </div>
                </>
              ) : isEmailCard ? (
                <>
                  <p className="card-description">{card.text}</p>
                  <form className="translation-form" onSubmit={handleEmail}>
                    <label className="sr-only" htmlFor="email-input">
                      Enter notes for the email
                    </label>
                    <textarea
                      id="email-input"
                      rows="4"
                      value={emailInput}
                      onChange={(event) => setEmailInput(event.target.value)}
                      placeholder="Write a few notes for your email..."
                    />
                    <div className="action-row">
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Writing...' : 'Write Email'}
                      </button>
                      <button type="button" className="secondary-btn" onClick={handleRefreshEmail}>
                        Refresh
                      </button>
                    </div>
                  </form>
                  <div className="translation-output" aria-live="polite">
                    <strong>Draft Email:</strong>
                    <p>{emailOutput || 'Your polished email will appear here.'}</p>
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
