import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, QrCode, Calendar, MapPin, Clock, Users, Download } from "lucide-react";
import { QRCodeSVG as QRCode } from "qrcode.react";

interface Ticket {
  id: string;
  templeId: string;
  templeName: string;
  type: 'darshan' | 'aarti';
  date: string;
  time: string;
  memberName: string;
  status: 'active' | 'used' | 'expired';
  qrCode: string;
  entryTime?: string;
  exitTime?: string;
}

// Mock tickets data
const mockTickets: Ticket[] = [
  {
    id: "TKT001",
    templeId: "somnath",
    templeName: "Somnath Temple",
    type: "darshan",
    date: "2024-01-15",
    time: "10:00 - 12:00",
    memberName: "Main Member",
    status: "active",
    qrCode: "TKT001-SOMNATH-DARSHAN-2024-01-15-10:00"
  },
  {
    id: "TKT002",
    templeId: "somnath",
    templeName: "Somnath Temple",
    type: "darshan",
    date: "2024-01-15",
    time: "10:00 - 12:00",
    memberName: "Family Member 1",
    status: "active",
    qrCode: "TKT002-SOMNATH-DARSHAN-2024-01-15-10:00"
  },
  {
    id: "TKT003",
    templeId: "dwarka",
    templeName: "Dwarka Temple",
    type: "aarti",
    date: "2024-01-14",
    time: "18:30 - 19:30",
    memberName: "Main Member",
    status: "used",
    qrCode: "TKT003-DWARKA-AARTI-2024-01-14-18:30",
    entryTime: "18:25",
    exitTime: "19:35"
  }
];

const MyTickets = () => {
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'used': return 'secondary';
      case 'expired': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'used': return 'Used';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  };

  const downloadQR = (ticket: Ticket) => {
    const canvas = document.getElementById(`qr-${ticket.id}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = url;
      a.download = `${ticket.templeName}-${ticket.type}-${ticket.id}.png`;
      a.click();
    }
  };

  const activeTickets = tickets.filter(t => t.status === 'active');
  const usedTickets = tickets.filter(t => t.status === 'used');

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
            <span className="sacred-gradient bg-clip-text text-transparent">My Tickets</span>
          </h1>
          <p className="text-muted-foreground mt-2">Manage your temple visit tickets and QR codes</p>
        </div>

        {/* Active Tickets */}
        {activeTickets.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Active Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTickets.map((ticket) => (
                <Card key={ticket.id} className="sacred-shadow hover:scale-105 divine-transition">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{ticket.templeName}</CardTitle>
                        <CardDescription className="capitalize">
                          {ticket.type} • {ticket.memberName}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusColor(ticket.status)}>
                        {getStatusText(ticket.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(ticket.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{ticket.time}</span>
                      </div>
                    </div>
                    
                    {/* QR Code */}
                    <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                      <QRCode
                        id={`qr-${ticket.id}`}
                        value={ticket.qrCode}
                        size={120}
                        level="M"
                        includeMargin={true}
                      />
                      <p className="text-xs text-gray-600 mt-2 text-center">
                        Ticket ID: {ticket.id}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadQR(ticket)}
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                        className="flex-1"
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                        {selectedTicket === ticket.id ? 'Hide' : 'Show'} QR
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Used Tickets */}
        {usedTickets.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-muted-foreground">Recent Visits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usedTickets.map((ticket) => (
                <Card key={ticket.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{ticket.templeName}</CardTitle>
                        <CardDescription className="capitalize">
                          {ticket.type} • {ticket.memberName}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusColor(ticket.status)}>
                        {getStatusText(ticket.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(ticket.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{ticket.time}</span>
                      </div>
                      {ticket.entryTime && ticket.exitTime && (
                        <div className="text-xs text-muted-foreground">
                          Entry: {ticket.entryTime} • Exit: {ticket.exitTime}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {tickets.length === 0 && (
          <div className="text-center py-16">
            <QrCode className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Tickets Found</h3>
            <p className="text-muted-foreground mb-6">
              You haven't booked any temple visits yet. Start your spiritual journey now!
            </p>
            <Link to="/user/temples">
              <Button className="sacred-gradient">
                <Users className="mr-2 h-4 w-4" />
                Book Your First Visit
              </Button>
            </Link>
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-12 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">How to Use Your QR Tickets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
                1
              </div>
              <div>
                <strong>Entry Scan:</strong> Show your QR code at the temple entrance. The code will be scanned to mark your entry.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
                2
              </div>
              <div>
                <strong>Exit Scan:</strong> Scan your QR code again while leaving. This will mark your exit and complete the visit.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
                3
              </div>
              <div>
                <strong>Ticket Removal:</strong> After exit scan, the ticket will be moved to "Recent Visits" and cannot be used again.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyTickets;