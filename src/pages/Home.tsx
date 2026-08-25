import { useEffect, useState } from 'react';
import {
  Cpu,
  ArrowRight,
  Users,
  BookOpen,
  Award,
  FlaskConical,
  Microscope,
  Rocket,
  ShieldCheck,
  CircuitBoard,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { Link } from '@/lib/router';
import { Section, SectionHeader, Button, Card, Badge, Spinner } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { supabase } from '@/lib/supabase';
import type { NewsArticle, DepartmentEvent } from '@/lib/types';

const HERO_IMAGE = 'https://images.pexels.com/photos/36169774/pexels-photo-36169774.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const LAB_IMAGE = 'https://images.pexels.com/photos/6208708/pexels-photo-6208708.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const CHIP_IMAGE = 'https://images.pexels.com/photos/51165/cpu-processor-electronics-computer-51165.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const STATS = [
  { icon: Users, value: '1,200+', label: 'Undergraduate Students' },
  { icon: Microscope, value: '180+', label: 'Graduate Students' },
  { icon: BookOpen, value: '45', label: 'Faculty Members' },
  { icon: Award, value: '$12M', label: 'Annual Research Funding' },
];

const RESEARCH_AREAS = [
  {
    icon: Cpu,
    title: 'Computer Architecture',
    desc: 'Processor design, memory systems, and hardware-software co-design for next-generation computing platforms.',
  },
  {
    icon: CircuitBoard,
    title: 'Embedded & IoT Systems',
    desc: 'Ultra-low-power design, sensor networks, and edge computing for the connected world.',
  },
  {
    icon: ShieldCheck,
    title: 'Hardware Security',
    desc: 'Side-channel analysis, trusted IC design, and physical unclonable functions for tamper-resistant systems.',
  },
  {
    icon: FlaskConical,
    title: 'AI & Machine Learning',
    desc: 'Accelerator design for deep learning, computer vision, and autonomous systems at the edge.',
  },
  {
    icon: Rocket,
    title: 'Quantum Computing',
    desc: 'Quantum architecture, cryogenic control electronics, and algorithms for the post-classical era.',
  },
  {
    icon: TrendingUp,
    title: 'VLSI & DSP',
    desc: 'Large-scale chip design, signal processing, and high-performance interconnect technologies.',
  },
];

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<DepartmentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [newsRes, eventsRes] = await Promise.all([
        supabase.from('news').select('*').order('published_at', { ascending: false }).limit(3),
        supabase.from('events').select('*').order('start_time', { ascending: true }).limit(3),
      ]);
      setNews(newsRes.data ?? []);
      setEvents(eventsRes.data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at 20% 30%, rgba(51,102,255,0.2), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(34,211,238,0.12), transparent 50%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-sm text-white/90 font-medium">Ranked Top 10 nationally for computer engineering research</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] text-balance animate-fade-in-up">
              Engineering the
              <span className="block gradient-text bg-gradient-to-r from-primary-400 via-accent-400 to-primary-300">
                Future of Computing
              </span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              The Department of Computer Engineering advances the frontier of hardware, software,
              and intelligent systems through world-class research and education.
            </p>
            <div className="mt-9 flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
              <Button to="/programs" className="text-base px-7 py-3.5">
                Explore Programs <ArrowRight className="w-4 h-4" />
              </Button>
              <Button to="/about" variant="outline" className="text-base px-7 py-3.5 border-white/30 text-white hover:border-white hover:bg-white/10">
                About the Department
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Stats */}
      <Section className="-mt-16 relative z-10 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <Card key={i} className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-slate-900 font-display">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Research areas */}
      <Section>
        <SectionHeader
          eyebrow="Research"
          title="Where Hardware Meets Intelligence"
          subtitle="Our research spans the full stack — from the silicon up to the algorithms that run on it. We tackle problems that matter, with real-world impact."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESEARCH_AREAS.map((area, i) => (
            <Reveal key={area.title} delay={i * 80}>
              <div className="group p-7 rounded-2xl bg-white border border-slate-200 hover:border-primary-300 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <area.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{area.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{area.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Feature banner */}
      <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(51,102,255,0.15), transparent 60%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge color="accent">State-of-the-Art Facilities</Badge>
              <h2 className="mt-4 text-3xl lg:text-5xl font-bold text-white text-balance">
                The new AI Research Laboratory is now open
              </h2>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">
                A 400-square-meter facility equipped with GPU-accelerated compute clusters for deep
                learning, computer vision, and autonomous systems research. The lab hosts weekly
                reading groups and monthly industry talks.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Dedicated GPU compute clusters for large model training',
                  'Collaborative spaces for graduate research',
                  'Partnerships with the School of Medicine and industry',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/about" variant="primary">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-600/20 to-accent-500/20 rounded-3xl blur-2xl" />
              <img
                src={LAB_IMAGE}
                alt="Students in engineering laboratory"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News + Events */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* News */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Latest News</h2>
              <Link to="/news" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {loading ? (
              <Spinner />
            ) : news.length === 0 ? (
              <p className="text-slate-500">No news yet. Check back soon.</p>
            ) : (
              <div className="space-y-4">
                {news.map((article) => (
                  <Link key={article.id} to={`/news/${article.slug}`}>
                    <Card className="p-5 flex gap-4 group">
                      <div className="flex-shrink-0">
                        {article.image_url ? (
                          <img src={article.image_url} alt="" className="w-20 h-20 rounded-xl object-cover" />
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                            <TrendingUp className="w-8 h-8 text-primary-600" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-slate-400 mb-1">
                          {new Date(article.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{article.excerpt}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Upcoming Events</h2>
              <Link to="/events" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {loading ? (
              <Spinner />
            ) : events.length === 0 ? (
              <p className="text-slate-500">No upcoming events.</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => {
                  const date = new Date(event.start_time);
                  return (
                    <Link key={event.id} to={`/events/${event.slug}`}>
                      <Card className="p-5 flex gap-4 group">
                        <div className="flex-shrink-0 w-16 text-center">
                          <div className="bg-gradient-to-br from-primary-600 to-accent-500 text-white rounded-xl py-2 px-3">
                            <div className="text-xs font-semibold uppercase opacity-80">
                              {date.toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                            <div className="text-2xl font-bold font-display">{date.getDate()}</div>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {date.toLocaleDateString('en-US', { weekday: 'long', hour: 'numeric', minute: '2-digit' })}
                            </span>
                          </div>
                          <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-1">{event.location}</p>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.15), transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={CHIP_IMAGE} alt="" className="w-24 h-24 rounded-2xl object-cover mx-auto mb-6 shadow-2xl" />
          <h2 className="text-3xl lg:text-5xl font-bold text-white text-balance">
            Ready to build what comes next?
          </h2>
          <p className="mt-5 text-lg text-primary-100 max-w-2xl mx-auto text-balance">
            Join a community of innovators shaping the future of computing. Applications for Fall 2026
            are now open.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button to="/contact" variant="secondary" className="text-base px-7 py-3.5 bg-white text-primary-700 hover:bg-slate-100">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Button>
            <Button to="/programs" variant="outline" className="text-base px-7 py-3.5 border-white/40 text-white hover:border-white hover:bg-white/10">
              View Programs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
