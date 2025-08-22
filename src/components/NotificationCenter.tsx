
import React, { useState, useEffect } from 'react';
import { Bell, BellRing, X, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Meeting } from '../types/Meeting';

interface Notification {
  id: string;
  type: 'upcoming' | 'reminder' | 'invite';
  meeting: Meeting;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationCenterProps {
  meetings: Meeting[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ meetings }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setHasPermission(permission === 'granted');
      });
    } else {
      setHasPermission(Notification.permission === 'granted');
    }
  }, []);

  useEffect(() => {
    // Generate notifications for upcoming meetings
    const now = new Date();
    const upcomingNotifications: Notification[] = [];

    meetings.forEach(meeting => {
      const meetingDateTime = new Date(`${meeting.date} ${meeting.time}`);
      const timeDiff = meetingDateTime.getTime() - now.getTime();
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));

      // Create notifications for meetings in the next 15 minutes
      if (minutesDiff > 0 && minutesDiff <= 15) {
        upcomingNotifications.push({
          id: `${meeting.id}-upcoming`,
          type: 'upcoming',
          meeting,
          message: `Meeting "${meeting.title}" starts in ${minutesDiff} minutes`,
          timestamp: now,
          read: false,
        });

        // Show browser notification if permission granted
        if (hasPermission && minutesDiff <= 5) {
          new Notification(`Meeting starting soon!`, {
            body: `"${meeting.title}" starts in ${minutesDiff} minutes`,
            icon: '/favicon.ico',
          });
        }
      }
    });

    setNotifications(prev => {
      const existingIds = prev.map(n => n.id);
      const newNotifications = upcomingNotifications.filter(n => !existingIds.includes(n.id));
      return [...prev, ...newNotifications];
    });
  }, [meetings, hasPermission]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google': return 'bg-red-500';
      case 'microsoft': return 'bg-blue-500';
      case 'zoom': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        {unreadCount > 0 ? (
          <BellRing className="h-4 w-4" />
        ) : (
          <Bell className="h-4 w-4" />
        )}
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className={`w-3 h-3 rounded-full ${getPlatformColor(notification.meeting.platform)}`} />
                        <span className="text-sm font-medium text-gray-900">
                          {notification.meeting.title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{notification.meeting.date}</span>
                        <Clock className="h-3 w-3" />
                        <span>{notification.meeting.time}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
