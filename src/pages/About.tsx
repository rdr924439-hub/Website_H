import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { PageHero, Section, SectionHeader, Card, Button } from '@/components/ui';
import { Reveal } from '@/components/Reveal';

const VALUES = [
  {
    icon: Target,
    title: 'Mission',
    desc: 'To educate the next generation of computer engineers and conduct transformative research that bridges hardware and software for the benefit of society.',
  },
  {
    icon: Eye,
    title: 'Vision',
    desc: 'To be a globally recognized leader in computer engineering education and research, known for innovation at the intersection of computing disciplines.',
  },
  {
    icon: Heart,
    title: 'Values',
    desc: 'Excellence, integrity, inclusivity, and impact. We pursue rigorous scholarship while fostering a supportive community where every voice matters.',
  },
];

const HIGHLIGHTS = [
  { icon: Building2, label: 'Research Labs', value: '12' },
  { icon: Award, label: 'Patents Held', value: '40+' },
  { icon: GraduationCap, label: 'Degrees Awarded / Year', value: '300+' },
  { icon: Briefcase, label: 'Job Placement', value: '97%' },
];

const TIMELINE = [
  { year: '1975', text: 'Department founded as Electrical Engineering expanded into computing.' },
  { year: '1989', text: 'First accredited BS in Computer Engineering program established.' },
  { year: '2003', text: 'PhD program launched with specializations in architecture and VLSI.' },
  { year: '2015', text: 'New Engineering Hall opens with dedicated CE labs and cleanroom.' },
  { year: '2021', text: 'AI Research Lab established with industry-funded GPU cluster.' },
  { year: '2026', text: 'Quantum Hardware Initiative launched with NSF CAREER funding.' },
];

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About the Department"
        title="A tradition of innovation since 1975"
        subtitle="For over five decades, we have educated engineers and produced research that shapes how the world computes."
      />

      {/* Mission / Vision / Values */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center mb-5">
                  <v.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Highlights */}
      <section className="bg-slate-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.label} delay={i * 80} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <h.icon className="w-7 h-7 text-accent-400" />
                </div>
                <div className="text-4xl font-bold text-white font-display">{h.value}</div>
                <div className="text-sm text-slate-400 mt-1">{h.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Section>
        <SectionHeader
          eyebrow="Our History"
          title="Five decades of milestones"
          subtitle="From a small group of faculty to a leading research department — a timeline of the moments that defined us."
        />
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 sm:-translate-x-px" />
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal
                  key={item.year}
                  delay={i * 60}
                  className={`relative flex items-center mb-8 ${
                    isLeft ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <div className="hidden sm:block flex-1" />
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-md sm:-translate-x-2 z-10" />
                  <div className="ml-12 sm:ml-0 sm:flex-1 sm:px-8">
                    <Card className="p-5">
                      <div className="text-primary-600 font-bold font-display text-lg">{item.year}</div>
                      <p className="text-sm text-slate-600 mt-1">{item.text}</p>
                    </Card>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Accreditation */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card hover={false} className="p-8 lg:p-10 bg-gradient-to-br from-primary-50 to-accent-50 border-primary-100">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900">ABET Accredited</h3>
                <p className="text-sm text-slate-600 mt-2">
                  Our Bachelor of Science in Computer Engineering program is accredited by the
                  Engineering Accreditation Commission of ABET, ensuring our curriculum meets the
                  highest standards of engineering education.
                </p>
              </div>
              <Button to="/programs" className="flex-shrink-0">View Programs</Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
