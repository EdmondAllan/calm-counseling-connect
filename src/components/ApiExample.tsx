import React from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
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
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">API Integration Example</h3>
          <p className="text-sm text-muted-foreground">Please log in to see the API integration in action</p>
        </div>
        <div className="p-6 pt-0">
          <p className="text-muted-foreground">
            This component demonstrates how the frontend connects to the backend API.
            Log in to see real data from the database.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">API Integration Example</h3>
          <p className="text-sm text-muted-foreground">
            Welcome, {user?.name}! This demonstrates the frontend-backend connection.
          </p>
        </div>
        <div className="p-6 pt-0 space-y-4">
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
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-1">
                      ${service.price}
                    </span>
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
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-accent hover:text-accent-foreground mt-1">
                      {counselor.experience} years exp.
                    </span>
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
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          appointment.status === 'confirmed' ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80' :
                          appointment.status === 'pending' ? 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80' :
                          appointment.status === 'cancelled' ? 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80' : 'border-transparent hover:bg-accent hover:text-accent-foreground'
                        }`}>
                          {appointment.status}
                        </span>
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
        </div>
      </div>
    </div>
  );
};

export default ApiExample; 