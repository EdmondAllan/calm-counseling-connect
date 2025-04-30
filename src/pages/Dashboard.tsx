
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { toast } from "sonner";

const upcomingAppointments = [
  {
    id: "1",
    date: new Date("2025-05-10T10:00:00"),
    type: "Stress Management",
    mode: "Online",
    status: "Confirmed",
  },
  {
    id: "2",
    date: new Date("2025-05-15T14:00:00"),
    type: "Relationship Enrichment",
    mode: "In-Person",
    status: "Confirmed",
  },
];

const pastAppointments = [
  {
    id: "3",
    date: new Date("2025-04-20T11:00:00"),
    type: "Stress Management",
    mode: "Online",
    status: "Completed",
  },
  {
    id: "4",
    date: new Date("2025-04-15T14:00:00"),
    type: "Parental Guidance",
    mode: "In-Person",
    status: "Completed",
  },
  {
    id: "5",
    date: new Date("2025-04-05T09:00:00"),
    type: "Self-Esteem and Confidence",
    mode: "Online",
    status: "Completed",
  },
];

const Dashboard = () => {
  const [upcomingSessions, setUpcomingSessions] = useState(upcomingAppointments);
  const [pastSessions, setPastSessions] = useState(pastAppointments);
  
  const handleCancelSession = (sessionId: string) => {
    toast.info("This is a demo cancellation. In a real application, your session would be cancelled.");
    setUpcomingSessions(upcomingSessions.filter(session => session.id !== sessionId));
  };

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Dashboard</h1>
            <p className="text-gray-600">Manage your counseling sessions and profile</p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-intell-blue hover:bg-blue-700">
            <a href="/booking">Book New Session</a>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-intell-blue">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-intell-lightpurple flex items-center justify-center text-intell-purple text-2xl font-bold mx-auto mb-2">
                    JD
                  </div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-gray-500">Member since April 2025</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">john.doe@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-medium">+91 9876543210</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Session Management */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="upcoming" className="flex-1">Upcoming Sessions</TabsTrigger>
                <TabsTrigger value="past" className="flex-1">Past Sessions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <Card key={session.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="mb-4 md:mb-0">
                              <p className="text-lg font-medium text-intell-blue">{session.type}</p>
                              <p className="text-gray-600">{format(session.date, "EEEE, MMMM d, yyyy")}</p>
                              <p className="text-gray-600">{format(session.date, "h:mm a")} • {session.mode}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              {session.mode === "Online" && (
                                <Button variant="outline" className="sm:w-auto">
                                  Join Session
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                className="text-red-500 border-red-200 hover:bg-red-50 sm:w-auto"
                                onClick={() => handleCancelSession(session.id)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-gray-500 mb-4">You don't have any upcoming sessions.</p>
                      <Button asChild className="bg-intell-blue hover:bg-blue-700">
                        <a href="/booking">Book a Session</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                <div className="space-y-4">
                  {pastSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <p className="text-lg font-medium text-gray-700">{session.type}</p>
                            <p className="text-gray-600">{format(session.date, "EEEE, MMMM d, yyyy")}</p>
                            <p className="text-gray-600">{format(session.date, "h:mm a")} • {session.mode}</p>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
