import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, Users, Ticket } from "lucide-react";

const temples = [
  {
    id: "somnath",
    name: "Somnath Temple",
    location: "Somnath, Gujarat",
    description: "One of the twelve Jyotirlinga shrines of Shiva",
    image: "/placeholder.svg",
    timings: "4:00 AM - 10:00 PM",
    currentCrowd: "Medium"
  },
  {
    id: "dwarka",
    name: "Dwarka Temple",
    location: "Dwarka, Gujarat",
    description: "Sacred residence of Lord Krishna",
    image: "/placeholder.svg",
    timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    currentCrowd: "High"
  },
  {
    id: "ambaji",
    name: "Ambaji Temple",
    location: "Ambaji, Gujarat",
    description: "Shakti Peetha dedicated to Goddess Amba",
    image: "/placeholder.svg",
    timings: "4:00 AM - 11:00 PM",
    currentCrowd: "Low"
  },
  {
    id: "pavagadh",
    name: "Pavagadh Temple",
    location: "Pavagadh, Gujarat",
    description: "Ancient temple atop Pavagadh Hill",
    image: "/placeholder.svg",
    timings: "6:00 AM - 8:00 PM",
    currentCrowd: "Medium"
  }
];

const getCrowdColor = (crowd: string) => {
  switch (crowd) {
    case "Low": return "text-green-500";
    case "Medium": return "text-yellow-500";
    case "High": return "text-red-500";
    default: return "text-muted-foreground";
  }
};

const TempleSelection = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/user/login">
              <Button variant="ghost" className="mb-4 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">
              <span className="sacred-gradient bg-clip-text text-transparent">Choose Your Temple</span>
            </h1>
            <p className="text-muted-foreground mt-2">Select a temple to book your darshan or aarti</p>
          </div>
          
          <Link to="/user/tickets">
            <Button variant="outline" className="gap-2">
              <Ticket className="h-4 w-4" />
              My Tickets
            </Button>
          </Link>
        </div>

        {/* Temple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {temples.map((temple, index) => (
            <Card 
              key={temple.id} 
              className="group hover:scale-105 divine-transition sacred-shadow cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{temple.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      {temple.location}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4" />
                      <span className={getCrowdColor(temple.currentCrowd)}>
                        {temple.currentCrowd}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{temple.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{temple.timings}</span>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Link to={`/user/booking/${temple.id}?type=darshan`} className="flex-1">
                      <Button className="w-full sacred-gradient">
                        Book Darshan
                      </Button>
                    </Link>
                    <Link to={`/user/booking/${temple.id}?type=aarti`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Book Aarti
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-primary mb-2">4</div>
            <div className="text-muted-foreground">Sacred Temples</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Service Available</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-primary mb-2">Safe</div>
            <div className="text-muted-foreground">Secure Booking</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TempleSelection;