'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function AnnouncementBar({ settings }: { settings: any }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (settings?.announcementActive) {
      // Check session storage so we don't annoy the user if they closed the popup
      const closed = sessionStorage.getItem('announcement_closed')
      if (!closed) {
        setIsVisible(true)
      }
    }
  }, [settings])

  if (!isMounted || !isVisible || !settings?.announcementActive) return null

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('announcement_closed', 'true')
  }

  const content = (
    <div className="flex-1 text-center font-medium">
      {settings.announcementLink ? (
        <a href={settings.announcementLink} className="underline hover:text-white/80 transition-colors">
          {settings.announcementText}
        </a>
      ) : (
        <span>{settings.announcementText}</span>
      )}
    </div>
  )

  if (settings.announcementType === 'popup') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Special Announcement</h2>
          <div className="text-lg text-slate-600 mb-8">
            {settings.announcementLink ? (
              <a href={settings.announcementLink} className="text-blue-600 hover:underline">
                {settings.announcementText}
              </a>
            ) : (
              settings.announcementText
            )}
          </div>
          <button 
            onClick={handleClose}
            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    )
  }

  // Banner mode (default)
  return (
    <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between z-[60] relative shadow-md">
      {content}
      <button 
        onClick={handleClose}
        className="p-1 hover:bg-white/20 rounded-full transition-colors ml-4 shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
