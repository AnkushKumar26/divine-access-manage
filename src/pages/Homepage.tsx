import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users } from "lucide-react";
import heroImage from "@/assets/somnath-temple-hero.jpg";

const Homepage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-glow">
            <span className="sacred-gradient bg-clip-text text-transparent">
              Divine Temple
            </span>
            <br />
            <span className="text-foreground">Management</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience seamless darshan and spiritual journeys with our intelligent crowd management system
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/user/login">
              <Button
                size="lg"
                className="group w-full sm:w-auto min-w-[240px] h-14 text-lg font-semibold sacred-gradient hover:scale-105 divine-transition sacred-shadow"
              >
                <Users className="mr-3 h-6 w-6" />
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/admin/login">
              <Button
                variant="outline"
                size="lg"
                className="group w-full sm:w-auto min-w-[240px] h-14 text-lg font-semibold border-primary/50 bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:scale-105 divine-transition"
              >
                <Shield className="mr-3 h-6 w-6" />
                Admin Portal
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:scale-105 divine-transition">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full sacred-gradient flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Booking</h3>
              <p className="text-muted-foreground text-sm">Book darshan and aarti slots with QR code tickets</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:scale-105 divine-transition" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full sacred-gradient flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Crowd Control</h3>
              <p className="text-muted-foreground text-sm">Real-time monitoring and crowd density management</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:scale-105 divine-transition" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full sacred-gradient flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Access</h3>
              <p className="text-muted-foreground text-sm">Seamless entry and exit with digital verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;