import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { PageHero, Section, Card, Spinner, Button, Breadcrumb } from '@/components/ui';
import { Link, useRouter } from '@/lib/router';
import { supabase } from '@/lib/supabase';
import type { NewsArticle } from '@/lib/types';
import { useDataFetch } from '@/components/ui';

export default function News() {
  const { data: articles, loading, error } = useDataFetch<NewsArticle>(() =>
    supabase.from('news').select('*').order('published_at', { ascending: false })
  );

  return (
    <div>
      <PageHero
        eyebrow="News & Updates"
        title="The latest from the department"
        subtitle="Research breakthroughs, student achievements, and announcements from the Computer Engineering community."
      />

      <Section>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-12 text-error-600">Could not load news. Please try again later.</div>
        ) : articles && articles.length > 0 ? (
          <>
            {/* Featured article */}
            <Link to={`/news/${articles[0].slug}`}>
              <Card className="overflow-hidden mb-10 group">
                <div className="grid lg:grid-cols-2">
                  <div className="h-64 lg:h-auto bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 relative">
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar className="w-20 h-20 text-white/30" />
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(articles[0].published_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {articles[0].title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-5">{articles[0].excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                      Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Rest */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1).map((article) => (
                <Link key={article.id} to={`/news/${article.slug}`}>
                  <Card className="overflow-hidden h-full group flex flex-col">
                    <div className="h-44 bg-gradient-to-br from-primary-500 to-accent-500 relative">
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-white/30" />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-xs text-slate-400 mb-2">
                        {new Date(article.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3 flex-1">{article.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                        Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">No news articles yet. Check back soon.</p>
          </div>
        )}
      </Section>
    </div>
  );
}

export function NewsArticlePage({ slug }: { slug: string }) {
  const { data: article, loading, error } = useDataFetch<NewsArticle>(async () => {
    const res = await supabase.from('news').select('*').eq('slug', slug).maybeSingle();
    return { data: res.data ? [res.data] : null, error: res.error };
  });
  const { navigate } = useRouter();

  if (loading) return <div className="pt-32"><Spinner /></div>;
  if (error || !article || article.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Article not found</h1>
        <p className="text-slate-500 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button to="/news">Back to News</Button>
      </div>
    );
  }

  const a = article[0];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'News', to: '/news' }, { label: a.title }]} />

        <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <Calendar className="w-4 h-4" />
          {new Date(a.published_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>

        <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 text-balance">{a.title}</h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">{a.excerpt}</p>

        <div className="h-64 lg:h-80 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 relative mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-24 h-24 text-white/20" />
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          {a.content.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-700 leading-relaxed mb-5">{para}</p>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200">
          <button
            onClick={() => navigate('/news')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all news
          </button>
        </div>
      </div>
    </div>
  );
}
