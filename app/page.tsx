"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, BookOpen, Clock, ImageIcon, Star, Trophy, Target, Palette } from "lucide-react"
import Image from "next/image"

const topics = [
  { id: "plane", name: "Airplane", image: "/placeholder.svg?height=200&width=300", description: "Aviation and travel" },
  { id: "house", name: "House", image: "/placeholder.svg?height=200&width=300", description: "Home and living" },
  { id: "car", name: "Car", image: "/placeholder.svg?height=200&width=300", description: "Transportation" },
  {
    id: "restaurant",
    name: "Restaurant",
    image: "/placeholder.svg?height=200&width=300",
    description: "Dining and food",
  },
  { id: "school", name: "School", image: "/placeholder.svg?height=200&width=300", description: "Education" },
  { id: "hospital", name: "Hospital", image: "/placeholder.svg?height=200&width=300", description: "Healthcare" },
]

const verbs = {
  plane: [
    { id: "fly", name: "Fly", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "land", name: "Land", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "takeoff", name: "Take Off", image: "/placeholder.svg?height=100&width=100", difficulty: "intermediate" },
    { id: "board", name: "Board", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "travel", name: "Travel", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "pilot", name: "Pilot", image: "/placeholder.svg?height=100&width=100", difficulty: "advanced" },
    { id: "check", name: "Check", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "wait", name: "Wait", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "arrive", name: "Arrive", image: "/placeholder.svg?height=100&width=100", difficulty: "intermediate" },
    { id: "depart", name: "Depart", image: "/placeholder.svg?height=100&width=100", difficulty: "intermediate" },
  ],
  house: [
    { id: "live", name: "Live", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "build", name: "Build", image: "/placeholder.svg?height=100&width=100", difficulty: "intermediate" },
    { id: "clean", name: "Clean", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "paint", name: "Paint", image: "/placeholder.svg?height=100&width=100", difficulty: "intermediate" },
    { id: "repair", name: "Repair", image: "/placeholder.svg?height=100&width=100", difficulty: "advanced" },
    { id: "decorate", name: "Decorate", image: "/placeholder.svg?height=100&width=100", difficulty: "intermediate" },
    { id: "move", name: "Move", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "rent", name: "Rent", image: "/placeholder.svg?height=100&width=100", difficulty: "intermediate" },
    { id: "buy", name: "Buy", image: "/placeholder.svg?height=100&width=100", difficulty: "beginner" },
    { id: "sell", name: "Sell", image: "/placeholder.svg?height=100&width=100", difficulty: "intermediate" },
  ],
}

const tenses = [
  { name: "Simple Present", color: "default", description: "Regular actions and facts", category: "present" },
  { name: "Present Continuous", color: "secondary", description: "Actions happening now", category: "present" },
  {
    name: "Present Perfect",
    color: "destructive",
    description: "Past actions with present relevance",
    category: "present",
  },
  {
    name: "Present Perfect Continuous",
    color: "outline",
    description: "Ongoing actions from past to present",
    category: "present",
  },
  { name: "Simple Past", color: "default", description: "Completed past actions", category: "past" },
  { name: "Past Continuous", color: "secondary", description: "Ongoing past actions", category: "past" },
  {
    name: "Past Perfect",
    color: "destructive",
    description: "Actions completed before another past action",
    category: "past",
  },
  {
    name: "Past Perfect Continuous",
    color: "outline",
    description: "Ongoing actions before a past point",
    category: "past",
  },
  { name: "Simple Future", color: "default", description: "Future actions and predictions", category: "future" },
  { name: "Future Continuous", color: "secondary", description: "Ongoing future actions", category: "future" },
  {
    name: "Future Perfect",
    color: "destructive",
    description: "Actions completed by a future point",
    category: "future",
  },
  {
    name: "Future Perfect Continuous",
    color: "outline",
    description: "Ongoing actions until a future point",
    category: "future",
  },
]

