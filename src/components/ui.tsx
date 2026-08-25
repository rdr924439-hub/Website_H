import { useEffect, useState } from 'react';
import { Link } from '@/lib/router';
import { ChevronRight } from 'lucide-react';
import { useReveal } from '@/lib/hooks';

export function Section({
  id,
  className = '',
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`mb-12 ${center ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${
        visible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-600 leading-relaxed text-balance">{subtitle}</p>
      )}
    </div>
  );
}

export function Button({
  to,
  children,
  variant = 'primary',
  className = '',
  onClick,
  type,
}: {
  to?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5';
  const variants = {
    primary:
      'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30',
    secondary: 'bg-slate-900 text-white shadow-lg hover:bg-slate-800',
    outline:
      'border-2 border-slate-300 text-slate-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50/50',
    ghost: 'text-slate-700 hover:bg-slate-100',
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? 'button'} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export function Card({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${
        hover ? 'hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({ children, color = 'primary' }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    accent: 'bg-accent-50 text-accent-700 border-accent-200',
    success: 'bg-success-50 text-success-700 border-success-500/20',
    warning: 'bg-warning-50 text-warning-600 border-warning-500/20',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colors[color] ?? colors.primary}`}
    >
      {children}
    </span>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 30% 0%, rgba(51,102,255,0.25), transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(34,211,238,0.15), transparent 60%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent-400 mb-4 animate-fade-in">
          {eyebrow}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-balance animate-fade-in-up">
          {title}
        </h1>
        <p className="mt-5 text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto text-balance animate-fade-in-up animate-delay-200">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.to ? (
            <Link to={item.to} className="hover:text-primary-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-medium">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
        </span>
      ))}
    </nav>
  );
}

export function useDataFetch<T>(fetcher: () => PromiseLike<{ data: T[] | null; error: any }> | Promise<{ data: T[] | null; error: any }>) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data: result, error: err } = await fetcher();
        if (!active) return;
        if (err) {
          setError(err.message ?? 'Failed to load');
        } else {
          setData(result ?? []);
        }
      } catch (e: any) {
        if (active) setError(e.message ?? 'Failed to load');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
