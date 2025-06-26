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
    land: [
      "The plane lands safely at the airport every evening.",
      "The plane is landing on runway 24 right now.",
      "The plane has landed successfully after a long journey.",
      "The plane has been landing smoothly since the pilot took control.",
      "The plane landed during the thunderstorm last night.",
      "The plane was landing when the emergency vehicles arrived.",
      "The plane had landed before the passengers realized the delay.",
      "The plane had been landing procedures for 20 minutes before touchdown.",
      "The plane will land at 3 PM according to the schedule.",
      "The plane will be landing while we wait in the terminal.",
      "The plane will have landed by the time you reach the airport.",
      "The plane will have been landing for several minutes before we see it.",
    ],
    takeoff: [
      "The plane takes off from this runway every morning.",
      "The plane is taking off despite the foggy weather.",
      "The plane has taken off successfully from the busy airport.",
      "The plane has been taking off smoothly since the new pilot arrived.",
      "The plane took off exactly on time yesterday.",
      "The plane was taking off when the bird strike occurred.",
      "The plane had taken off before the storm warning was issued.",
      "The plane had been taking off procedures for 10 minutes before departure.",
      "The plane will take off as soon as the weather clears.",
      "The plane will be taking off while passengers board the next flight.",
      "The plane will have taken off by the time you arrive at the gate.",
      "The plane will have been taking off for several minutes before reaching cruising altitude.",
    ],
    board: [
      "Passengers board the plane through gate 15 every day.",
      "Passengers are boarding the plane in groups right now.",
      "All passengers have boarded the plane successfully.",
      "Passengers have been boarding the plane since 2 PM.",
      "The family boarded the plane first yesterday.",
      "Passengers were boarding the plane when the delay was announced.",
      "All passengers had boarded the plane before the doors closed.",
      "Passengers had been boarding the plane for 30 minutes before takeoff.",
      "Passengers will board the plane starting at 4 PM.",
      "Passengers will be boarding the plane while crew performs safety checks.",
      "All passengers will have boarded the plane by departure time.",
      "Passengers will have been boarding the plane for an hour before takeoff.",
    ],
    travel: [
      "People travel by plane to distant countries regularly.",
      "The businessman is traveling to Tokyo for a conference.",
      "She has traveled to over 50 countries by plane.",
      "They have been traveling by plane since their honeymoon began.",
      "The family traveled to Europe by plane last summer.",
      "He was traveling to Australia when the pandemic started.",
      "She had traveled extensively before settling down.",
      "They had been traveling for 12 hours before reaching their destination.",
      "We will travel to Asia by plane next month.",
      "They will be traveling while we stay home for the holidays.",
      "She will have traveled to all continents by her 40th birthday.",
      "They will have been traveling for 20 hours before landing in Sydney.",
    ],
    pilot: [
      "He pilots commercial aircraft for a major airline.",
      "She is piloting the plane through turbulent weather.",
      "The captain has piloted this route many times before.",
      "He has been piloting planes since graduating from flight school.",
      "She piloted the emergency landing perfectly yesterday.",
      "The co-pilot was piloting when the engine failed.",
      "He had piloted military jets before joining the airline.",
      "She had been piloting for 2 hours before requesting assistance.",
      "The new pilot will pilot his first commercial flight tomorrow.",
      "She will be piloting while the captain rests.",
      "He will have piloted over 1000 flights by retirement.",
      "She will have been piloting for 8 hours before the shift ends.",
    ],
    check: [
      "The crew checks the plane before every flight.",
      "Mechanics are checking the engine systems right now.",
      "The pilot has checked all instruments thoroughly.",
      "The team has been checking the aircraft since dawn.",
      "The inspector checked the plane's safety systems yesterday.",
      "Engineers were checking the wings when they found the issue.",
      "The crew had checked everything before passengers boarded.",
      "They had been checking the plane for 2 hours before clearance.",
      "The maintenance team will check the plane tonight.",
      "Technicians will be checking systems while passengers wait.",
      "The crew will have checked all systems by departure time.",
      "They will have been checking the aircraft for hours before approval.",
    ],
    wait: [
      "Passengers wait in the terminal for boarding announcements.",
      "The family is waiting at gate 12 for their flight.",
      "We have waited for 3 hours due to the delay.",
      "Travelers have been waiting since early morning.",
      "They waited patiently during the weather delay yesterday.",
      "Passengers were waiting when the flight was cancelled.",
      "Everyone had waited for hours before the announcement came.",
      "We had been waiting for 4 hours before boarding began.",
      "Passengers will wait in the lounge until boarding starts.",
      "They will be waiting while maintenance fixes the problem.",
      "We will have waited for 6 hours by the time we board.",
      "Passengers will have been waiting all day before departure.",
    ],
    arrive: [
      "International flights arrive at terminal 3 daily.",
      "The plane is arriving 30 minutes behind schedule.",
      "Flight 247 has arrived safely at its destination.",
      "Planes have been arriving late since the storm began.",
      "The delayed flight arrived at midnight yesterday.",
      "The plane was arriving when the runway lights failed.",
      "The aircraft had arrived before the ground crew was ready.",
      "The flight had been arriving procedures for 20 minutes before landing.",
      "The next flight will arrive at 6 PM sharp.",
      "Several planes will be arriving during the busy evening hours.",
      "All flights will have arrived by the end of the day.",
      "The plane will have been arriving for several minutes before passengers disembark.",
    ],
    depart: [
      "Flights depart from this gate every two hours.",
      "Flight 156 is departing from gate 8 right now.",
      "The morning flight has departed on schedule.",
      "Planes have been departing late since the fog rolled in.",
      "The red-eye flight departed at 11 PM last night.",
      "The plane was departing when the passenger ran to catch it.",
      "The aircraft had departed before the connecting passengers arrived.",
      "The flight had been departing procedures for 15 minutes before takeoff.",
      "The evening flight will depart as planned.",
      "Multiple flights will be departing during the peak hours.",
      "All scheduled flights will have departed by midnight.",
      "The plane will have been departing for several minutes before reaching altitude.",
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
    build: [
      "Construction workers build houses in this neighborhood regularly.",
      "The crew is building a new house next door.",
      "They have built over 100 houses in this area.",
      "The company has been building houses since 1985.",
      "The family built their dream house last year.",
      "Workers were building when the storm hit.",
      "The contractor had built the foundation before winter arrived.",
      "They had been building for 6 months before the inspection.",
      "The developer will build 50 new houses here.",
      "Construction crews will be building while residents sleep.",
      "They will have built all houses by next summer.",
      "The team will have been building for 2 years before completion.",
    ],
    clean: [
      "She cleans the house every Saturday morning.",
      "The maid is cleaning the living room right now.",
      "I have cleaned every room in the house today.",
      "The cleaning service has been cleaning since 8 AM.",
      "They cleaned the entire house before the party yesterday.",
      "She was cleaning when the guests arrived unexpectedly.",
      "The family had cleaned thoroughly before the inspection.",
      "We had been cleaning for 4 hours before taking a break.",
      "The housekeepers will clean tomorrow while we're at work.",
      "They will be cleaning while the family is on vacation.",
      "We will have cleaned everything by the weekend.",
      "The crew will have been cleaning for 8 hours before finishing.",
    ],
    paint: [
      "Professional painters paint houses in this area frequently.",
      "The crew is painting the exterior walls today.",
      "We have painted three rooms this month.",
      "The painters have been painting since early morning.",
      "They painted the kitchen a bright yellow yesterday.",
      "The artist was painting when inspiration struck.",
      "The homeowners had painted before moving in.",
      "We had been painting for hours before the color looked right.",
      "The contractors will paint the house next week.",
      "Workers will be painting while the weather stays dry.",
      "They will have painted the entire house by Friday.",
      "The team will have been painting for 3 days before completion.",
    ],
    repair: [
      "The handyman repairs houses in the neighborhood regularly.",
      "Contractors are repairing the roof damage right now.",
      "We have repaired all the broken windows.",
      "The maintenance team has been repairing since the storm.",
      "The plumber repaired the leaking pipes yesterday.",
      "Workers were repairing when they discovered more damage.",
      "The electrician had repaired the wiring before the inspection.",
      "They had been repairing for weeks before everything worked properly.",
      "The contractor will repair the foundation next month.",
      "Specialists will be repairing while the family stays elsewhere.",
      "They will have repaired all damage by spring.",
      "The crew will have been repairing for months before finishing.",
    ],
    decorate: [
      "Interior designers decorate houses for wealthy clients.",
      "She is decorating the nursery for the new baby.",
      "They have decorated their house for the holidays.",
      "The family has been decorating since Thanksgiving.",
      "We decorated the living room with new furniture yesterday.",
      "She was decorating when she ran out of supplies.",
      "The couple had decorated before hosting the dinner party.",
      "They had been decorating for days before the guests arrived.",
      "The designer will decorate the master bedroom tomorrow.",
      "They will be decorating while shopping for new accessories.",
      "We will have decorated every room by Christmas.",
      "The team will have been decorating for weeks before the reveal.",
    ],
    move: [
      "Families move to new houses every summer.",
      "The neighbors are moving to California next week.",
      "We have moved three times in five years.",
      "They have been moving gradually since last month.",
      "The young couple moved into their first house yesterday.",
      "The family was moving when the truck broke down.",
      "They had moved all furniture before the lease expired.",
      "We had been moving boxes for hours before hiring help.",
      "The tenants will move out at the end of the month.",
      "They will be moving while we renovate their old place.",
      "Everyone will have moved by the deadline.",
      "The family will have been moving for days before settling in.",
    ],
    rent: [
      "Many people rent houses instead of buying them.",
      "The couple is renting a house near the university.",
      "We have rented this house for two years now.",
      "They have been renting since graduating from college.",
      "The family rented a vacation house last summer.",
      "She was renting when she decided to buy instead.",
      "They had rented several places before finding this one.",
      "We had been renting for years before saving for a down payment.",
      "The students will rent a house together next semester.",
      "They will be renting while saving money for a purchase.",
      "We will have rented for 5 years by next December.",
      "The tenants will have been renting for a decade before moving.",
    ],
    buy: [
      "First-time buyers buy houses with government assistance.",
      "The young family is buying their dream house.",
      "We have bought a house in the suburbs.",
      "They have been buying properties as investments.",
      "The couple bought a fixer-upper last spring.",
      "She was buying when interest rates suddenly dropped.",
      "They had bought before the market prices increased.",
      "We had been buying and selling houses for years as a business.",
      "The investors will buy several houses this year.",
      "They will be buying while the market remains favorable.",
      "We will have bought our forever home by retirement.",
      "The company will have been buying properties for decades.",
    ],
    sell: [
      "Real estate agents sell houses for a living.",
      "The owners are selling their house due to relocation.",
      "We have sold our previous house successfully.",
      "They have been selling houses in this market for years.",
      "The family sold their house within a week yesterday.",
      "The couple was selling when they received multiple offers.",
      "They had sold before the market conditions changed.",
      "We had been selling for months before finding the right buyer.",
      "The homeowners will sell next spring for the best price.",
      "They will be selling while looking for a new place.",
      "We will have sold by the time our lease expires.",
      "The agency will have been selling houses for 50 years next month.",
    ],
  },
  car: {
    drive: [
      "I drive my car to work every morning.",
      "She is driving to the grocery store right now.",
      "We have driven over 1000 miles this month.",
      "He has been driving since he was 16 years old.",
      "They drove across the country last summer.",
      "She was driving when the accident happened.",
      "He had driven for hours before stopping for gas.",
      "We had been driving all night before reaching our destination.",
      "I will drive you to the airport tomorrow.",
      "They will be driving while we take the train.",
      "We will have driven 500 miles by evening.",
      "She will have been driving for 8 hours before taking a break.",
    ],
    park: [
      "Drivers park their cars in designated spaces.",
      "He is parking in the underground garage.",
      "I have parked in this spot many times before.",
      "She has been parking here since starting her job.",
      "We parked near the entrance yesterday.",
      "The valet was parking when the keys were dropped.",
      "They had parked before the meter expired.",
      "We had been parking illegally for weeks before getting caught.",
      "You will park in the visitor section tomorrow.",
      "They will be parking while we walk to the building.",
      "We will have parked by the time the meeting starts.",
      "The attendant will have been parking cars for 10 hours today.",
    ],
    start: [
      "The car starts immediately in warm weather.",
      "The engine is starting after several attempts.",
      "The mechanic has started the car successfully.",
      "The car has been starting poorly since winter began.",
      "The old car started on the first try yesterday.",
      "The engine was starting when it suddenly died.",
      "The car had started before the battery completely failed.",
      "The engine had been starting roughly for weeks before breaking down.",
      "The car will start better after the tune-up.",
      "The engine will be starting while the mechanic listens.",
      "The car will have started by the time you return.",
      "The engine will have been starting problems for months before replacement.",
    ],
    stop: [
      "The car stops smoothly at red lights.",
      "The driver is stopping for pedestrians.",
      "The vehicle has stopped in the middle of the road.",
      "Traffic has been stopping frequently during rush hour.",
      "The bus stopped at every corner yesterday.",
      "The car was stopping when the brakes failed.",
      "The vehicle had stopped before the collision occurred.",
      "Traffic had been stopping and starting for hours during the jam.",
      "The car will stop automatically if it detects danger.",
      "Vehicles will be stopping while construction crews work.",
      "The car will have stopped by the time police arrive.",
      "Traffic will have been stopping intermittently all day.",
    ],
    wash: [
      "Car owners wash their vehicles every weekend.",
      "He is washing his car in the driveway.",
      "We have washed the car twice this month.",
      "The car wash has been washing cars since 6 AM.",
      "She washed her car before the job interview yesterday.",
      "The teenager was washing cars when it started raining.",
      "They had washed the car before the road trip.",
      "We had been washing cars for charity all morning.",
      "The service will wash your car while you wait.",
      "They will be washing cars during the fundraiser.",
      "We will have washed all the cars by closing time.",
      "The crew will have been washing cars for 12 hours today.",
    ],
    repair: [
      "Mechanics repair cars at the auto shop daily.",
      "The technician is repairing the transmission.",
      "We have repaired the engine successfully.",
      "The garage has been repairing cars since 1975.",
      "The mechanic repaired the brakes yesterday.",
      "The technician was repairing when he found another problem.",
      "They had repaired the car before the warranty expired.",
      "The shop had been repairing cars for hours before closing.",
      "The mechanic will repair your car tomorrow.",
      "They will be repairing while you use the loaner car.",
      "We will have repaired everything by Friday.",
      "The shop will have been repairing cars for 50 years next month.",
    ],
    fuel: [
      "Drivers fuel their cars at gas stations regularly.",
      "She is fueling up before the long trip.",
      "We have fueled the car for the journey.",
      "The station has been fueling cars since dawn.",
      "He fueled the car at the cheapest station yesterday.",
      "The driver was fueling when the price changed.",
      "They had fueled before the prices increased.",
      "We had been fueling at this station for years.",
      "The attendant will fuel your car for you.",
      "They will be fueling while we pay inside.",
      "We will have fueled by the time you finish shopping.",
      "The station will have been fueling cars for 24 hours straight.",
    ],
    accelerate: [
      "Sports cars accelerate quickly from zero to sixty.",
      "The driver is accelerating onto the highway.",
      "The car has accelerated smoothly since the tune-up.",
      "The engine has been accelerating poorly lately.",
      "The race car accelerated past all competitors yesterday.",
      "The vehicle was accelerating when the engine stalled.",
      "The car had accelerated before reaching the speed limit.",
      "The engine had been accelerating roughly for weeks.",
      "The new car will accelerate faster than the old one.",
      "The car will be accelerating while merging into traffic.",
      "The vehicle will have accelerated to full speed by then.",
      "The engine will have been accelerating for several seconds before shifting.",
    ],
    brake: [
      "Careful drivers brake gradually at intersections.",
      "The car is braking hard to avoid the obstacle.",
      "The vehicle has braked successfully in time.",
      "The brakes have been braking effectively since replacement.",
      "The driver braked suddenly when the child appeared yesterday.",
      "The car was braking when the ABS system activated.",
      "The vehicle had braked before hitting the barrier.",
      "The brakes had been braking poorly for months before failure.",
      "The car will brake automatically in emergency situations.",
      "The vehicle will be braking while approaching the toll booth.",
      "The car will have braked by the time you see the stop sign.",
      "The brakes will have been braking continuously during the mountain descent.",
    ],
    reverse: [
      "Drivers reverse their cars out of parking spaces.",
      "She is reversing into the tight parking spot.",
      "The car has reversed successfully into the garage.",
      "The backup camera has been reversing assistance since installation.",
      "He reversed carefully in the crowded parking lot yesterday.",
      "The car was reversing when the sensor beeped.",
      "The vehicle had reversed before the other car arrived.",
      "We had been reversing for several minutes before getting it right.",
      "The car will reverse automatically with the new system.",
      "The vehicle will be reversing while the spotter guides.",
      "The car will have reversed by the time you open the garage door.",
      "The driver will have been reversing for several attempts before succeeding.",
    ],
  },
  restaurant: {
    eat: [
      "Customers eat delicious meals at this restaurant daily.",
      "The family is eating dinner at their favorite table.",
      "We have eaten here many times before.",
      "They have been eating at this place since it opened.",
      "The couple ate a romantic dinner here yesterday.",
      "The children were eating when the surprise arrived.",
      "They had eaten before the kitchen closed.",
      "We had been eating for an hour before dessert arrived.",
      "The group will eat lunch here tomorrow.",
      "They will be eating while the band performs.",
      "We will have eaten by the time the show starts.",
      "The customers will have been eating for hours during the celebration.",
    ],
    order: [
      "Customers order from the menu every day.",
      "The waiter is taking their order right now.",
      "We have ordered the chef's special tonight.",
      "They have been ordering the same dish since last year.",
      "The businessman ordered a quick lunch yesterday.",
      "The family was ordering when the power went out.",
      "They had ordered before realizing they forgot their wallet.",
      "We had been ordering for 10 minutes before the waiter arrived.",
      "The couple will order wine with their meal.",
      "They will be ordering while we find a table.",
      "We will have ordered by the time you arrive.",
      "The customers will have been ordering continuously during the busy evening.",
    ],
    serve: [
      "Waiters serve customers with professional courtesy.",
      "The staff is serving the evening rush right now.",
      "This restaurant has served the community for decades.",
      "The waiters have been serving since the morning shift.",
      "The server served our table efficiently yesterday.",
      "The waiter was serving when he dropped the tray.",
      "They had served all customers before closing time.",
      "The staff had been serving for 12 hours before their break.",
      "The new waiter will serve your table tonight.",
      "They will be serving while the kitchen prepares fresh dishes.",
      "The restaurant will have served 500 customers by midnight.",
      "The staff will have been serving for 14 hours before closing.",
    ],
    cook: [
      "Professional chefs cook gourmet meals every day.",
      "The chef is cooking your order in the kitchen.",
      "We have cooked this recipe perfectly tonight.",
      "The kitchen has been cooking since 5 AM preparation.",
      "The cook prepared a special dish yesterday.",
      "The chef was cooking when the fire alarm sounded.",
      "They had cooked everything before the inspection arrived.",
      "The kitchen had been cooking for hours before the first customer.",
      "The chef will cook a demonstration meal tomorrow.",
      "They will be cooking while guests tour the kitchen.",
      "The kitchen will have cooked 200 meals by evening.",
      "The chefs will have been cooking for 16 hours before closing.",
    ],
    pay: [
      "Customers pay their bills before leaving the restaurant.",
      "The couple is paying with their credit card.",
      "We have paid for our meal and tip.",
      "They have been paying with cash since the card reader broke.",
      "The businessman paid quickly and left yesterday.",
      "The family was paying when they realized they forgot dessert.",
      "They had paid before noticing the mistake on the bill.",
      "We had been paying separately before deciding to split evenly.",
      "The customers will pay at the counter tomorrow.",
      "They will be paying while we get the car.",
      "We will have paid by the time the valet brings the car.",
      "The customers will have been paying gradually throughout the evening.",
    ],
    reserve: [
      "Customers reserve tables for special occasions regularly.",
      "She is reserving a table for Saturday night.",
      "We have reserved the private dining room.",
      "They have been reserving the same table since their anniversary.",
      "The couple reserved a romantic corner table yesterday.",
      "The host was reserving when the phone system crashed.",
      "They had reserved before the restaurant became fully booked.",
      "We had been reserving tables for the wedding party all week.",
      "The family will reserve a large table for the reunion.",
      "They will be reserving while we confirm the guest count.",
      "We will have reserved by the time invitations go out.",
      "The restaurant will have been reserving tables for the holiday season.",
    ],
    taste: [
      "Food critics taste dishes to write reviews.",
      "The chef is tasting the sauce for seasoning.",
      "We have tasted every item on the menu.",
      "The sommelier has been tasting wines since morning.",
      "The customer tasted the wine before approving yesterday.",
      "The judge was tasting when she discovered the winning flavor.",
      "They had tasted all appetizers before making their choice.",
      "We had been tasting samples for an hour before deciding.",
      "The food blogger will taste the new menu tomorrow.",
      "They will be tasting while the chef explains each dish.",
      "We will have tasted everything by the end of the evening.",
      "The panel will have been tasting for hours before announcing winners.",
    ],
    recommend: [
      "Servers recommend popular dishes to new customers.",
      "The waiter is recommending the daily special.",
      "We have recommended this restaurant to all our friends.",
      "The staff has been recommending the seafood since it arrived fresh.",
      "The sommelier recommended an excellent wine pairing yesterday.",
      "The server was recommending dessert when we were already full.",
      "They had recommended the chef's special before it sold out.",
      "We had been recommending this place for years before it got famous.",
      "The food critic will recommend this restaurant in her review.",
      "They will be recommending while we browse the menu.",
      "We will have recommended this place to everyone by next week.",
      "The staff will have been recommending the seasonal menu all month.",
    ],
    deliver: [
      "The restaurant delivers food to nearby neighborhoods.",
      "The driver is delivering our order right now.",
      "They have delivered to our office many times.",
      "The service has been delivering since the pandemic started.",
      "The delivery person delivered our lunch quickly yesterday.",
      "The driver was delivering when the GPS stopped working.",
      "They had delivered before the customer called to complain.",
      "The service had been delivering for hours during the storm.",
      "The restaurant will deliver until 11 PM tonight.",
      "They will be delivering while we set up for the meeting.",
      "The food will have delivered by the time guests arrive.",
      "The service will have been delivering for 12 hours straight today.",
    ],
    enjoy: [
      "Diners enjoy memorable meals at fine restaurants.",
      "The couple is enjoying their anniversary dinner.",
      "We have enjoyed every visit to this establishment.",
      "They have been enjoying the live music since it started.",
      "The family enjoyed a wonderful celebration yesterday.",
      "The guests were enjoying dessert when the surprise began.",
      "They had enjoyed the meal before the bill arrived.",
      "We had been enjoying the evening for hours before realizing the time.",
      "The visitors will enjoy the chef's tasting menu.",
      "They will be enjoying while we take photos.",
      "We will have enjoyed ourselves by the end of the evening.",
      "The diners will have been enjoying the experience for hours.",
    ],
  },
  school: {
    study: [
      "Students study various subjects every day at school.",
      "She is studying for her final exams right now.",
      "We have studied this topic extensively this semester.",
      "They have been studying since early morning.",
      "The class studied Shakespeare's plays yesterday.",
      "The student was studying when the fire drill occurred.",
      "They had studied before the surprise quiz was announced.",
      "We had been studying for hours before taking a break.",
      "The students will study abroad next year.",
      "They will be studying while we prepare the classroom.",
      "We will have studied all chapters by the exam date.",
      "The class will have been studying for months before graduation.",
    ],
    teach: [
      "Experienced teachers teach students with passion daily.",
      "The professor is teaching advanced mathematics today.",
      "She has taught at this school for fifteen years.",
      "The faculty has been teaching online since the pandemic.",
      "The substitute teacher taught our class yesterday.",
      "The instructor was teaching when the principal visited.",
      "They had taught this curriculum before the changes were made.",
      "She had been teaching for decades before retiring.",
      "The new teacher will teach science next semester.",
      "They will be teaching while students take notes.",
      "She will have taught thousands of students by retirement.",
      "The professor will have been teaching for 30 years next month.",
    ],
    learn: [
      "Children learn new concepts every day in school.",
      "The students are learning about ancient civilizations.",
      "We have learned so much in this class.",
      "They have been learning French since elementary school.",
      "The class learned about photosynthesis yesterday.",
      "The student was learning when the concept suddenly clicked.",
      "They had learned the basics before advancing to complex topics.",
      "We had been learning gradually before everything made sense.",
      "The students will learn programming next year.",
      "They will be learning while the teacher demonstrates.",
      "We will have learned everything by the final exam.",
      "The class will have been learning for four years before graduating.",
    ],
    write: [
      "Students write essays and reports regularly in English class.",
      "She is writing her research paper right now.",
      "We have written three assignments this week.",
      "They have been writing their thesis since last semester.",
      "The student wrote an excellent story yesterday.",
      "The class was writing when the bell rang.",
      "They had written their rough drafts before peer review.",
      "We had been writing for two hours before finishing.",
      "The students will write their final papers next month.",
      "They will be writing while we grade other assignments.",
      "We will have written all required essays by semester end.",
      "The class will have been writing continuously throughout the course.",
    ],
    read: [
      "Students read books and articles for their assignments.",
      "The class is reading 'To Kill a Mockingbird' currently.",
      "We have read five novels this semester.",
      "They have been reading since the library opened.",
      "The student read the entire book yesterday.",
      "The class was reading when the author visited.",
      "They had read the assignment before class discussion.",
      "We had been reading for hours before understanding the theme.",
      "The students will read poetry next unit.",
      "They will be reading while we prepare discussion questions.",
      "We will have read all required books by graduation.",
      "The class will have been reading classic literature all year.",
    ],
    graduate: [
      "Students graduate from high school every June.",
      "She is graduating with honors this spring.",
      "We have graduated from the program successfully.",
      "They have been graduating students since 1950.",
      "The class graduated during a beautiful ceremony yesterday.",
      "The student was graduating when her family arrived.",
      "They had graduated before the celebration began.",
      "We had been graduating students for hours before the ceremony ended.",
      "The seniors will graduate next month.",
      "They will be graduating while families watch proudly.",
      "We will have graduated by the time summer begins.",
      "The school will have been graduating students for 100 years.",
    ],
    attend: [
      "Students attend classes regularly throughout the semester.",
      "She is attending the lecture in the main auditorium.",
      "We have attended every session this year.",
      "They have been attending since the semester started.",
      "The student attended the optional workshop yesterday.",
      "The class was attending when the guest speaker arrived.",
      "They had attended before the policy changed.",
      "We had been attending for weeks before missing our first class.",
      "The students will attend the field trip tomorrow.",
      "They will be attending while we take attendance.",
      "We will have attended all required sessions by finals week.",
      "The students will have been attending for four years before graduating.",
    ],
    examine: [
      "Teachers examine student work carefully for assessment.",
      "The professor is examining the research proposals today.",
      "We have examined all the evidence thoroughly.",
      "The committee has been examining applications since morning.",
      "The instructor examined the test papers yesterday.",
      "The teacher was examining when she found the plagiarism.",
      "They had examined everything before making their decision.",
      "We had been examining for hours before reaching a conclusion.",
      "The board will examine the new curriculum tomorrow.",
      "They will be examining while students wait for results.",
      "We will have examined all submissions by the deadline.",
      "The committee will have been examining for days before announcing results.",
    ],
    practice: [
      "Students practice skills through repetition and exercises.",
      "The band is practicing for the spring concert.",
      "We have practiced this piece many times.",
      "They have been practicing since after school.",
      "The team practiced their presentation yesterday.",
      "The student was practicing when she mastered the technique.",
      "They had practiced before the performance began.",
      "We had been practicing for months before the competition.",
      "The class will practice public speaking next week.",
      "They will be practicing while we set up equipment.",
      "We will have practiced enough by the recital date.",
      "The students will have been practicing for hours before the show.",
    ],
    discuss: [
      "Students discuss topics in small groups regularly.",
      "The class is discussing the novel's themes today.",
      "We have discussed this issue extensively.",
      "They have been discussing since the debate began.",
      "The students discussed current events yesterday.",
      "The group was discussing when they reached consensus.",
      "They had discussed all options before voting.",
      "We had been discussing for an hour before making progress.",
      "The class will discuss the project requirements tomorrow.",
      "They will be discussing while we observe their interaction.",
      "We will have discussed everything by the end of class.",
      "The students will have been discussing for the entire period.",
    ],
  },
  hospital: {
    treat: [
      "Doctors treat patients with various medical conditions daily.",
      "The physician is treating a patient in room 302.",
      "We have treated this condition successfully before.",
      "The medical team has been treating patients since dawn.",
      "The doctor treated the emergency case yesterday.",
      "The nurse was treating when the patient's condition improved.",
      "They had treated similar cases before this outbreak.",
      "The staff had been treating patients for 12 hours straight.",
      "The specialist will treat your condition next week.",
      "They will be treating while we prepare the operating room.",
      "We will have treated all patients by shift change.",
      "The hospital will have been treating patients for 50 years next month.",
    ],
    examine: [
      "Medical professionals examine patients thoroughly during visits.",
      "The doctor is examining the patient's symptoms right now.",
      "We have examined all test results carefully.",
      "The medical team has been examining since morning rounds.",
      "The physician examined the patient thoroughly yesterday.",
      "The doctor was examining when the diagnosis became clear.",
      "They had examined everything before ordering more tests.",
      "We had been examining for an hour before finding the cause.",
      "The specialist will examine you tomorrow morning.",
      "They will be examining while we review your medical history.",
      "We will have examined all possibilities by evening.",
      "The doctors will have been examining patients all day.",
    ],
    heal: [
      "The human body heals naturally with proper care.",
      "The wound is healing nicely after surgery.",
      "The patient has healed completely from the injury.",
      "The broken bone has been healing since the cast was applied.",
      "The cut healed without leaving a scar yesterday.",
      "The patient was healing when complications arose.",
      "The injury had healed before the follow-up appointment.",
      "The tissue had been healing for weeks before full recovery.",
      "The medicine will heal the infection quickly.",
      "The body will be healing while you rest.",
      "The wound will have healed by your next visit.",
      "The patient will have been healing for months before full recovery.",
    ],
    operate: [
      "Surgeons operate on patients to save lives daily.",
      "The surgical team is operating on the emergency case.",
      "We have operated successfully on similar conditions.",
      "The surgeon has been operating since early morning.",
      "The doctor operated for six hours yesterday.",
      "The surgeon was operating when the power briefly failed.",
      "They had operated before the patient's condition worsened.",
      "The team had been operating for hours before taking a break.",
      "The specialist will operate next Tuesday morning.",
      "They will be operating while we monitor vital signs.",
      "We will have operated by the time family arrives.",
      "The surgeon will have been operating for 8 hours before finishing.",
    ],
    diagnose: [
      "Experienced doctors diagnose illnesses accurately.",
      "The physician is diagnosing the patient's condition.",
      "We have diagnosed this rare disease before.",
      "The medical team has been diagnosing since reviewing symptoms.",
      "The doctor diagnosed the problem immediately yesterday.",
      "The specialist was diagnosing when the test results arrived.",
      "They had diagnosed correctly before treatment began.",
      "We had been diagnosing for days before identifying the cause.",
      "The expert will diagnose your condition tomorrow.",
      "They will be diagnosing while we run additional tests.",
      "We will have diagnosed by the time results are complete.",
      "The doctors will have been diagnosing complex cases all week.",
    ],
    recover: [
      "Patients recover from illnesses with proper treatment.",
      "The patient is recovering well after surgery.",
      "She has recovered completely from the accident.",
      "He has been recovering since the operation last month.",
      "The patient recovered faster than expected yesterday.",
      "She was recovering when visitors were finally allowed.",
      "They had recovered before being discharged home.",
      "The patient had been recovering for weeks before walking again.",
      "You will recover fully with physical therapy.",
      "The patient will be recovering while family provides support.",
      "She will have recovered by the time school starts.",
      "The patient will have been recovering for months before returning to work.",
    ],
    visit: [
      "Family members visit patients in the hospital regularly.",
      "The relatives are visiting during afternoon hours.",
      "We have visited every day since the admission.",
      "They have been visiting since visiting hours began.",
      "The children visited their grandmother yesterday.",
      "The family was visiting when the doctor made rounds.",
      "They had visited before the patient was moved.",
      "We had been visiting for hours before being asked to leave.",
      "Friends will visit during the weekend.",
      "They will be visiting while we update medical records.",
      "We will have visited by the time you arrive.",
      "The family will have been visiting for hours before going home.",
    ],
    prescribe: [
      "Doctors prescribe medications to treat various conditions.",
      "The physician is prescribing antibiotics for the infection.",
      "We have prescribed this treatment successfully before.",
      "The doctor has been prescribing since reviewing symptoms.",
      "The specialist prescribed a new medication yesterday.",
      "The doctor was prescribing when the pharmacy called.",
      "They had prescribed before the patient's allergies were known.",
      "We had been prescribing carefully for patients with multiple conditions.",
      "The doctor will prescribe pain medication after surgery.",
      "They will be prescribing while we check insurance coverage.",
      "We will have prescribed by the time you reach the pharmacy.",
      "The physician will have been prescribing for 20 years next month.",
    ],
    nurse: [
      "Professional nurses nurse patients back to health daily.",
      "The RN is nursing the post-operative patient carefully.",
      "We have nursed many patients through difficult recoveries.",
      "The nursing staff has been nursing since the night shift.",
      "The nurse nursed the patient through the crisis yesterday.",
      "She was nursing when the patient's fever finally broke.",
      "They had nursed the patient before the family arrived.",
      "The staff had been nursing for hours before the patient stabilized.",
      "The nurse will nurse you back to full health.",
      "They will be nursing while monitoring your progress.",
      "We will have nursed you back to strength by discharge.",
      "The nurses will have been nursing patients for 12 hours straight.",
    ],
    discharge: [
      "Hospitals discharge patients when they're ready to go home.",
      "The doctor is discharging the patient this afternoon.",
      "We have discharged three patients today already.",
      "The hospital has been discharging since morning rounds.",
      "They discharged the patient with home care instructions yesterday.",
      "The nurse was discharging when the wheelchair arrived.",
      "They had discharged before the insurance approval came through.",
      "We had been discharging patients for hours before the shift ended.",
      "The doctor will discharge you tomorrow morning.",
      "They will be discharging while we prepare your medications.",
      "We will have discharged by the time your ride arrives.",
      "The hospital will have been discharging patients all day.",
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
                          <Badge variant={tense.color as any}>
                            {tense.name.includes("Perfect Continuous")
                              ? "Perfect Continuous"
                              : tense.name.includes("Continuous")
                                ? "Continuous"
                                : tense.name.includes("Perfect")
                                  ? "Perfect"
                                  : "Simple"}
                          </Badge>
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
