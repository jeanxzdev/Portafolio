import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short")
});

export default function Contact({ t }: { t: any }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (resp.ok) {
        alert("Message sent!");
        reset();
      }
    } catch (e) {
      alert("Error sending message.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg-card/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-8 font-outfit">{t.nav.contact}</h2>
            <p className="text-white/60 mb-12 max-w-md">
              Let's build something amazing together. Feel free to reach out for collaborations or just a friendly hello.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <MapPin className="text-brand-primary" />, text: "Trujillo, Peru" },
                { icon: <Phone className="text-brand-primary" />, text: "+51 963562067" },
                { icon: <Mail className="text-brand-primary" />, text: "jeanxzdev@gmail.com" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  {item.icon}
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/60">Name</label>
              <input 
                {...register('name')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-primary/50 focus:ring-0 transition-all outline-none" 
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-white/60">Email</label>
              <input 
                {...register('email')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-primary/50 focus:ring-0 transition-all outline-none" 
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/60">Message</label>
              <textarea 
                {...register('message')}
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-brand-primary/50 focus:ring-0 transition-all outline-none resize-none" 
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message as string}</p>}
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-white text-black hover:bg-white/90 font-bold rounded-xl transition-all disabled:opacity-50 group"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
