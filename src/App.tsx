/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Users, 
  CircleCheck, 
  Instagram, 
  Facebook, 
  ArrowRight,
  Menu,
  X,
  Star,
  Copy
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Showcase', href: '#showcase' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Events', href: '#events' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Host', href: '#host' },
  { name: 'Book', href: '#contact' },
];

const EVENT_TYPES = [
  { title: 'Birthdays', description: 'Celebrate another year in style with our customizable decor options.' },
  { title: 'Baby Showers', description: 'A clean, elegant setting for welcoming your newest family member.' },
  { title: 'Corporate Meetings', description: 'Professional and versatile space for workshops, seminars, and networking.' },
  { title: 'Pop-up Shops', description: 'The perfect storefront for your brand to shine in a modern environment.' },
  { title: 'Community Gatherings', description: 'A welcoming space for local groups and community events.' },
  { title: 'Private Parties', description: 'Intimate or grand, we cater to all your private celebration needs.' },
];

const GALLERY_IMAGES = [
  'https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_640/icc4og52iqrpkoedio0h',
  'https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_640/gsndkbw1kfsy0iv6lpgz',
  'https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_640/mwzidbxh7g4tug1v4zk1',
  'https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_640/gu3qafdtsvlqgcxoi80j',
  'https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_640/jqzd8nmmmaewpzvkk6ly',
  'https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_640/fyv2v81hjgxph9ap6ufb',
  'https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_640/now5zhwixwjnstn30h8t',
  'https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_640/hkceww09bijuxakgrlxv',
];



