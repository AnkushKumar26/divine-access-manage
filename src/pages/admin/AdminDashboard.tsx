import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Shield, 
  Users, 
  AlertTriangle, 
  Camera, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Clock,
  MapPin,
  Eye,
  Bell
} from "lucide-react";

const AdminDashboard = () => {
  const [emergencyMode, setEmergencyMode] = useState(false);

  const templeStats = [
    {
      id: "somnath",
      name: "Somnath Temple",
      currentCount: 245,
      capacity: 300,
      status: "normal",
      entryCount: 1245,
      exitCount: 1000,
      zones: [
        { name: "Main Hall", density: 85, status: "high" },
        { name: "Prayer Area", density: 60, status: "medium" },
        { name: "Courtyard", density: 30, status: "low" }
      ]
    },
    {
      id: "dwarka",
      name: "Dwarka Temple",
      currentCount: 180,
      capacity: 250,
      status: "normal",
      entryCount: 890,
      exitCount: 710,
      zones: [
        { name: "Sanctum", density: 90, status: "high" },
        { name: "Assembly Hall", density: 45, status: "medium" },
        { name: "Entrance", density: 25, status: "low" }
      ]
    },
    {
      id: "ambaji",
      name: "Ambaji Temple",
      currentCount: 320,
      capacity: 400,
      status: "crowded",
      entryCount: 1567,
      exitCount: 1247,
      zones: [
        { name: "Main Temple", density: 95, status: "critical" },
        { name: "Waiting Area", density: 70, status: "high" },
        { name: "Gardens", density: 40, status: "medium" }
      ]
    },
    {
      id: "pavagadh",
      name: "Pavagadh Temple",
      currentCount: 95,
      capacity: 200,
      status: "normal",
      entryCount: 445,
      exitCount: 350,
      zones: [
        { name: "Temple Top", density: 55, status: "medium" },
        { name: "Viewing Deck", density: 35, status: "low" },
        { name: "Base Area", density: 20, status: "low" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-green-500";
      case "crowded": return "text-yellow-500";
      case "critical": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal": return "default";
      case "crowded": return "secondary";
      case "critical": return "destructive";
      default: return "secondary";
    }
  };

  const getDensityColor = (status: string) => {
    switch (status) {
      case "low": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "high": return "bg-orange-500";
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const triggerEmergency = () => {
    setEmergencyMode(!emergencyMode);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/admin/login">
              <Button variant="ghost" className="mb-4 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Logout
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">
              <span className="text-destructive">Admin Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-2">Temple Crowd Management & Security Overview</p>
          </div>
          
          <div className="flex gap-4">
            <Button
              variant={emergencyMode ? "destructive" : "outline"}
              onClick={triggerEmergency}
              className="gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              {emergencyMode ? "Emergency Active" : "Emergency Protocol"}
            </Button>
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Alerts (3)
            </Button>
          </div>
        </div>

        {/* Emergency Banner */}
        {emergencyMode && (
          <Card className="mb-8 border-destructive bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <div>
                  <h3 className="text-lg font-semibold text-destructive">Emergency Protocol Active</h3>
                  <p className="text-muted-foreground">All temples have been notified. Emergency procedures are in effect.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">840</div>
                  <div className="text-sm text-muted-foreground">Total Visitors</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/20">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">4,147</div>
                  <div className="text-sm text-muted-foreground">Today's Entries</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <TrendingDown className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3,307</div>
                  <div className="text-sm text-muted-foreground">Today's Exits</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/20">
                  <Shield className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Good</div>
                  <div className="text-sm text-muted-foreground">Security Status</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Temple Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {templeStats.map((temple) => (
            <Card key={temple.id} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {temple.name}
                    </CardTitle>
                    <CardDescription>
                      Live monitoring and crowd analytics
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusBadge(temple.status)}>
                    {temple.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* CCTV Feed Placeholder */}
                <div className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-500" />
                  </div>
                  <div className="absolute top-2 left-2 flex items-center gap-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {new Date().toLocaleTimeString()}
                  </div>
                  <div className="absolute bottom-2 left-2 text-white text-sm">
                    Camera 01 - Main View
                  </div>
                </div>

                {/* Crowd Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Occupancy</span>
                      <span className={getStatusColor(temple.status)}>
                        {temple.currentCount}/{temple.capacity}
                      </span>
                    </div>
                    <Progress 
                      value={(temple.currentCount / temple.capacity) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Today's Flow</span>
                    </div>
                    <div className="flex gap-4 text-xs">
                      <span className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-3 w-3" />
                        {temple.entryCount} in
                      </span>
                      <span className="flex items-center gap-1 text-blue-500">
                        <TrendingDown className="h-3 w-3" />
                        {temple.exitCount} out
                      </span>
                    </div>
                  </div>
                </div>

                {/* Zone Density */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Zone Density
                  </h4>
                  <div className="space-y-2">
                    {temple.zones.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getDensityColor(zone.status)}`} />
                          <span className="text-sm">{zone.name}</span>
                        </div>
                        <span className="text-sm font-medium">{zone.density}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Camera className="h-4 w-4 mr-2" />
                    All Cameras
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Status & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">QR Scanner Network</span>
                  <Badge variant="default">Online</Badge>
                </div>
                <Progress value={98} className="h-2" />
                <div className="text-xs text-muted-foreground">16/16 scanners active</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">CCTV System</span>
                  <Badge variant="default">Operational</Badge>
                </div>
                <Progress value={95} className="h-2" />
                <div className="text-xs text-muted-foreground">23/24 cameras online</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Network Connectivity</span>
                  <Badge variant="default">Stable</Badge>
                </div>
                <Progress value={100} className="h-2" />
                <div className="text-xs text-muted-foreground">All systems connected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;