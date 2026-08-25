import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { PageHero, Section, Card, Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  const CONTACT_INFO = [
    { icon: MapPin, label: 'Visit Us', value: 'Engineering Hall, 300 Campus Drive' },
    { icon: Phone, label: 'Call Us', value: '(555) 123-4567' },
    { icon: Mail, label: 'Email Us', value: 'cpe.dept@university.edu' },
    { icon: Clock, label: 'Office Hours', value: 'Mon–Fri, 9:00 AM – 5:00 PM' },
  ];

  return (
    <div>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact the department"
        subtitle="Have a question about admissions, research, or events? We're here to help. Reach out and we'll get back to you."
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact info */}
          <div className="space-y-4">
            {CONTACT_INFO.map((info) => (
              <Card key={info.label} hover={false} className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {info.label}
                  </div>
                  <div className="text-sm font-medium text-slate-900 mt-0.5">{info.value}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card hover={false} className="p-7 lg:p-9">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-success-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message sent!</h3>
                  <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                    Thank you for reaching out. We'll get back to you within 2–3 business days.
                  </p>
                  <Button onClick={() => setStatus('idle')} variant="outline">
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Send us a message</h3>
                    <p className="text-sm text-slate-500">Fields marked with * are required.</p>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-error-50 border border-error-500/20 text-sm text-error-600">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Subject *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white cursor-pointer"
                    >
                      <option value="">Select a topic...</option>
                      <option value="Admissions">Admissions Inquiry</option>
                      <option value="Undergraduate Program">Undergraduate Program</option>
                      <option value="Graduate Program">Graduate Program</option>
                      <option value="Research Collaboration">Research Collaboration</option>
                      <option value="Faculty Position">Faculty Position</option>
                      <option value="Events">Events</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className={`w-full sm:w-auto ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={undefined}
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
