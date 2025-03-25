"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Music, Rabbit, Cigarette, MessageSquare } from "lucide-react"

export function ListViewWithSwitch() {
  const [preferences, setPreferences] = useState({
    music: true,
    pets: true,
    smoking: false,
    conversations: false,
  })

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-muted-foreground" />
            <span>Music</span>
          </div>
          <Switch checked={preferences.music} onCheckedChange={() => handleToggle("music")} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rabbit className="h-5 w-5 text-muted-foreground" />
            <span>Pets</span>
          </div>
          <Switch checked={preferences.pets} onCheckedChange={() => handleToggle("pets")} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cigarette className="h-5 w-5 text-muted-foreground" />
            <span>Smoking</span>
          </div>
          <Switch checked={preferences.smoking} onCheckedChange={() => handleToggle("smoking")} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <span>Conversations</span>
          </div>
          <Switch checked={preferences.conversations} onCheckedChange={() => handleToggle("conversations")} />
        </div>
      </div>
    </div>
  )
}

