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
    <a className="site-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only">（在新标签页打开）</span>
    </a>
  )
}

function Highlights({ items }) {
  const brief = items.every((item) => item.length <= 20)
  return (
    <ul className={brief ? 'marks' : 'fact-list'}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function Section({ id, index, title, intro, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-[76rem] px-5 py-16 md:px-8 md:py-24">
        <h2 id={`${id}-title`} className="serif section-title">
          <span className="section-index">{index}</span>
          {title}
        </h2>
        {intro ? <p className="mt-6 max-w-2xl text-base leading-8 text-muted md:text-lg">{intro}</p> : null}
        <div className={intro ? 'mt-12 md:mt-14' : 'mt-10'}>{children}</div>
      </div>
    </section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [filter, setFilter] = useState('all')
  const menuButtonRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      let current = ''
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= 100) current = section.id
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

  const visibleCount = projects.filter((project) => filter === 'all' || project.group === filter).length

  return (
    <div>
      <a className="skip-link" href="#content">跳到主要内容</a>

      <header className="site-header">
        <div className="mx-auto flex h-full max-w-[76rem] items-center justify-between px-5 md:px-8">
          <a href="#top" className="serif text-xl tracking-[-0.03em]">王同鹤</a>
          <nav className="hidden lg:block" aria-label="页面章节">
            <ul className="flex gap-7">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={activeSection === section.id ? 'nav-link is-on' : 'nav-link'}
                    aria-current={activeSection === section.id ? 'location' : undefined}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button lg:hidden"
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
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  className="menu-link"
                  href={`#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{section.label}</span>
                  <span className="font-mono text-sm font-normal text-cinnabar">{section.index}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <main id="content">
        <section id="top" aria-labelledby="masthead">
          <div className="mx-auto max-w-[76rem] px-5 pb-8 pt-8 md:px-8 md:pb-10 md:pt-14">
            <p className="eyebrow">作品集</p>
            <h1 id="masthead" className="mast mt-3 whitespace-nowrap">
              王同鹤
              <span className="seal" aria-hidden="true" />
            </h1>
          </div>

          <div className="ribbon">
            <ul aria-label="专业方向">
              {profile.roles.map((role, index) => (
                <li key={role}>
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="lead max-w-xl">{profile.summary}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-lg">
                <a className="stamp" href="#projects">查看作品</a>
                <a className="site-link" href="#contact">联系</a>
              </div>
            </div>
            <nav className="lg:col-span-6" aria-label="作品目录">
              <p className="eyebrow">目录</p>
              <ol className="mt-3 border-t border-line">
                {projects.map((project, index) => (
                  <li key={project.id}>
                    <a className="index-link" href={`#${project.id}`}>
                      <span className="serif w-8 shrink-0 text-cinnabar">{pad(index)}</span>
                      <span className="index-title min-w-0 flex-1 text-lg leading-snug">{project.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <dl className="fact-grid mx-auto max-w-[76rem]">
            <div>
              <dt>教育</dt>
              <dd>{profile.education}</dd>
            </div>
            <div>
              <dt>邮箱</dt>
              <dd>
                <a className="site-link break-all" href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>作品</dt>
              <dd>
                <a className="serif text-4xl leading-none tracking-[-0.04em]" href="#projects">
                  {pad(projects.length - 1)}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <Section id="about" index={sectionIndex('about')} title="简介">
          <p className="serif max-w-4xl text-[clamp(1.55rem,3vw,2.2rem)] leading-snug">{profile.about}</p>
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h3 className="eyebrow">核心优势</h3>
              <ol className="mt-4">
                {strengths.map((item, index) => (
                  <li key={item.title} className="strength">
                    <span className="serif text-cinnabar">{pad(index)}</span>
                    <p className="leading-8">
                      <strong className="serif text-2xl">{item.title}</strong>
                      <span className="text-muted">：{item.detail}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-5">
              <h3 className="eyebrow">个人信息</h3>
              <dl className="info-list mt-4">
                <div>
                  <dt>教育</dt>
                  <dd>{profile.education}</dd>
                </div>
                <div>
                  <dt>邮箱</dt>
                  <dd>
                    <a className="site-link break-all" href={`mailto:${profile.email}`}>{profile.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>GitHub</dt>
                  <dd>
                    <ExternalLink href={profile.github}>allen-iwen</ExternalLink>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>

        {experience.length > 0 ? (
          <Section id="experience" index={sectionIndex('experience')} title="经历">
            <ol className="border-t border-line">
              {experience.map((item) => (
                <li key={`${item.time ?? ''}-${item.role ?? ''}-${item.org ?? ''}`} className="grid gap-2 border-b border-line py-6 md:grid-cols-12">
                  <p className="text-sm text-muted md:col-span-3">{item.time}</p>
                  <div className="md:col-span-9">
                    <h3 className="serif text-3xl">{item.role}</h3>
                    {item.org ? <p className="mt-1 text-muted">{item.org}</p> : null}
                    {item.summary ? <p className="mt-3 leading-8">{item.summary}</p> : null}
                    {item.points?.length ? (
                      <ul className="fact-list">
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        <Section id="projects" index={sectionIndex('projects')} title="作品" intro={profile.projectsIntro}>
          <div className="filters" role="group" aria-label="按类别筛选作品">
            <button type="button" aria-pressed={filter === 'all'} className={filter === 'all' ? 'is-on' : ''} onClick={() => setFilter('all')}>
              全部
              <span>{projects.length}</span>
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
                  {group.label}
                  <span>{count}</span>
                </button>
              )
            })}
          </div>
          <p className="sr-only" aria-live="polite">当前显示 {visibleCount} 件作品</p>

          {groups.map((group) => {
            if (filter !== 'all' && filter !== group.id) return null
            const items = projects.filter((project) => project.group === group.id)
            return (
              <div key={group.id} className="mt-12 first:mt-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="serif text-2xl md:text-3xl">{group.label}</h3>
                  <p className="text-sm text-muted">{items.length} 个项目</p>
                </div>
                <div className="mt-4 border-t border-line">
                  {items.map((project) => (
                    <article key={project.id} id={project.id} className="project" aria-labelledby={`${project.id}-title`}>
                      <div className="grid gap-3 md:grid-cols-[4.5rem_1fr] md:gap-8">
                        <p className="serif text-3xl text-cinnabar md:text-4xl">{pad(projects.findIndex((item) => item.id === project.id))}</p>
                        <div className="min-w-0">
                          <p className="text-sm text-muted">{project.category}</p>
                          <h4 id={`${project.id}-title`} className="serif mt-1 text-[clamp(1.7rem,3vw,2.7rem)] leading-tight tracking-[-0.03em]">
                            {project.title}
                          </h4>
                          <p className="mt-4 max-w-3xl text-base leading-8 md:text-lg">{project.summary}</p>
                          <Highlights items={project.highlights} />
                          <p className="tech">{project.tech.join('  ·  ')}</p>
                          {project.links?.length ? (
                            <ul className="link-row">
                              {project.links.map((link) => (
                                <li key={link.href}>
                                  <ExternalLink href={link.href}>{link.label}</ExternalLink>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </Section>

        {writing.length > 0 ? (
          <Section id="writing" index={sectionIndex('writing')} title="文字">
            <ol className="border-t border-line">
              {writing.map((item) => (
                <li key={item.title} className="border-b border-line py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="serif text-3xl">
                      {item.href ? <ExternalLink href={item.href}>{item.title}</ExternalLink> : item.title}
                    </h3>
                    {item.date ? <p className="text-sm text-muted">{item.date}</p> : null}
                  </div>
                  {item.summary ? <p className="mt-3 max-w-3xl leading-8">{item.summary}</p> : null}
                </li>
              ))}
            </ol>
          </Section>
        ) : null}

        <Section id="skills" index={sectionIndex('skills')} title="技能">
          <div>
            {skillGroups.map((group) => (
              <div key={group.label} className="skill-row">
                <h3 className="serif text-xl">{group.label}</h3>
                <p className="text-lg leading-8">{group.items.join('  ·  ')}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="code" index={sectionIndex('code')} title="代码" intro={profile.codeIntro}>
          <div className="grid gap-5 lg:grid-cols-2">
            {codeExamples.map((example) => (
              <figure key={example.title} className="ink-slab">
                <header>
                  <h3 className="serif text-xl">{example.title}</h3>
                  <span className="font-mono text-sm text-paper/70">{example.language}</span>
                </header>
                <pre><code>{example.code}</code></pre>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="contact" index={sectionIndex('contact')} title="联系" intro={profile.contactIntro}>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <a className="contact-mail serif site-link" href={`mailto:${profile.email}`}>{profile.email}</a>
              <p className="mt-6 text-lg">{profile.location}</p>
            </div>
            <p className="text-lg lg:col-span-4 lg:pt-4">
              <ExternalLink href={profile.github}>GitHub</ExternalLink>
            </p>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-4 px-5 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2026 王同鹤</p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <a className="site-link" href={`mailto:${profile.email}`}>邮箱</a>
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <a className="site-link" href="#top">回到页首</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
