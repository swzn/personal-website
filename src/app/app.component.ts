import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

interface CardItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  details: string[];
  tags: string[];
  link?: string;
}

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [NgFor, NgIf, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  name = 'Sajad Wazin';
  role = 'Fullstack Software Developer';
  tagline = 'I architect and build full-stack platforms — from backend systems to the UIs on top of them.';

  bio = `I'm a Fullstack Software Developer currently building a self-onboarding platform
     and workflow engine at Morgan Stanley, working across Java, Spring Boot, Angular, and
     PostgreSQL. Before that, I spent two years at AWS modernizing a legacy system exceeding
     2M lines of code into Java/Spring Boot and Angular for a major Canadian investment firm.
     I graduated from McGill University with a B.Sc in Honours Computer Science (GPA 3.73, First
     Class Honours), with a focus on the theoretical and algorithmic side of software development.`;

  skills = ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL', 'AWS', 'Python', 'SQL', 'Software Architecture'];

  experience: CardItem[] = [
    {
      id: 'exp-1',
      title: 'Fullstack Software Developer',
      subtitle: 'Morgan Stanley · July 2025 — Present',
      description:
        "Leading backend development on a self-onboarding platform that replaced a manual, email-driven process with automated workflows.",
      details: [
        'Designed a configuration-driven workflow engine that turns JSON-defined rules into REST, email, and messaging workflows — new workflows just need config, not code changes.',
        'Built a resilient, asynchronous event-processing pipeline with automatic retries, recovery, and replay for anything that fails downstream.',
        'Connected the platform to half a dozen downstream services, including Microsoft Teams, MQ, and a virus-scanning service, and built reusable Java libraries the rest of the team relies on.',
        'Shipped production APIs that serve tens of thousands of users at up to 1,000 requests a minute.'
      ],
      tags: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'REST APIs', 'Spring Security']
    },
    {
      id: 'exp-2',
      title: 'Fullstack Software Developer',
      subtitle: 'Amazon Web Services · July 2023 — July 2025',
      description:
        'Modernized a 2M+ line legacy system for a major Canadian investment firm, migrating 80K+ lines of PowerBuilder into Java, Spring Boot, and Angular.',
      details: [
        'Rewrote legacy PowerBuilder functionality in Java, Spring Boot, and Angular, testing and debugging each piece before it reached customers.',
        "Built automation tools in Java and Python to speed up the team's day-to-day migration work.",
        'Worked hands-on with AWS RDS, ECS, EC2, S3, CodeBuild, and AppStream, and earned two AWS certifications for Mainframe Modernization along the way.',
        'Trained and onboarded five new team members, and led sprint retrospectives to keep the team improving.'
      ],
      tags: ['Java', 'Spring Boot', 'Angular', 'Sybase', 'AWS', 'Python']
    }
  ];

  projects: CardItem[] = [
    {
      id: 'proj-1',
      title: 'PharmaMate',
      subtitle: 'Startup · Fullstack Software Developer',
      description:
        'A serverless app that turns Canadian Drug Product Database documents into structured, easy-to-understand medication content.',
      details: [
        'Built end-to-end on AWS — Lambda, API Gateway, S3, RDS, and CloudWatch — with a fully serverless Python backend.',
        'Used the OpenAI API with structured prompts and schema validation to fill in missing information across eight content sections, turning dense pharmaceutical documents into consistent, structured output.',
        'Added a human-in-the-loop step where a pharmacist reviews the content before it goes to video production.'
      ],
      tags: ['Python', 'AWS Lambda', 'OpenAI API', 'Serverless'],
      link: 'https://pharmamate.app/'
    },
    {
      id: 'proj-2',
      title: 'McGill Research Project',
      subtitle: 'McGill AI & Society Research Group · 2022',
      description:
        "Developed a research tool that studies Facebook's page-suggestion algorithm and its role in siloing users into echo chambers.",
      details: [
        "Built a Suggestions Scraper that traces an account's path through Facebook's page-suggestion algorithm using BFS and DFS, and a Content Scraper that pulls post content, comments, shares, and reactions for analysis.",
        'Designed the two tools to chain together — page suggestions from one search feed straight into the other as scrape targets, with almost no manual work in between.',
        'Ran a sample study on political pages using NLP-based sentiment analysis (TextBlob) to test whether the suggestion algorithm skews left- or right-leaning content.',
        'Solo-built the whole thing in Java with Selenium, JavaFX, and Maven, including the architecture, the scraping logic, and the write-up.'
      ],
      tags: ['Java', 'Selenium', 'JavaFX', 'NLP', 'Research'],
      link: 'https://github.com/swzn/sajad-wazin-mcgill-research-project/tree/main'
    }
  ];

  email = 'sajad.wazin@mail.mcgill.ca';
  github = 'https://github.com/swzn';
  linkedin = 'https://www.linkedin.com/in/sajad-wazin/';

  year = new Date().getFullYear();

  navLinks: NavLink[] = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  activeSection = 'top';

  expandedIds = new Set<string>();

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const sections = this.el.nativeElement.querySelectorAll<HTMLElement>('main [id]');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
            entry.target.classList.add('visible');
          }
        }
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.15 }
    );

    sections.forEach((section) => this.observer!.observe(section));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('document:mousemove', ['$event'])
  onPointerMove(event: MouseEvent): void {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mx', `${x}%`);
    document.documentElement.style.setProperty('--my', `${y}%`);
  }

  toggleCard(id: string): void {
    if (this.expandedIds.has(id)) {
      this.expandedIds.delete(id);
    } else {
      this.expandedIds.add(id);
    }
  }
}
