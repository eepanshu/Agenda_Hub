
import React, { useState } from 'react';
import { Search, Plus, Send, ArrowLeft, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Contact {
  id: string;
  name: string;
  agendaId: string;
  status: 'online' | 'offline';
  lastMessage?: string;
  lastMessageTime?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface ChatSystemProps {
  onBack: () => void;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ onBack }) => {
  const [contacts] = useState<Contact[]>([
    { id: '1', name: 'John Doe', agendaId: 'AGENDA001', status: 'online', lastMessage: 'Hey, ready for the meeting?', lastMessageTime: '2 min ago' },
    { id: '2', name: 'Sarah Wilson', agendaId: 'AGENDA002', status: 'offline', lastMessage: 'Thanks for the update', lastMessageTime: '1 hour ago' },
    { id: '3', name: 'Mike Johnson', agendaId: 'AGENDA003', status: 'online', lastMessage: 'Can we reschedule?', lastMessageTime: '5 min ago' },
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: '1', content: 'Hey, ready for the meeting?', timestamp: '10:30 AM' },
    { id: '2', senderId: 'me', content: 'Yes, I\'ll be there in 5 minutes', timestamp: '10:32 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactId, setNewContactId] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleAddContact = () => {
    if (newContactId.trim()) {
      console.log('Adding contact with Agenda ID:', newContactId);
      setNewContactId('');
      setShowAddContact(false);
    }
  };

  if (selectedContact) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedContact(null)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{selectedContact.name}</h3>
                <p className="text-sm text-gray-500">ID: {selectedContact.agendaId}</p>
              </div>
            </div>
            <div className="ml-auto">
              <Badge variant={selectedContact.status === 'online' ? 'default' : 'secondary'}>
                {selectedContact.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === 'me'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Team Chat</h1>
          </div>
          <Button onClick={() => setShowAddContact(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Contact</span>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {showAddContact && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter Agenda Hub ID (e.g., AGENDA001)"
                  value={newContactId}
                  onChange={(e) => setNewContactId(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddContact}>Add</Button>
                <Button variant="outline" onClick={() => setShowAddContact(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {contacts
            .filter(contact => 
              contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              contact.agendaId.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedContact(contact)}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                      <span className="text-sm text-gray-500">{contact.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">ID: {contact.agendaId}</p>
                    {contact.lastMessage && (
                      <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                    )}
                  </div>
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
