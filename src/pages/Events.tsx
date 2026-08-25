import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { PageHero, Section, Card, Spinner, Button, Breadcrumb, Badge } from '@/components/ui';
import { Link, useRouter } from '@/lib/router';
import { supabase } from '@/lib/supabase';
import type { DepartmentEvent } from '@/lib/types';
import { useDataFetch } from '@/components/ui';

function formatTime(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function Events() {
  const { data: events, loading, error } = useDataFetch<DepartmentEvent>(() =>
    supabase.from('events').select('*').order('start_time', { ascending: true })
  );

  return (
    <div>
      <PageHero
        eyebrow="Events"
        title="Seminars, workshops & showcases"
        subtitle="Connect with the community at our upcoming events — from industry nights to hands-on workshops and student showcases."
      />

      <Section>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-12 text-error-600">Could not load events. Please try again later.</div>
        ) : events && events.length > 0 ? (
          <div className="space-y-6">
            {events.map((event) => {
              const date = new Date(event.start_time);
              const daysLeft = daysUntil(event.start_time);
              return (
                <Link key={event.id} to={`/events/${event.slug}`}>
                  <Card className="overflow-hidden group">
                    <div className="flex flex-col sm:flex-row">
                      {/* Date block */}
                      <div className="sm:w-32 flex-shrink-0 bg-gradient-to-br from-primary-600 to-accent-500 text-white p-6 flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-1">
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-4xl font-bold font-display leading-none">{date.getDate()}</div>
                        <div className="text-xs opacity-80 hidden sm:block">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                            {event.title}
                          </h3>
                          {daysLeft >= 0 && (
                            <Badge color={daysLeft <= 7 ? 'warning' : 'accent'}>
                              {daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `In ${daysLeft} days`}
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-3">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {date.toLocaleDateString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            {event.location}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 hidden lg:flex items-center">
                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No upcoming events scheduled.</p>
          </div>
        )}
      </Section>
    </div>
  );
}

export function EventDetailPage({ slug }: { slug: string }) {
  const { data: event, loading, error } = useDataFetch<DepartmentEvent>(async () => {
    const res = await supabase.from('events').select('*').eq('slug', slug).maybeSingle();
    return { data: res.data ? [res.data] : null, error: res.error };
  });
  const { navigate } = useRouter();

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error || !event || event.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center max-w-2xl mx-auto px-4">
        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Event not found</h1>
        <p className="text-slate-500 mb-6">This event doesn't exist or may have been removed.</p>
        <Button to="/events">Back to Events</Button>
      </div>
    );
  }

  const e = event[0];
  const daysLeft = daysUntil(e.start_time);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Events', to: '/events' }, { label: e.title }]} />

        <div className="h-56 lg:h-72 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 relative mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-24 h-24 text-white/20" />
          </div>
        </div>

        {daysLeft >= 0 && (
          <div className="mb-5">
            <Badge color={daysLeft <= 7 ? 'warning' : 'accent'}>
              {daysLeft === 0 ? 'Happening today' : daysLeft === 1 ? 'Tomorrow' : `In ${daysLeft} days`}
            </Badge>
          </div>
        )}

        <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">{e.title}</h1>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card hover={false} className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Date & Time</div>
                <div className="text-sm font-semibold text-slate-900">{formatTime(e.start_time)}</div>
                {e.end_time && (
                  <div className="text-xs text-slate-500">
                    until {new Date(e.end_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </div>
                )}
              </div>
            </div>
          </Card>
          <Card hover={false} className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Location</div>
                <div className="text-sm font-semibold text-slate-900">{e.location}</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          {e.description.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-700 leading-relaxed mb-5">{para}</p>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900">Interested in attending?</h3>
            <p className="text-sm text-slate-600 mt-1">Most events are free and open to the public.</p>
          </div>
          <Button to="/contact">Contact for Details <ArrowRight className="w-4 h-4" /></Button>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200">
          <button
            onClick={() => navigate('/events')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all events
          </button>
        </div>
      </div>
    </div>
  );
}
