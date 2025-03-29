
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  timeSlot: string;
  onTimeSlotChange: (value: string) => void;
}

const DateTimeSelector = ({ 
  date, 
  setDate,
  timeSlot,
  onTimeSlotChange
}: DateTimeSelectorProps) => {
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">Preferred Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => {
                // Disable past dates and weekends
                return (
                  date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                  date.getDay() === 0 ||
                  date.getDay() === 6
                );
              }}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Preferred Time</label>
        <Select value={timeSlot} onValueChange={(value) => onTimeSlotChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a time slot" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem key={time} value={time}>{time}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default DateTimeSelector;