const sentences = {
  plane: {
    fly: [
      "The plane flies at 30,000 feet every day.",
      "The plane is flying through the clouds right now.",
      "The plane has flown for two hours already.",
      "The plane has been flying since morning without stopping.",
      "The plane flew yesterday from New York to London.",
      "The plane was flying when the storm suddenly appeared.",
      "The plane had flown before the weather conditions worsened.",
      "The plane had been flying for hours before it finally landed.",
      "The plane will fly tomorrow at 8 AM sharp.",
      "The plane will be flying at this exact time tomorrow.",
      "The plane will have flown 500 miles by the time we arrive.",
      "The plane will have been flying for 8 hours by arrival time.",
    ],
  },
  house: {
    live: [
      "I live in a beautiful house with my family.",
      "I am living in a new neighborhood this year.",
      "I have lived here for five wonderful years.",
      "I have been living here since 2019 happily.",
      "I lived in a small apartment before this house.",
      "I was living alone when I first met my partner.",
      "I had lived in three different cities before moving here.",
      "I had been living paycheck to paycheck before getting this job.",
      "I will live in this house for many years to come.",
      "I will be living here next year as well.",
      "I will have lived here for a full decade by 2030.",
      "I will have been living here for 20 years by then.",
    ],
  },
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "present":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "past":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "future":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function EnglishTensesApp() {
  const [currentStep, setCurrentStep] = useState<"topics" | "verbs" | "tenses">("topics")
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [selectedVerb, setSelectedVerb] = useState<string>("")
  const [progress, setProgress] = useState(0)

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId)
    setCurrentStep("verbs")
    setProgress(33)
  }

  const handleVerbSelect = (verbId: string) => {
    setSelectedVerb(verbId)
    setCurrentStep("tenses")
    setProgress(100)
  }

  const handleBack = () => {
    if (currentStep === "verbs") {
      setCurrentStep("topics")
      setSelectedTopic("")
      setProgress(0)
    } else if (currentStep === "tenses") {
      setCurrentStep("verbs")
      setSelectedVerb("")
      setProgress(33)
    }
  }

  const getCurrentSentences = () => {
    return sentences[selectedTopic as keyof typeof sentences]?.[selectedVerb as keyof (typeof sentences)["plane"]] || []
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              English Tenses Master
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Master English tenses through contextual learning. Choose a topic, select a verb, and explore all tenses
            with real-world examples.
          </p>

          {progress > 0 && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Learning Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          )}
        </div>

        {/* Navigation */}
        {currentStep !== "topics" && (
          <div className="mb-6">
            <Button variant="outline" onClick={handleBack} className="gap-2 hover:bg-accent">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        )}

        {/* Topic Selection */}
        {currentStep === "topics" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-3">Choose Your Learning Topic</h2>
              <p className="text-muted-foreground text-lg">Select a context that interests you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <Card
                  key={topic.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group border hover:border-primary/30"
                  onClick={() => handleTopicSelect(topic.id)}
                >
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="relative overflow-hidden rounded-xl border">
                        <Image
                          src={topic.image || "/placeholder.svg"}
                          alt={topic.name}
                          width={300}
                          height={200}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Verb Selection */}
        {currentStep === "verbs" && selectedTopic && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-3">
                Choose a Verb for {topics.find((t) => t.id === selectedTopic)?.name}
              </h2>
              <p className="text-muted-foreground text-lg">Select a verb to explore in all English tenses</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {verbs[selectedTopic as keyof typeof verbs]?.map((verb) => (
                <Card
                  key={verb.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group border hover:border-primary/30"
                  onClick={() => handleVerbSelect(verb.id)}
                >
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <div className="relative">
                        <Image
                          src={verb.image || "/placeholder.svg"}
                          alt={verb.name}
                          width={100}
                          height={100}
                          className="rounded-xl mx-auto transition-transform duration-300 group-hover:scale-110 border"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{verb.name}</h3>
                        <Badge className={getDifficultyColor(verb.difficulty)}>{verb.difficulty}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tenses Learning */}
        {currentStep === "tenses" && selectedTopic && selectedVerb && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-semibold">
                  Learning "{verbs[selectedTopic as keyof typeof verbs]?.find((v) => v.id === selectedVerb)?.name}"
                </h2>
              </div>
              <p className="text-muted-foreground text-lg mb-4">
                with {topics.find((t) => t.id === selectedTopic)?.name} context
              </p>
              <div className="flex items-center justify-center gap-4">
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Target className="h-4 w-4" />
                  All 12 English Tenses
                </Badge>
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Palette className="h-4 w-4" />
                  Dark Mode Ready
                </Badge>
              </div>
            </div>

            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {tenses.map((tense, index) => (
                  <Card
                    key={tense.name}
                    className="transition-all duration-300 hover:shadow-md border-l-2 border-l-primary/30 hover:border-l-primary/60"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary border border-primary/20">
                            {index + 1}
                          </div>
                          {tense.name}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge className={getCategoryColor(tense.category)}>{tense.category}</Badge>
                          <Badge variant={tense.color as any}>{tense.name.split(" ")[0]}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground ml-13">{tense.description}</p>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border">
                            <Clock className="h-6 w-6 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <p className="text-lg font-medium leading-relaxed">
                            {getCurrentSentences()[index] || `Example sentence for ${tense.name} will be here.`}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <ImageIcon className="h-4 w-4" />
                              <span>Visual context</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              <span>Interactive example</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-center gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep("verbs")
                  setSelectedVerb("")
                  setProgress(33)
                }}
                className="gap-2"
              >
                Try Another Verb
              </Button>
              <Button
                onClick={() => {
                  setCurrentStep("topics")
                  setSelectedTopic("")
                  setSelectedVerb("")
                  setProgress(0)
                }}
                className="gap-2"
              >
                Choose New Topic
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
