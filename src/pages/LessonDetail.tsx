import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { courses, type Lesson } from '../data/curriculum';
import { useStore, type ProgressState } from '../store/useStore';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, PlayCircle, BookOpen, Code, Home, Trophy } from 'lucide-react';
import clsx from 'clsx';

export const LessonDetail = () => {
  const { lessonId } = useParams();
  const { progress, setProgress } = useStore();
  
  let currentCourse = null;
  let currentWeek = null;
  let currentLesson: Lesson | null = null;
  
  for (const course of courses) {
    for (const week of course.weeks) {
      const found = week.lessons.find(l => l.id === lessonId);
      if (found) {
        currentCourse = course;
        currentWeek = week;
        currentLesson = found;
        break;
      }
    }
    if (currentLesson) break;
  }

  useEffect(() => {
    if (currentLesson && progress[currentLesson.id] === undefined) {
      setProgress(currentLesson.id, 'in_progress');
    }
  }, [currentLesson, progress, setProgress]);

  if (!currentLesson || !currentCourse) return <Navigate to="/" replace />;

  const courseLessons = currentCourse.weeks.flatMap(w => w.lessons);
  const lessonIndex = courseLessons.findIndex(l => l.id === currentLesson?.id);
  const prevLesson = lessonIndex > 0 ? courseLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < courseLessons.length - 1 ? courseLessons[lessonIndex + 1] : null;

  const status = progress[currentLesson.id] || 'not_started';

  const statuses: { value: ProgressState; label: string; icon: any; color: string }[] = [
    { value: 'not_started', label: 'Boshlanmadi', icon: Circle, color: 'text-muted-foreground' },
    { value: 'in_progress', label: 'O\'qilmoqda', icon: PlayCircle, color: 'text-blue-500' },
    { value: 'completed', label: 'Tugatildi', icon: CheckCircle2, color: 'text-primary' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center text-sm text-muted-foreground gap-2">
        <Link to="/" className="hover:text-primary transition-colors">{currentCourse.title}</Link>
        <span>/</span>
        <span>{currentWeek?.title}</span>
      </div>

      <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {currentLesson.number}-dars: {currentLesson.title}
            </h1>
            <div className="flex items-center gap-4 text-sm mt-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                Nazariya va Amaliyot
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 min-w-[200px]">
            <p className="text-sm font-medium text-muted-foreground mb-1">Holati</p>
            <div className="flex bg-muted rounded-lg p-1">
              {statuses.map(s => (
                <button
                  key={s.value}
                  onClick={() => setProgress(currentLesson!.id, s.value)}
                  className={clsx(
                    "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-colors",
                    status === s.value ? "bg-background shadow-sm" : "hover:bg-background/50 text-muted-foreground"
                  )}
                >
                  <s.icon size={14} className={clsx(status === s.value && s.color)} />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {currentLesson.topics && currentLesson.topics.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2">
                <BookOpen className="text-blue-500" />
                Nazariya
              </h2>
              <ul className="space-y-3">
                {currentLesson.topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-lg leading-relaxed">{topic}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {currentLesson.practice && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2">
                <Code className="text-purple-500" />
                Amaliyot
              </h2>
              <div className="bg-muted/50 p-6 rounded-lg text-lg leading-relaxed border whitespace-pre-wrap">
                {currentLesson.practice}
              </div>
            </section>
          )}

          {currentLesson.homework && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2">
                <Home className="text-orange-500" />
                Uyga vazifa
              </h2>
              <div className="bg-muted/50 p-6 rounded-lg text-lg leading-relaxed border whitespace-pre-wrap">
                {currentLesson.homework}
              </div>
            </section>
          )}

          {currentLesson.result && (
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2">
                <Trophy className="text-emerald-500" />
                Natija
              </h2>
              <div className="bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 p-6 rounded-lg text-lg leading-relaxed border border-emerald-500/20 whitespace-pre-wrap">
                {currentLesson.result}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t">
        {prevLesson ? (
          <Link 
            to={`/lessons/${prevLesson.id}`}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors max-w-[45%]"
          >
            <ChevronLeft size={20} className="flex-shrink-0" />
            <div className="overflow-hidden">
              <p className="text-xs text-muted-foreground mb-0.5">Oldingi</p>
              <p className="font-medium truncate">{prevLesson.title}</p>
            </div>
          </Link>
        ) : <div />}
        
        {nextLesson ? (
          <Link 
            to={`/lessons/${nextLesson.id}`}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors max-w-[45%] text-right"
          >
            <div className="overflow-hidden">
              <p className="text-xs text-muted-foreground mb-0.5">Keyingi</p>
              <p className="font-medium truncate">{nextLesson.title}</p>
            </div>
            <ChevronRight size={20} className="flex-shrink-0" />
          </Link>
        ) : (
          <button 
            onClick={() => setProgress(currentLesson!.id, 'completed')}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Kursni yakunlash
            <CheckCircle2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
