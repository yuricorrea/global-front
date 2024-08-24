'use client'
import { NextUIProvider } from '@nextui-org/react'
import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'

export function Providers({ children }) {
  return (
    <RecoilRoot>
      <NextUIProvider>
        <Suspense fallback={<div>Loading...</div>}>
        {children}
        </Suspense>
      </NextUIProvider>
    </RecoilRoot>
  )
}