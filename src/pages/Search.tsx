import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { courses } from '../data/curriculum';
import { Search as SearchIcon } from 'lucide-react';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    const matches: any[] = [];
    
    courses.forEach(course => {
      course.weeks.forEach(week => {
        week.lessons.forEach(lesson => {
          if (
            lesson.title.toLowerCase().includes(lowerQuery) ||
            lesson.topics.some(t => t.toLowerCase().includes(lowerQuery)) ||
            (lesson.practice && lesson.practice.toLowerCase().includes(lowerQuery))
          ) {
            matches.push({
              ...lesson,
              courseName: course.title,
              weekName: week.title
            });
          }
        });
      });
    });
    
    return matches;
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Qidiruv</h1>
      
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Darslar, mavzular, texnologiyalarni qidirish..."
          className="w-full bg-card border rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        />
      </form>
      
      {query && (
        <div className="space-y-4 pt-4">
          <p className="text-muted-foreground font-medium">
            "{query}" bo'yicha {results.length} ta natija topildi
          </p>
          
          <div className="grid gap-4">
            {results.map((result, i) => (
              <Link 
                key={i} 
                to={`/lessons/${result.id}`}
                className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                    <span className="bg-muted px-2 py-1 rounded">{result.courseName}</span>
                    <span>•</span>
                    <span>{result.weekName}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-primary">{result.title}</h3>
                  {result.topics.some((t: string) => t.toLowerCase().includes(query.toLowerCase())) && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      Mos mavzu topildi: {result.topics.find((t: string) => t.toLowerCase().includes(query.toLowerCase()))}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 text-muted-foreground hover:text-foreground">
                  Darsni ko'rish &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