export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast(label);
    setTimeout(() => setCopyToast(null), 2000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackKeyword: string) => {
    e.currentTarget.src = `https://picsum.photos/seed/${fallbackKeyword}/1200/800`;
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-[#1a1a1a] font-sans selection:bg-[#d4af37] selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {copyToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[100] bg-[#1a1a1a] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#d4af37]/30"
          >
            <div className="w-5 h-5 bg-[#d4af37] rounded-full flex items-center justify-center">
              <CircleCheck size={12} className="text-white" />
            </div>
            <span className="text-sm font-medium">{copyToast} copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <img 
              src="https://files.catbox.moe/ugz732.png" 
              alt="Park Signature Suite Logo" 
              className="h-14 w-auto object-contain rounded-2xl shadow-sm border border-black/5"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium hover:text-[#d4af37] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#333] transition-all shadow-lg shadow-black/10"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-black/5 p-6 flex flex-col gap-4 shadow-xl"
            >
              {NAV_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-[#1a1a1a] text-white px-6 py-3 rounded-xl text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_1920/pkrkyuw6wrudg41b660r" 
            alt="Park Signature Suite Interior" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, 'luxury-interior')}
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#d4af37]/20 backdrop-blur-sm border border-[#d4af37]/30 rounded-full text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-6">
              Roselle Park&apos;s Premier Event Space
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              Bring Your Vision <br />
              <span className="italic text-[#d4af37]">To Life</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              A modern, versatile event space designed for your most memorable moments. From birthdays to corporate gatherings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact" 
                className="w-full sm:w-auto bg-[#d4af37] text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#c49f27] transition-all transform hover:scale-105"
              >
                Get In Touch <ArrowRight size={18} />
              </a>
              <a 
                href="#showcase" 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                View Showcase
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://files.catbox.moe/ae3q2s.jpg" 
                alt="Park Signature Suite Pricing" 
                className="w-full h-full object-contain bg-white"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#d4af37] p-8 rounded-2xl shadow-xl hidden lg:block">
              <div className="text-white text-center">
                <p className="text-4xl font-bold mb-1">100%</p>
                <p className="text-xs uppercase tracking-widest font-medium">Customizable</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-4">Our Story</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              Modern Elegance Meets Versatility
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Park Signature Suite is a modern, versatile event space located in Roselle Park, NJ, designed to bring your vision to life. Whether you&apos;re hosting a birthday celebration, baby shower, corporate meeting, pop-up shop, or community gathering, our venue offers a clean, stylish setting that can be customized for any occasion.
            </p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We provide flexible rental packages, reliable customer service, and a seamless experience from start to finish. At Park Signature Suite, creating memorable moments is our priority.
            </p>
            
            {/* Quick Stats / Capacity */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 p-6 bg-[#f8f5f2] rounded-[2rem] border border-[#d4af37]/20 grid grid-cols-3 gap-2 sm:gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex shrink-0 items-center justify-center text-[#d4af37] shadow-sm">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-[#1a1a1a]">75</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Capacity</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex shrink-0 items-center justify-center text-[#d4af37] shadow-sm">
                  <div className="font-serif font-bold italic text-lg">sq</div>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-[#1a1a1a]">980</p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Square Feet</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex shrink-0 items-center justify-center text-[#d4af37] shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-serif font-bold text-[#1a1a1a]">$125<span className="text-sm sm:text-base text-gray-500 font-sans font-normal ml-1 whitespace-nowrap">/ hr</span></p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Starting Rate</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CircleCheck className="text-[#d4af37] shrink-0" size={24} />
                <div>
                  <h4 className="font-bold mb-1">Flexible Packages</h4>
                  <p className="text-sm text-gray-500">Tailored to your needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CircleCheck className="text-[#d4af37] shrink-0" size={24} />
                <div>
                  <h4 className="font-bold mb-1">Modern Design</h4>
                  <p className="text-sm text-gray-500">Clean and stylish</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CircleCheck className="text-[#d4af37] shrink-0" size={24} />
                <div>
                  <h4 className="font-bold mb-1">Reliable Service</h4>
                  <p className="text-sm text-gray-500">Seamless experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CircleCheck className="text-[#d4af37] shrink-0" size={24} />
                <div>
                  <h4 className="font-bold mb-1">Prime Location</h4>
                  <p className="text-sm text-gray-500">Roselle Park, NJ</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Showcase */}
      <section id="showcase" className="py-24 px-6 bg-[#f8f5f2] overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Instagram className="text-[#d4af37]" size={24} />
                <h2 className="text-sm font-bold text-[#d4af37] uppercase tracking-[0.2em]">@parksignaturesuite</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-serif font-bold">See the Space in Action</h3>
            </div>
            <a 
              href="https://www.instagram.com/parksignaturesuite/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-[#1a1a1a] font-bold tracking-widest uppercase text-xs rounded-full hover:bg-[#d4af37] hover:text-white transition-all shadow-sm"
            >
              Follow Us
            </a>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              "https://files.catbox.moe/yphweu.jpg",
              "https://files.catbox.moe/9r2wnm.jpg",
              "https://files.catbox.moe/0xtos5.jpg",
              "https://files.catbox.moe/mg5owb.jpg"
            ].map((img, i) => (
              <motion.a 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                href="https://www.instagram.com/parksignaturesuite/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden block shadow-md"
              >
                <img 
                  src={img} 
                  alt={`Recent Event Profile ${i + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => e.currentTarget.src = `https://picsum.photos/seed/insta${i}/640/640`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Instagram className="text-white" size={32} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-sm font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-4">Gallery</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold">A Glimpse Inside</h3>
            </div>
            <p className="text-gray-500 max-w-md">
              Explore our versatile space and see how beautifully it can be transformed down to the finest detail for your next big event.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {GALLERY_IMAGES.map((img, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src={img} 
                  alt={`Gallery Detail ${index + 1}`} 
                  className="w-full h-full object-cover hover:brightness-110 transition-all"
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, `event-detail-${index}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-4">Occasions</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold">Perfect For Every Event</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENT_TYPES.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default"
              >
                <div className="w-12 h-12 bg-[#d4af37]/20 rounded-2xl flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
                  <Star size={24} />
                </div>
                <h4 className="text-2xl font-serif font-bold mb-4">{event.title}</h4>
                <p className="text-white/60 leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-4">FAQ</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "What is your guest capacity?",
                a: "Our venue comfortably accommodates up to 75 guests, perfect for intimate to medium-sized gatherings."
              },
              {
                q: "Can I bring my own caterer and decorations?",
                a: "Absolutely! We love seeing how our clients transform the space. You are welcome to bring your own food and completely customize the decor to fit your vision."
              },
              {
                q: "What is included in the rental?",
                a: "Your rental includes the private use of our modern suite, adjustable lighting, our built-in Bluetooth sound system, a small stage with microphones, and flexible tables and chairs."
              },
              {
                q: "How does the booking process work?",
                a: "You can book seamlessly through our official Peerspace listing or contact us directly to coordinate your specific dates and requirements."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#f8f5f2] rounded-2xl p-6 md:p-8"
              >
                <h4 className="text-xl font-bold font-serif mb-3 text-[#1a1a1a]">{faq.q}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Host Section */}
      <section id="host" className="py-24 px-6 bg-[#f8f5f2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 lg:w-1/3"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-gray-200">
                <img 
                  src="https://img.peerspace.com/image/upload/c_crop,g_custom,fl_progressive/c_scale,dpr_2.0,w_400/uc1wouhmrsprsy1pw3bz" 
                  alt="Dwight B - Owner" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[3rem]"></div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 lg:w-2/3"
            >
              <span className="inline-block px-4 py-1.5 bg-[#d4af37]/10 rounded-full text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-6">
                Your Host
              </span>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6">Meet Dwight B.</h3>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  As a trusted and honest businessman, Dwight is dedicated to working collaboratively with everyone to curate the best possible experience for their unique events.
                </p>
                <p>
                  With a commitment to reliable customer service and a focus on flexibility, his priority is helping you bring your vision to life and creating memorable moments at Park Signature Suite.
                </p>
                <p className="italic text-gray-500 border-l-4 border-[#d4af37] pl-4 mt-8">
                  &quot;Thanks for stopping by! I&apos;m excited to be a part of your next big celebration.&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f5f2] -skew-x-12 translate-x-1/2 pointer-events-none hidden lg:block"></div>
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
            {/* Left Column: Visuals & Map */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full flex flex-col gap-6"
              >
                {/* Image Grid to fill space */}
                <div className="grid grid-cols-2 gap-4 h-64">
                  <div className="rounded-3xl overflow-hidden shadow-lg">
                    <img 
                      src="https://files.catbox.moe/18s65a.jpg" 
                      alt="Venue Detail" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-lg">
                    <img 
                      src="https://files.catbox.moe/ugiasw.jpg" 
                      alt="Venue Setup" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Large Interactive Map */}
                <div className="flex-1 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-gray-100 relative z-0 min-h-[450px]">
                  <MapContainer 
                    center={[40.6619662, -74.2631179]} 
                    zoom={15} 
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[40.6619662, -74.2631179]}>
                      <Popup>
                        <div className="font-serif">
                          <strong className="text-[#d4af37]">Park Signature Suite</strong> <br /> 
                          21 E Westfield Ave, Roselle Park, NJ
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                  
                  {/* Map Overlay Badge */}
                  <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-black/5 hidden sm:block">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center text-white">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location</p>
                        <p className="text-sm font-bold">Roselle Park, NJ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Contact Info */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1.5 bg-[#d4af37]/10 rounded-full text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-6">
                  Get In Touch
                </span>
                <h3 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                  Ready to host your <br />
                  <span className="italic text-[#d4af37]">Next Event?</span>
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We&apos;re here to help you every step of the way. Book your date by contacting us directly, or secure your reservation instantly through Peerspace.
                </p>
                <div className="mb-12">
                  <a 
                    href="https://www.peerspace.com/pages/listings/692d1f89b1171ff50bb6bebe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-[#d4af37] text-white font-bold tracking-widest uppercase text-sm rounded-full hover:bg-black transition-colors shadow-xl"
                  >
                    Book on Peerspace
                  </a>
                </div>

                <div className="space-y-4">
                  {/* Address Card */}
                  <div className="group relative bg-[#f8f5f2] p-6 rounded-[2rem] border border-transparent hover:border-[#d4af37]/30 hover:bg-white hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#d4af37] shadow-sm group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Address</p>
                          <a 
                            href="https://www.google.com/maps/dir/?api=1&destination=21+E+Westfield+Ave,+Roselle+Park,+NJ+07204"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-bold hover:text-[#d4af37] transition-colors"
                          >
                            21 E Westfield Ave, Roselle Park, NJ
                          </a>
                        </div>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('21 E Westfield Ave, Roselle Park, NJ 07204', 'Address')}
                        className="p-3 text-gray-400 hover:text-[#d4af37] hover:bg-white rounded-xl transition-all"
                        title="Copy Address"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="group relative bg-[#f8f5f2] p-6 rounded-[2rem] border border-transparent hover:border-[#d4af37]/30 hover:bg-white hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#d4af37] shadow-sm group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
                          <Phone size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                          <a href="tel:+17323541184" className="text-lg font-bold hover:text-[#d4af37] transition-colors">
                            +1 732-354-1184
                          </a>
                        </div>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('+17323541184', 'Phone number')}
                        className="p-3 text-gray-400 hover:text-[#d4af37] hover:bg-white rounded-xl transition-all"
                        title="Copy Phone"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="group relative bg-[#f8f5f2] p-6 rounded-[2rem] border border-transparent hover:border-[#d4af37]/30 hover:bg-white hover:shadow-xl transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#d4af37] shadow-sm group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
                          <a href="mailto:psbooking21@gmail.com" className="text-lg font-bold hover:text-[#d4af37] transition-colors truncate block max-w-[200px] sm:max-w-none">
                            psbooking21@gmail.com
                          </a>
                        </div>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('psbooking21@gmail.com', 'Email address')}
                        className="p-3 text-gray-400 hover:text-[#d4af37] hover:bg-white rounded-xl transition-all"
                        title="Copy Email"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Stats / Capacity */}
                {/* Quick Stats / Capacity */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-3 gap-2 lg:gap-4"
                >
                  <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2 lg:gap-3 text-center xl:text-left">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#f8f5f2] rounded-full flex shrink-0 items-center justify-center text-[#d4af37] shadow-sm">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-xl lg:text-2xl font-serif font-bold text-[#1a1a1a]">75</p>
                      <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Capacity</p>
                    </div>
                  </div>
                  <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2 lg:gap-3 text-center xl:text-left">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#f8f5f2] rounded-full flex shrink-0 items-center justify-center text-[#d4af37] shadow-sm">
                      <div className="font-serif font-bold italic text-lg">sq</div>
                    </div>
                    <div>
                      <p className="text-xl lg:text-2xl font-serif font-bold text-[#1a1a1a]">980</p>
                      <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Square Feet</p>
                    </div>
                  </div>
                  <div className="flex flex-col xl:flex-row items-center xl:items-start gap-2 lg:gap-3 text-center xl:text-left">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#f8f5f2] rounded-full flex shrink-0 items-center justify-center text-[#d4af37] shadow-sm">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xl lg:text-2xl font-serif font-bold text-[#1a1a1a]">$125<span className="text-sm lg:text-base text-gray-500 font-sans font-normal ml-1 whitespace-nowrap">/ hr</span></p>
                      <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Starting Rate</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-16 px-6 border-t border-white/5 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="mb-6 bg-white p-3 rounded-2xl inline-block shadow-lg">
                <img 
                  src="https://files.catbox.moe/ugz732.png" 
                  alt="Park Signature Suite Logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-white/50 max-w-sm leading-relaxed mb-8">
                A modern, versatile event space in Roselle Park, NJ, designed to bring your vision to life. Creating memorable moments is our priority.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/parksignaturesuite/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-[#d4af37]/20 flex items-center justify-center hover:bg-[#d4af37] transition-all text-[#d4af37] hover:text-white">
                  <Instagram size={28} />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#d4af37]">Quick Links</h5>
              <ul className="space-y-4 text-white/60">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-white transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#d4af37]">Hours</h5>
              <ul className="space-y-4 text-white/60">
                <li className="flex justify-between">
                  <span>Sun - Fri</span>
                  <span>8am - 12am</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>10am - 12am</span>
                </li>
                <li className="pt-4 text-xs italic">
                  *Hours vary based on event bookings
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-sm">
            <p>&copy; {new Date().getFullYear()} Park Signature Suite. All rights reserved.</p>
            {/* Removed Privacy and TOS dummy links */}
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
