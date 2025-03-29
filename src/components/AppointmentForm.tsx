
import { useAppointmentForm } from "@/hooks/useAppointmentForm";
import ContactInfo from "./appointment/ContactInfo";
import PropertyDetails from "./appointment/PropertyDetails";
import DateTimeSelector from "./appointment/DateTimeSelector";
import FormActions from "./appointment/FormActions";

const AppointmentForm = ({ onClose }: { onClose: () => void }) => {
  const {
    formData,
    date,
    setDate,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  } = useAppointmentForm(onClose);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#4175FC] mb-6">Schedule an Appointment</h2>
      <p className="mb-6 text-gray-600">Fill out the form below to schedule a viewing or consultation with our team.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <ContactInfo
            name={formData.name}
            email={formData.email}
            phone={formData.phone}
            handleChange={handleChange}
          />

          <PropertyDetails
            propertyInterest={formData.propertyInterest}
            message={formData.message}
            handleChange={handleChange}
          />

          <DateTimeSelector
            date={date}
            setDate={setDate}
            timeSlot={formData.timeSlot}
            onTimeSlotChange={(value) => handleSelectChange("timeSlot", value)}
          />

          <FormActions onClose={onClose} isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
