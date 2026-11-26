import { useEffect, useRef, useState } from 'react'
import {
  codeExamples,
  experience,
  profile,
  projects,
  skillGroups,
  strengths,
  writing,
} from './content.js'
import './App.css'

const sections = [
  { id: 'about', label: '简介' },
  ...(experience.length ? [{ id: 'experience', label: '经历' }] : []),
  { id: 'projects', label: '作品' },
  ...(writing.length ? [{ id: 'writing', label: '文字' }] : []),
  { id: 'skills', label: '技能' },
  { id: 'code', label: '代码' },
  { id: 'contact', label: '联系' },
].map((item, index) => ({
  ...item,
  index: String(index + 1).padStart(2, '0'),
}))

const groups = []
for (const project of projects) {
  if (!groups.some((group) => group.id === project.group)) {
    groups.push({ id: project.group, label: project.groupLabel })
  }
}

function pad(index) {
  return String(index + 1).padStart(2, '0')
}

function sectionIndex(id) {
  return sections.find((section) => section.id === id)?.index ?? ''
}

function ExternalLink({ href, children }) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only">（在新标签页打开）</span>
    </a>
  )
}

function Points({ items }) {
  const long = items.some((item) => item.length > 18)
  return (
    <ul className={long ? 'work-points is-long' : 'work-points'}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [filter, setFilter] = useState('all')
  const [live, setLive] = useState(0)
  const [boardPaused, setBoardPaused] = useState(false)
  const [motionOn, setMotionOn] = useState(true)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saved = window.sessionStorage.getItem('portfolio-motion')
    if (reduce || saved === 'off') setMotionOn(false)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.motion = motionOn ? 'on' : 'off'
  }, [motionOn])

  useEffect(() => {
    if (!motionOn || boardPaused || projects.length < 2) return undefined
    const timer = window.setInterval(() => {
      setLive((current) => (current + 1) % projects.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [motionOn, boardPaused])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 8)
      let current = ''
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= 120) current = section.id
      }
      setActiveSection(current)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus({ preventScroll: true })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const toggleMotion = () => {
    setMotionOn((current) => {
      const next = !current
      window.sessionStorage.setItem('portfolio-motion', next ? 'on' : 'off')
      return next
    })
  }

  const visibleCount = projects.filter((project) => filter === 'all' || project.group === filter).length

  return (
    <div>
      <a className="skip-link" href="#content">跳到主要内容</a>
      <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
        <div className="header-inner">
          <a className="wordmark" href="#top">王同鹤</a>
          <nav className="nav-desktop" aria-label="页面章节">
            {sections.map((section) => (
              <a
                key={section.id}
                className={activeSection === section.id ? 'nav-link is-on' : 'nav-link'}
                href={`#${section.id}`}
                aria-current={activeSection === section.id ? 'location' : undefined}
              >
                {section.label}
              </a>
            ))}
          </nav>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '关闭' : '目录'}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <nav id="site-menu" className="menu-panel" aria-label="页面章节">
          {sections.map((section) => (
            <a
              key={section.id}
              className="menu-link"
              href={`#${section.id}`}
              onClick={() => setMenuOpen(false)}
            >
              <span>{section.label}</span>
              <span>{section.index}</span>
            </a>
          ))}
          <button type="button" className="motion-toggle" aria-pressed={!motionOn} onClick={toggleMotion}>
            {motionOn ? '静止动效' : '恢复动效'}
          </button>
        </nav>
      ) : null}

      <main id="content">
        <section className="hero" id="top" aria-labelledby="masthead">
          <div className="hero-copy">
            <p className="kicker">作品集</p>
            <h1 id="masthead" className="name">王同鹤</h1>
            <div className="name-mark" aria-hidden="true" />
            <ul className="roles">
              {profile.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <p className="affiliation">{profile.education}</p>
            <p className="lead">{profile.summary}</p>
            <div className="hero-actions">
              <a className="btn" href="#projects">查看作品</a>
              <a className="text-link" href={`mailto:${profile.email}`}>写信</a>
            </div>
          </div>

          <nav
            className="board"
            aria-label="作品目录"
            onMouseEnter={() => setBoardPaused(true)}
            onMouseLeave={() => setBoardPaused(false)}
            onFocus={() => setBoardPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setBoardPaused(false)
            }}
          >
            <p className="board-watermark" aria-hidden="true">{pad(projects.length - 1)}</p>
            <p className="board-head">
              <span>目录</span>
              <strong>{pad(projects.length - 1)}</strong>
            </p>
            {projects.map((project, index) => (
              <a
                key={project.id}
                className={motionOn && !boardPaused && live === index ? 'board-row is-live' : 'board-row'}
                href={`#${project.id}`}
              >
                <span className="board-no">{pad(index)}</span>
                <span className="board-title">{project.title}</span>
                <span className="board-cat">{project.category}</span>
              </a>
            ))}
          </nav>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="wrap">
            <p className="section-kicker">{sectionIndex('about')}</p>
            <div className="section-head">
              <h2 id="about-title">简介</h2>
            </div>
            <p className="about-lead">{profile.about}</p>
            <div className="about-grid">
              <div>
                <h3 className="subhead">核心优势</h3>
                <div>
                  {strengths.map((item) => (
                    <div className="strength" key={item.title}>
                      <strong>{item.title}：</strong>
                      <span>{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-aside">
                <h3 className="subhead">个人信息</h3>
                <dl className="meta-list">
                  <div>
                    <dt>教育</dt>
                    <dd>{profile.education}</dd>
                  </div>
                  <div>
                    <dt>所在</dt>
                    <dd>{profile.location}</dd>
                  </div>
                  <div>
                    <dt>邮箱</dt>
                    <dd>
                      <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>GitHub</dt>
                    <dd><ExternalLink href={profile.github}>allen-iwen</ExternalLink></dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {experience.length > 0 ? (
          <section className="section" id="experience" aria-labelledby="experience-title">
            <div className="wrap">
              <p className="section-kicker">{sectionIndex('experience')}</p>
              <div className="section-head">
                <h2 id="experience-title">经历</h2>
              </div>
              <ol className="timeline">
                {experience.map((item) => (
                  <li key={`${item.time ?? ''}-${item.role ?? ''}-${item.org ?? ''}`}>
                    {item.time ? <p className="when">{item.time}</p> : null}
                    <h3>{item.role}</h3>
                    {item.org ? <p className="org">{item.org}</p> : null}
                    {item.summary ? <p className="work-summary">{item.summary}</p> : null}
                    {item.points?.length ? <Points items={item.points} /> : null}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        <section className="section" id="projects" aria-labelledby="projects-title">
          <div className="wrap">
            <p className="section-kicker">{sectionIndex('projects')}</p>
            <div className="section-head">
              <h2 id="projects-title">作品</h2>
            </div>
            <p className="intro">{profile.projectsIntro}</p>
            <div className="filters" role="group" aria-label="按类别筛选作品">
              <button type="button" aria-pressed={filter === 'all'} className={filter === 'all' ? 'is-on' : ''} onClick={() => setFilter('all')}>
                全部 {projects.length}
              </button>
              {groups.map((group) => {
                const count = projects.filter((project) => project.group === group.id).length
                return (
                  <button
                    key={group.id}
                    type="button"
                    aria-pressed={filter === group.id}
                    className={filter === group.id ? 'is-on' : ''}
                    onClick={() => setFilter(group.id)}
                  >
                    {group.label} {count}
                  </button>
                )
              })}
            </div>
            <p className="sr-only" aria-live="polite">当前显示 {visibleCount} 件作品</p>
            {groups.map((group) => {
              if (filter !== 'all' && filter !== group.id) return null
              const items = projects.filter((project) => project.group === group.id)
              return (
                <div key={group.id}>
                  <div className="group-label">
                    <h3>{group.label}</h3>
                    <span>{items.length} 个项目</span>
                  </div>
                  {items.map((project) => (
                    <article key={project.id} id={project.id} className="work" aria-labelledby={`${project.id}-title`}>
                      <p className="work-cat">{project.category}</p>
                      <div>
                        <h3 id={`${project.id}-title`}>{project.title}</h3>
                        <p className="work-summary">{project.summary}</p>
                        <Points items={project.highlights} />
                        <p className="work-tech">{project.tech.join('  ·  ')}</p>
                        {project.links?.length ? (
                          <ul className="work-links">
                            {project.links.map((link) => (
                              <li key={link.href}>
                                <ExternalLink href={link.href}>{link.label}</ExternalLink>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              )
            })}
          </div>
        </section>

        {writing.length > 0 ? (
          <section className="section" id="writing" aria-labelledby="writing-title">
            <div className="wrap">
              <p className="section-kicker">{sectionIndex('writing')}</p>
              <div className="section-head">
                <h2 id="writing-title">文字</h2>
              </div>
              <ol className="writing-list">
                {writing.map((item) => (
                  <li key={item.title}>
                    <h3>
                      {item.href ? <ExternalLink href={item.href}>{item.title}</ExternalLink> : item.title}
                    </h3>
                    {item.date ? <p className="when">{item.date}</p> : null}
                    {item.summary ? <p className="work-summary">{item.summary}</p> : null}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        <section className="section" id="skills" aria-labelledby="skills-title">
          <div className="wrap">
            <p className="section-kicker">{sectionIndex('skills')}</p>
            <div className="section-head">
              <h2 id="skills-title">技能</h2>
            </div>
            <div className="skill-list">
              {skillGroups.map((group) => (
                <div className="skill-row" key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.items.join('  ·  ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="code" aria-labelledby="code-title">
          <div className="wrap">
            <p className="section-kicker">{sectionIndex('code')}</p>
            <div className="section-head">
              <h2 id="code-title">代码</h2>
            </div>
            <p className="intro">{profile.codeIntro}</p>
            <div className="code-grid">
              {codeExamples.map((example) => (
                <figure className="note" key={example.title}>
                  <header>
                    <h3>{example.title}</h3>
                    <span>{example.language}</span>
                  </header>
                  <pre><code>{example.code}</code></pre>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <p className="section-kicker">{sectionIndex('contact')}</p>
            <div className="section-head">
              <h2 id="contact-title">联系</h2>
            </div>
            <p className="intro">{profile.contactIntro}</p>
            <div className="contact-layout">
              <div>
                <a className="contact-mail text-link" href={`mailto:${profile.email}`}>{profile.email}</a>
                <p className="contact-meta">{profile.location}</p>
              </div>
              <p className="contact-meta">
                <ExternalLink href={profile.github}>GitHub</ExternalLink>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p>© 2026 王同鹤</p>
          <button type="button" className="motion-toggle" aria-pressed={!motionOn} onClick={toggleMotion}>
            {motionOn ? '静止动效' : '恢复动效'}
          </button>
          <p className="footer-links">
            <a className="text-link" href={`mailto:${profile.email}`}>邮箱</a>
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <a className="text-link" href="#top">回到页首</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
