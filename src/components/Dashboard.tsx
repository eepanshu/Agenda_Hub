
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, MessageCircle, Users, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UserProfile from './UserProfile';
import { useAuth } from '@/hooks/useAuth';
import { mockMeetings } from '../data/mockMeetings';

interface DashboardProps {
  onViewSchedule: () => void;
  onCreateMeeting: () => void;
  onOpenChat: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewSchedule, onCreateMeeting, onOpenChat }) => {
  const { user } = useAuth();
  const [todaysMeetings, setTodaysMeetings] = useState(0);
  const [weeklyMeetings, setWeeklyMeetings] = useState(0);
  
  const userName = user?.email?.split('@')[0] || localStorage.getItem('userName') || 'User';
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    const todayMeetingCount = mockMeetings.filter(meeting => meeting.date === today).length;
    setTodaysMeetings(todayMeetingCount);

    // Get this week's meetings
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date();
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
    
    const weeklyMeetingCount = mockMeetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      return meetingDate >= startOfWeek && meetingDate <= endOfWeek;
    }).length;
    setWeeklyMeetings(weeklyMeetingCount);
  }, []);

  const stats = [
    { 
      label: 'Today\'s Meetings', 
      value: todaysMeetings === 0 ? 'No meetings' : todaysMeetings.toString(), 
      icon: Calendar, 
      color: 'text-blue-600 bg-blue-100' 
    },
    { 
      label: 'This Week', 
      value: weeklyMeetings === 0 ? 'Free week!' : weeklyMeetings.toString(), 
      icon: Clock, 
      color: 'text-green-600 bg-green-100' 
    },
    { label: 'Team Members', value: '8', icon: Users, color: 'text-purple-600 bg-purple-100' },
    { label: 'Productivity', value: '94%', icon: TrendingUp, color: 'text-orange-600 bg-orange-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Agenda Hub
            </h1>
          </div>
          <UserProfile />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {greeting}, {userName}! 👋
          </h2>
          {todaysMeetings === 0 ? (
            <p className="text-gray-600 text-lg">
              No meetings today! Sit back and relax. 😌
            </p>
          ) : (
            <p className="text-gray-600 text-lg">
              You have {todaysMeetings} meeting{todaysMeetings > 1 ? 's' : ''} scheduled for today.
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in hover:scale-105" onClick={onViewSchedule}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">View Schedule</CardTitle>
              <CardDescription className="text-gray-600">
                See all your scheduled meetings in a beautiful calendar view
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" variant="default">
                Open Calendar
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in hover:scale-105" onClick={onCreateMeeting}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Create Meeting</CardTitle>
              <CardDescription className="text-gray-600">
                Schedule a new meeting with your team members
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" variant="default">
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in hover:scale-105" onClick={onOpenChat}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Team Chat</CardTitle>
              <CardDescription className="text-gray-600">
                Connect and chat with team members instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" variant="default">
                Open Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Quick Actions</span>
              <Badge variant="secondary">New</Badge>
            </CardTitle>
            <CardDescription>
              Frequently used actions for faster productivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-12 flex flex-col space-y-1" onClick={onCreateMeeting}>
                <Plus className="h-4 w-4" />
                <span className="text-xs">Quick Meet</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col space-y-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Today's Agenda</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col space-y-1" onClick={onOpenChat}>
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">Team Chat</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col space-y-1">
                <Users className="h-4 w-4" />
                <span className="text-xs">Contacts</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
