
import React from 'react';
import { Meeting } from '../types/Meeting';

interface CalendarGridProps {
  currentDate: Date;
  meetings: Meeting[];
  onDateClick: (date: Date) => void;
  onMeetingClick: (meeting: Meeting) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  meetings,
  onDateClick,
  onMeetingClick,
}) => {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMeetingsForDate = (date: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      return meetingDate.toDateString() === targetDate.toDateString();
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'microsoft':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'zoom':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="bg-white">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map(day => (
          <div key={day} className="p-4 text-sm font-medium text-gray-700 text-center bg-gray-50">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[120px] border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
              day ? 'bg-white' : 'bg-gray-50'
            }`}
            onClick={() => day && onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          >
            {day && (
              <>
                <div className="font-medium text-gray-900 mb-1">{day}</div>
                <div className="space-y-1">
                  {getMeetingsForDate(day).slice(0, 3).map((meeting, meetingIndex) => (
                    <div
                      key={meetingIndex}
                      className={`text-xs p-1 rounded border cursor-pointer hover:shadow-sm transition-shadow ${getPlatformColor(meeting.platform)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMeetingClick(meeting);
                      }}
                    >
                      <div className="font-medium truncate">{meeting.title}</div>
                      <div className="opacity-75">{meeting.time}</div>
                    </div>
                  ))}
                  {getMeetingsForDate(day).length > 3 && (
                    <div className="text-xs text-gray-500 p-1">
                      +{getMeetingsForDate(day).length - 3} more
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
