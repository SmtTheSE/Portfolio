import { motion } from 'framer-motion';
import { useGardenNotes } from '../../hooks/useAtproto';
import { formatRelativeTime } from '../../lib/atproto/format';
import SectionHeader from '../SectionHeader';

export default function GardenNotes() {
  const { data, loading } = useGardenNotes();

  return (
    <section id="notes" className="py-16 md:py-20 px-6 md:px-12 scroll-mt-[52px] w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <SectionHeader label="Notes" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col gap-3">
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-xs">
            Short thinking notes. They start local and can move onto my PDS as portable records, so the writing travels with the identity.
          </p>
          <span className="text-[9px] uppercase tracking-[0.2em] text-text-muted">
            source: {loading ? '…' : data.source}
          </span>
        </div>

        <div className="md:col-span-8 border border-border-light divide-y divide-border-light overflow-hidden">
          {data.notes.map((note, i) => (
            <motion.article
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="p-6 md:p-8 flex flex-col gap-3 hover:bg-secondary-bg/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base md:text-lg font-medium tracking-tight text-text-main">{note.title}</h3>
                <time className="text-[9px] uppercase tracking-[0.15em] text-text-muted shrink-0">
                  {formatRelativeTime(note.updatedAt)}
                </time>
              </div>
              <p className="text-sm font-light text-text-main/90 leading-relaxed">{note.body}</p>
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {note.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary-bg text-[9px] uppercase tracking-[0.15em] text-text-muted px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
