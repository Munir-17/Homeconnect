import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Search, 
  MessageSquare, 
  CheckCheck, 
  ShieldCheck, 
  User, 
  Sparkles,
  Calendar,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MessagingView: React.FC = () => {
  const { 
    conversations, 
    messages, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    currentRole, 
    currentWorker, 
    currentEmployer,
    setIsScheduleModalOpen,
    setSelectedWorkerForSchedule,
    workers
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active conversation
  const selectedConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const convMessages = messages.filter(m => m.conversationId === selectedConv?.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedConv) return;
    sendMessage(selectedConv.id, inputMessage.trim());
    setInputMessage('');
  };

  const sendQuickReply = (text: string) => {
    if (!selectedConv) return;
    sendMessage(selectedConv.id, text);
  };

  const isWorker = currentRole === 'worker';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col md:flex-row h-[750px] max-h-[85vh]">
      {/* Conversations Left Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/60">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="font-heading font-extrabold text-base text-slate-900 flex items-center justify-between">
            <span>Conversations</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
              {conversations.length}
            </span>
          </h2>
          <div className="relative mt-2">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search chat history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          {conversations.map(conv => {
            const isSelected = conv.id === selectedConv?.id;
            const otherPartyName = isWorker ? conv.participantEmployerName : conv.participantWorkerName;
            const otherPartyAvatar = isWorker ? conv.participantEmployerAvatar : conv.participantWorkerAvatar;

            return (
              <div
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`p-3.5 cursor-pointer transition-colors flex items-start gap-3 ${
                  isSelected ? 'bg-emerald-50/80 border-l-4 border-emerald-600' : 'hover:bg-slate-100/70'
                }`}
              >
                <img
                  src={otherPartyAvatar}
                  alt={otherPartyName}
                  className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-xs text-slate-900 truncate">
                      {otherPartyName}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{conv.lastTimestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                    {conv.relatedJobTitle}
                  </p>
                  <p className="text-xs text-slate-600 truncate mt-1">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <img
                src={isWorker ? selectedConv.participantEmployerAvatar : selectedConv.participantWorkerAvatar}
                alt="Participant"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    {isWorker ? selectedConv.participantEmployerName : selectedConv.participantWorkerName}
                  </h3>
                  <span className="p-0.5 bg-emerald-600 text-white rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">
                  {selectedConv.relatedJobTitle} • Verified Discussion
                </p>
              </div>
            </div>

            {!isWorker && (
              <button
                onClick={() => {
                  const targetWorker = workers.find(w => w.id === selectedConv.participantWorkerId);
                  if (targetWorker) {
                    setSelectedWorkerForSchedule(targetWorker);
                    setIsScheduleModalOpen(true);
                  }
                }}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 flex items-center gap-1 shadow-xs transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                Schedule Interview
              </button>
            )}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40">
            <div className="text-center my-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200">
                End-to-End Encrypted Platform Messaging
              </span>
            </div>

            {convMessages.map(msg => {
              const isMine = (isWorker && msg.senderRole === 'worker') || (!isWorker && msg.senderRole === 'employer');

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[11px] font-bold text-slate-600">{msg.senderName}</span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isMine
                        ? 'bg-emerald-600 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Tray */}
          <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-400 font-semibold shrink-0">Quick reply:</span>
            {isWorker ? (
              <>
                <button
                  onClick={() => sendQuickReply('Thank you for considering my profile! I am available to interview.')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 whitespace-nowrap"
                >
                  "I am available to interview"
                </button>
                <button
                  onClick={() => sendQuickReply('I have uploaded my original CID Police Clearance certificate.')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 whitespace-nowrap"
                >
                  "Uploaded my police clearance"
                </button>
                <button
                  onClick={() => sendQuickReply('Could you confirm the daily working hours and transport arrangements?')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 whitespace-nowrap"
                >
                  "Confirm hours & transport"
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => sendQuickReply('Hi Tendai, we would love to invite you for a 30-minute home visit.')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 whitespace-nowrap"
                >
                  "Invite for home visit"
                </button>
                <button
                  onClick={() => sendQuickReply('Are you available to start next Monday?')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 whitespace-nowrap"
                >
                  "Available next Monday?"
                </button>
                <button
                  onClick={() => sendQuickReply('We have sent a formal offer through HomeConnect!')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 whitespace-nowrap"
                >
                  "Sent formal offer"
                </button>
              </>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Attach File or Document"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Type your message to candidate or employer..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 py-2 px-3.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="submit"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
          Select a conversation from the left to start messaging.
        </div>
      )}
    </div>
  );
};
