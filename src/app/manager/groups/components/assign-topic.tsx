"use client"

import { toast } from "sonner"
import { useState, useEffect } from "react"
import { Search, X, Check, FileText } from "lucide-react"

import { useManagerGroup } from "@/contexts/manager/manager-group-context"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AssignTopicProps {
  GroupId: string
}

export default function AssignTopic({ GroupId }: AssignTopicProps) {
  const { fetchTopics, assignPendingTopicForGroup } = useManagerGroup()
  const [open, setOpen] = useState<boolean>(false)
  const [topicPending, setTopicPending] = useState<any[]>([])
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredTopics, setFilteredTopics] = useState<any[]>([])

  async function handleOpen() {
    const topics = await fetchTopics()
    setTopicPending(topics)
    setFilteredTopics(topics)
    setOpen(true)
  }

  async function handleAssign() {
    if (!selectedTopicId) {
      toast.error("Please select a topic to assign.")
      return
    }

    await assignPendingTopicForGroup({
      TopicId: selectedTopicId,
      GroupId,
    })

    setOpen(false)
  }

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTopics(topicPending)
    } else {
      const filtered = topicPending.filter(
        (topic) =>
          topic.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.code.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredTopics(filtered)
    }
  }, [searchQuery, topicPending])

  const clearSelection = () => {
    setSelectedTopicId(null)
  }

  return (
    <>
      <Button variant="ghost" className="px-1 pl-2 font-normal w-full items-start justify-start" onClick={handleOpen} >
        Add Topic
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Assign Topic
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Assign Topic to groups that do not have a Topic.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 pt-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search topics by name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {selectedTopicId && (
                <Button variant="outline" size="sm" onClick={clearSelection} className="flex items-center gap-1">
                  <X className="h-3.5 w-3.5" />
                  Clear Selection
                </Button>
              )}
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/40 px-4 py-2 border-b">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Available Topics</div>
                  <Badge variant="outline" className="bg-primary/10">
                    {filteredTopics.length} topics
                  </Badge>
                </div>
              </div>

              <div className="h-[400px] overflow-y-auto">
                {filteredTopics.length > 0 ? (
                  <RadioGroup
                    value={selectedTopicId ?? undefined}
                    onValueChange={(value) => setSelectedTopicId(value)}
                    className="space-y-0 divide-y"
                  >
                    {filteredTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className={`p-4 flex justify-between items-center hover:bg-muted/30 transition-colors ${selectedTopicId === topic.id ? "bg-primary/5" : ""
                          }`}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="font-medium text-primary truncate">{topic.englishName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs font-normal">
                              {topic.mainSupervisorName}
                            </Badge>
                            <Badge variant="outline" className="text-xs font-normal">
                              {topic.code}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <RadioGroupItem value={topic.id} id={topic.id} />
                          {selectedTopicId === topic.id && (
                            <div className="ml-2 text-primary">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
                    <Search className="h-10 w-10 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground font-medium">No topics found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search query</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 border-t bg-muted/10">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedTopicId} className="gap-1">
              <Check className="h-4 w-4" />
              Assign Topic
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

