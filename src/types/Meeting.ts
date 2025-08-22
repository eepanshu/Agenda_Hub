
export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  platform: 'google' | 'microsoft' | 'zoom';
  participants: string[];
  agenda?: string;
  recurrence?: string;
  link?: string;
}
