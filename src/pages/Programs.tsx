import { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  Cpu,
  CircuitBoard,
  ShieldCheck,
  FlaskConical,
  Rocket,
  TrendingUp,
  Wifi,
} from 'lucide-react';
import { PageHero, Section, SectionHeader, Card, Button, Badge } from '@/components/ui';
import { Reveal } from '@/components/Reveal';

type Program = {
  level: string;
  title: string;
  duration: string;
  description: string;
  highlights: string[];
};

const PROGRAMS: Program[] = [
  {
    level: 'Undergraduate',
    title: 'B.S. in Computer Engineering',
    duration: '4 years',
    description:
      'A comprehensive program combining electrical engineering and computer science. Students learn to design and build computing systems, from individual chips to full hardware-software stacks.',
    highlights: [
      'Digital logic and computer architecture',
      'Embedded systems and microcontroller design',
      'VLSI design and semiconductor fabrication',
      'Software engineering and operating systems',
      'Signals, systems, and digital signal processing',
      'Capstone senior design project',
    ],
  },
  {
    level: 'Graduate',
    title: 'M.S. in Computer Engineering',
    duration: '2 years',
    description:
      'A research-focused master\'s program with thesis and coursework options. Students specialize in one of six concentration areas and work closely with faculty advisors.',
    highlights: [
      'Thesis or project-based tracks',
      'Six concentration areas available',
      'Industry collaboration opportunities',
      'Teaching and research assistantships',
      'Access to state-of-the-art labs',
      'Pathway to PhD program',
    ],
  },
  {
    level: 'Graduate',
    title: 'Ph.D. in Computer Engineering',
    duration: '4-5 years',
    description:
      'A doctoral program producing independent researchers who advance the field. Students make original contributions to knowledge through dissertation research.',
    highlights: [
      'Original dissertation research',
      'Funded research assistantships',
      'Publication in top venues',
      'Mentoring under world-class faculty',
      'Teaching experience',
      'Career placement in academia and industry',
    ],
  },
];

const ELECTIVES = [
  { icon: Cpu, name: 'CPE 475', title: 'Quantum Computing Fundamentals' },
  { icon: ShieldCheck, name: 'CPE 462', title: 'Hardware Security & Trusted Design' },
  { icon: CircuitBoard, name: 'CPE 451', title: 'Advanced FPGA Design' },
  { icon: FlaskConical, name: 'CPE 448', title: 'Machine Learning on Embedded Systems' },
  { icon: Rocket, name: 'CPE 470', title: 'Autonomous Robot Systems' },
  { icon: TrendingUp, name: 'CPE 440', title: 'Digital Signal Processing II' },
  { icon: Wifi, name: 'CPE 430', title: 'Computer Networks & Protocols' },
  { icon: Cpu, name: 'CPE 420', title: 'Parallel Computer Architecture' },
];

const REQUIREMENTS = [
  'Strong foundation in mathematics (calculus, linear algebra, discrete math)',
  'Physics and chemistry fundamentals',
  'Programming experience (C/C++ preferred)',
  'SAT/ACT scores (undergraduate) or GRE (graduate)',
  'Personal statement and letters of recommendation',
  'Minimum GPA of 3.0 for transfer and graduate applicants',
];

export default function Programs() {
  const [selected, setSelected] = useState(0);
  const program = PROGRAMS[selected];

  return (
    <div>
      <PageHero
        eyebrow="Academics"
        title="Programs that build the engineers of tomorrow"
        subtitle="From undergraduate foundations to doctoral research, our curriculum is designed for depth, rigor, and real-world relevance."
      />

      {/* Program selector */}
      <Section>
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {PROGRAMS.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setSelected(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selected === i
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card hover={false} className="p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-4">
                <Badge color={program.level === 'Undergraduate' ? 'primary' : 'accent'}>
                  {program.level}
                </Badge>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  {program.duration}
                </div>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">{program.title}</h2>
              <p className="text-slate-600 leading-relaxed mb-6">{program.description}</p>
              <h3 className="font-bold text-slate-900 mb-3">Program Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {program.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{h}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card hover={false} className="p-6 bg-slate-950 border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Ready to apply?</h3>
              <p className="text-sm text-slate-400 mb-5">
                Fall 2026 applications are open. Talk to our admissions team to get started.
              </p>
              <Button to="/contact" className="w-full">
                Contact Admissions <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="mt-5 pt-5 border-t border-slate-800 space-y-2.5 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent-400" /> 120 credit hours
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent-400" /> ABET Accredited
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Electives */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Electives"
            title="Specialized electives for every interest"
            subtitle="Our elective courses let students go deep into emerging areas of computer engineering, taught by faculty actively researching the topic."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ELECTIVES.map((course, i) => (
              <Reveal key={course.name} delay={i * 60}>
                <div className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <course.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-xs font-bold text-primary-600 font-mono mb-1">{course.name}</div>
                  <div className="font-semibold text-slate-900 text-sm leading-snug">{course.title}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Admission requirements */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div>
            <SectionHeader center={false} eyebrow="Admissions" title="How to apply" />
            <p className="text-slate-600 leading-relaxed">
              Admission to our programs is competitive. We look for students with strong
              quantitative skills, a passion for technology, and the drive to solve hard problems.
              Here is what you need to prepare.
            </p>
            <div className="mt-6">
              <Button to="/contact">Start Your Application <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <Card hover={false} className="p-7">
            <h3 className="font-bold text-slate-900 mb-4">Requirements</h3>
            <ul className="space-y-3">
              {REQUIREMENTS.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-success-600" />
                  </div>
                  <span className="text-sm text-slate-700">{req}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </div>
  );
}
