"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import RequiredAsterisk from '@/components/required-asterisk'

const radioOptions = [
  { value: 'option1', id: 'option1', label: 'Option one is this and that—be sure to include why it\'s great' },
  { value: 'option2', id: 'option2', label: 'Option two can be something else and selecting it will deselect option one' },
  { value: 'option3', id: 'option3', label: 'Option three is disabled', disabled: true },
]

export function HorizontalForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    radioOption: "option1",
    checkMe: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        <Label htmlFor="horizontalEmail" className="col-span-2 text-sm font-medium">
          Email Address <RequiredAsterisk />
        </Label>
        <div className="col-span-10">
          <Input
            id="horizontalEmail"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        <Label htmlFor="horizontalPassword" className="col-span-2 text-sm font-medium">
          Password <RequiredAsterisk />
        </Label>
        <div className="col-span-10">
          <Input
            id="horizontalPassword"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4">
        <div className="col-span-2 text-sm font-medium">Radio Buttons</div>
        <div className="col-span-10 space-y-2">
          <RadioGroup value={form.radioOption} onValueChange={(value) => setForm((prev) => ({ ...prev, radioOption: value }))} >
            {radioOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} disabled={option.disabled} />
                <Label htmlFor={option.id} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        <div className="col-span-2 text-sm font-medium">Checkbox</div>
        <div className="col-span-10">
          <div className="flex items-center space-x-2">
            <Checkbox id="checkMeOut" name="checkMe" checked={form.checkMe} onCheckedChange={(checked) => setForm((prev) => ({ ...prev, checkMe: checked as boolean }))} />
            <Label htmlFor="checkMeOut" className="text-sm">
              Check me out
            </Label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-2"></div>
        <div className="col-span-10">
          <Button type="submit" >
            Sign In
          </Button>
        </div>
      </div>
    </form>
  )
}

