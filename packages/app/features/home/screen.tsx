import { Database } from '@guessai/supabase/types/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useForm } from 'react-hook-form'
import {
  Anchor,
  Button,
  Form,
  H1,
  Paragraph,
  Separator,
  Sheet,
  XStack,
  YStack,
  useToastController,
} from '@my/ui'
import { Input } from '../../components/Input'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useCallback, useState } from 'react'
import { useLink } from 'solito/link'
import { supabaseClient } from '@guessai/supabase/client/client'
import { GameList } from './GameList'

interface LoginForm {
  username: string
  password: string
}

export function HomeScreen() {
  const user = useUser();
  const linkProps = useLink({
    href: '/user/nate',
  })
  const [showGameList, setShowGameList] = useState(false);

  const { control, handleSubmit } = useForm<LoginForm>()

  const handleLogin = useCallback(
    handleSubmit((data) => {
      console.log(data)
      supabaseClient.auth.signInWithPassword({email: data.username, password: data.password }).then((data) => {
        console.log(data);
        setShowGameList(true);
      });
    }),
    [handleSubmit]
  )

  // if (!user)
  // return (
  //   <Auth
  //     redirectTo="http://localhost:3000/"
  //     appearance={{ theme: ThemeSupa }}
  //     supabaseClient={supabaseClient}
  //     providers={['google', 'github']}
  //     socialLayout="horizontal"
  //   />
  // )

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      {showGameList &&<GameList />}
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>
      

        <Separator />
        <YStack gap="$-1.5">
          <Form onSubmit={handleLogin}>
            <Input name="username" control={control} />
            <Input name="password" control={control} />
            <Form.Trigger asChild>
              <Button>Login</Button>
            </Form.Trigger>
          </Form>
        </YStack>
        <Paragraph ta="center">
          Made by{' '}
          <Anchor color="$color12" href="https://twitter.com/natebirdman" target="_blank">
            @natebirdman
          </Anchor>
          ,{' '}
          <Anchor
            color="$color12"
            href="https://github.com/tamagui/tamagui"
            target="_blank"
            rel="noreferrer"
          >
            give it a ⭐️
          </Anchor>
        </Paragraph>
      </YStack>

      <XStack>
        <Button {...linkProps}>Link to user</Button>
      </XStack>

      <SheetDemo />
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
