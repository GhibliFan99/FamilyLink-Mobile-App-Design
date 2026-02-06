import React, { useState } from 'react';
import { AccessibilityProvider, useAccessibility } from './contexts/AccessibilityContext';
import { BottomNav } from './components/BottomNav';
import { VoiceGuide } from './components/VoiceGuide';
import { HomeScreen } from './pages/HomeScreen';
import { CallScreen } from './pages/CallScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { VoiceCommandScreen } from './pages/VoiceCommandScreen';
import { ChatScreen } from './pages/ChatScreen';
import { contacts as initialContacts, Contact } from './data/contacts';
import clsx from 'clsx';
import { Toaster, toast } from 'sonner';

const AppContent = () => {
  const { highContrast } = useAccessibility();
  const [currentView, setCurrentView] = useState<'home' | 'settings' | 'voice' | 'call' | 'video' | 'chat'>('home');
  const [lastView, setLastView] = useState<'home' | 'settings'>('home');
  const [activeContact, setActiveContact] = useState<Contact | null>(initialContacts[0]);
  const [allContacts, setAllContacts] = useState<Contact[]>(initialContacts);

  const handleNavigate = (view: string) => {
    if (view === 'voice') {
      setLastView(currentView === 'voice' || currentView === 'call' || currentView === 'video' || currentView === 'chat' ? 'home' : currentView as any);
      setCurrentView('voice');
    } else if (view === 'home' || view === 'settings') {
      setCurrentView(view);
      setLastView(view);
    }
  };

  const handleCall = (contact: Contact) => {
    setActiveContact(contact);
    setCurrentView('call');
  };

  const handleVideoCall = (contact: Contact) => {
    setActiveContact(contact);
    setCurrentView('video');
  };

  const handleMessage = (contact: Contact) => {
    setActiveContact(contact);
    setCurrentView('chat');
  };

  const handleEndCall = (callDuration: number) => {
    let durationText = '';
    if (callDuration >= 60) {
      const mins = Math.floor(callDuration / 60);
      durationText = `${mins} min${mins > 1 ? 's' : ''}`;
    } else {
      durationText = `${callDuration}s`;
    }
    setCurrentView('home');
    toast.success(`Call ended : ${durationText}`, { duration: 5000 });
  };

  const handleAddContact = (newContact: Contact) => {
    setAllContacts([...allContacts, newContact]);
    toast.success(`${newContact.name} added to contacts`);
  };

  const handleDeleteContact = (id: string) => {
    const contactToDelete = allContacts.find(c => c.id === id);
    setAllContacts(allContacts.filter(c => c.id !== id));
    if (contactToDelete) {
      toast.success(`${contactToDelete.name} removed from contacts`);
    }
  };

  const handleVoiceCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();

    // Handle navigation commands
    if (lowerCmd === 'go to home' || lowerCmd === 'home') {
      setCurrentView('home');
      setLastView('home');
      toast.success('Going to Home');
      return;
    }

    if (lowerCmd === 'go to settings' || lowerCmd === 'settings') {
      setCurrentView('settings');
      setLastView('home');
      toast.success('Going to Settings');
      return;
    }

    // Handle contact-related commands (call/message)
    let foundContact: Contact | null = null;

    // Search by name
    for (const contact of allContacts) {
      if (lowerCmd.includes(contact.name.toLowerCase())) {
        foundContact = contact;
        break;
      }
    }

    // Search by relation if no name match
    if (!foundContact) {
      for (const contact of allContacts) {
        if (lowerCmd.includes(contact.relation.toLowerCase())) {
          foundContact = contact;
          break;
        }
      }
    }

    if (foundContact) {
      setActiveContact(foundContact);
      if (lowerCmd.includes('call') && lowerCmd.includes('video')) {
        setCurrentView('video');
        toast.success(`Video calling ${foundContact.name}`);
      } else if (lowerCmd.includes('call')) {
        setCurrentView('call');
        toast.success(`Calling ${foundContact.name}`);
      } else if (lowerCmd.includes('message') || lowerCmd.includes('text')) {
        setCurrentView('chat');
        toast.success(`Messaging ${foundContact.name}`);
      } else {
        toast.info("Command recognized: " + cmd);
        setCurrentView(lastView);
      }
    } else {
      // No matching contact found — only allow navigation commands already handled above
      toast.error('Contact not found');
      setCurrentView(lastView);
    }
  };

  const getVoiceGuideText = () => {
    switch (currentView) {
      case 'home':
        return "Tap a contact to Call or Message. You can also use Voice Commands.";
      case 'settings':
        return "Adjust text size, button size, or dark mode here.";
      case 'call':
      case 'video':
        return `Talking to ${activeContact?.name}. Tap the red button to hang up.`;
      case 'chat':
        return `Chatting with ${activeContact?.name}. Type a message below.`;
      case 'voice':
        return "Listening... Say 'call <name>' or 'message <name>'.";
      default:
        return "";
    }
  };

  const isFullscreenView = currentView === 'call' || currentView === 'video' || currentView === 'voice';

  return (
    <div
      className={clsx(
        'h-screen w-full flex flex-col overflow-hidden transition-colors duration-300',
        highContrast ? 'bg-black' : 'bg-white'
      )}
    >
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col h-full">

        {/* Fullscreen Views (No Scroll) */}
        {currentView === 'voice' && (
          <VoiceCommandScreen
            onCommand={handleVoiceCommand}
            onCancel={() => setCurrentView(lastView)}
          />
        )}

        {(currentView === 'call' || currentView === 'video') && activeContact && (
          <CallScreen
            contact={activeContact}
            mode={currentView === 'video' ? 'video' : 'voice'}
            onEndCall={handleEndCall}
          />
        )}

        {currentView === 'chat' && activeContact && (
          <ChatScreen
            contact={activeContact}
            onBack={() => setCurrentView('home')}
          />
        )}

        {/* Scrollable Views (Home, Settings) */}
        {!isFullscreenView && currentView !== 'chat' && (
          <div className="flex-1 overflow-y-auto scrollbar-hide relative">
            {currentView === 'home' && (
              <HomeScreen
                contacts={allContacts}
                onCall={handleCall}
                onVideoCall={handleVideoCall}
                onMessage={handleMessage}
                onAddContact={handleAddContact}
                onDeleteContact={handleDeleteContact}
              />
            )}
            {currentView === 'settings' && <SettingsScreen />}
          </div>
        )}

        {/* Bottom Section (Fixed) - Only show when NOT in fullscreen & NOT in chat */}
        {!isFullscreenView && currentView !== 'chat' && (
          <div className="flex-none z-40 bg-inherit pb-2">
            <VoiceGuide text={getVoiceGuideText()} />
            <BottomNav currentTab={currentView} onNavigate={handleNavigate} />
          </div>
        )}
      </main>
      <Toaster position="top-center" />
    </div>
  );
};

export default function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
}
