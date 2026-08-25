import { Cpu, Mail, MapPin, Phone, Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from '@/lib/router';

const FOOTER_LINKS = [
  {
    title: 'Academics',
    links: [
      { label: 'Undergraduate', to: '/programs' },
      { label: 'Graduate', to: '/programs' },
      { label: 'Course Catalog', to: '/programs' },
      { label: 'Senior Design', to: '/events' },
    ],
  },
  {
    title: 'Department',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Faculty', to: '/faculty' },
      { label: 'News', to: '/news' },
      { label: 'Events', to: '/events' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Admissions', to: '/contact' },
      { label: 'Research Labs', to: '/about' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-display font-bold text-white">Computer Engineering</div>
                <div className="text-xs text-slate-400">Department</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-5">
              Advancing the frontier of hardware, software, and intelligent systems through
              world-class research and education.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <span>Engineering Hall, 300 Campus Drive</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <span>cpe.dept@university.edu</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display font-semibold text-white text-sm mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 hover:text-accent-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Department of Computer Engineering. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[Github, Linkedin, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#/"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:-translate-y-0.5"
                onClick={(e) => e.preventDefault()}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
