import React, { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '@/app/contexts/AccessibilityContext';
import { Contact } from '@/app/data/contacts';
import clsx from 'clsx';
import { Send, ArrowLeft, Image as ImageIcon, Mic } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

type ChatScreenProps = {
  contact: Contact;
  onBack: () => void;
};

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
};

export const ChatScreen = ({ contact, onBack }: ChatScreenProps) => {
  const { highContrast, textSize, buttonSize } = useAccessibility();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: `Hi ${contact.name}! How are you?`, sender: 'me', time: '10:00 AM' },
    { id: '2', text: "I'm doing well, thanks! Just had lunch.", sender: 'them', time: '10:05 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "That's great! Love you!",
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 2000);
  };

  const quickReplies = ["I'm okay", "Call me?", "Love you", "Yes", "No"];

  // Speech recognition for dictation and send command
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recog = new SpeechRecognition();
    recog.lang = 'en-US';
    recog.interimResults = true;
    recog.maxAlternatives = 1;

    recog.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interim += res[0].transcript;
      }
      if (interim) setInputText(interim);
      if (final) {
        const trimmed = final.trim();
        // If user only said "send" -> send the currently composed input and stop listening
        if (/^send( message| it)?$/i.test(trimmed)) {
          try { recognitionRef.current?.stop(); } catch (e) { }
          setListening(false);
          setTimeout(() => { handleSend(); }, 120);
          return;
        }
        // If final ends with a trailing "send" (e.g. "hello send"), strip the trailing command and send the message
        const trailing = trimmed.match(/^(.*)\s+send( message| it)?$/i);
        if (trailing && trailing[1]) {
          const messageText = trailing[1].trim();
          setInputText(messageText);
          try { recognitionRef.current?.stop(); } catch (e) { }
          setListening(false);
          setTimeout(() => { handleSend(); }, 120);
          return;
        }
        // Otherwise treat as normal dictated text
        setInputText(trimmed);
      }
    };

    recog.onend = () => setListening(false);
    recognitionRef.current = recog;

    return () => {
      try { recog.stop(); } catch (e) { }
      recognitionRef.current = null;
    };
  }, []);

  const toggleListening = () => {
    const recog = recognitionRef.current;
    if (!recog) return;
    if (listening) {
      try { recog.stop(); } catch (e) { }
      setListening(false);
    } else {
      try { recog.start(); setListening(true); } catch (e) { setListening(false); }
    }
  };

  return (
    <div className={clsx('fixed inset-0 z-50 flex flex-col', highContrast ? 'bg-gray-900 text-white' : 'bg-gray-50')}>
      {/* Header */}
      <div className={clsx(
        'p-4 flex items-center gap-4 shadow-sm z-10',
        highContrast ? 'bg-gray-900 text-white border-b border-gray-800' : 'bg-white text-gray-900 border-b border-gray-200'
      )}>
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={32 * buttonSize} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
            <ImageWithFallback
              src={contact.image}
              alt={contact.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold" style={{ fontSize: `${20 * textSize}px` }}>{contact.name}</h2>
            <p className={clsx('text-sm', highContrast ? 'text-gray-300' : 'text-green-600')}>Active now</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              'max-w-[80%] p-4 rounded-2xl',
              msg.sender === 'me'
                ? (highContrast ? 'bg-gray-700 text-white self-end rounded-br-none' : 'bg-blue-600 text-white self-end rounded-br-none')
                : (highContrast ? 'bg-gray-800 text-white self-start rounded-bl-none border border-white' : 'bg-white text-gray-800 self-start rounded-bl-none shadow-sm')
            )}
          >
            <p style={{ fontSize: `${18 * textSize}px` }} className="font-medium leading-relaxed">
              {msg.text}
            </p>
            <span className={clsx('text-xs mt-2 block opacity-70', msg.sender === 'me' ? 'text-right' : 'text-left')}>
              {msg.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="p-2 overflow-x-auto flex gap-2 no-scrollbar">
        {quickReplies.map((reply) => (
          <button
            key={reply}
            onClick={() => setInputText(reply)}
            className={clsx(
              'px-4 py-2 rounded-full whitespace-nowrap font-medium border-2',
              highContrast
                ? 'bg-black border-gray-800 text-white'
                : 'bg-white border-blue-200 text-blue-600'
            )}
            style={{ fontSize: `${16 * textSize}px` }}
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Voice hint */}
      <div className={clsx('px-4 pb-2 text-xs opacity-80', highContrast ? 'text-gray-300' : 'text-gray-600')}>
        Voice: tap the mic to dictate a message.
      </div>

      {/* Input Area */}
      <div className={clsx(
        'p-4 border-t flex items-center gap-3',
        highContrast ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      )}>
        <button className={clsx('p-3 rounded-full flex-shrink-0', highContrast ? 'bg-gray-800 text-white' : 'bg-gray-100 text-blue-600')}>
          <ImageIcon size={28 * buttonSize} />
        </button>

        <button
          onClick={toggleListening}
          aria-pressed={listening}
          className={clsx(
            'p-3 rounded-full flex-shrink-0 transition-colors',
            listening ? 'bg-red-500 text-white animate-pulse' : (highContrast ? 'bg-gray-800 text-white' : 'bg-gray-100 text-blue-600')
          )}
          title={listening ? 'Listening... say your message or say "send"' : 'Dictate message (voice)'}
        >
          <Mic size={28 * buttonSize} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className={clsx(
            'flex-1 min-w-0 p-4 rounded-full outline-none border-2 transition-colors',
            highContrast
              ? 'bg-black border-gray-800 text-white placeholder-gray-500 focus:border-white'
              : 'bg-gray-100 border-transparent text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500'
          )}
          style={{ fontSize: `${18 * textSize}px` }}
        />

        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={clsx(
            'p-4 rounded-full flex-shrink-0 transition-all active:scale-95 disabled:opacity-50',
            highContrast ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white'
          )}
        >
          <Send size={28 * buttonSize} />
        </button>
      </div>
    </div>
  );
};
