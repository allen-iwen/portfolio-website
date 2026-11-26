// 页面文案都在这里。追加项目即可，顺序即展示顺序。
// 只填写真实链接；没有仓库就不要写 links，避免占位地址。
// experience、writing 有条目后，导航和对应板块会自动出现。

export const profile = {
  name: "王同鹤",
  roles: [
    "全栈开发工程师",
    "AI算法工程师",
    "数据分析师",
    "BI报表设计工程师",
  ],
  summary:
    "跨专业技术人才，从化学到代码的创新者。拥有全栈开发、AI算法、数据分析、BI报表等多重技能，专注于用技术解决实际问题，创造商业价值。具备扎实的技术基础和丰富的项目经验。",
  about:
    "我是一名充满热情的开发者，拥有多维度的技能图谱。从化学专业成功转向技术领域，具备快速学习新技术和解决复杂问题的能力。",
  education: "华东理工大学 · 化学专业",
  location: "上海 · 华东理工大学",
  email: "17358184133@163.com",
  github: "https://github.com/allen-iwen",
  projectsIntro:
    "以下是我参与开发的一些代表性项目，涵盖全栈开发、机器学习和数据分析等领域",
  codeIntro: "展示一些核心代码片段，体现技术实现能力和编程风格",
  contactIntro: "如果您对我的项目感兴趣，或者有合作机会，欢迎随时联系我",
}

export const strengths = [
  {
    title: "扎实的技术基础",
    detail: "从机器学习到Web开发，技术栈全面",
  },
  {
    title: "丰富的项目经验",
    detail: "每个项目都有独特的技术亮点和业务价值",
  },
  {
    title: "多重身份技能",
    detail: "全栈、AI、数据分析、BI报表全覆盖",
  },
  {
    title: "跨专业转型",
    detail: "化学专业成功转向技术领域的学习能力",
  },
  {
    title: "实战经验足",
    detail: "多个上线项目和远程工作经历",
  },
]

export const skillGroups = [
  {
    label: "后端开发",
    items: ["Python", "Flask", "Django", "FastAPI", "MySQL", "Redis", "RESTful API"],
  },
  {
    label: "前端开发",
    items: ["Vue.js", "React", "HTML/CSS/JS", "Tailwind CSS", "响应式设计"],
  },
  {
    label: "AI算法",
    items: ["PyTorch", "TensorFlow", "BERT", "XGBoost", "LSTM", "计算机视觉", "NLP"],
  },
  {
    label: "数据分析",
    items: ["Pandas", "NumPy", "Matplotlib", "Plotly", "Streamlit", "数据挖掘"],
  },
  {
    label: "BI报表",
    items: ["数据可视化", "报表设计", "商业智能", "数据分析", "指标体系"],
  },
  {
    label: "工具技术",
    items: ["Docker", "Git", "SQL", "JIRA API", "金融数据API", "Linux"],
  },
]

export const projects = [
  {
    id: "flask-admin",
    group: "web",
    groupLabel: "全栈Web开发",
    category: "全栈开发",
    title: "Flask电商后台管理系统",
    summary: "完整的电商后台管理系统，支持商品管理、订单处理、用户管理等核心业务功能",
    tech: ["Flask", "MySQL", "Vue.js", "Redis", "JWT"],
    highlights: ["RESTful API架构", "RBAC权限管理", "响应时间提升40%"],
    links: [
      { label: "仓库", href: "https://github.com/allen-iwen/flask-ecommerce-admin" },
    ],
  },
  {
    id: "tornado-forum",
    group: "web",
    groupLabel: "全栈Web开发",
    category: "全栈开发",
    title: "Tornado高并发论坛系统",
    summary: "基于Tornado异步框架的高并发论坛系统，支持实时聊天、帖子管理、用户互动等功能",
    tech: ["Tornado", "MongoDB", "WebSocket", "Vue.js"],
    highlights: ["万级并发连接", "WebSocket实时消息推送", "MongoDB查询优化", "完整REST API"],
    links: [
      { label: "在线预览", href: "https://allen-iwen.github.io/Tornado-Project/" },
      { label: "仓库", href: "https://github.com/allen-iwen/Tornado-Project" },
    ],
  },
  {
    id: "django-edu",
    group: "web",
    groupLabel: "全栈Web开发",
    category: "Web开发",
    title: "Django在线教育平台",
    summary: "功能完整的在线教育平台，包含用户管理、课程管理、支付系统等核心功能",
    tech: ["Django", "Python", "HTML/CSS/JS"],
    highlights: ["完整的教育业务流程", "支付系统集成"],
    links: [],
  },
  {
    id: "ticket-predictor",
    group: "ai",
    groupLabel: "AI与机器学习",
    category: "AI系统",
    title: "智能工单预测系统",
    summary: "基于BERT+XGBoost双模型融合的智能解决方案预测系统",
    tech: ["BERT", "XGBoost", "Python", "JIRA API"],
    highlights: ["准确率87.3%", "响应时间165ms", "工单处理效率提升60%"],
    links: [],
  },
  {
    id: "multi-agent",
    group: "ai",
    groupLabel: "AI与机器学习",
    category: "AI系统",
    title: "多Agent协同数据分析平台",
    summary:
      "设计了多Agent协作架构，集成豆包、通义千问、DeepSeek三种大模型；构建数据清洗Agent、统计分析Agent、报告生成Agent的端到端自动化协同工作流；支持CSV/Excel/JSON多格式的数据处理管线，提供交互式Web界面实现实时分析与可视化。",
    tech: ["Python", "异步编程", "豆包", "通义千问", "DeepSeek", "Pandas", "Matplotlib", "Plotly", "Streamlit"],
    highlights: [
      "多Agent协作架构，模型间任务编排与上下文共享",
      "支持CSV/Excel/JSON的自动化处理流水线",
      "交互式Web界面，支持实时数据分析与可视化展示",
      "异步并发优化多模型调用，处理效率提升60%",
      "智能数据清洗算法，自动识别并修复数据质量问题",
      "集成Matplotlib与Plotly，生成专业分析报告",
    ],
    links: [
      { label: "仓库", href: "https://github.com/allen-iwen/multi-agent-data-analysis" },
    ],
  },
  {
    id: "stock-sprite",
    group: "ai",
    groupLabel: "AI与机器学习",
    category: "金融科技",
    title: "股票短线精灵",
    summary: "使用LSTM+XGBoost融合模型的股票短线预测系统",
    tech: ["LSTM", "XGBoost", "Python", "金融数据API"],
    highlights: ["预测准确率68%", "实时预测", "量化交易策略"],
    links: [],
  },
]

export const codeExamples = [
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
    return jsonify([u.to_dict() for u in User.query.all()])`,
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
    return final_pred`,
  },
]

// { role, org, time, summary, points: [] }
export const experience = []

// { title, date, summary, href }
export const writing = []
