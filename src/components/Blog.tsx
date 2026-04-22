import React from 'react';
import { motion } from 'framer-motion';

export default function Blog({ posts, t }: { posts: any[], t: any }) {
  return (
    <section id="blog" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 font-outfit">{t.nav.blog}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <motion.a 
              key={post.slug}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-bg-card border border-white/5 hover:border-brand-primary/30 transition-all group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{post.data.title}</h3>
              <p className="text-white/40 text-sm mb-4">{post.data.description}</p>
              <div className="text-xs text-brand-secondary font-bold uppercase tracking-wider">Read More →</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
