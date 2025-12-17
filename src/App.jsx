import React, { useState, useEffect } from 'react';
import { Newspaper, Zap, CloudLightning, Search, Moon, Sun, X, ArrowRight } from 'lucide-react';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTickerIndex, setActiveTickerIndex] = useState(0);

  // --- DATA: Articles & News ---
  const tickerItems = [
    "WEATHER ALERT: Unseasonal storms batter East Coast; meteorologists baffled by localized lightning.",
    "CRIME: Manhunt for Percy Jackson ends; teen cleared of all charges.",
    "SIGHTING: Zebra spotted galloping down Las Vegas Strip.",
    "CLOSURE: Aunty Em's Garden Gnome Emporium closed indefinitely.",
    "SANTA MONICA: Duel on the beach involving 'biker' reported by witnesses."
  ];

  const newsData = [
    {
      id: 1,
      type: 'hero',
      category: 'Special Report',
      title: 'GREEK GODS ARE REAL!',
      image: 'https://images.unsplash.com/photo-1506452305024-9d3f02d1c9b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      summary: "NEW YORK  BY EILEEN SMYTHE. The Mist has lifted! Recent events across the United States have confirmed the impossible: Mount Olympus is currently anchored above the Empire State Building.",
      fullText: "NEW YORK  BY EILEEN SMYTHE. The Mist has lifted! Recent events across the United States have confirmed the impossible: Mount Olympus is currently anchored above the Empire State Building. From the explosion at the St. Louis Arch involving a \"Chimera\" to the supernatural duel on Santa Monica beach, evidence suggests the gods are active, powerful, and very much alive. Eyewitnesses report strange weather patterns, unexplained miracles, and sighting of anomalous creatures. Authorities are scrambling for answers, but the truth appears to be ancient: We are not alone.\n\nFor weeks, weather experts have struggled to explain the localized hurricane activity over Long Island, while ground-shaking tremors baffled experts in Los Angeles. But the most damning evidence comes from ordinary citizens: commuters in New Jersey who witnessed \"bat-winged hags\" attacking a bus, and tourists in St. Louis who saw a boy plummet into the Mississippi River only to emerge completely dry. The veil of secrecyknown in ancient texts as \"The Mist\"is finally tearing apart. Whether we choose to believe it or not, the Olympians have returned to the heart of the West, and their disputes are no longer merely myths.",
      author: 'Percy Jackson',
      credit: 'Photographed by Annabeth Chase'
    },
    {
      id: 2,
      type: 'sidebar',
      category: 'New Jersey',
      title: 'FILE: The Bus Explosion',
      summary: 'Evidence Item #404: A Greyhound bus exploded on a New Jersey roadside.',
      fullText: "Witnesses claim three elderly women morphed into bat-winged hags before the lightning struck. Police are calling it a 'freak electrical storm,' but the scorch marks suggest otherwise. Survivors report a young boy fleeing the scene brandishing what appeared to be a glowing bronze baseball bat."
    },
    {
      id: 3,
      type: 'trending',
      category: 'Mortal TV',
      title: 'Gabe Ugliano: "My Stepson Ruined My Camaro"',
      summary: 'In an exclusive interview with Barbara Walters, Gabe Ugliano claims his stepson Percy ruined his 78 Camaro.',
      fullText: "In a tearful interview, Gabe Ugliano claims his stepson Percy ruined his '78 Camaro and disappeared. He is offering a cash reward of free appliances to anyone who finds the boy. 'He took everything I cared about,' Ugliano stated, wiping away a dry tear. Neighbors report strange smells emanating from the Ugliano residence."
    },
    {
      id: 4,
      type: 'trending',
      category: 'Olympus Update',
      title: 'Peace Summit Reached: War Averted',
      summary: 'After weeks of tension, Zeus and Poseidon have reportedly laid down their weapons.',
      fullText: "A young hero returned a certain master bolt just in time for the solstice deadline. The threat of civil war has passed, and the skies over New York are finally clearing. Meteorological reports confirm a sudden dissipation of the super-cell storm system that had been hovering over the Empire State Building."
    },
    {
      id: 5,
      type: 'trending',
      category: 'Satyr News',
      title: 'Grover Underwood Granted Searcher License',
      summary: 'In a historic decision, the Council of Cloven Elders has granted a Searcher\'s License to Grover Underwood.',
      fullText: "He is the first satyr in recent memory to receive this honor and has already packed his reed pipes to begin the search for Pan. 'It's a lifelong dream,' Underwood bleated to reporters before departing on a west-bound train."
    }
  ];

  // --- EFFECTS ---
  // Infinite Ticker Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter articles based on search
  const filteredNews = newsData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- SUB-COMPONENTS ---

  const Modal = ({ article, onClose }) => {
    if (!article) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
        <div className={`relative w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 flex flex-col md:flex-row overflow-hidden ${isDarkMode ? 'bg-zinc-900 text-gray-100 border border-green-500/30' : 'bg-[#f8f5f2] text-zinc-900 border border-zinc-200'}`} onClick={e => e.stopPropagation()}>
          
          {/* Close Button - Sticky/Absolute */}
          <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition-all border border-white/20">
            <X size={24} />
          </button>

          {/* Left Side: Visuals (Fixed on Desktop) */}
          {article.image && (
            <div className="w-full md:w-5/12 h-64 md:h-auto relative bg-zinc-800 shrink-0">
               <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
               <div className="absolute bottom-0 left-0 w-full p-8">
                  {article.credit && (
                    <div className="flex items-center gap-2 text-white/80">
                      <div className="h-px w-8 bg-white/50"></div>
                      <p className="text-xs uppercase tracking-widest font-bold">{article.credit}</p>
                    </div>
                  )}
               </div>
            </div>
          )}

          {/* Right Side: Scrollable Content */}
          <div className={`w-full ${article.image ? 'md:w-7/12' : ''} flex flex-col h-full`}>
            <div className="overflow-y-auto px-8 py-10 md:px-12 md:py-12 custom-scrollbar">
               
               {/* Article Header */}
               <div className="mb-8">
                 <span className={`inline-block px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase mb-4 border ${isDarkMode ? 'border-green-500 text-green-400' : 'border-red-800 text-red-800'}`}>
                  {article.category}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black leading-none tracking-tight mb-6">{article.title}</h2>
                <div className={`flex items-center gap-4 text-sm font-bold uppercase tracking-wider opacity-60 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  <span>{article.author || 'Staff Writer'}</span>
                  <span className="w-1 h-1 rounded-full bg-current"></span>
                  <span>December 15, 2025</span>
                </div>
               </div>

               <div className={`w-full h-px mb-10 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`}></div>

               {/* Article Body */}
               <div className="prose prose-lg max-w-none">
                 <p className={`whitespace-pre-wrap leading-relaxed font-serif text-lg md:text-xl ${isDarkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>
                   <span className={`float-left text-6xl font-black mr-4 mt-[-6px] leading-[0.8] ${isDarkMode ? 'text-green-500' : 'text-red-800'}`}>
                      {article.fullText.charAt(0)}
                   </span>
                   {article.fullText.substring(1)}
                 </p>
               </div>
               
               {/* Article Footer */}
               <div className="mt-16 pt-8 border-t border-dashed border-zinc-500/30 text-center opacity-50 italic text-sm font-serif">
                  End of Scroll 
               </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${isDarkMode ? 'bg-[#121212] text-gray-200' : 'bg-[#f4f1ea] text-[#111]'}`}>
      
      {/* --- TOP TICKER --- */}
      <div className={`w-full py-2 px-4 text-xs md:text-sm font-bold tracking-wide border-b transition-colors ${isDarkMode ? 'bg-black text-green-400 border-green-900' : 'bg-[#111] text-white border-red-700'}`}>
        <div className="max-w-6xl mx-auto flex items-center overflow-hidden">
          <span className={`shrink-0 px-2 py-0.5 mr-4 rounded text-[10px] uppercase ${isDarkMode ? 'bg-green-900 text-green-100' : 'bg-red-700 text-white'}`}>
            Live Update
          </span>
          <div className="flex-1 relative h-5">
            {tickerItems.map((item, idx) => (
              <span 
                key={idx}
                className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${idx === activeTickerIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="max-w-6xl mx-auto px-4 py-8 md:py-12 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-green-900/20' : 'bg-red-100'}`}>
              <CloudLightning size={20} className={isDarkMode ? 'text-green-400' : 'text-red-700'} />
            </div>
            <span className="text-xs md:text-sm font-bold tracking-wider opacity-70">Vol. MMVI No. 1 • December 15, 2025</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search Archives..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-8 pr-4 py-1.5 text-sm rounded-full border bg-transparent focus:outline-none focus:ring-1 transition-all w-32 focus:w-48 ${isDarkMode ? 'border-zinc-700 focus:border-green-500 focus:ring-green-500 placeholder-zinc-600' : 'border-zinc-400 focus:border-red-700 focus:ring-red-700 placeholder-zinc-500'}`}
              />
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50" />
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${isDarkMode ? 'border-green-500 text-green-400 hover:bg-green-900/20' : 'border-zinc-800 text-zinc-800 hover:bg-zinc-200'}`}
            >
              {isDarkMode ? <><Sun size={12}/> OLYMPUS MODE</> : <><Moon size={12}/> UNDERWORLD MODE</>}
            </button>
          </div>
        </div>

        <div className="text-center border-b-4 border-double pb-8 mb-8" style={{ borderColor: isDarkMode ? '#333' : '#111' }}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none mb-2" style={{ fontFamily: '"Cinzel", serif' }}>
            The Olympian News.
          </h1>
          <p className="text-sm md:text-base font-serif italic opacity-70">"The Truth Behind The Mist"</p>
        </div>

        <nav>
          <ul className={`flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm font-bold uppercase tracking-widest pb-4 border-b ${isDarkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
            {['Olympus', 'Camp Half-Blood', 'Underworld', 'Monsters', 'Prophecies', 'Weaponry', 'Oracle'].map((item) => (
              <li key={item} className="cursor-pointer hover:opacity-60 transition-opacity relative group">
                {item}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isDarkMode ? 'bg-green-500' : 'bg-red-700'}`}></span>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* --- MAIN GRID --- */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* LEFT SIDEBAR (Classifieds) */}
          <aside className="lg:col-span-3 space-y-8 hidden md:block">
            <div className="border-t-2 pt-4" style={{ borderColor: isDarkMode ? '#333' : '#111' }}>
              <h3 className="font-serif text-xl font-bold mb-4">Key Evidence</h3>
              <div className="space-y-6">
                {filteredNews.filter(n => n.type === 'sidebar').map(article => (
                  <div key={article.id} onClick={() => setSelectedArticle(article)} className="group cursor-pointer">
                    <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${isDarkMode ? 'text-green-400' : 'text-red-700'}`}>{article.category}</span>
                    <h4 className="font-serif text-lg font-bold leading-tight mb-2 group-hover:underline">{article.title}</h4>
                    <p className="text-sm opacity-80 leading-relaxed line-clamp-3">{article.summary}</p>
                    <div className="w-12 h-px bg-current mt-4 opacity-30"></div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* CENTER HERO */}
          <section className="lg:col-span-6">
            {filteredNews.filter(n => n.type === 'hero').map(article => (
              <div key={article.id} onClick={() => setSelectedArticle(article)} className="cursor-pointer group">
                <div className="text-center mb-6">
                  <span className={`inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest border ${isDarkMode ? 'border-green-500 text-green-400' : 'border-red-700 text-red-700'}`}>
                    {article.category}
                  </span>
                  <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl font-black leading-none mb-4 transition-colors ${isDarkMode ? 'group-hover:text-green-400' : 'group-hover:text-red-700'}`}>
                    {article.title}
                  </h2>
                </div>
                
                <div className="relative aspect-video w-full overflow-hidden mb-6 bg-zinc-800 shadow-2xl">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className={`absolute inset-0 ring-1 ring-inset ${isDarkMode ? 'ring-white/10' : 'ring-black/10'}`}></div>
                </div>

                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider border-y py-3 mb-6 opacity-70" style={{ borderColor: isDarkMode ? '#333' : '#ddd' }}>
                  <span>{article.author}</span>
                  <span>{article.credit}</span>
                </div>

                <p className="font-serif text-lg md:text-xl leading-relaxed opacity-90 drop-cap line-clamp-6">
                  {article.summary}
                </p>
                
                <div className="flex justify-center mt-8">
                  <button className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all ${isDarkMode ? 'text-green-400' : 'text-red-700'}`}>
                    Read Full Scroll <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* RIGHT SIDEBAR (Trending) */}
          <aside className="lg:col-span-3 space-y-8">
            <div className={`p-6 border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} shadow-sm`}>
              <h3 className="font-serif text-xl font-bold mb-6 text-center border-b pb-4" style={{ borderColor: isDarkMode ? '#333' : '#eee' }}>Trending Scrolls</h3>
              <div className="space-y-6">
                {filteredNews.filter(n => n.type === 'trending').map((article, idx) => (
                  <div key={article.id} onClick={() => setSelectedArticle(article)} className="flex gap-4 group cursor-pointer">
                    <span className="font-serif text-3xl font-bold opacity-20 group-hover:opacity-100 transition-opacity">{idx + 1}</span>
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${isDarkMode ? 'text-green-400' : 'text-red-700'}`}>{article.category}</span>
                      <h4 className="font-bold leading-tight mb-1 group-hover:text-opacity-70 transition-colors">{article.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Works Cited Widget */}
            <div className={`p-6 text-sm border-t-4 ${isDarkMode ? 'bg-zinc-800/50 border-green-500' : 'bg-zinc-100 border-red-700'}`}>
              <h4 className="font-serif font-bold uppercase mb-2">Works Cited</h4>
              <ul className="space-y-2 opacity-70 text-xs">
                <li>Riordan, Rick. <em>The Lightning Thief</em>. New York: Miramax Books, 2005.</li>
                <li>Smythe, Eileen. "Boy and Mother Still Missing." <em>UI inspired from the New York Daily News.</em>.</li>
              </ul>
            </div>
          </aside>

        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className={`py-12 border-t-4 ${isDarkMode ? 'bg-black border-green-900' : 'bg-[#111] text-zinc-400 border-red-700'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-white" style={{ fontFamily: '"Cinzel", serif' }}>The Olympian Newspaper</h2>
          <div className="flex justify-center flex-wrap gap-6 mb-8 text-sm font-bold uppercase tracking-wider">
            <a href="#" className="hover:text-white transition-colors">About Chiron</a>
            <a href="#" className="hover:text-white transition-colors">Contact Hermes</a>
          </div>
          <p className="text-xs opacity-50">&copy; 2025 The Olympian News. North America.</p>
        </div>
      </footer>

      {/* --- MODAL --- */}
      {selectedArticle && <Modal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </div>
  );
};

export default App;
