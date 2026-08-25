import { Mail, MapPin, Briefcase, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import { PageHero, Section, Card, Spinner, Badge } from '@/components/ui';
import { Link } from '@/lib/router';
import { supabase } from '@/lib/supabase';
import type { FacultyMember } from '@/lib/types';
import { useDataFetch } from '@/components/ui';

export default function Faculty() {
  const { data: faculty, loading, error } = useDataFetch<FacultyMember>(() =>
    supabase.from('faculty').select('*').order('created_at', { ascending: true })
  );
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('All');

  const allAreas = faculty
    ? Array.from(new Set(faculty.flatMap((f) => f.research_areas))).sort()
    : [];
  const areas = ['All', ...allAreas];

  const filtered = faculty?.filter((f) => {
    const matchesQuery =
      !query ||
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.research_areas.some((a) => a.toLowerCase().includes(query.toLowerCase()));
    const matchesArea = area === 'All' || f.research_areas.includes(area);
    return matchesQuery && matchesArea;
  });

  return (
    <div>
      <PageHero
        eyebrow="Our People"
        title="Meet our faculty"
        subtitle="World-class researchers and dedicated educators driving innovation across every layer of computing."
      />

      <Section>
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search faculty by name, title, or research area..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all cursor-pointer"
          >
            {areas.map((a) => (
              <option key={a} value={a}>
                {a === 'All' ? 'All Research Areas' : a}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-12 text-error-600">
            Could not load faculty. Please try again later.
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((member, i) => (
              <Card key={member.id} className="overflow-hidden group" >
                <div
                  className="h-32 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 relative"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-grid opacity-20" />
                </div>
                <div className="p-6 -mt-14 relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-3xl font-bold text-slate-500 font-display border-4 border-white shadow-lg mb-4">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                  <p className="text-sm text-primary-600 font-medium mb-3">{member.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.research_areas.slice(0, 3).map((a) => (
                      <Badge key={a} color="slate">{a}</Badge>
                    ))}
                  </div>
                  <div className="space-y-1.5 text-sm text-slate-500 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    {member.office && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{member.office}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">No faculty members match your search.</p>
            <button
              onClick={() => {
                setQuery('');
                setArea('All');
              }}
              className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </Section>

      {/* Join CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card hover={false} className="p-8 lg:p-10 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800 text-center">
            <Briefcase className="w-12 h-12 text-accent-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Join our faculty</h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              We are always looking for talented researchers and educators to join our community.
              Explore open positions and start a conversation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-all hover:-translate-y-0.5"
            >
              View Open Positions <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
