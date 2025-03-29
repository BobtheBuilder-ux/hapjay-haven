
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
}

const FormActions = ({ onClose, isSubmitting }: FormActionsProps) => {
  return (
    <div className="flex gap-3 pt-3">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onClose}
        className="flex-1"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="flex-1 bg-[#4175FC] hover:bg-[#4175FC]/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Schedule Appointment"}
      </Button>
    </div>
  );
};

export default FormActions;
