import './styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EntertainmentCorp - TV & Internet Services',
  description: 'Your one-stop destination for premium TV packages and high-speed internet solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
