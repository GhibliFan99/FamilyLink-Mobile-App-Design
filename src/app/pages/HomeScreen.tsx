import React from 'react';
import { ContactCard } from '@/app/components/ContactCard';
import { useAccessibility } from '@/app/contexts/AccessibilityContext';
import { Contact } from '@/app/data/contacts';
import clsx from 'clsx';
import { Sun, Moon, Type, MoveDiagonal } from 'lucide-react';
import { PlusCircle } from 'lucide-react';

type HomeScreenProps = {
  contacts: Contact[];
  onCall: (contact: Contact) => void;
  onVideoCall: (contact: Contact) => void;
  onMessage: (contact: Contact) => void;
  onAddContact: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
};

export const HomeScreen = ({ contacts, onCall, onVideoCall, onMessage, onAddContact, onDeleteContact }: HomeScreenProps) => {
  const {
    textSize,
    setTextSize,
    buttonSize,
    setButtonSize,
    highContrast,
    setHighContrast,
  } = useAccessibility();

  const [showAdd, setShowAdd] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [newRelation, setNewRelation] = React.useState('');
  const [newImage, setNewImage] = React.useState('');

  const submitNew = () => {
    if (!newName.trim()) return;
    const newContact: Contact = {
      id: Date.now().toString(),
      name: newName.trim(),
      relation: newRelation.trim() || 'Other',
      image: newImage.trim() || 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=60'
    };
    onAddContact(newContact);
    setNewName(''); setNewRelation(''); setNewImage(''); setShowAdd(false);
  };

  const labelStyle = { fontSize: `${18 * textSize}px` };

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Header */}
      <div className="flex justify-between items-center px-2">
        <h1
          className={clsx('font-bold', highContrast ? 'text-white' : 'text-gray-900')}
          style={{ fontSize: `${28 * textSize}px` }}
        >
          FamilyLink
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={clsx(
              'p-3 rounded-full border-2 transition-all',
              highContrast
                ? 'bg-yellow-400 border-yellow-400 text-black'
                : 'bg-white border-gray-200 text-gray-600'
            )}
            aria-label="Toggle Dark Mode"
          >
            {highContrast ? <Sun size={32} /> : <Moon size={32} />}
          </button>
        </div>
      </div>

      {showAdd && (
        <section className="p-4">
          <div className={clsx('p-4 rounded-xl border shadow-sm', highContrast ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}>
            <h3 className={clsx('font-bold mb-2', highContrast ? 'text-white' : 'text-gray-800')} style={{ fontSize: `${18 * textSize}px` }}>Add Contact</h3>
            <div className="flex flex-col gap-2">
              <input className={clsx('p-2 rounded-md', highContrast ? 'bg-gray-700 text-white placeholder-gray-300' : 'bg-gray-50 text-gray-900 placeholder-gray-500')} placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <input className={clsx('p-2 rounded-md', highContrast ? 'bg-gray-700 text-white placeholder-gray-300' : 'bg-gray-50 text-gray-900 placeholder-gray-500')} placeholder="Relation" value={newRelation} onChange={(e) => setNewRelation(e.target.value)} />
              <input className={clsx('p-2 rounded-md', highContrast ? 'bg-gray-700 text-white placeholder-gray-300' : 'bg-gray-50 text-gray-900 placeholder-gray-500')} placeholder="Image URL (optional)" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
              <div className="flex gap-2 mt-2">
                <button onClick={submitNew} className={clsx('px-4 py-2 rounded-md', highContrast ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white')}>Add</button>
                <button onClick={() => setShowAdd(false)} className={clsx('px-4 py-2 rounded-md', highContrast ? 'bg-gray-700 text-white' : 'bg-gray-200')}>Cancel</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Contact List */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2">
          <h2
            className={clsx('font-bold', highContrast ? 'text-white' : 'text-gray-700')}
            style={{ fontSize: `${22 * textSize}px` }}
          >
            My Contacts
          </h2>
          <button
            onClick={() => setShowAdd(!showAdd)}
            aria-label="Add Contact"
            className={clsx('p-2 rounded-full transition-colors', highContrast ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 hover:bg-gray-100')}
          >
            <PlusCircle size={24 * buttonSize} />
          </button>
        </div>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            relation={contact.relation}
            image={contact.image}
            onCall={() => onCall(contact)}
            onVideoCall={() => onVideoCall(contact)}
            onMessage={() => onMessage(contact)}
            onDelete={() => onDeleteContact(contact.id)}
          />
        ))}
      </section>

      {/* Accessibility Controls */}
      <section
        className={clsx(
          'p-6 rounded-3xl transition-colors duration-300 mt-4',
          highContrast
            ? 'bg-gray-900 border-2 border-white'
            : 'bg-white shadow-md border border-gray-100'
        )}
      >
        <h3
          className={clsx('mb-6 font-bold', highContrast ? 'text-white' : 'text-gray-800')}
          style={{ fontSize: `${20 * textSize}px` }}
        >
          Display Settings
        </h3>

        <div className="flex flex-col gap-6">
          {/* Text Size Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Type size={24} className={highContrast ? 'text-white' : 'text-gray-500'} />
              <label
                className={clsx('font-medium', highContrast ? 'text-white' : 'text-gray-700')}
                style={labelStyle}
              >
                Text Size
              </label>
            </div>
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={textSize}
              onChange={(e) => setTextSize(parseFloat(e.target.value))}
              className="w-full h-12 accent-blue-600 cursor-pointer"
            />
            <div className={clsx('flex justify-between px-1', highContrast ? 'text-white' : 'text-gray-500')}>
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>

          {/* Button Size Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MoveDiagonal size={24} className={highContrast ? 'text-white' : 'text-gray-500'} />
              <label
                className={clsx('font-medium', highContrast ? 'text-white' : 'text-gray-700')}
                style={labelStyle}
              >
                Button Size
              </label>
            </div>
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={buttonSize}
              onChange={(e) => setButtonSize(parseFloat(e.target.value))}
              className="w-full h-12 accent-blue-600 cursor-pointer"
            />
            <div className={clsx('flex justify-between px-1', highContrast ? 'text-white' : 'text-gray-500')}>
              <span>Normal</span>
              <span>Extra Large</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacer for bottom nav */}
      <div className="h-20" />
    </div>
  );
};
