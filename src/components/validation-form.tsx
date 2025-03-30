"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const cities = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'houston', label: 'Houston' },
];

export function ValidationForm() {
  const [form, setForm] = useState({
    firstName: "Oran",
    lastName: "Chanofsky",
    city: "",
    state: "",
    zip: "",
    date: undefined as Date | undefined,
    callJohn: false,
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input  id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium">
            City
          </Label>
          <Select value={form.city} onValueChange={(value) => setForm((prev) => ({ ...prev, city: value }))} name="city">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-medium">
            State
          </Label>
          <Input id="state" name="state" placeholder="Enter" value={form.state} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip" className="text-sm font-medium">
            Zip
          </Label>
          <Input id="zip" name="zip" placeholder="Enter" value={form.zip} onChange={handleChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthDate" className="text-sm font-medium">
          Birth Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal !bg-transparent", !form.date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.date ? format(form.date, "PPP") : "Datepicker"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={form.date} onSelect={(date) => setForm((prev) => ({ ...prev, date }))} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="callJohnValidation"
          name="callJohn"
          checked={form.callJohn}
          onCheckedChange={(checked) => setForm((prev) => ({ ...prev, callJohn: checked as boolean }))}
        />
        <Label htmlFor="callJohnValidation" className="text-sm font-medium">
          Call John for dinner
        </Label>
      </div>
      <Button type="submit" >
        Sign In
      </Button>
    </form>
  )
}

