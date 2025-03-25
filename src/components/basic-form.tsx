"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function BasicForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [callJohn, setCallJohn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password, callJohn })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <p className="text-xs text-muted-foreground">We'll never share your email with anyone else.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password1 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="callJohn" checked={callJohn} onCheckedChange={(checked) => setCallJohn(checked as boolean)} />
        <Label htmlFor="callJohn" className="text-sm font-medium">
          Call John for dinner
        </Label>
      </div>
      <Button type="submit" className="bg-[#325adb] hover:bg-[#2a4cba]">
        Submit
      </Button>
    </form>
  )
}

