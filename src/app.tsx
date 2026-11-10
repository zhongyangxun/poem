import React, { useState, useEffect } from 'react'
import { Text, Box, Newline } from 'ink'
import getSentence from './api/getSentence.js'
import 'dotenv/config'
import { setTimeout } from 'node:timers/promises'

type Poem = {
  sentence: string
  title: string
  dynasty: string
  author: string
}

export default function App() {
  const [poem, setPoem] = useState<Poem>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const poem = await getSentence()
        await setTimeout(5000)
        setLoading(false)
        setPoem({
          sentence: poem.content,
          title: poem.origin.title,
          dynasty: poem.origin.dynasty,
          author: poem.origin.author,
        })
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : '未知错误'
        console.error('获取诗句失败:', errorMsg)
        setError(errorMsg)
      }
    }

    fetchPoem()
  }, [])

  const { sentence, title, dynasty, author } = poem || {}

  return (
    <>
      <Text>
        {loading && <Text color="yellow">Loading...</Text>}
        {error && <Text color="red"> 错误: {error}</Text>}
      </Text>
      {poem && (
        <Box>
          <Text>
            <Text color="green" bold>
              {sentence}
            </Text>
            <Newline />
            <Text color="green">
              ——{dynasty}·{author} 《{title}》
            </Text>
          </Text>
        </Box>
      )}
    </>
  )
}
