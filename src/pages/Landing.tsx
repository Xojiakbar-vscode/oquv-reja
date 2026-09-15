import React, { useState } from 'react';
import { ArrowDown, BookOpen, Code, Trophy, Cpu, CheckCircle2, Briefcase, GraduationCap, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import { courses } from '../data/curriculum';
import clsx from 'clsx';

export const Landing = () => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [openWeeks, setOpenWeeks] = useState<string[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [expandedExam, setExpandedExam] = useState<string | null>(null);

  const toggleCourse = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
      const course = courses.find(c => c.id === courseId);
      if (course && course.weeks.length > 0) {
        setOpenWeeks([course.weeks[0].id]);
      }
    }
  };

  const toggleWeek = (weekId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenWeeks(prev => 
      prev.includes(weekId) ? prev.filter(id => id !== weekId) : [...prev, weekId]
    );
  };

  const toggleLesson = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedLesson(prev => prev === lessonId ? null : lessonId);
  };

  const projects = courses.flatMap(course => 
    course.weeks.flatMap(week => 
      week.lessons
        .filter(l => l.title.toLowerCase().includes('project') || l.title.toLowerCase().includes('loyiha'))
        .map(lesson => ({ ...lesson, courseName: course.title }))
    )
  );

  const exams = courses.flatMap(course => 
    course.weeks.flatMap(week => 
      week.lessons
        .filter(l => l.title.toLowerCase().includes('exam') || l.title.toLowerCase().includes('imtixon') || l.title.toLowerCase().includes('imtihon'))
        .map(lesson => ({ ...lesson, courseName: course.title }))
    )
  );

  const technologies = [
    { name: 'HTML', category: 'Frontend' }, { name: 'CSS', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' }, { name: 'JavaScript', category: 'Frontend / Backend' },
    { name: 'React', category: 'Frontend' }, { name: 'Vue.js', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' }, { name: 'PostgreSQL', category: 'Ma\'lumotlar bazasi' },
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="pt-20 md:pt-32 relative overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Yangi guruhlarga qabul ochiq
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Zamonaviy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Full-Stack</span> dasturchiga aylaning
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Noldan boshlab to'liq ishga tayyor mutaxassis bo'lib yetishishingiz uchun mo'ljallangan intensiv o'quv dasturi. Backend va Frontend ni amaliy loyihalar bilan o'rganing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#courses" className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
              Dasturni ko'rish <ArrowDown size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Courses Section (Vertical Accordion) */}
      <section id="courses" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold">O'quv dasturi (Kurslar)</h2>
          <p className="text-muted-foreground">Barcha kurslar ketma-ketlikda tuzilgan. Batafsil ko'rish uchun ustiga bosing.</p>
        </div>
        
        <div className="space-y-6">
          {courses.map((course, i) => {
            const isExpanded = expandedCourse === course.id;
            
            return (
              <div key={course.id} className={clsx(
                "bg-card rounded-2xl border transition-all duration-300 overflow-hidden",
                isExpanded ? "shadow-lg border-primary/50" : "shadow-sm hover:shadow-md hover:border-border/80"
              )}>
                {/* Course Header (Clickable) */}
                <div 
                  onClick={() => toggleCourse(course.id)}
                  className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">
                        {i + 1}-bosqich
                      </span>
                      <h3 className="text-2xl font-bold">{course.title}</h3>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 md:line-clamp-none">
                      {course.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 md:min-w-[250px]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 size={16} className="text-primary" /> 
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <BookOpen size={16} className="text-primary" /> 
                        {course.lessonsCount} ta dars
                      </div>
                    </div>
                    <button className="p-2 bg-muted rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                      {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </button>
                  </div>
                </div>

                {/* Course Content (Weeks & Lessons) */}
                {isExpanded && (
                  <div className="px-6 pb-8 pt-2 md:px-8 bg-background border-t">
                    <h4 className="font-bold text-lg mb-4 mt-6">Darslar tarkibi:</h4>
                    <div className="space-y-4">
                      {course.weeks.map((week) => {
                        const isWeekOpen = openWeeks.includes(week.id);
                        return (
                          <div key={week.id} className="border rounded-xl bg-card overflow-hidden shadow-sm">
                            <button 
                              className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted transition-colors text-left font-semibold"
                              onClick={(e) => toggleWeek(week.id, e)}
                            >
                              <span>{week.title}</span>
                              {isWeekOpen ? <ChevronUp size={20} className="text-muted-foreground" /> : <ChevronDown size={20} className="text-muted-foreground" />}
                            </button>
                            
                            {isWeekOpen && (
                              <div className="divide-y divide-border/50">
                                {week.lessons.map((lesson) => (
                                  <div key={lesson.id} className="flex flex-col">
                                    <button 
                                      onClick={(e) => toggleLesson(lesson.id, e)}
                                      className="flex items-center p-4 hover:bg-muted/50 transition-colors group text-left"
                                    >
                                      <div className="mr-4 text-muted-foreground group-hover:text-primary">
                                        <PlayCircle size={18} />
                                      </div>
                                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <h4 className="font-medium group-hover:text-primary transition-colors">
                                          {lesson.number}-dars: {lesson.title}
                                        </h4>
                                        {expandedLesson === lesson.id ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                                      </div>
                                    </button>
                                    
                                    {/* Lesson Expanded Details */}
                                    {expandedLesson === lesson.id && (
                                      <div className="px-10 pb-4 pt-2 bg-muted/10 space-y-4 text-sm">
                                        {lesson.topics && lesson.topics.length > 0 && (
                                          <div>
                                            <p className="font-semibold text-muted-foreground mb-2">O'rganiladigan mavzular:</p>
                                            <ul className="list-disc list-inside space-y-1 text-foreground/80">
                                              {lesson.topics.map((t, idx) => <li key={idx}>{t}</li>)}
                                            </ul>
                                          </div>
                                        )}
                                        {lesson.practice && (
                                          <div>
                                            <p className="font-semibold text-muted-foreground mb-2">Amaliyot:</p>
                                            <div className="bg-muted p-3 rounded-md border text-foreground/80 whitespace-pre-wrap font-mono text-xs">
                                              {lesson.practice}
                                            </div>
                                          </div>
                                        )}
                                        {lesson.homework && (
                                          <div>
                                            <p className="font-semibold text-muted-foreground mb-2">Uyga vazifa:</p>
                                            <div className="bg-muted p-3 rounded-md border text-foreground/80 whitespace-pre-wrap text-xs">
                                              {lesson.homework}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full py-12">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold">O'quv xaritasi</h2>
          <p className="text-muted-foreground">HTML asoslaridan to Full Stack dasturlashgacha bo'lgan to'liq yo'l</p>
        </div>
        <div className="relative py-8">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2 hidden md:block" />
          <div className="space-y-12 relative z-10">
            {courses.map((course, index) => (
              <div key={course.id} className={`flex flex-col md:flex-row items-center gap-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div 
                    onClick={() => {
                      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                      toggleCourse(course.id);
                    }}
                    className="cursor-pointer block w-full max-w-sm bg-card border shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur" />
                    <div className="relative">
                      <div className="flex justify-between items-start mb-4"><h3 className="text-xl font-bold">{course.title}</h3></div>
                      <p className="text-sm text-muted-foreground">{course.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex w-14 h-14 rounded-full border-4 border-background bg-primary text-primary-foreground items-center justify-center font-bold z-10 text-xl">{index + 1}</div>
                <div className="w-full md:w-1/2" />
                {index < courses.length - 1 && <div className="md:hidden flex justify-center w-full py-2 text-muted-foreground"><ArrowDown size={32} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects and Exams Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12">
        {/* Projects */}
        <div id="projects" className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-500/10 text-purple-500 rounded-2xl"><Briefcase size={32} /></div>
            <div><h2 className="text-3xl font-bold">Amaliy Loyihalar</h2><p className="text-muted-foreground">Portfolio uchun real loyihalar</p></div>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project, i) => (
              <div key={i} className="bg-card border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setExpandedProject(prev => prev === project.id ? null : project.id)}
                  className="w-full text-left p-6 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-purple-500 font-medium"><Code size={16} />{project.courseName}</div>
                    {expandedProject === project.id ? <ChevronUp size={20} className="text-muted-foreground" /> : <ChevronDown size={20} className="text-muted-foreground" />}
                  </div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </button>
                {expandedProject === project.id && (
                  <div className="px-6 pb-6 pt-2 bg-muted/10 border-t">
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 mb-4">
                      {project.topics.map((t, idx) => <li key={idx}>{t}</li>)}
                    </ul>
                    {project.practice && (
                      <div className="bg-muted p-4 rounded-lg font-mono text-xs whitespace-pre-wrap">{project.practice}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Exams */}
        <div id="exams" className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-orange-500/10 text-orange-500 rounded-2xl"><GraduationCap size={32} /></div>
            <div><h2 className="text-3xl font-bold">Imtihonlar</h2><p className="text-muted-foreground">Bilimingizni sinash uchun nazoratlar</p></div>
          </div>
          <div className="space-y-4">
            {exams.map((exam, i) => (
              <div key={i} className="bg-card border rounded-2xl overflow-hidden hover:shadow-md transition-shadow relative">
                <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none"><Trophy size={80} /></div>
                <button 
                  onClick={() => setExpandedExam(prev => prev === exam.id ? null : exam.id)}
                  className="w-full text-left p-6 relative z-10 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-orange-500 font-medium"><Trophy size={16} />{exam.courseName}</div>
                    {expandedExam === exam.id ? <ChevronUp size={20} className="text-muted-foreground" /> : <ChevronDown size={20} className="text-muted-foreground" />}
                  </div>
                  <h3 className="text-xl font-bold">{exam.title}</h3>
                </button>
                {expandedExam === exam.id && (
                  <div className="px-6 pb-6 pt-2 bg-muted/10 border-t relative z-10">
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 mb-4">
                      {exam.topics.map((t, idx) => <li key={idx}>{t}</li>)}
                    </ul>
                    {exam.practice && (
                      <div className="bg-muted p-4 rounded-lg font-mono text-xs whitespace-pre-wrap">{exam.practice}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-muted/30 rounded-3xl p-8 md:p-16 border">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Texnologiyalar</h2>
          <p className="text-muted-foreground">O'quv dasturida qamrab olingan stack</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, i) => (
            <div key={i} className="bg-card border rounded-xl px-6 py-4 shadow-sm flex items-center gap-3">
              <Cpu className="text-primary" size={20} />
              <span className="font-bold">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
