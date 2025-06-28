"use client"

import React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, BookOpen, Clock, ImageIcon, Star, Trophy, Target, Palette, Zap } from "lucide-react"
import Image from "next/image"

// Utility function to get higher resolution Unsplash images
const getHighResImage = (url: string, width = 400, height = 400): string => {
  if (!url.includes("unsplash.com")) return url

  // Replace existing width and height parameters with higher resolution ones
  return url.replace(/w=\d+/, `w=${width}`).replace(/h=\d+/, `h=${height}`).replace(/q=\d+/, "q=90") // Also increase quality
}

const topics = [
  {
    id: "plane",
    name: "Airplane",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop&auto=format&q=80",
    description: "Aviation and travel",
  },
  {
    id: "house",
    name: "House",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop&auto=format&q=80",
    description: "Home and living",
  },
  {
    id: "car",
    name: "Car",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop&auto=format&q=80",
    description: "Transportation",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&auto=format&q=80",
    description: "Dining and food",
  },
  {
    id: "school",
    name: "School",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&auto=format&q=80",
    description: "Education",
  },
  {
    id: "hospital",
    name: "Hospital",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop&auto=format&q=80",
    description: "Healthcare",
  },
]

const verbs = {
  plane: [
    {
      id: "fly",
      name: "Fly",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "land",
      name: "Land",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "takeoff",
      name: "Take Off",
      image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "board",
      name: "Board",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "travel",
      name: "Travel",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "pilot",
      name: "Pilot",
      image: "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "advanced",
    },
    {
      id: "check",
      name: "Check",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "wait",
      name: "Wait",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "arrive",
      name: "Arrive",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "depart",
      name: "Depart",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
  ],
  house: [
    {
      id: "live",
      name: "Live",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "build",
      name: "Build",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "clean",
      name: "Clean",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "paint",
      name: "Paint",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "repair",
      name: "Repair",
      image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "advanced",
    },
    {
      id: "decorate",
      name: "Decorate",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "move",
      name: "Move",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "rent",
      name: "Rent",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "buy",
      name: "Buy",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "sell",
      name: "Sell",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
  ],
  car: [
    {
      id: "drive",
      name: "Drive",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "park",
      name: "Park",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "start",
      name: "Start",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "stop",
      name: "Stop",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "wash",
      name: "Wash",
      image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "repair",
      name: "Repair",
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "fuel",
      name: "Fuel",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "accelerate",
      name: "Accelerate",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "brake",
      name: "Brake",
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "reverse",
      name: "Reverse",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
  ],
  restaurant: [
    {
      id: "eat",
      name: "Eat",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "order",
      name: "Order",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "serve",
      name: "Serve",
      image: "https://images.unsplash.com/photo-1516554646385-7642248096d1?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "cook",
      name: "Cook",
      image: "https://images.unsplash.com/photo-1577219492769-b63a779fac28?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "pay",
      name: "Pay",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "reserve",
      name: "Reserve",
      image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "taste",
      name: "Taste",
      image: "https://images.unsplash.com/photo-1585909085111-2c2f311643af?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "recommend",
      name: "Recommend",
      image: "https://images.unsplash.com/photo-1693168058181-7781540896d5?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "advanced",
    },
    {
      id: "deliver",
      name: "Deliver",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "enjoy",
      name: "Enjoy",
      image: "https://images.unsplash.com/photo-1687672507164-0745296226a0?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
  ],
  school: [
    {
      id: "study",
      name: "Study",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "teach",
      name: "Teach",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "learn",
      name: "Learn",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "write",
      name: "Write",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "read",
      name: "Read",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "graduate",
      name: "Graduate",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "attend",
      name: "Attend",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "examine",
      name: "Examine",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "advanced",
    },
    {
      id: "practice",
      name: "Practice",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "discuss",
      name: "Discuss",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
  ],
  hospital: [
    {
      id: "treat",
      name: "Treat",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "examine",
      name: "Examine",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "heal",
      name: "Heal",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "operate",
      name: "Operate",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "advanced",
    },
    {
      id: "diagnose",
      name: "Diagnose",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "advanced",
    },
    {
      id: "recover",
      name: "Recover",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "visit",
      name: "Visit",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "beginner",
    },
    {
      id: "prescribe",
      name: "Prescribe",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "advanced",
    },
    {
      id: "nurse",
      name: "Nurse",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "intermediate",
    },
    {
      id: "discharge",
      name: "Discharge",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop&auto=format&q=80",
      difficulty: "advanced",
    },
  ],
}

const tenses = [
  { name: "Present Simple", color: "default", description: "Regular actions and facts", category: "present" },
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
  { name: "Past Simple", color: "default", description: "Completed past actions", category: "past" },
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
  { name: "Future Simple", color: "default", description: "Future actions and predictions", category: "future" },
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
      { SUBJECT: "The plane", AUX_VERB: "", VERB_IN_CORRECT_FORM: "flies", ADVERB_OF_TIME: "every day" },
      { SUBJECT: "The plane", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "flying", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "The plane", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "flown", ADVERB_OF_TIME: "already" },
      { SUBJECT: "The plane", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "flying", ADVERB_OF_TIME: "since morning" },
      { SUBJECT: "The plane", AUX_VERB: "", VERB_IN_CORRECT_FORM: "flew", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The plane", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "flying", ADVERB_OF_TIME: "suddenly" },
      { SUBJECT: "The plane", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "flown", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The plane", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "flying", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The plane", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "fly", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "The plane", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "flying", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "The plane", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "flown", ADVERB_OF_TIME: "by arrival" },
      { SUBJECT: "The plane", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "flying", ADVERB_OF_TIME: "by arrival" },
    ],
    land: [
      { SUBJECT: "The plane", AUX_VERB: "", VERB_IN_CORRECT_FORM: "lands", ADVERB_OF_TIME: "every evening" },
      { SUBJECT: "The plane", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "landing", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "The plane", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "landed", ADVERB_OF_TIME: "successfully" },
      { SUBJECT: "The plane", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "landing", ADVERB_OF_TIME: "smoothly" },
      { SUBJECT: "The plane", AUX_VERB: "", VERB_IN_CORRECT_FORM: "landed", ADVERB_OF_TIME: "last night" },
      { SUBJECT: "The plane", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "landing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The plane", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "landed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The plane", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "landing", ADVERB_OF_TIME: "for 20 minutes" },
      { SUBJECT: "The plane", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "land", ADVERB_OF_TIME: "at 3 PM" },
      { SUBJECT: "The plane", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "landing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "The plane", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "landed", ADVERB_OF_TIME: "by then" },
      { SUBJECT: "The plane", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "landing", ADVERB_OF_TIME: "for minutes" },
    ],
    takeoff: [
      { SUBJECT: "The plane", AUX_VERB: "", VERB_IN_CORRECT_FORM: "takes off", ADVERB_OF_TIME: "every morning" },
      { SUBJECT: "The plane", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "taking off", ADVERB_OF_TIME: "now" },
      { SUBJECT: "The plane", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "taken off", ADVERB_OF_TIME: "successfully" },
      { SUBJECT: "The plane", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "taking off", ADVERB_OF_TIME: "smoothly" },
      { SUBJECT: "The plane", AUX_VERB: "", VERB_IN_CORRECT_FORM: "took off", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The plane", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "taking off", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The plane", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "taken off", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The plane", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "taking off", ADVERB_OF_TIME: "for 10 minutes" },
      { SUBJECT: "The plane", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "take off", ADVERB_OF_TIME: "soon" },
      { SUBJECT: "The plane", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "taking off", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The plane", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "taken off", ADVERB_OF_TIME: "by then" },
      { SUBJECT: "The plane", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "taking off", ADVERB_OF_TIME: "for minutes" },
    ],
    board: [
      { SUBJECT: "Passengers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "board", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "Passengers", AUX_VERB: "are", VERB_IN_CORRECT_FORM: "boarding", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "All passengers", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "boarded", ADVERB_OF_TIME: "successfully" },
      { SUBJECT: "Passengers", AUX_VERB: "have been", VERB_IN_CORRECT_FORM: "boarding", ADVERB_OF_TIME: "since 2 PM" },
      { SUBJECT: "The family", AUX_VERB: "", VERB_IN_CORRECT_FORM: "boarded", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "Passengers", AUX_VERB: "were", VERB_IN_CORRECT_FORM: "boarding", ADVERB_OF_TIME: "then" },
      { SUBJECT: "All passengers", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "boarded", ADVERB_OF_TIME: "before" },
      { SUBJECT: "Passengers", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "boarding", ADVERB_OF_TIME: "for 30 minutes" },
      { SUBJECT: "Passengers", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "board", ADVERB_OF_TIME: "at 4 PM" },
      { SUBJECT: "Passengers", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "boarding", ADVERB_OF_TIME: "then" },
      { SUBJECT: "All passengers", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "boarded", ADVERB_OF_TIME: "by departure" },
      { SUBJECT: "Passengers", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "boarding", ADVERB_OF_TIME: "for an hour" },
    ],
    travel: [
      { SUBJECT: "People", AUX_VERB: "", VERB_IN_CORRECT_FORM: "travel", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The businessman", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "traveling", ADVERB_OF_TIME: "now" },
      { SUBJECT: "She", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "traveled", ADVERB_OF_TIME: "extensively" },
      { SUBJECT: "They", AUX_VERB: "have been", VERB_IN_CORRECT_FORM: "traveling", ADVERB_OF_TIME: "since" },
      { SUBJECT: "The family", AUX_VERB: "", VERB_IN_CORRECT_FORM: "traveled", ADVERB_OF_TIME: "last summer" },
      { SUBJECT: "He", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "traveling", ADVERB_OF_TIME: "then" },
      { SUBJECT: "She", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "traveled", ADVERB_OF_TIME: "before" },
      { SUBJECT: "They", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "traveling", ADVERB_OF_TIME: "for 12 hours" },
      { SUBJECT: "We", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "travel", ADVERB_OF_TIME: "next month" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "traveling", ADVERB_OF_TIME: "later" },
      { SUBJECT: "She", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "traveled", ADVERB_OF_TIME: "by birthday" },
      { SUBJECT: "They", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "traveling", ADVERB_OF_TIME: "for 20 hours" },
    ],
    pilot: [
      { SUBJECT: "He", AUX_VERB: "", VERB_IN_CORRECT_FORM: "pilots", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "She", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "piloting", ADVERB_OF_TIME: "now" },
      { SUBJECT: "The captain", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "piloted", ADVERB_OF_TIME: "many times" },
      { SUBJECT: "He", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "piloting", ADVERB_OF_TIME: "since" },
      { SUBJECT: "She", AUX_VERB: "", VERB_IN_CORRECT_FORM: "piloted", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The co-pilot", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "piloting", ADVERB_OF_TIME: "then" },
      { SUBJECT: "He", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "piloted", ADVERB_OF_TIME: "before" },
      { SUBJECT: "She", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "piloting", ADVERB_OF_TIME: "for 2 hours" },
      { SUBJECT: "The new pilot", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "pilot", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "She", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "piloting", ADVERB_OF_TIME: "then" },
      { SUBJECT: "He", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "piloted", ADVERB_OF_TIME: "by retirement" },
      { SUBJECT: "She", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "piloting", ADVERB_OF_TIME: "for 8 hours" },
    ],
    check: [
      { SUBJECT: "The crew", AUX_VERB: "", VERB_IN_CORRECT_FORM: "checks", ADVERB_OF_TIME: "every flight" },
      { SUBJECT: "Mechanics", AUX_VERB: "are", VERB_IN_CORRECT_FORM: "checking", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "The pilot", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "checked", ADVERB_OF_TIME: "thoroughly" },
      { SUBJECT: "The team", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "checking", ADVERB_OF_TIME: "since dawn" },
      { SUBJECT: "The inspector", AUX_VERB: "", VERB_IN_CORRECT_FORM: "checked", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "Engineers", AUX_VERB: "were", VERB_IN_CORRECT_FORM: "checking", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The crew", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "checked", ADVERB_OF_TIME: "before" },
      { SUBJECT: "They", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "checking", ADVERB_OF_TIME: "for 2 hours" },
      { SUBJECT: "The maintenance team", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "check", ADVERB_OF_TIME: "tonight" },
      { SUBJECT: "Technicians", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "checking", ADVERB_OF_TIME: "later" },
      { SUBJECT: "The crew", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "checked", ADVERB_OF_TIME: "by departure" },
      { SUBJECT: "They", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "checking", ADVERB_OF_TIME: "for hours" },
    ],
    wait: [
      { SUBJECT: "Passengers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "wait", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The family", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "waiting", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "waited", ADVERB_OF_TIME: "for 3 hours" },
      { SUBJECT: "Travelers", AUX_VERB: "have been", VERB_IN_CORRECT_FORM: "waiting", ADVERB_OF_TIME: "since morning" },
      { SUBJECT: "They", AUX_VERB: "", VERB_IN_CORRECT_FORM: "waited", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "Passengers", AUX_VERB: "were", VERB_IN_CORRECT_FORM: "waiting", ADVERB_OF_TIME: "then" },
      { SUBJECT: "Everyone", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "waited", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "waiting", ADVERB_OF_TIME: "for 4 hours" },
      { SUBJECT: "Passengers", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "wait", ADVERB_OF_TIME: "later" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "waiting", ADVERB_OF_TIME: "then" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "waited", ADVERB_OF_TIME: "for 6 hours" },
      { SUBJECT: "Passengers", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "waiting", ADVERB_OF_TIME: "all day" },
    ],
    arrive: [
      { SUBJECT: "International flights", AUX_VERB: "", VERB_IN_CORRECT_FORM: "arrive", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The plane", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "arriving", ADVERB_OF_TIME: "now" },
      { SUBJECT: "Flight 247", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "arrived", ADVERB_OF_TIME: "safely" },
      { SUBJECT: "Planes", AUX_VERB: "have been", VERB_IN_CORRECT_FORM: "arriving", ADVERB_OF_TIME: "late" },
      { SUBJECT: "The delayed flight", AUX_VERB: "", VERB_IN_CORRECT_FORM: "arrived", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The plane", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "arriving", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The aircraft", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "arrived", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The flight", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "arriving", ADVERB_OF_TIME: "for 20 minutes" },
      { SUBJECT: "The next flight", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "arrive", ADVERB_OF_TIME: "at 6 PM" },
      { SUBJECT: "Several planes", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "arriving", ADVERB_OF_TIME: "later" },
      { SUBJECT: "All flights", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "arrived", ADVERB_OF_TIME: "by evening" },
      { SUBJECT: "The plane", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "arriving", ADVERB_OF_TIME: "for minutes" },
    ],
    depart: [
      { SUBJECT: "Flights", AUX_VERB: "", VERB_IN_CORRECT_FORM: "depart", ADVERB_OF_TIME: "every two hours" },
      { SUBJECT: "Flight 156", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "departing", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "The morning flight", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "departed", ADVERB_OF_TIME: "on schedule" },
      { SUBJECT: "Planes", AUX_VERB: "have been", VERB_IN_CORRECT_FORM: "departing", ADVERB_OF_TIME: "late" },
      { SUBJECT: "The red-eye flight", AUX_VERB: "", VERB_IN_CORRECT_FORM: "departed", ADVERB_OF_TIME: "last night" },
      { SUBJECT: "The plane", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "departing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The aircraft", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "departed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The flight", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "departing", ADVERB_OF_TIME: "for 15 minutes" },
      { SUBJECT: "The evening flight", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "depart", ADVERB_OF_TIME: "as planned" },
      { SUBJECT: "Multiple flights", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "departing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "All scheduled flights", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "departed", ADVERB_OF_TIME: "by midnight" },
      { SUBJECT: "The plane", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "departing", ADVERB_OF_TIME: "for minutes" },
    ],
  },
  house: {
    live: [
      { SUBJECT: "I", AUX_VERB: "", VERB_IN_CORRECT_FORM: "live", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "I", AUX_VERB: "am", VERB_IN_CORRECT_FORM: "living", ADVERB_OF_TIME: "this year" },
      { SUBJECT: "I", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "lived", ADVERB_OF_TIME: "for five years" },
      { SUBJECT: "I", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "living", ADVERB_OF_TIME: "since 2019" },
      { SUBJECT: "I", AUX_VERB: "", VERB_IN_CORRECT_FORM: "lived", ADVERB_OF_TIME: "before" },
      { SUBJECT: "I", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "living", ADVERB_OF_TIME: "then" },
      { SUBJECT: "I", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "lived", ADVERB_OF_TIME: "before" },
      { SUBJECT: "I", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "living", ADVERB_OF_TIME: "paycheck to paycheck" },
      { SUBJECT: "I", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "live", ADVERB_OF_TIME: "for years" },
      { SUBJECT: "I", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "living", ADVERB_OF_TIME: "next year" },
      { SUBJECT: "I", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "lived", ADVERB_OF_TIME: "by 2030" },
      { SUBJECT: "I", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "living", ADVERB_OF_TIME: "by then" },
    ],
    build: [
      { SUBJECT: "Construction workers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "build", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The crew", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "building", ADVERB_OF_TIME: "now" },
      { SUBJECT: "They", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "built", ADVERB_OF_TIME: "over 100" },
      { SUBJECT: "The company", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "building", ADVERB_OF_TIME: "since 1985" },
      { SUBJECT: "The family", AUX_VERB: "", VERB_IN_CORRECT_FORM: "built", ADVERB_OF_TIME: "last year" },
      { SUBJECT: "Workers", AUX_VERB: "were", VERB_IN_CORRECT_FORM: "building", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The contractor", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "built", ADVERB_OF_TIME: "before" },
      { SUBJECT: "They", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "building", ADVERB_OF_TIME: "for 6 months" },
      { SUBJECT: "The developer", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "build", ADVERB_OF_TIME: "here" },
      { SUBJECT: "Construction crews", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "building", ADVERB_OF_TIME: "later" },
      { SUBJECT: "They", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "built", ADVERB_OF_TIME: "by next summer" },
      { SUBJECT: "The team", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "building", ADVERB_OF_TIME: "for 2 years" },
    ],
    clean: [
      { SUBJECT: "She", AUX_VERB: "", VERB_IN_CORRECT_FORM: "cleans", ADVERB_OF_TIME: "every Saturday" },
      { SUBJECT: "The maid", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "cleaning", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "I", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "cleaned", ADVERB_OF_TIME: "today" },
      { SUBJECT: "The cleaning service", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "cleaning", ADVERB_OF_TIME: "since 8 AM" },
      { SUBJECT: "They", AUX_VERB: "", VERB_IN_CORRECT_FORM: "cleaned", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "She", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "cleaning", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The family", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "cleaned", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "cleaning", ADVERB_OF_TIME: "for 4 hours" },
      { SUBJECT: "The housekeepers", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "clean", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "cleaning", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "cleaned", ADVERB_OF_TIME: "by the weekend" },
      { SUBJECT: "The crew", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "cleaning", ADVERB_OF_TIME: "for 8 hours" },
    ],
    paint: [
      { subject: "Professional painters", modal: "are able to", verb: "paint" },
      { subject: "Professional painters", modal: "can", verb: "paint" },
      { subject: "Professional painters", modal: "could", verb: "paint" },
      { subject: "Professional painters", modal: "should", verb: "paint" },
      { subject: "Professional painters", modal: "would", verb: "paint" },
      { subject: "Professional painters", modal: "have to", verb: "paint" },
      { subject: "Professional painters", modal: "had to", verb: "paint" },
      { subject: "Professional painters", modal: "will have to", verb: "paint" },
      { subject: "Professional painters", modal: "must", verb: "paint" },
      { subject: "Professional painters", modal: "might", verb: "paint" },
      { subject: "Professional painters", modal: "may", verb: "paint" },
      { subject: "Professional painters", modal: "should not", verb: "paint" },
      { subject: "Professional painters", modal: "must not", verb: "paint" },
      { subject: "Professional painters", modal: "would like to", verb: "paint" },
      { subject: "Professional painters", modal: "are going to", verb: "paint" },
      { subject: "Professional painters", modal: "need to", verb: "paint" },
      { subject: "Professional painters", modal: "want to", verb: "paint" },
    ],
    repair: [
      { subject: "The contractor", modal: "is able to", verb: "repair" },
      { subject: "The contractor", modal: "can", verb: "repair" },
      { subject: "The contractor", modal: "could", verb: "repair" },
      { subject: "The contractor", modal: "should", verb: "repair" },
      { subject: "The contractor", modal: "would", verb: "repair" },
      { subject: "The contractor", modal: "has to", verb: "repair" },
      { subject: "The contractor", modal: "had to", verb: "repair" },
      { subject: "The contractor", modal: "will have to", verb: "repair" },
      { subject: "The contractor", modal: "must", verb: "repair" },
      { subject: "The contractor", modal: "might", verb: "repair" },
      { subject: "The contractor", modal: "may", verb: "repair" },
      { subject: "The contractor", modal: "should not", verb: "repair" },
      { subject: "The contractor", modal: "must not", verb: "repair" },
      { subject: "The contractor", modal: "would like to", verb: "repair" },
      { subject: "The contractor", modal: "is going to", verb: "repair" },
      { subject: "The contractor", modal: "needs to", verb: "repair" },
      { subject: "The contractor", modal: "wants to", verb: "repair" },
    ],
    decorate: [
      { subject: "The interior designer", modal: "is able to", verb: "decorate" },
      { subject: "The interior designer", modal: "can", verb: "decorate" },
      { subject: "The interior designer", modal: "could", verb: "decorate" },
      { subject: "The interior designer", modal: "should", verb: "decorate" },
      { subject: "The interior designer", modal: "would", verb: "decorate" },
      { subject: "The interior designer", modal: "has to", verb: "decorate" },
      { subject: "The interior designer", modal: "had to", verb: "decorate" },
      { subject: "The interior designer", modal: "will have to", verb: "decorate" },
      { subject: "The interior designer", modal: "must", verb: "decorate" },
      { subject: "The interior designer", modal: "might", verb: "decorate" },
      { subject: "The interior designer", modal: "may", verb: "decorate" },
      { subject: "The interior designer", modal: "should not", verb: "decorate" },
      { subject: "The interior designer", modal: "must not", verb: "decorate" },
      { subject: "The interior designer", modal: "would like to", verb: "decorate" },
      { subject: "The interior designer", modal: "is going to", verb: "decorate" },
      { subject: "The interior designer", modal: "needs to", verb: "decorate" },
      { subject: "The interior designer", modal: "wants to", verb: "decorate" },
    ],
    move: [
      { subject: "The family", modal: "is able to", verb: "move" },
      { subject: "The family", modal: "can", verb: "move" },
      { subject: "The family", modal: "could", verb: "move" },
      { subject: "The family", modal: "should", verb: "move" },
      { subject: "The family", modal: "would", verb: "move" },
      { subject: "The family", modal: "has to", verb: "move" },
      { subject: "The family", modal: "had to", verb: "move" },
      { subject: "The family", modal: "will have to", verb: "move" },
      { subject: "The family", modal: "must", verb: "move" },
      { subject: "The family", modal: "might", verb: "move" },
      { subject: "The family", modal: "may", verb: "move" },
      { subject: "The family", modal: "should not", verb: "move" },
      { subject: "The family", modal: "must not", verb: "move" },
      { subject: "The family", modal: "would like to", verb: "move" },
      { subject: "The family", modal: "is going to", verb: "move" },
      { subject: "The family", modal: "needs to", verb: "move" },
      { subject: "The family", modal: "wants to", verb: "move" },
    ],
    rent: [
      { subject: "The tenant", modal: "is able to", verb: "rent" },
      { subject: "The tenant", modal: "can", verb: "rent" },
      { subject: "The tenant", modal: "could", verb: "rent" },
      { subject: "The tenant", modal: "should", verb: "rent" },
      { subject: "The tenant", modal: "would", verb: "rent" },
      { subject: "The tenant", modal: "has to", verb: "rent" },
      { subject: "The tenant", modal: "had to", verb: "rent" },
      { subject: "The tenant", modal: "will have to", verb: "rent" },
      { subject: "The tenant", modal: "must", verb: "rent" },
      { subject: "The tenant", modal: "might", verb: "rent" },
      { subject: "The tenant", modal: "may", verb: "rent" },
      { subject: "The tenant", modal: "should not", verb: "rent" },
      { subject: "The tenant", modal: "must not", verb: "rent" },
      { subject: "The tenant", modal: "would like to", verb: "rent" },
      { subject: "The tenant", modal: "is going to", verb: "rent" },
      { subject: "The tenant", modal: "needs to", verb: "rent" },
      { subject: "The tenant", modal: "wants to", verb: "rent" },
    ],
    buy: [
      { subject: "The buyer", modal: "is able to", verb: "buy" },
      { subject: "The buyer", modal: "can", verb: "buy" },
      { subject: "The buyer", modal: "could", verb: "buy" },
      { subject: "The buyer", modal: "should", verb: "buy" },
      { subject: "The buyer", modal: "would", verb: "buy" },
      { subject: "The buyer", modal: "has to", verb: "buy" },
      { subject: "The buyer", modal: "had to", verb: "buy" },
      { subject: "The buyer", modal: "will have to", verb: "buy" },
      { subject: "The buyer", modal: "must", verb: "buy" },
      { subject: "The buyer", modal: "might", verb: "buy" },
      { subject: "The buyer", modal: "may", verb: "buy" },
      { subject: "The buyer", modal: "should not", verb: "buy" },
      { subject: "The buyer", modal: "must not", verb: "buy" },
      { subject: "The buyer", modal: "would like to", verb: "buy" },
      { subject: "The buyer", modal: "is going to", verb: "buy" },
      { subject: "The buyer", modal: "needs to", verb: "buy" },
      { subject: "The buyer", modal: "wants to", verb: "buy" },
    ],
    sell: [
      { subject: "The seller", modal: "is able to", verb: "sell" },
      { subject: "The seller", modal: "can", verb: "sell" },
      { subject: "The seller", modal: "could", verb: "sell" },
      { subject: "The seller", modal: "should", verb: "sell" },
      { subject: "The seller", modal: "would", verb: "sell" },
      { subject: "The seller", modal: "has to", verb: "sell" },
      { subject: "The seller", modal: "had to", verb: "sell" },
      { subject: "The seller", modal: "will have to", verb: "sell" },
      { subject: "The seller", modal: "must", verb: "sell" },
      { subject: "The seller", modal: "might", verb: "sell" },
      { subject: "The seller", modal: "may", verb: "sell" },
      { subject: "The seller", modal: "should not", verb: "sell" },
      { subject: "The seller", modal: "must not", verb: "sell" },
      { subject: "The seller", modal: "would like to", verb: "sell" },
      { subject: "The seller", modal: "is going to", verb: "sell" },
      { subject: "The seller", modal: "needs to", verb: "sell" },
      { subject: "The seller", modal: "wants to", verb: "sell" },
    ],
  },
  car: {
    drive: [
      { SUBJECT: "I", AUX_VERB: "", VERB_IN_CORRECT_FORM: "drive", ADVERB_OF_TIME: "every morning" },
      { SUBJECT: "She", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "driving", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "driven", ADVERB_OF_TIME: "this month" },
      { SUBJECT: "He", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "driving", ADVERB_OF_TIME: "since 16" },
      { SUBJECT: "They", AUX_VERB: "", VERB_IN_CORRECT_FORM: "drove", ADVERB_OF_TIME: "last summer" },
      { SUBJECT: "She", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "driving", ADVERB_OF_TIME: "then" },
      { SUBJECT: "He", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "driven", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "driving", ADVERB_OF_TIME: "all night" },
      { SUBJECT: "I", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "drive", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "driving", ADVERB_OF_TIME: "then" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "driven", ADVERB_OF_TIME: "by evening" },
      { SUBJECT: "She", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "driving", ADVERB_OF_TIME: "for 8 hours" },
    ],
    park: [
      { SUBJECT: "Drivers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "park", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "He", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "parking", ADVERB_OF_TIME: "now" },
      { SUBJECT: "I", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "parked", ADVERB_OF_TIME: "many times" },
      { SUBJECT: "She", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "parking", ADVERB_OF_TIME: "since her job" },
      { SUBJECT: "We", AUX_VERB: "", VERB_IN_CORRECT_FORM: "parked", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The valet", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "parking", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "parked", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "parking", ADVERB_OF_TIME: "for weeks" },
      { SUBJECT: "You", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "park", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "parking", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "parked", ADVERB_OF_TIME: "by meeting" },
      { SUBJECT: "The attendant", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "parking", ADVERB_OF_TIME: "for 10 hours" },
    ],
    start: [
      { SUBJECT: "The car", AUX_VERB: "", VERB_IN_CORRECT_FORM: "starts", ADVERB_OF_TIME: "immediately" },
      { SUBJECT: "The engine", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "starting", ADVERB_OF_TIME: "now" },
      { SUBJECT: "The mechanic", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "started", ADVERB_OF_TIME: "successfully" },
      { SUBJECT: "The car", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "starting", ADVERB_OF_TIME: "poorly" },
      { SUBJECT: "The old car", AUX_VERB: "", VERB_IN_CORRECT_FORM: "started", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The engine", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "starting", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The car", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "started", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The engine", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "starting", ADVERB_OF_TIME: "for weeks" },
      { SUBJECT: "The car", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "start", ADVERB_OF_TIME: "better later" },
      { SUBJECT: "The engine", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "starting", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The car", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "started", ADVERB_OF_TIME: "by return" },
      { SUBJECT: "The engine", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "starting", ADVERB_OF_TIME: "for months" },
    ],
    stop: [
      { SUBJECT: "The car", AUX_VERB: "", VERB_IN_CORRECT_FORM: "stops", ADVERB_OF_TIME: "smoothly" },
      { SUBJECT: "The driver", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "stopping", ADVERB_OF_TIME: "now" },
      { SUBJECT: "The vehicle", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "stopped", ADVERB_OF_TIME: "suddenly" },
      { SUBJECT: "Traffic", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "stopping", ADVERB_OF_TIME: "frequently" },
      { SUBJECT: "The bus", AUX_VERB: "", VERB_IN_CORRECT_FORM: "stopped", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The car", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "stopping", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The vehicle", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "stopped", ADVERB_OF_TIME: "before" },
      { SUBJECT: "Traffic", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "stopping", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The car", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "stop", ADVERB_OF_TIME: "automatically" },
      { SUBJECT: "Vehicles", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "stopping", ADVERB_OF_TIME: "later" },
      { SUBJECT: "The car", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "stopped", ADVERB_OF_TIME: "by arrival" },
      { SUBJECT: "Traffic", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "stopping", ADVERB_OF_TIME: "all day" },
    ],
    wash: [
      { SUBJECT: "Car owners", AUX_VERB: "", VERB_IN_CORRECT_FORM: "wash", ADVERB_OF_TIME: "every weekend" },
      { SUBJECT: "He", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "washing", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "washed", ADVERB_OF_TIME: "twice this month" },
      { SUBJECT: "The car wash", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "washing", ADVERB_OF_TIME: "since 6 AM" },
      { SUBJECT: "She", AUX_VERB: "", VERB_IN_CORRECT_FORM: "washed", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The teenager", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "washing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "washed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "washing", ADVERB_OF_TIME: "all morning" },
      { SUBJECT: "The service", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "wash", ADVERB_OF_TIME: "later" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "washing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "washed", ADVERB_OF_TIME: "by closing" },
      { SUBJECT: "The crew", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "washing", ADVERB_OF_TIME: "for 12 hours" },
    ],
    repair: [
      { SUBJECT: "Mechanics", AUX_VERB: "", VERB_IN_CORRECT_FORM: "repair", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The technician", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "repairing", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "repaired", ADVERB_OF_TIME: "successfully" },
      { SUBJECT: "The garage", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "repairing", ADVERB_OF_TIME: "since 1975" },
      { SUBJECT: "The mechanic", AUX_VERB: "", VERB_IN_CORRECT_FORM: "repaired", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The technician", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "repairing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "repaired", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The shop", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "repairing", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The mechanic", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "repair", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "repairing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "repaired", ADVERB_OF_TIME: "by Friday" },
      { SUBJECT: "The shop", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "repairing", ADVERB_OF_TIME: "for 50 years" },
    ],
    fuel: [
      { SUBJECT: "Drivers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "fuel", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "She", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "fueling up", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "fueled", ADVERB_OF_TIME: "for journey" },
      { SUBJECT: "The station", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "fueling", ADVERB_OF_TIME: "since dawn" },
      { SUBJECT: "He", AUX_VERB: "", VERB_IN_CORRECT_FORM: "fueled", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The driver", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "fueling", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "fueled", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "fueling", ADVERB_OF_TIME: "for years" },
      { SUBJECT: "The attendant", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "fuel", ADVERB_OF_TIME: "later" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "fueling", ADVERB_OF_TIME: "then" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "fueled", ADVERB_OF_TIME: "by then" },
      { SUBJECT: "The station", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "fueling", ADVERB_OF_TIME: "for 24 hours" },
    ],
    accelerate: [
      { SUBJECT: "Sports cars", AUX_VERB: "", VERB_IN_CORRECT_FORM: "accelerate", ADVERB_OF_TIME: "quickly" },
      { SUBJECT: "The driver", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "accelerating", ADVERB_OF_TIME: "now" },
      { SUBJECT: "The car", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "accelerated", ADVERB_OF_TIME: "smoothly" },
      { SUBJECT: "The engine", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "accelerating", ADVERB_OF_TIME: "poorly lately" },
      { SUBJECT: "The race car", AUX_VERB: "", VERB_IN_CORRECT_FORM: "accelerated", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The vehicle", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "accelerating", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The car", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "accelerated", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The engine", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "accelerating", ADVERB_OF_TIME: "for weeks" },
      { SUBJECT: "The new car", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "accelerate", ADVERB_OF_TIME: "faster" },
      { SUBJECT: "The car", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "accelerating", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The vehicle", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "accelerated", ADVERB_OF_TIME: "by then" },
      { SUBJECT: "The engine", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "accelerating", ADVERB_OF_TIME: "for seconds" },
    ],
    brake: [
      { SUBJECT: "Careful drivers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "brake", ADVERB_OF_TIME: "gradually" },
      { SUBJECT: "The car", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "braking", ADVERB_OF_TIME: "hard now" },
      { SUBJECT: "The vehicle", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "braked", ADVERB_OF_TIME: "successfully" },
      { SUBJECT: "The brakes", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "braking", ADVERB_OF_TIME: "effectively" },
      { SUBJECT: "The driver", AUX_VERB: "", VERB_IN_CORRECT_FORM: "braked", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The car", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "braking", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The vehicle", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "braked", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The brakes", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "braking", ADVERB_OF_TIME: "for months" },
      { SUBJECT: "The car", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "brake", ADVERB_OF_TIME: "automatically" },
      { SUBJECT: "The vehicle", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "braking", ADVERB_OF_TIME: "later" },
      { SUBJECT: "The car", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "braked", ADVERB_OF_TIME: "by then" },
      { SUBJECT: "The brakes", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "braking", ADVERB_OF_TIME: "continuously" },
    ],
    reverse: [
      { SUBJECT: "Drivers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "reverse", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "She", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "reversing", ADVERB_OF_TIME: "now" },
      { SUBJECT: "The car", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "reversed", ADVERB_OF_TIME: "successfully" },
      { SUBJECT: "The backup camera", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "reversing", ADVERB_OF_TIME: "since installation" },
      { SUBJECT: "He", AUX_VERB: "", VERB_IN_CORRECT_FORM: "reversed", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The car", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "reversing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The vehicle", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "reversed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "reversing", ADVERB_OF_TIME: "for minutes" },
      { SUBJECT: "The car", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "reverse", ADVERB_OF_TIME: "automatically" },
      { SUBJECT: "The vehicle", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "reversing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The car", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "reversed", ADVERB_OF_TIME: "by then" },
      { SUBJECT: "The driver", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "reversing", ADVERB_OF_TIME: "for attempts" },
    ],
  },
  restaurant: {
    eat: [
      { SUBJECT: "Customers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "eat", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The family", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "eating", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "eaten", ADVERB_OF_TIME: "many times" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "eating", ADVERB_OF_TIME: "since opening" },
      { SUBJECT: "The couple", AUX_VERB: "", VERB_IN_CORRECT_FORM: "ate", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The children", AUX_VERB: "were", VERB_IN_CORRECT_FORM: "eating", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "eaten", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "eating", ADVERB_OF_TIME: "for an hour" },
      { SUBJECT: "The group", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "eat", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "eating", ADVERB_OF_TIME: "then" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "eaten", ADVERB_OF_TIME: "by show" },
      { SUBJECT: "The customers", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "eating", ADVERB_OF_TIME: "for hours" },
    ],
    order: [
      { SUBJECT: "Customers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "order", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The waiter", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "taking order", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "ordered", ADVERB_OF_TIME: "tonight" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "ordering", ADVERB_OF_TIME: "since last year" },
      { SUBJECT: "The businessman", AUX_VERB: "", VERB_IN_CORRECT_FORM: "ordered", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The family", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "ordering", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "ordered", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "ordering", ADVERB_OF_TIME: "for 10 minutes" },
      { SUBJECT: "The couple", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "order", ADVERB_OF_TIME: "later" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "ordering", ADVERB_OF_TIME: "then" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "ordered", ADVERB_OF_TIME: "by arrival" },
      { SUBJECT: "The customers", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "ordering", ADVERB_OF_TIME: "continuously" },
    ],
    serve: [
      { SUBJECT: "Waiters", AUX_VERB: "", VERB_IN_CORRECT_FORM: "serve", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The staff", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "serving", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "This restaurant", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "served", ADVERB_OF_TIME: "for decades" },
      { SUBJECT: "The waiters", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "serving", ADVERB_OF_TIME: "since morning" },
      { SUBJECT: "The server", AUX_VERB: "", VERB_IN_CORRECT_FORM: "served", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The waiter", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "serving", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "served", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The staff", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "serving", ADVERB_OF_TIME: "for 12 hours" },
      { SUBJECT: "The new waiter", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "serve", ADVERB_OF_TIME: "tonight" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "serving", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The restaurant", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "served", ADVERB_OF_TIME: "by midnight" },
      { SUBJECT: "The staff", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "serving", ADVERB_OF_TIME: "for 14 hours" },
    ],
    cook: [
      { SUBJECT: "Professional chefs", AUX_VERB: "", VERB_IN_CORRECT_FORM: "cook", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The chef", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "cooking", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "cooked", ADVERB_OF_TIME: "perfectly tonight" },
      { SUBJECT: "The kitchen", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "cooking", ADVERB_OF_TIME: "since 5 AM" },
      { SUBJECT: "The cook", AUX_VERB: "", VERB_IN_CORRECT_FORM: "prepared", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The chef", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "cooking", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "cooked", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The kitchen", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "cooking", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The chef", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "cook", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "cooking", ADVERB_OF_TIME: "later" },
      { SUBJECT: "The kitchen", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "cooked", ADVERB_OF_TIME: "by evening" },
      { SUBJECT: "The chefs", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "cooking", ADVERB_OF_TIME: "for 16 hours" },
    ],
    pay: [
      { SUBJECT: "Customers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "pay", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The couple", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "paying", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "paid", ADVERB_OF_TIME: "already" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "paying", ADVERB_OF_TIME: "with cash" },
      { SUBJECT: "The businessman", AUX_VERB: "", VERB_IN_CORRECT_FORM: "paid", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The family", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "paying", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "paid", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "paying", ADVERB_OF_TIME: "separately" },
      { SUBJECT: "The customers", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "pay", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "paying", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "paid", ADVERB_OF_TIME: "by then" },
      { SUBJECT: "The customers", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "paying", ADVERB_OF_TIME: "gradually" },
    ],
    reserve: [
      { SUBJECT: "Customers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "reserve", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "She", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "reserving", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "reserved", ADVERB_OF_TIME: "already" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "reserving", ADVERB_OF_TIME: "since anniversary" },
      { SUBJECT: "The couple", AUX_VERB: "", VERB_IN_CORRECT_FORM: "reserved", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The host", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "reserving", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "reserved", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "reserving", ADVERB_OF_TIME: "all week" },
      { SUBJECT: "The family", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "reserve", ADVERB_OF_TIME: "later" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "reserving", ADVERB_OF_TIME: "then" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "reserved", ADVERB_OF_TIME: "by then" },
      { SUBJECT: "The restaurant", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "reserving", ADVERB_OF_TIME: "for season" },
    ],
    taste: [
      { SUBJECT: "Food critics", AUX_VERB: "", VERB_IN_CORRECT_FORM: "taste", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The chef", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "tasting", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "tasted", ADVERB_OF_TIME: "every item" },
      { SUBJECT: "The sommelier", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "tasting", ADVERB_OF_TIME: "since morning" },
      { SUBJECT: "The customer", AUX_VERB: "", VERB_IN_CORRECT_FORM: "tasted", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The judge", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "tasting", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "tasted", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "tasting", ADVERB_OF_TIME: "for an hour" },
      { SUBJECT: "The food blogger", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "taste", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "tasting", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "tasted", ADVERB_OF_TIME: "by evening" },
      { SUBJECT: "The panel", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "tasting", ADVERB_OF_TIME: "for hours" },
    ],
    recommend: [
      { SUBJECT: "Servers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "recommend", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The waiter", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "recommending", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "recommended", ADVERB_OF_TIME: "to friends" },
      { SUBJECT: "The staff", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "recommending", ADVERB_OF_TIME: "since arrival" },
      { SUBJECT: "The sommelier", AUX_VERB: "", VERB_IN_CORRECT_FORM: "recommended", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The server", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "recommending", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "recommended", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "recommending", ADVERB_OF_TIME: "for years" },
      { SUBJECT: "The food critic", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "recommend", ADVERB_OF_TIME: "next week" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "recommending", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "recommended", ADVERB_OF_TIME: "by next week" },
      { SUBJECT: "The staff", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "recommending", ADVERB_OF_TIME: "all month" },
    ],
    deliver: [
      { SUBJECT: "The restaurant", AUX_VERB: "", VERB_IN_CORRECT_FORM: "delivers", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The driver", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "delivering", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "They", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "delivered", ADVERB_OF_TIME: "many times" },
      { SUBJECT: "The service", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "delivering", ADVERB_OF_TIME: "since pandemic" },
      { SUBJECT: "The delivery person", AUX_VERB: "", VERB_IN_CORRECT_FORM: "delivered", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The driver", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "delivering", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "delivered", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The service", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "delivering", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The restaurant", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "deliver", ADVERB_OF_TIME: "tonight" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "delivering", ADVERB_OF_TIME: "later" },
      { SUBJECT: "The food", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "delivered", ADVERB_OF_TIME: "by arrival" },
      { SUBJECT: "The service", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "delivering", ADVERB_OF_TIME: "for 12 hours" },
    ],
    enjoy: [
      { SUBJECT: "Diners", AUX_VERB: "", VERB_IN_CORRECT_FORM: "enjoy", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The couple", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "enjoying", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "enjoyed", ADVERB_OF_TIME: "every visit" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "enjoying", ADVERB_OF_TIME: "since started" },
      { SUBJECT: "The family", AUX_VERB: "", VERB_IN_CORRECT_FORM: "enjoyed", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The guests", AUX_VERB: "were", VERB_IN_CORRECT_FORM: "enjoying", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "enjoyed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "enjoying", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The visitors", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "enjoy", ADVERB_OF_TIME: "later" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "enjoying", ADVERB_OF_TIME: "then" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "enjoyed", ADVERB_OF_TIME: "by end" },
      { SUBJECT: "The diners", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "enjoying", ADVERB_OF_TIME: "for hours" },
    ],
  },
  school: {
    study: [
      { SUBJECT: "Students", AUX_VERB: "", VERB_IN_CORRECT_FORM: "study", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "She", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "studying", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "studied", ADVERB_OF_TIME: "this semester" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "studying", ADVERB_OF_TIME: "since morning" },
      { SUBJECT: "The class", AUX_VERB: "", VERB_IN_CORRECT_FORM: "studied", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The student", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "studying", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "studied", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "studying", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The students", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "study", ADVERB_OF_TIME: "next year" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "studying", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "studied", ADVERB_OF_TIME: "by exam" },
      { SUBJECT: "The class", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "studying", ADVERB_OF_TIME: "for months" },
    ],
    teach: [
      { SUBJECT: "Experienced teachers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "teach", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The professor", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "teaching", ADVERB_OF_TIME: "today" },
      { SUBJECT: "She", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "taught", ADVERB_OF_TIME: "for fifteen years" },
      { SUBJECT: "The faculty", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "teaching", ADVERB_OF_TIME: "since pandemic" },
      { SUBJECT: "The substitute teacher", AUX_VERB: "", VERB_IN_CORRECT_FORM: "taught", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The instructor", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "teaching", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "taught", ADVERB_OF_TIME: "before" },
      { SUBJECT: "She", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "teaching", ADVERB_OF_TIME: "for decades" },
      { SUBJECT: "The new teacher", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "teach", ADVERB_OF_TIME: "next semester" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "teaching", ADVERB_OF_TIME: "then" },
      { SUBJECT: "She", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "taught", ADVERB_OF_TIME: "by retirement" },
      { SUBJECT: "The professor", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "teaching", ADVERB_OF_TIME: "for 30 years" },
    ],
    learn: [
      { SUBJECT: "Children", AUX_VERB: "", VERB_IN_CORRECT_FORM: "learn", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The students", AUX_VERB: "are", VERB_IN_CORRECT_FORM: "learning", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "learned", ADVERB_OF_TIME: "much" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "learning", ADVERB_OF_TIME: "since elementary" },
      { SUBJECT: "The class", AUX_VERB: "", VERB_IN_CORRECT_FORM: "learned", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The student", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "learning", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "learned", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "learning", ADVERB_OF_TIME: "gradually" },
      { SUBJECT: "The students", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "learn", ADVERB_OF_TIME: "next year" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "learning", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "learned", ADVERB_OF_TIME: "by exam" },
      { SUBJECT: "The class", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "learning", ADVERB_OF_TIME: "for four years" },
    ],
    write: [
      { SUBJECT: "Students", AUX_VERB: "", VERB_IN_CORRECT_FORM: "write", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "She", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "writing", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "written", ADVERB_OF_TIME: "this week" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "writing", ADVERB_OF_TIME: "since last semester" },
      { SUBJECT: "The student", AUX_VERB: "", VERB_IN_CORRECT_FORM: "wrote", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The class", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "writing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "written", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "writing", ADVERB_OF_TIME: "for two hours" },
      { SUBJECT: "The students", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "write", ADVERB_OF_TIME: "next month" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "writing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "written", ADVERB_OF_TIME: "by semester end" },
      { SUBJECT: "The class", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "writing", ADVERB_OF_TIME: "continuously" },
    ],
    read: [
      { SUBJECT: "Students", AUX_VERB: "", VERB_IN_CORRECT_FORM: "read", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The class", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "reading", ADVERB_OF_TIME: "currently" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "read", ADVERB_OF_TIME: "this semester" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "reading", ADVERB_OF_TIME: "since library opened" },
      { SUBJECT: "The student", AUX_VERB: "", VERB_IN_CORRECT_FORM: "read", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The class", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "reading", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "read", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "reading", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The students", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "read", ADVERB_OF_TIME: "next unit" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "reading", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "read", ADVERB_OF_TIME: "by graduation" },
      { SUBJECT: "The class", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "reading", ADVERB_OF_TIME: "all year" },
    ],
    graduate: [
      { SUBJECT: "Students", AUX_VERB: "", VERB_IN_CORRECT_FORM: "graduate", ADVERB_OF_TIME: "every June" },
      { SUBJECT: "She", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "graduating", ADVERB_OF_TIME: "this spring" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "graduated", ADVERB_OF_TIME: "successfully" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "graduating", ADVERB_OF_TIME: "since 1950" },
      { SUBJECT: "The class", AUX_VERB: "", VERB_IN_CORRECT_FORM: "graduated", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The student", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "graduating", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "graduated", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "graduating", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The seniors", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "graduate", ADVERB_OF_TIME: "next month" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "graduating", ADVERB_OF_TIME: "then" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "graduated", ADVERB_OF_TIME: "by summer" },
      { SUBJECT: "The school", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "graduating", ADVERB_OF_TIME: "for 100 years" },
    ],
    attend: [
      { SUBJECT: "Students", AUX_VERB: "", VERB_IN_CORRECT_FORM: "attend", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "She", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "attending", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "attended", ADVERB_OF_TIME: "every session" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "attending", ADVERB_OF_TIME: "since semester" },
      { SUBJECT: "The student", AUX_VERB: "", VERB_IN_CORRECT_FORM: "attended", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The class", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "attending", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "attending", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "attending", ADVERB_OF_TIME: "for weeks" },
      { SUBJECT: "The students", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "attend", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "attending", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "attended", ADVERB_OF_TIME: "by finals" },
      { SUBJECT: "The students", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "attending", ADVERB_OF_TIME: "for four years" },
    ],
    examine: [
      { SUBJECT: "Teachers", AUX_VERB: "", VERB_IN_CORRECT_FORM: "examine", ADVERB_OF_TIME: "carefully" },
      { SUBJECT: "The professor", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "today" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "examined", ADVERB_OF_TIME: "thoroughly" },
      { SUBJECT: "The committee", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "since morning" },
      { SUBJECT: "The instructor", AUX_VERB: "", VERB_IN_CORRECT_FORM: "examined", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The teacher", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "examined", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The board", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "examine", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "examined", ADVERB_OF_TIME: "by deadline" },
      { SUBJECT: "The committee", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "for days" },
    ],
    practice: [
      { SUBJECT: "Students", AUX_VERB: "", VERB_IN_CORRECT_FORM: "practice", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The band", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "practicing", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "practiced", ADVERB_OF_TIME: "many times" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "practicing", ADVERB_OF_TIME: "since after school" },
      { SUBJECT: "The team", AUX_VERB: "", VERB_IN_CORRECT_FORM: "practiced", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The student", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "practicing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "practiced", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "practicing", ADVERB_OF_TIME: "for months" },
      { SUBJECT: "The class", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "practice", ADVERB_OF_TIME: "next week" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "practicing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "practiced", ADVERB_OF_TIME: "enough by recital" },
      { SUBJECT: "The students", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "practicing", ADVERB_OF_TIME: "for hours" },
    ],
    discuss: [
      { SUBJECT: "Students", AUX_VERB: "", VERB_IN_CORRECT_FORM: "discuss", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The class", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "discussing", ADVERB_OF_TIME: "today" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "discussed", ADVERB_OF_TIME: "extensively" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "discussing", ADVERB_OF_TIME: "since debate" },
      { SUBJECT: "The students", AUX_VERB: "", VERB_IN_CORRECT_FORM: "discussed", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The group", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "discussing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "discussed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "discussing", ADVERB_OF_TIME: "for an hour" },
      { SUBJECT: "The class", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "discuss", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "discussing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "discussed", ADVERB_OF_TIME: "by end of class" },
      { SUBJECT: "The students", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "discussing", ADVERB_OF_TIME: "for the period" },
    ],
  },
  hospital: {
    treat: [
      { SUBJECT: "Doctors", AUX_VERB: "", VERB_IN_CORRECT_FORM: "treat", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The physician", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "treating", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "treated", ADVERB_OF_TIME: "successfully before" },
      { SUBJECT: "The medical team", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "treating", ADVERB_OF_TIME: "since dawn" },
      { SUBJECT: "The doctor", AUX_VERB: "", VERB_IN_CORRECT_FORM: "treated", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The nurse", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "treating", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "treated", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The staff", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "treating", ADVERB_OF_TIME: "for 12 hours" },
      { SUBJECT: "The specialist", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "treat", ADVERB_OF_TIME: "next week" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "treating", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "treated", ADVERB_OF_TIME: "by shift" },
      { SUBJECT: "The hospital", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "treating", ADVERB_OF_TIME: "for 50 years" },
    ],
    examine: [
      { SUBJECT: "Medical professionals", AUX_VERB: "", VERB_IN_CORRECT_FORM: "examine", ADVERB_OF_TIME: "thoroughly" },
      { SUBJECT: "The doctor", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "right now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "examined", ADVERB_OF_TIME: "carefully" },
      { SUBJECT: "The medical team", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "since morning" },
      { SUBJECT: "The physician", AUX_VERB: "", VERB_IN_CORRECT_FORM: "examined", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The doctor", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "examined", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "for an hour" },
      { SUBJECT: "The specialist", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "examine", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "examined", ADVERB_OF_TIME: "by evening" },
      { SUBJECT: "The doctors", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "examining", ADVERB_OF_TIME: "all day" },
    ],
    heal: [
      { SUBJECT: "The human body", AUX_VERB: "", VERB_IN_CORRECT_FORM: "heals", ADVERB_OF_TIME: "naturally" },
      { SUBJECT: "The wound", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "healing", ADVERB_OF_TIME: "nicely" },
      { SUBJECT: "The patient", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "healed", ADVERB_OF_TIME: "completely" },
      { SUBJECT: "The broken bone", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "healing", ADVERB_OF_TIME: "since cast" },
      { SUBJECT: "The cut", AUX_VERB: "", VERB_IN_CORRECT_FORM: "healed", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The patient", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "healing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "The injury", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "healed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The tissue", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "healing", ADVERB_OF_TIME: "for weeks" },
      { SUBJECT: "The medicine", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "healed", ADVERB_OF_TIME: "quickly" },
      { SUBJECT: "The body", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "healing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "The wound", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "healed", ADVERB_OF_TIME: "by next visit" },
      { SUBJECT: "The patient", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "healing", ADVERB_OF_TIME: "for months" },
    ],
    operate: [
      { SUBJECT: "Surgeons", AUX_VERB: "", VERB_IN_CORRECT_FORM: "operate", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The surgical team", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "operating", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "operated", ADVERB_OF_TIME: "successfully" },
      { SUBJECT: "The surgeon", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "operating", ADVERB_OF_TIME: "since morning" },
      { SUBJECT: "The doctor", AUX_VERB: "", VERB_IN_CORRECT_FORM: "operated", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The surgeon", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "operating", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "operated", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The team", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "operating", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The specialist", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "operate", ADVERB_OF_TIME: "next Tuesday" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "operating", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "operated", ADVERB_OF_TIME: "by arrival" },
      { SUBJECT: "The surgeon", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "operating", ADVERB_OF_TIME: "for 8 hours" },
    ],
    diagnose: [
      { SUBJECT: "Experienced doctors", AUX_VERB: "", VERB_IN_CORRECT_FORM: "diagnose", ADVERB_OF_TIME: "accurately" },
      { SUBJECT: "The physician", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "diagnosing", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "diagnosed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The medical team", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "diagnosing", ADVERB_OF_TIME: "since review" },
      { SUBJECT: "The doctor", AUX_VERB: "", VERB_IN_CORRECT_FORM: "diagnosed", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The specialist", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "diagnosing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "diagnosed", ADVERB_OF_TIME: "correctly before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "diagnosing", ADVERB_OF_TIME: "for days" },
      { SUBJECT: "The expert", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "diagnose", ADVERB_OF_TIME: "tomorrow" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "diagnosing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "diagnosed", ADVERB_OF_TIME: "by completion" },
      { SUBJECT: "The doctors", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "diagnosing", ADVERB_OF_TIME: "all week" },
    ],
    recover: [
      { SUBJECT: "Patients", AUX_VERB: "", VERB_IN_CORRECT_FORM: "recover", ADVERB_OF_TIME: "well" },
      { SUBJECT: "The patient", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "recovering", ADVERB_OF_TIME: "well" },
      { SUBJECT: "She", AUX_VERB: "has", VERB_IN_CORRECT_FORM: "recovered", ADVERB_OF_TIME: "completely" },
      { SUBJECT: "He", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "recovering", ADVERB_OF_TIME: "since last month" },
      { SUBJECT: "The patient", AUX_VERB: "", VERB_IN_CORRECT_FORM: "recovered", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "She", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "recovering", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "recovered", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The patient", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "recovering", ADVERB_OF_TIME: "for weeks" },
      { SUBJECT: "You", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "recover", ADVERB_OF_TIME: "fully" },
      { SUBJECT: "The patient", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "recovering", ADVERB_OF_TIME: "later" },
      { SUBJECT: "She", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "recovered", ADVERB_OF_TIME: "by school" },
      { SUBJECT: "The patient", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "recovering", ADVERB_OF_TIME: "for months" },
    ],
    visit: [
      { SUBJECT: "Family members", AUX_VERB: "", VERB_IN_CORRECT_FORM: "visit", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The relatives", AUX_VERB: "are", VERB_IN_CORRECT_FORM: "visiting", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "visited", ADVERB_OF_TIME: "every day" },
      { SUBJECT: "They", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "visiting", ADVERB_OF_TIME: "since hours began" },
      { SUBJECT: "The children", AUX_VERB: "", VERB_IN_CORRECT_FORM: "visited", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The family", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "visiting", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "visited", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "visiting", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "Friends", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "visit", ADVERB_OF_TIME: "during weekend" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "visiting", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "visited", ADVERB_OF_TIME: "by arrival" },
      { SUBJECT: "The family", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "visiting", ADVERB_OF_TIME: "for hours" },
    ],
    prescribe: [
      { SUBJECT: "Doctors", AUX_VERB: "", VERB_IN_CORRECT_FORM: "prescribe", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The physician", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "prescribing", ADVERB_OF_TIME: "now" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "prescribed", ADVERB_OF_TIME: "successfully before" },
      { SUBJECT: "The doctor", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "prescribing", ADVERB_OF_TIME: "since review" },
      { SUBJECT: "The specialist", AUX_VERB: "", VERB_IN_CORRECT_FORM: "prescribed", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The doctor", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "prescribing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "prescribed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "prescribing", ADVERB_OF_TIME: "carefully" },
      { SUBJECT: "The doctor", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "prescribe", ADVERB_OF_TIME: "after surgery" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "prescribing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "prescribed", ADVERB_OF_TIME: "by pharmacy" },
      { SUBJECT: "The physician", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "prescribing", ADVERB_OF_TIME: "for 20 years" },
    ],
    nurse: [
      { SUBJECT: "Professional nurses", AUX_VERB: "", VERB_IN_CORRECT_FORM: "nurse", ADVERB_OF_TIME: "daily" },
      { SUBJECT: "The RN", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "nursing", ADVERB_OF_TIME: "carefully" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "nursed", ADVERB_OF_TIME: "many patients" },
      { SUBJECT: "The nursing staff", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "nursing", ADVERB_OF_TIME: "since night shift" },
      { SUBJECT: "The nurse", AUX_VERB: "", VERB_IN_CORRECT_FORM: "nursed", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "She", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "nursing", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "nursed", ADVERB_OF_TIME: "before" },
      { SUBJECT: "The staff", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "nursing", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The nurse", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "nurse", ADVERB_OF_TIME: "to health" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "nursing", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "nursed", ADVERB_OF_TIME: "by discharge" },
      { SUBJECT: "The nurses", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "nursing", ADVERB_OF_TIME: "for 12 hours" },
    ],
    discharge: [
      { SUBJECT: "Hospitals", AUX_VERB: "", VERB_IN_CORRECT_FORM: "discharge", ADVERB_OF_TIME: "regularly" },
      { SUBJECT: "The doctor", AUX_VERB: "is", VERB_IN_CORRECT_FORM: "discharging", ADVERB_OF_TIME: "this afternoon" },
      { SUBJECT: "We", AUX_VERB: "have", VERB_IN_CORRECT_FORM: "discharged", ADVERB_OF_TIME: "today" },
      { SUBJECT: "The hospital", AUX_VERB: "has been", VERB_IN_CORRECT_FORM: "discharging", ADVERB_OF_TIME: "since morning rounds" },
      { SUBJECT: "They", AUX_VERB: "", VERB_IN_CORRECT_FORM: "discharged", ADVERB_OF_TIME: "yesterday" },
      { SUBJECT: "The nurse", AUX_VERB: "was", VERB_IN_CORRECT_FORM: "discharging", ADVERB_OF_TIME: "then" },
      { SUBJECT: "They", AUX_VERB: "had", VERB_IN_CORRECT_FORM: "discharged", ADVERB_OF_TIME: "before" },
      { SUBJECT: "We", AUX_VERB: "had been", VERB_IN_CORRECT_FORM: "discharging", ADVERB_OF_TIME: "for hours" },
      { SUBJECT: "The doctor", AUX_VERB: "will", VERB_IN_CORRECT_FORM: "discharge", ADVERB_OF_TIME: "tomorrow morning" },
      { SUBJECT: "They", AUX_VERB: "will be", VERB_IN_CORRECT_FORM: "discharging", ADVERB_OF_TIME: "later" },
      { SUBJECT: "We", AUX_VERB: "will have", VERB_IN_CORRECT_FORM: "discharged", ADVERB_OF_TIME: "by arrival" },
      { SUBJECT: "The hospital", AUX_VERB: "will have been", VERB_IN_CORRECT_FORM: "discharging", ADVERB_OF_TIME: "all day" },
    ],
  },
};

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

// Utility function to concatenate sentence object fields with auxiliary verbs in bold
const concatenateSentence = (sentenceObj: any): React.ReactElement => {
  if (typeof sentenceObj === 'string') {
    return <span>{sentenceObj}</span>; // Handle legacy string format
  }
  
  if (sentenceObj && typeof sentenceObj === 'object') {
    const { SUBJECT, AUX_VERB, VERB_IN_CORRECT_FORM, ADVERB_OF_TIME } = sentenceObj;
    
    return (
      <span>
        {SUBJECT} {AUX_VERB && <span className="font-bold">{AUX_VERB}</span>} <span className="font-bold text-base">{VERB_IN_CORRECT_FORM}</span> {ADVERB_OF_TIME}
      </span>
    );
  }
  
  return <span>Example sentence will be here.</span>;
}

// Utility function to concatenate modal sentence object fields with modal in bold
const concatenateModalSentence = (modalSentenceObj: any): React.ReactElement => {
  if (modalSentenceObj && typeof modalSentenceObj === 'object') {
    const { subject, modal, verb } = modalSentenceObj;
    
    return (
      <span>
        {subject} <span className="font-bold">{modal}</span> {verb}
      </span>
    );
  }
  
  return <span>Example modal sentence will be here.</span>;
}

const modalSubjects = {
  plane: {
    fly: "The plane",
    land: "The plane",
    takeoff: "The plane",
    board: "Passengers",
    travel: "People",
    pilot: "The pilot",
    check: "The crew",
    wait: "Passengers",
    arrive: "The plane",
    depart: "The plane"
  },
  house: {
    live: "I",
    build: "Construction workers",
    clean: "She",
    paint: "Professional painters",
    repair: "The contractor",
    decorate: "The interior designer",
    move: "The family",
    rent: "The tenant",
    buy: "The buyer",
    sell: "The seller"
  },
  car: {
    drive: "The driver",
    park: "The driver",
    start: "The driver",
    stop: "The driver",
    wash: "The car owner",
    repair: "The mechanic",
    fuel: "The driver",
    accelerate: "The driver",
    brake: "The driver",
    reverse: "The driver"
  },
  restaurant: {
    eat: "The customer",
    order: "The customer",
    serve: "The waiter",
    cook: "The chef",
    pay: "The customer",
    reserve: "The customer",
    taste: "The customer",
    recommend: "The waiter",
    deliver: "The delivery person",
    enjoy: "The customer"
  },
  school: {
    study: "The student",
    teach: "The teacher",
    learn: "The student",
    write: "The student",
    read: "The student",
    graduate: "The student",
    attend: "The student",
    examine: "The teacher",
    practice: "The student",
    discuss: "The students"
  },
  hospital: {
    treat: "The doctor",
    examine: "The doctor",
    heal: "The doctor",
    operate: "The surgeon",
    diagnose: "The doctor",
    recover: "The patient",
    visit: "The visitor",
    prescribe: "The doctor",
    nurse: "The nurse",
    discharge: "The hospital"
  }
};

const modalTemplates = [
  "is able to", "can", "could", "should", "would", "has to", "had to", "will have to",
  "must", "might", "may", "should not", "must not", "would like to", "is going to", "needs to", "wants to"
];

const modalTemplatesPolish = [
  "jest zdolny", "może/umie", "mógł by", "powinien", "by się", "musi", "musiał", "będzie musiał",
  "musi", "może", "może", "nie powinien", "nie może", "chciałby", "zamierza", "potrzebuje", "chce"
];

const modalSentences: any = {};
for (const topic in verbs) {
  modalSentences[topic] = {};
  for (const verbObj of verbs[topic as keyof typeof verbs]) {
    const verb = verbObj.id;
    const subject = modalSubjects[topic as keyof typeof modalSubjects]?.[verb as keyof (typeof modalSubjects)[keyof typeof modalSubjects]] || "Someone";
    modalSentences[topic][verb] = modalTemplates.map((modal, index) => ({
      subject,
      modal,
      verb,
      polishTranslation: modalTemplatesPolish[index]
    }));
  }
}

export default function EnglishTensesApp() {
  const [currentStep, setCurrentStep] = useState<"topics" | "verbs" | "tenses">("topics")
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [selectedVerb, setSelectedVerb] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [showModals, setShowModals] = useState(false)
  const [showTensePanel, setShowTensePanel] = useState(false)

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
    return sentences[selectedTopic as keyof typeof sentences]?.[selectedVerb as keyof (typeof sentences)[keyof typeof sentences]] || []
  }

  const getCurrentModalSentences = () => {
    return modalSentences[selectedTopic as keyof typeof modalSentences]?.[selectedVerb as keyof (typeof modalSentences)[keyof typeof modalSentences]] || []
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Tense Info Panel Toggle - Fixed Position */}
      <div className="fixed top-4 right-20 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTensePanel(!showTensePanel)}
          className="gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Tenses Info
        </Button>
      </div>

      {/* Sliding Tense Info Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-card border-l shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
        showTensePanel ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">English Tenses Guide</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTensePanel(false)}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* Past Tenses */}
            <div>
              <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Past Tenses
              </h4>
              <div className="space-y-3">
                {tenses.filter(tense => tense.category === "past").map((tense, index) => (
                  <div key={index} className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h5 className="font-medium text-sm mb-1">{tense.name}</h5>
                    <p className="text-xs text-muted-foreground">{tense.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Present Tenses */}
            <div>
              <h4 className="text-md font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Present Tenses
              </h4>
              <div className="space-y-3">
                {tenses.filter(tense => tense.category === "present").map((tense, index) => (
                  <div key={index} className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h5 className="font-medium text-sm mb-1">{tense.name}</h5>
                    <p className="text-xs text-muted-foreground">{tense.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Tenses */}
            <div>
              <h4 className="text-md font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                Future Tenses
              </h4>
              <div className="space-y-3">
                {tenses.filter(tense => tense.category === "future").map((tense, index) => (
                  <div key={index} className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <h5 className="font-medium text-sm mb-1">{tense.name}</h5>
                    <p className="text-xs text-muted-foreground">{tense.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
                          className="transition-transform duration-300 group-hover:scale-110 object-cover"
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
                          className="rounded-xl mx-auto transition-transform duration-300 group-hover:scale-110 border object-cover"
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
            {/* Verb Image Display */}
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={
                    getHighResImage(
                      verbs[selectedTopic as keyof typeof verbs]?.find((v) => v.id === selectedVerb)?.image ||
                        "/placeholder.svg",
                    ) || "/placeholder.svg"
                  }
                  alt={verbs[selectedTopic as keyof typeof verbs]?.find((v) => v.id === selectedVerb)?.name || "Verb"}
                  width={300}
                  height={300}
                  className="rounded-2xl border-2 border-primary/20 shadow-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2">
                  <Badge
                    className={getDifficultyColor(
                      verbs[selectedTopic as keyof typeof verbs]?.find((v) => v.id === selectedVerb)?.difficulty ||
                        "beginner",
                    )}
                  >
                    {verbs[selectedTopic as keyof typeof verbs]?.find((v) => v.id === selectedVerb)?.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

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
              <div className="flex items-center justify-center gap-4 mb-6">
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Target className="h-4 w-4" />
                  All 12 English Tenses
                </Badge>
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Zap className="h-4 w-4" />
                  17 Modal Verbs
                </Badge>
                <Badge variant="outline" className="gap-2 px-4 py-2">
                  <Palette className="h-4 w-4" />
                  Dark Mode Ready
                </Badge>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={showModals ? "outline" : "default"}
                  onClick={() => setShowModals(false)}
                  className="gap-2"
                >
                  <Target className="h-4 w-4" />
                  Tenses
                </Button>
                <Button
                  variant={showModals ? "default" : "outline"}
                  onClick={() => setShowModals(true)}
                  className="gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Modals
                </Button>
              </div>
            </div>

            {/* Remove <ScrollArea> and render its children directly */}
            {!showModals ? (
              <div className="space-y-6">
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-muted/50 rounded-lg border">
                  <div className="text-center font-semibold text-muted-foreground">Tense Type</div>
                  <div className="text-center font-semibold text-blue-600 dark:text-blue-400">Past</div>
                  <div className="text-center font-semibold text-purple-600 dark:text-purple-400">Present</div>
                  <div className="text-center font-semibold text-emerald-600 dark:text-emerald-400">Future</div>
                </div>

                {/* Simple Tenses Row */}
                <div className="border-l-4 border-l-blue-500 bg-card rounded-lg border shadow-sm">
                  <div className="p-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold">Simple</span>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-left flex items-center min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[4])}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800 text-left flex items-center min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[0])}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-left flex items-center min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[8])}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continuous Tenses Row */}
                <div className="border-l-4 border-l-purple-500 bg-card rounded-lg border shadow-sm">
                  <div className="p-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold">Continuous</span>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-left flex items-center min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[5])}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800 text-left flex items-center min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[1])}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-left flex items-center min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[9])}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Perfect Tenses Row */}
                <div className="border-l-4 border-l-red-500 bg-card rounded-lg border shadow-sm">
                  <div className="p-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold">Perfect</span>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-left min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[6])}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800 text-left min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[2])}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-left min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[10])}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Perfect Continuous Tenses Row */}
                <div className="border-l-4 border-l-orange-500 bg-card rounded-lg border shadow-sm">
                  <div className="p-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold">Perfect Continuous</span>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 text-left min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[7])}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800 text-left min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[3])}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 text-left flex items-center justify-center min-h-[80px]">
                        <div>
                          <p className="text-sm leading-relaxed">
                            {concatenateSentence(getCurrentSentences()[11])}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Modal Sentences Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getCurrentModalSentences().map((modalSentence: any, index: number) => (
                    <div key={index} className="p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-center space-y-2">
                        <p className="text-sm leading-relaxed">
                          {concatenateModalSentence(modalSentence)}
                        </p>
                        <p className="text-xs text-muted-foreground italic">
                          {modalSentence.polishTranslation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
