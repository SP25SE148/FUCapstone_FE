"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { MailPlus, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import type { Capstone, InviteStudent } from "@/types/types"
import { useStudentGroup } from "@/contexts/student/student-group-context"
import { useStudentProfile } from "@/contexts/student/student-profile-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email("Email is not in correct format.").max(100, "Email is too long."),
})

export default function InviteMember() {
  const { studentProfile } = useStudentProfile()
  const { getCapstoneById, getStudentsForInvite, inviteMember } = useStudentGroup()

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [capstone, setCapstone] = useState<Capstone>()
  const [suggestions, setSuggestions] = useState<InviteStudent[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const fetchSuggestions = async (query: string) => {
    if (!query) return setSuggestions([])

    try {
      const res = await getStudentsForInvite(query)
      setSuggestions(res)
    } catch {
      setSuggestions([])
    }
  }

  const handleInputChange = (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(value)
    }, 1000)
  }

  const handleSelectSuggestion = (email: string) => {
    form.setValue("email", email)
    setSuggestions([])
  }

  const handleBlur = () => {
    // Delay để tránh mất focus trước khi click vào gợi ý
    setTimeout(() => {
      setSuggestions([])
    }, 200)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res: any = await inviteMember({
      MemberEmail: values.email,
    })
    if (res?.isSuccess) {
      form.reset()
      setSuggestions([])
    }
  }

  useEffect(() => {
    if (studentProfile?.capstoneId) {
      ;(async () => {
        const capstoneDetail = await getCapstoneById(studentProfile?.capstoneId)
        setCapstone(capstoneDetail)
      })()
    }
  }, [studentProfile?.capstoneId])

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="font-semibold flex flex-wrap items-center gap-2">
        <MailPlus className="size-4 text-primary" />
        Invite Member(s):
        <span className="text-xs sm:text-sm text-muted-foreground">
          Min: {capstone?.minMember} - Max: {capstone?.maxMember}
        </span>
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <div className="flex flex-col sm:flex-row w-full space-y-2 sm:space-y-0 sm:space-x-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1 relative">
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter student email to invite"
                        className="pr-8"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleInputChange(e.target.value)
                        }}
                        onBlur={handleBlur}
                      />
                      {form.watch("email") && (
                        <Button
                          type="button"
                          size={"icon"}
                          variant={"link"}
                          onClick={() => {
                            form.setValue("email", "")
                            setSuggestions([])
                          }}
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      {suggestions?.length > 0 && (
                        <ul className="absolute z-10 bg-white border mt-1 w-full rounded shadow text-sm max-h-40 overflow-y-auto">
                          {suggestions?.map((suggestion) => (
                            <li
                              key={suggestion?.id}
                              className="px-3 py-2 sm:py-4 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelectSuggestion(suggestion?.email)}
                            >
                              <strong className="text-primary text-xs sm:text-sm">{suggestion?.email}</strong> -{" "}
                              <span className="text-muted-foreground text-xs">{suggestion?.id}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-background"
            >
              <MailPlus className="size-4 mr-2 sm:mr-0" />
              <span className="sm:hidden">Invite</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
