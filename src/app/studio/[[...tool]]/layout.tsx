export const metadata = {
  title: 'Sanity Studio',
  description: 'Manage store inventory and settings',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
