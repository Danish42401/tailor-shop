import { siteSettings } from "@/data/products";
import { Phone, MapPin, Clock, Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Visit Our <span className="text-amber-600">Boutique</span></h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed font-medium">
          Step into our world of bespoke fashion. Our master tailors are waiting to welcome you in the heart of Dubai.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        {/* Info Cards */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-start gap-6">
            <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600"><MapPin size={24} /></div>
            <div>
              <h4 className="font-bold text-lg mb-1">Our Location</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{siteSettings.shopAddress}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-start gap-6">
            <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600"><Phone size={24} /></div>
            <div>
              <h4 className="font-bold text-lg mb-1">Contact Us</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">WhatsApp: +{siteSettings.whatsappNumber}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-start gap-6">
            <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600"><Clock size={24} /></div>
            <div>
              <h4 className="font-bold text-lg mb-1">Opening Hours</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Sat - Thu: 10:00 AM - 10:00 PM<br/>Friday: 4:00 PM - 10:00 PM</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-slate-900 text-white p-12 rounded-[3rem] flex flex-col justify-center items-center text-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 blur-[100px]" />
          
          <MessageSquare size={64} className="text-amber-500 mb-4" strokeWidth={1.5} />
          <h3 className="text-3xl font-black tracking-tight leading-tight">Ready to start your <br/> bespoke journey?</h3>
          <p className="text-slate-400 font-medium">Chat directly with our design team for immediate assistance and bookings.</p>
          <a 
            href={`https://wa.me/${siteSettings.whatsappNumber}`} 
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl shadow-amber-900/40"
          >
            Open WhatsApp Chat
          </a>
        </div>
      </div>
    </div>
  );
}
