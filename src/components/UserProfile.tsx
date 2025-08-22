import React, { useState } from 'react';
import { LogOut, User, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import ProfileManager from './ProfileManager';

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileManager, setShowProfileManager] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  
  const userEmail = user?.email || localStorage.getItem('userEmail') || 'user@example.com';
  const userName = user?.email?.split('@')[0] || localStorage.getItem('userName') || userEmail.split('@')[0];

  const handleLogout = async () => {
    const { error } = await signOut();
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      
      navigate('/login');
    }
  };

  return (
    <>
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="text-sm bg-blue-600 text-white">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium">{userName}</span>
        </Button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute top-12 right-0 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 animate-scale-in">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{userName}</p>
                    <p className="text-sm text-gray-500 truncate">{userEmail}</p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 text-left hover:bg-gray-50"
                  onClick={() => {
                    setShowProfileManager(true);
                    setIsOpen(false);
                  }}
                >
                  <Settings className="h-4 w-4 mr-3 text-gray-500" />
                  <span>Profile Settings</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 text-left hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  <Bell className="h-4 w-4 mr-3 text-gray-500" />
                  <span>Notifications</span>
                </Button>
                
                <hr className="my-2 mx-2" />
                
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 text-left text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <ProfileManager 
        isOpen={showProfileManager} 
        onClose={() => setShowProfileManager(false)} 
      />
    </>
  );
};

export default UserProfile;
