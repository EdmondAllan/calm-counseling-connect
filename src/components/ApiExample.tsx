import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  useGetServicesQuery, 
  useGetCounselorsQuery, 
  useGetUserAppointmentsQuery,
  useCreateAppointmentMutation 
} from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const ApiExample = () => {
  const { isAuthenticated, user } = useAuth();
  
  // API hooks
  const { data: services, isLoading: servicesLoading, error: servicesError } = useGetServicesQuery(undefined);
  const { data: counselors, isLoading: counselorsLoading, error: counselorsError } = useGetCounselorsQuery(undefined);
  const { data: appointments, isLoading: appointmentsLoading } = useGetUserAppointmentsQuery(undefined, {
    skip: !isAuthenticated
  });
  const [createAppointment, { isLoading: creatingAppointment }] = useCreateAppointmentMutation();

  const handleBookAppointment = async () => {
    if (!services?.length || !counselors?.length) {
      toast.error('No services or counselors available');
      return;
    }

    try {
      const appointmentData = {
        counselorId: counselors[0]._id,
        serviceId: services[0]._id,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        time: '10:00',
        notes: 'Example appointment booking'
      };

      await createAppointment(appointmentData).unwrap();
      toast.success('Appointment booked successfully!');
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to book appointment');
    }
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Integration Example</CardTitle>
          <CardDescription>Please log in to see the API integration in action</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This component demonstrates how the frontend connects to the backend API.
            Log in to see real data from the database.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Integration Example</CardTitle>
          <CardDescription>
            Welcome, {user?.name}! This demonstrates the frontend-backend connection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Available Services</h3>
            {servicesLoading ? (
              <p>Loading services...</p>
            ) : servicesError ? (
              <p className="text-red-500">Error loading services: {JSON.stringify(servicesError)}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {services?.map((service) => (
                  <div key={service._id} className="p-3 border rounded-lg">
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <Badge variant="secondary" className="mt-1">
                      ${service.price}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Counselors Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Available Counselors</h3>
            {counselorsLoading ? (
              <p>Loading counselors...</p>
            ) : counselorsError ? (
              <p className="text-red-500">Error loading counselors: {JSON.stringify(counselorsError)}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {counselors?.map((counselor) => (
                  <div key={counselor._id} className="p-3 border rounded-lg">
                    <h4 className="font-medium">{counselor.name}</h4>
                    <p className="text-sm text-muted-foreground">{counselor.specialization}</p>
                    <Badge variant="outline" className="mt-1">
                      {counselor.experience} years exp.
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appointments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Appointments</h3>
            {appointmentsLoading ? (
              <p>Loading appointments...</p>
            ) : (
              <div className="space-y-2">
                {appointments?.length ? (
                  appointments.map((appointment) => (
                    <div key={appointment._id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {typeof appointment.service === 'string' 
                              ? 'Service' 
                              : appointment.service.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <Badge variant={
                          appointment.status === 'confirmed' ? 'default' :
                          appointment.status === 'pending' ? 'secondary' :
                          appointment.status === 'cancelled' ? 'destructive' : 'outline'
                        }>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No appointments found</p>
                )}
              </div>
            )}
          </div>

          {/* Book Appointment Button */}
          <div className="pt-4">
            <Button 
              onClick={handleBookAppointment} 
              disabled={creatingAppointment || !services?.length || !counselors?.length}
              className="w-full"
            >
              {creatingAppointment ? 'Booking...' : 'Book Example Appointment'}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              This will create a test appointment for 7 days from now
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiExample; 