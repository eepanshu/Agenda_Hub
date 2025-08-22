
import { Meeting } from '../types/Meeting';

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    date: '2024-06-25',
    time: '09:00',
    platform: 'microsoft',
    participants: ['john@company.com', 'sarah@company.com', 'mike@company.com'],
    agenda: 'Review progress, discuss blockers, plan upcoming sprint',
    recurrence: 'weekly',
    link: 'https://teams.microsoft.com/meeting/123'
  },
  {
    id: '2',
    title: 'Product Strategy Meeting',
    date: '2024-06-26',
    time: '14:30',
    platform: 'zoom',
    participants: ['ceo@company.com', 'product@company.com'],
    agenda: 'Q3 roadmap planning and feature prioritization',
    link: 'https://zoom.us/j/123456789'
  },
  {
    id: '3',
    title: 'Client Presentation',
    date: '2024-06-27',
    time: '11:00',
    platform: 'google',
    participants: ['client@external.com', 'sales@company.com'],
    agenda: 'Demo new features and discuss contract renewal',
    link: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: '4',
    title: 'Engineering Review',
    date: '2024-06-28',
    time: '16:00',
    platform: 'microsoft',
    participants: ['dev1@company.com', 'dev2@company.com', 'lead@company.com'],
    agenda: 'Code review and architecture discussion',
    link: 'https://teams.microsoft.com/meeting/456'
  },
  {
    id: '5',
    title: 'Marketing Campaign Planning',
    date: '2024-06-24',
    time: '10:30',
    platform: 'zoom',
    participants: ['marketing@company.com', 'design@company.com'],
    agenda: 'Plan upcoming product launch campaign',
    link: 'https://zoom.us/j/987654321'
  },
  {
    id: '6',
    title: '1:1 with Manager',
    date: '2024-06-25',
    time: '15:00',
    platform: 'google',
    participants: ['manager@company.com'],
    agenda: 'Career development and feedback session',
    recurrence: 'weekly'
  }
];
