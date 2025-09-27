import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, Users, Plus, Trash2, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const temples = {
  somnath: "Somnath Temple",
  dwarka: "Dwarka Temple",
  ambaji: "Ambaji Temple",
  pavagadh: "Pavagadh Temple"
};

const generateTimeSlots = (type: string) => {
  const slots = [];
  const today = new Date();
  
  for (let day = 0; day < 3; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    const dateStr = date.toISOString().split('T')[0];
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    if (type === 'darshan') {
      // Darshan slots every 2 hours from 6 AM to 8 PM
      for (let hour = 6; hour <= 18; hour += 2) {
        const endHour = hour + 2;
        slots.push({
          id: `${dateStr}-${hour}`,
          date: dateStr,
          day: dayName,
          time: `${hour.toString().padStart(2, '0')}:00 - ${endHour.toString().padStart(2, '0')}:00`,
          available: Math.floor(Math.random() * 50) + 10,
          total: 60
        });
      }
    } else {
      // Aarti slots - fixed timings
      slots.push(
        {
          id: `${dateStr}-morning`,
          date: dateStr,
          day: dayName,
          time: "05:00 - 06:00 (Morning Aarti)",
          available: Math.floor(Math.random() * 30) + 10,
          total: 40
        },
        {
          id: `${dateStr}-evening`,
          date: dateStr,
          day: dayName,
          time: "18:30 - 19:30 (Evening Aarti)",
          available: Math.floor(Math.random() * 30) + 10,
          total: 40
        }
      );
    }
  }
  
  return slots;
};

interface FamilyMember {
  id: string;
  name: string;
  age: string;
}

const BookingPage = () => {
  const { templeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const bookingType = searchParams.get('type') || 'darshan';
  const templeName = temples[templeId as keyof typeof temples] || 'Unknown Temple';
  
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  
  const timeSlots = generateTimeSlots(bookingType);

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: '',
      age: ''
    };
    setFamilyMembers([...familyMembers, newMember]);
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const updateFamilyMember = (id: string, field: keyof FamilyMember, value: string) => {
    setFamilyMembers(familyMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handleBooking = () => {
    if (!selectedSlot) {
      toast({
        title: "Please select a time slot",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      toast({
        title: "Booking Successful!",
        description: `Your ${bookingType} booking has been confirmed. QR codes generated for all members.`,
      });
      navigate("/user/tickets");
    }, 2000);
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 60) return "text-green-500";
    if (percentage > 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/user/temples">
            <Button variant="ghost" className="mb-4 group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Temples
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">
            <span className="sacred-gradient bg-clip-text text-transparent">
              Book {bookingType === 'darshan' ? 'Darshan' : 'Aarti'}
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">{templeName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Time Slots */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Available Time Slots
                </CardTitle>
                <CardDescription>
                  Select your preferred {bookingType} time slot for the next 3 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(
                    timeSlots.reduce((acc: Record<string, any[]>, slot) => {
                      if (!acc[slot.date]) acc[slot.date] = [];
                      acc[slot.date].push(slot);
                      return acc;
                    }, {} as Record<string, any[]>)
                  ).map(([date, daySlots]: [string, any[]]) => (
                    <div key={date}>
                      <h3 className="font-semibold mb-3 text-primary">
                        {daySlots[0].day} - {new Date(date).toLocaleDateString()}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {daySlots.map((slot: any) => (
                          <Card
                            key={slot.id}
                            className={`cursor-pointer transition-all hover:scale-105 ${
                              selectedSlot === slot.id
                                ? 'ring-2 ring-primary sacred-gradient text-primary-foreground'
                                : 'hover:border-primary/50'
                            }`}
                            onClick={() => setSelectedSlot(slot.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{slot.time}</div>
                                  <div className={`text-sm ${getAvailabilityColor(slot.available, slot.total)}`}>
                                    {slot.available}/{slot.total} available
                                  </div>
                                </div>
                                <Badge 
                                  variant={slot.available > 20 ? "default" : slot.available > 10 ? "secondary" : "destructive"}
                                >
                                  {slot.available > 20 ? "Available" : slot.available > 10 ? "Limited" : "Few Left"}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary & Family Members */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Temple</Label>
                  <div className="font-medium">{templeName}</div>
                </div>
                <div>
                  <Label>Type</Label>
                  <div className="font-medium capitalize">{bookingType}</div>
                </div>
                {selectedSlot && (
                  <div>
                    <Label>Selected Slot</Label>
                    <div className="font-medium">
                      {timeSlots.find(s => s.id === selectedSlot)?.time}
                    </div>
                  </div>
                )}
                <div>
                  <Label>Total Members</Label>
                  <div className="font-medium">{1 + familyMembers.length}</div>
                </div>
              </CardContent>
            </Card>

            {/* Family Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Family Members
                </CardTitle>
                <CardDescription>
                  Add family members to generate individual QR codes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Main Member: You (QR code will be generated)
                </div>
                
                {familyMembers.map((member) => (
                  <div key={member.id} className="space-y-2 p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Family Member</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFamilyMember(member.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Full Name"
                      value={member.name}
                      onChange={(e) => updateFamilyMember(member.id, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Age"
                      type="number"
                      value={member.age}
                      onChange={(e) => updateFamilyMember(member.id, 'age', e.target.value)}
                    />
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  onClick={addFamilyMember}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Family Member
                </Button>
                
                <Button
                  onClick={handleBooking}
                  disabled={!selectedSlot || isBooking}
                  className="w-full sacred-gradient"
                >
                  {isBooking ? (
                    "Processing..."
                  ) : (
                    <>
                      <QrCode className="mr-2 h-4 w-4" />
                      Book & Generate QR Codes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;