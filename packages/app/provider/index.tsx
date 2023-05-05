import {
  CustomToast,
  TamaguiProvider,
  TamaguiProviderProps,
  ToastProvider,
  ToastViewport,
} from '@my/ui'
import { useColorScheme } from 'react-native'

import config from '../tamagui.config'
import { supabaseClient } from '@guessai/supabase/client/client'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  return (
    <TamaguiProvider
      config={config}
      disableInjectCSS
      defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      <ToastProvider
        swipeDirection="horizontal"
        duration={6000}
        native={
          [
            /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
            // 'mobile'
          ]
        }
      >
        {children}

        <CustomToast />
        <ToastViewport left={0} right={0} top={10} />
      </ToastProvider>
    </TamaguiProvider>
  )
}
