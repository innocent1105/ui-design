"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function HorizontalForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [radioOption, setRadioOption] = useState("option1")
  const [checkMe, setCheckMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password, radioOption, checkMe })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-12 items-center gap-4">
        <Label htmlFor="horizontalEmail" className="col-span-2 text-sm font-medium">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <div className="col-span-10">
          <Input
            id="horizontalEmail"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-12 items-center gap-4">
        <Label htmlFor="horizontalPassword" className="col-span-2 text-sm font-medium">
          Password <span className="text-red-500">*</span>
        </Label>
        <div className="col-span-10">
          <Input
            id="horizontalPassword"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-12 items-start gap-4">
        <div className="col-span-2 text-sm font-medium">Radio Buttons</div>
        <div className="col-span-10 space-y-2">
          <RadioGroup value={radioOption} onValueChange={setRadioOption}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1" className="text-sm">
                Option one is this and that—be sure to include why it's great
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2" className="text-sm">
                Option two can be something else and selecting it will deselect option one
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="option3" disabled />
              <Label htmlFor="option3" className="text-sm text-muted-foreground">
                Option three is disabled
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-2 text-sm font-medium">Checkbox</div>
        <div className="col-span-10">
          <div className="flex items-center space-x-2">
            <Checkbox id="checkMeOut" checked={checkMe} onCheckedChange={(checked) => setCheckMe(checked as boolean)} />
            <Label htmlFor="checkMeOut" className="text-sm">
              Check me out
            </Label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2"></div>
        <div className="col-span-10">
          <Button type="submit" className="bg-[#325adb] hover:bg-[#2a4cba]">
            Sign In
          </Button>
        </div>
      </div>
    </form>
  )
}

