import { useEffect, useState } from 'react';
import studyImage from '@/assets/study-milestone.jpg';
import codingImage from '@/assets/coding-milestone.jpg';
import failureImage from '@/assets/failure-milestone.jpg';
import interviewImage from '@/assets/interview-milestone.jpg';
import successImage from '@/assets/success-milestone.jpg';

interface TimelineItem {
  title: string;
  description: string;
  image: string;
  delay: number;
}

const timelineItems: TimelineItem[] = [
  {
    title: "📚 Study Phase",
    description: "Countless hours of learning, reading, and absorbing knowledge",
    image: studyImage,
    delay: 0,
  },
  {
    title: "💻 Coding Journey",
    description: "Sleepless nights writing code, building projects, and solving problems",
    image: codingImage,
    delay: 0.5,
  },
  {
    title: "🐛 Learning from Failures",
    description: "Debugging errors, fixing bugs, and growing stronger with each challenge",
    image: failureImage,
    delay: 1,
  },
  {
    title: "🎯 Interview Preparation",
    description: "Practicing algorithms, preparing answers, and building confidence",
    image: interviewImage,
    delay: 1.5,
  },
  {
    title: "🚀 Success!",
    description: "Finally breaking through and achieving the dream placement!",
    image: successImage,
    delay: 2,
  },
];

export const Timeline = ({ isVisible }: { isVisible: boolean }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    timelineItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * 800);
    });
  }, [isVisible]);

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 celebration-text glow-pulse">
          The Journey
        </h2>
        
        <div className="relative">
          <div className="timeline-line absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full" />
          
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center mb-16 transition-all duration-1000 ${
                visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-gradient-celebration rounded-full shadow-glow-primary z-10" />
              
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                <div className="bg-card rounded-2xl p-6 shadow-2xl border border-muted backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-3 celebration-text">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
              
              {/* Image */}
              <div className="flex-shrink-0 ml-12 md:ml-0 mt-4 md:mt-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-glow-primary float">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};