import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Download,
  ExternalLink,
  Code,
  Database,
  Brain,
  BarChart3,
  ChevronDown,
  Menu,
  X,
  Terminal,
  Zap,
  Cpu,
  Globe
} from 'lucide-react'
import heroBackground from './assets/blue_tech_hero_background.png'
import aiVisualization from './assets/blue_ai_visualization.png'
import codeInterface from './assets/blue_code_interface.png'
import flaskDashboard from './assets/flask_ecommerce_dashboard.png'
import stockPrediction from './assets/stock_prediction_interface.png'
import multiAgentPlatform from './assets/multi_agent_platform.png'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTyping, setIsTyping] = useState(true)

  // 鼠标跟踪效果
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // 打字机效果
  const [displayText, setDisplayText] = useState('')
  const fullText = '全栈开发工程师 · AI算法工程师 · 数据分析师 · BI报表设计工程师'
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  // 项目数据
  const projects = {
    web: [
      {
        title: "Flask电商后台管理系统",
        description: "完整的电商后台管理系统，支持商品管理、订单处理、用户管理等核心业务功能",
        tech: ["Flask", "MySQL", "Vue.js", "Redis", "JWT"],
        highlights: ["RESTful API架构", "RBAC权限管理", "响应时间提升40%"],
        image: flaskDashboard,
        category: "全栈开发"
      },
      {
        title: "Django在线教育平台",
        description: "功能完整的在线教育平台，包含用户管理、课程管理、支付系统等核心功能",
        tech: ["Django", "Python", "HTML/CSS/JS"],
        highlights: ["完整的教育业务流程", "支付系统集成"],
        image: codeInterface,
        category: "Web开发"
      }
    ],
    ai: [
      {
        title: "智能工单预测系统",
        description: "基于BERT+XGBoost双模型融合的智能解决方案预测系统",
        tech: ["BERT", "XGBoost", "Python", "JIRA API"],
        highlights: ["准确率87.3%", "响应时间165ms", "工单处理效率提升60%"],
        image: aiVisualization,
        category: "AI系统"
      },
      {
        title: "多Agent协同数据分析平台",
        description: "基于多个中文大语言模型的协同工作系统，实现全流程自动化分析",
        tech: ["Python", "多个LLM", "Streamlit", "数据可视化"],
        highlights: ["多Agent协作", "处理效率提升60%", "智能数据清洗"],
        image: multiAgentPlatform,
        category: "AI系统"
      },
      {
        title: "股票短线精灵",
        description: "使用LSTM+XGBoost融合模型的股票短线预测系统",
        tech: ["LSTM", "XGBoost", "Python", "金融数据API"],
        highlights: ["预测准确率68%", "实时预测", "量化交易策略"],
        image: stockPrediction,
        category: "金融科技"
      }
    ]
  }

  // 技能数据
  const skills = {
    backend: ["Python", "Flask", "Django", "FastAPI", "MySQL", "Redis", "RESTful API"],
    frontend: ["Vue.js", "React", "HTML/CSS/JS", "Tailwind CSS", "响应式设计"],
    ai: ["PyTorch", "TensorFlow", "BERT", "XGBoost", "LSTM", "计算机视觉", "NLP"],
    data: ["Pandas", "NumPy", "Matplotlib", "Plotly", "Streamlit", "数据挖掘"],
    bi: ["数据可视化", "报表设计", "商业智能", "数据分析", "指标体系"],
    tools: ["Docker", "Git", "SQL", "JIRA API", "金融数据API", "Linux"]
  }

  // 代码展示数据
  const codeExamples = [
    {
      title: "Flask API 路由",
      language: "python",
      code: `@app.route('/api/users', methods=['GET', 'POST'])
@jwt_required()
def handle_users():
    if request.method == 'POST':
        data = request.get_json()
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    return jsonify([u.to_dict() for u in User.query.all()])`
    },
    {
      title: "AI模型预测",
      language: "python", 
      code: `def predict_stock_price(model, data):
    # 数据预处理
    scaled_data = scaler.transform(data)
    
    # LSTM预测
    lstm_pred = lstm_model.predict(scaled_data)
    
    # XGBoost预测
    xgb_pred = xgb_model.predict(scaled_data)
    
    # 模型融合
    final_pred = 0.6 * lstm_pred + 0.4 * xgb_pred
    return final_pred`
    }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* 动态鼠标跟踪光效 */}
      <div 
        className="fixed pointer-events-none z-10 w-96 h-96 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* 浮动粒子背景 */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* 导航栏 */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-blue-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              王同鹤
            </motion.div>
            
            {/* 桌面导航 */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: '首页' },
                { id: 'about', label: '关于我' },
                { id: 'projects', label: '项目' },
                { id: 'code', label: '代码' },
                { id: 'contact', label: '联系' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* 移动端菜单按钮 */}
            <motion.button
              className="md:hidden p-2 rounded-lg bg-blue-500/20 text-blue-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-blue-500/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-4 space-y-2">
                {[
                  { id: 'home', label: '首页' },
                  { id: 'about', label: '关于我' },
                  { id: 'projects', label: '项目' },
                  { id: 'code', label: '代码' },
                  { id: 'contact', label: '联系' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* 主页Hero区域 */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              王同鹤
            </motion.h1>
            
            <motion.div 
              className="text-xl md:text-2xl text-gray-300 mb-8 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {displayText}
              {isTyping && <span className="animate-pulse">|</span>}
            </motion.div>
            
            <motion.p 
              className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              跨专业技术人才，从化学到代码的创新者。拥有全栈开发、AI算法、数据分析、BI报表等多重技能，
              专注于用技术解决实际问题，创造商业价值。具备扎实的技术基础和丰富的项目经验。
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={20} />
                <span>查看项目</span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-blue-500 rounded-lg font-semibold text-blue-400 hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                <span>联系我</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* 滚动指示器 */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-blue-400" />
        </motion.div>
      </section>

      {/* 关于我部分 */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              关于我
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              我是一名充满热情的开发者，拥有多维度的技能图谱。从化学专业成功转向技术领域，
              具备快速学习新技术和解决复杂问题的能力。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 个人信息 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-400 flex items-center space-x-2">
                    <Cpu size={24} />
                    <span>个人信息</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin size={20} className="text-blue-400" />
                    <span className="text-gray-300">华东理工大学 · 化学专业</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-blue-400" />
                    <span className="text-gray-300">17358184133</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-blue-400" />
                    <span className="text-gray-300">17358184133@163.com</span>
                  </div>
                </CardContent>
              </Card>

              {/* 核心优势 */}
              <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm mt-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-400 flex items-center space-x-2">
                    <Zap size={24} />
                    <span>核心优势</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">✅</span>
                      <span><strong>扎实的技术基础</strong>：从机器学习到Web开发，技术栈全面</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">✅</span>
                      <span><strong>丰富的项目经验</strong>：每个项目都有独特的技术亮点和业务价值</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">✅</span>
                      <span><strong>多重身份技能</strong>：全栈、AI、数据分析、BI报表全覆盖</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">✅</span>
                      <span><strong>跨专业转型</strong>：化学专业成功转向技术领域的学习能力</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">✅</span>
                      <span><strong>实战经验足</strong>：多个上线项目和远程工作经历</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* 技能矩阵 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">技能矩阵</h3>
              
              {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/30 rounded-lg p-4 border border-blue-500/20"
                >
                  <h4 className="text-lg font-semibold text-blue-400 mb-3 capitalize">
                    {category === 'backend' ? '后端开发' :
                     category === 'frontend' ? '前端开发' :
                     category === 'ai' ? 'AI算法' :
                     category === 'data' ? '数据分析' : 
                     category === 'bi' ? 'BI报表' : '工具技术'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 项目展示部分 */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              项目展示
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              以下是我参与开发的一些代表性项目，涵盖全栈开发、机器学习和数据分析等领域
            </p>
          </motion.div>

          {/* 全栈Web开发项目 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">全栈Web开发</h3>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{projects.web.length} 个项目</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.web.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                      <Badge className="absolute top-4 right-4 bg-blue-500/80 text-white">
                        {project.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-400 group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-semibold text-blue-400 mb-2">技术栈</h5>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-blue-400 mb-2">项目亮点</h5>
                          <ul className="text-sm text-gray-400 space-y-1">
                            {project.highlights.map((highlight, highlightIndex) => (
                              <li key={highlightIndex} className="flex items-start space-x-2">
                                <span className="text-blue-400 mt-1">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI与机器学习项目 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">AI与机器学习</h3>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{projects.ai.length} 个项目</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.ai.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                      <Badge className="absolute top-4 right-4 bg-purple-500/80 text-white">
                        {project.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-purple-400 group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-semibold text-purple-400 mb-2">技术栈</h5>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-purple-400 mb-2">项目亮点</h5>
                          <ul className="text-sm text-gray-400 space-y-1">
                            {project.highlights.map((highlight, highlightIndex) => (
                              <li key={highlightIndex} className="flex items-start space-x-2">
                                <span className="text-purple-400 mt-1">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 代码展示部分 */}
      <section id="code" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              代码展示
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              展示一些核心代码片段，体现技术实现能力和编程风格
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {codeExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-400 flex items-center space-x-2">
                      <Terminal size={20} />
                      <span>{example.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="bg-slate-900/80 rounded-lg p-4 overflow-x-auto text-sm">
                        <code className="text-gray-300 whitespace-pre">
                          {example.code}
                        </code>
                      </pre>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                          {example.language}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系方式部分 */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              联系我
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              如果您对我的项目感兴趣，或者有合作机会，欢迎随时联系我
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Phone, title: "电话", content: "17358184133", color: "blue" },
              { icon: Mail, title: "邮箱", content: "17358184133@163.com", color: "cyan" },
              { icon: MapPin, title: "位置", content: "上海 · 华东理工大学", color: "purple" }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300 text-center">
                  <CardContent className="pt-8">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-${contact.color}-500 to-${contact.color === 'blue' ? 'cyan' : contact.color === 'cyan' ? 'blue' : 'blue'}-500 rounded-full flex items-center justify-center`}>
                      <contact.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">{contact.title}</h3>
                    <p className="text-gray-300">{contact.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Download, label: "下载简历", color: "blue" },
              { icon: Github, label: "GitHub", color: "purple" },
              { icon: Linkedin, label: "LinkedIn", color: "cyan" }
            ].map((social, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 bg-gradient-to-r from-${social.color}-500 to-${social.color === 'blue' ? 'cyan' : social.color === 'cyan' ? 'blue' : 'blue'}-500 rounded-lg font-semibold text-white shadow-lg shadow-${social.color}-500/25 hover:shadow-${social.color}-500/40 transition-all duration-300 flex items-center space-x-2`}
              >
                <social.icon size={20} />
                <span>{social.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-8 border-t border-blue-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 王同鹤. All rights reserved. Made with ❤️ and React.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

