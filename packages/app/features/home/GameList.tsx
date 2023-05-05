import { supabaseClient } from '@guessai/supabase/client/client'
import { Database } from '@guessai/supabase/types/supabase'
import { Button, ListItem, Text, YStack } from '@my/ui'
import { useCallback, useEffect, useMemo, useState } from 'react'

const getWords = () => {
  return supabaseClient.from('game').select('*,words (word)').order('created_at')
}

type WordResponse = Awaited<ReturnType<typeof getWords>>['data']

export const GameList = () => {
  const [data, setData] = useState<WordResponse>([])
  useEffect(() => {
    getWords().then((res) => {
      if (res.data) setData(res.data)
    })
  }, [])

  const refreshGameList = useCallback(() => {
    getWords().then((res) => {
      console.log(res)
      if (res.data) setData(res.data)
    })
  }, [])

  console.log(data)

  return (
    <YStack>
      <Text>Game list</Text>
      <Button onPress={refreshGameList}>Refresh</Button>
      {data?.map((entry) => {
        const word = entry.words && 'word' in entry.words ? entry.words.word : null;
        return <ListItem title={entry.date + ' ' + word} subTitle={entry.user_id} />
      })}
    </YStack>
  )
}
