// ==UserScript==
// @name         58同城租房电话提取 (基于用户提供脚本的修复版)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  提取移动端/详情页电话，显示浮动按钮并解码字体加密号码（需 opentype.js）
// @author       Manus AI, modified
// @match        *://*.58.com/zufang/*
// @match        *://m.58.com/*/zufang/*
// @match        *://m.58.com/*/ershoufang/*
// @grant        GM_setClipboard
// @grant        GM_openInTab
// @require      https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js
// ==/UserScript==

(function() {
  'use strict';
  console.log('58同城租房电话提取 (基于用户提供脚本的修复版) 加载');
  
  // 防止页面自动刷新的全局处理
  function preventAutoRefresh() {
    // 拦截可能导致页面刷新的方法
    const originalReload = window.location.reload;
    window.location.reload = function(...args) {
      // 检查调用栈，如果是从我们的脚本调用的，则阻止刷新
      const stackTrace = new Error().stack || '';
      if (stackTrace.includes('extractAndDisplayPhoneNumbers') || 
          stackTrace.includes('simulatePhoneClick') ||
          stackTrace.includes('displayResults')) {
        console.warn('阻止了页面自动刷新尝试');
        return false;
      }
      // 其他情况正常刷新
      return originalReload.apply(this, args);
    };
    
    // 拦截可能的表单提交
    document.addEventListener('submit', function(e) {
      // 如果正在提取电话，阻止所有表单提交
      if (document.getElementById('phone-extract-loading') || 
          document.getElementById('phone-extract-results')) {
        e.preventDefault();
        e.stopPropagation();
        console.warn('阻止了表单提交');
        return false;
      }
    }, true);
    
    // 拦截可能的页面跳转
    const originalAssign = window.location.assign;
    window.location.assign = function(url) {
      // 如果正在提取电话，阻止页面跳转
      if (document.getElementById('phone-extract-loading') || 
          document.getElementById('phone-extract-results')) {
        console.warn('阻止了页面跳转:', url);
        return false;
      }
      // 其他情况正常跳转
      return originalAssign.apply(this, arguments);
    };
    
    console.log('已安装自动刷新防护');
  }

  // 创建浮动按钮（防重复）
  function createFloatingButton() {
    if (document.getElementById('extract-phone-button')) return;
    
    // 确保DOM完全加载
    const checkDOM = () => {
      if (!document.body) {
        setTimeout(checkDOM, 100);
        return;
      }
      
      const button = document.createElement('button');
      button.id = 'extract-phone-button';
      button.innerText = '提取电话';
      Object.assign(button.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '2147483647',
        padding: '10px 14px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '22px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        cursor: 'pointer',
        fontSize: '14px',
        // X浏览器兼容样式
        WebkitAppearance: 'none',
        MozAppearance: 'none'
      });
      
      // 添加点击事件
      const clickHandler = (e) => {
        // 阻止默认行为和事件冒泡，防止页面刷新
        e.preventDefault();
        e.stopPropagation();
        
        console.log('提取按钮点击');
        
        // 检查是否是列表页
        const isListPage = checkIfListPage();
        
        if (isListPage) {
          // 如果是列表页，提取所有房源的电话
          extractAllListingPhones();
        } else {
          // 如果是详情页，提取当前房源的电话
          extractAndDisplayPhoneNumbers();
        }
        
        // 返回 false 进一步确保不会触发默认行为
        return false;
      };
      
      // 同时添加touch和click事件，确保移动端兼容
      button.addEventListener('click', clickHandler);
      button.addEventListener('touchend', (e) => {
        // 阻止默认行为和事件冒泡，防止页面刷新
        e.preventDefault();
        e.stopPropagation();
        
        console.log('提取按钮触摸');
        
        // 检查是否是列表页
        const isListPage = checkIfListPage();
        
        if (isListPage) {
          // 如果是列表页，提取所有房源的电话
          extractAllListingPhones();
        } else {
          // 如果是详情页，提取当前房源的电话
          extractAndDisplayPhoneNumbers();
        }
        
        // 返回 false 进一步确保不会触发默认行为
        return false;
      });
      
      // 插入到页面顶部，避免被其他元素遮挡
      document.documentElement.appendChild(button);
      
      // 强制重绘，解决X浏览器渲染问题
      setTimeout(() => {
        button.style.display = 'none';
        button.offsetHeight; // 触发重绘
        button.style.display = 'block';
      }, 50);
    };
    
    checkDOM();
  }
  
  // 检查是否是列表页
  function checkIfListPage() {
    // 检查是否有多个房源列表项
    const listingItems = document.querySelectorAll('.list-item, .house-list li, .list > li, [class*="house-item"], [class*="listing-item"]');
    return listingItems && listingItems.length > 1;
  }
  
  // 提取列表页所有房源的电话
  async function extractAllListingPhones() {
    console.log('开始提取所有房源电话号码...');
    
    // 显示加载指示器
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'phone-extract-loading';
    Object.assign(loadingIndicator.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0,0,0,0.7)',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '20px',
      zIndex: '2147483647',
      fontSize: '14px'
    });
    loadingIndicator.textContent = '正在提取所有房源电话号码...';
    document.body.appendChild(loadingIndicator);
    
    try {
      // 获取字体映射
      const fontMap = await getFontMap();
      
      // 查找所有房源列表项
      const listingItems = document.querySelectorAll('.list-item, .house-list li, .list > li, [class*="house-item"], [class*="listing-item"]');
      
      if (!listingItems || listingItems.length === 0) {
        alert('未找到房源列表项');
        loadingIndicator.remove();
        return;
      }
      
      console.log(`找到 ${listingItems.length} 个房源列表项`);
      
      // 存储所有房源的电话号码
      const listingPhones = [];
      
      // 遍历每个房源列表项
      for (let i = 0; i < listingItems.length; i++) {
        const item = listingItems[i];
        
        // 获取房源标题
        let title = '';
        const titleElem = item.querySelector('[class*="title"], h3, h4, [class*="name"]');
        if (titleElem) {
          title = titleElem.textContent.trim();
        }
        
        // 获取房源价格
        let price = '';
        const priceElem = item.querySelector('[class*="price"], [class*="money"], .num');
        if (priceElem) {
          price = priceElem.textContent.trim();
        }
        
        // 提取该房源的电话号码
        const phones = await extractPhonesFromElement(item, fontMap);
        
        // 添加到结果列表
        listingPhones.push({
          element: item,
          title: title,
          price: price,
          phones: phones
        });
      }
      
      // 移除加载指示器
      loadingIndicator.remove();
      
      // 显示结果
      displayListingPhones(listingPhones);
      
    } catch (error) {
      console.error('提取所有房源电话号码时发生错误:', error);
      loadingIndicator.remove();
      alert('提取电话号码时发生错误，请稍后再试');
    }
  }
  
  // 从元素中提取电话号码
  async function extractPhonesFromElement(element, fontMap) {
    const phoneSet = new Set();
    
    try {
      // 1) 检查所有属性
      if (element.attributes) {
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          if (attr && attr.value) {
            const dec = decodeText(attr.value.trim(), fontMap);
            const m = dec.match(/1[3-9]\d{9}/g);
            if (m) m.forEach(x => phoneSet.add(x));
          }
        }
      }
      
      // 2) 特别检查常见的电话属性
      const phoneAttrs = ['data-phone', 'data-tel', 'data-mobile', 'phone', 'tel', 'mobile'];
      phoneAttrs.forEach(attr => {
        const val = element.getAttribute && element.getAttribute(attr);
        if (val) {
          const dec = decodeText(val.trim(), fontMap);
          const m = dec.match(/1[3-9]\d{9}/g);
          if (m) m.forEach(x => phoneSet.add(x));
        }
      });
      
      // 3) href tel: 链接
      const telLinks = element.querySelectorAll('a[href^="tel:"]');
      telLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('tel:')) {
          const dec = decodeText(href.slice(4).trim(), fontMap);
          const m = dec.match(/1[3-9]\d{9}/g);
          if (m) m.forEach(x => phoneSet.add(x));
        }
      });
      
      // 4) 文本内容
      const allText = element.textContent || '';
      if (allText) {
        const dec = decodeText(allText, fontMap);
        const m = dec.match(/1[3-9]\d{9}/g);
        if (m) m.forEach(x => phoneSet.add(x));
      }
      
      // 5) 检查图片的 alt 和 title 属性
      const images = element.querySelectorAll('img');
      images.forEach(img => {
        const alt = img.getAttribute('alt');
        if (alt) {
          const dec = decodeText(alt, fontMap);
          const m = dec.match(/1[3-9]\d{9}/g);
          if (m) m.forEach(x => phoneSet.add(x));
        }
        
        const title = img.getAttribute('title');
        if (title) {
          const dec = decodeText(title, fontMap);
          const m = dec.match(/1[3-9]\d{9}/g);
          if (m) m.forEach(x => phoneSet.add(x));
        }
      });
      
      // 6) 检查隐藏元素
      const hiddenElements = element.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"], [hidden]');
      hiddenElements.forEach(el => {
        const text = el.textContent || '';
        if (text) {
          const dec = decodeText(text, fontMap);
          const m = dec.match(/1[3-9]\d{9}/g);
          if (m) m.forEach(x => phoneSet.add(x));
        }
      });
      
      // 7) 检查 data-* 属性
      const dataAttrs = Array.from(element.attributes).filter(attr => attr.name.startsWith('data-'));
      dataAttrs.forEach(attr => {
        const dec = decodeText(attr.value, fontMap);
        const m = dec.match(/1[3-9]\d{9}/g);
        if (m) m.forEach(x => phoneSet.add(x));
      });
      
      // 8) 检查内联样式中可能包含的电话号码
      const styleAttr = element.getAttribute('style');
      if (styleAttr) {
        const dec = decodeText(styleAttr, fontMap);
        const m = dec.match(/1[3-9]\d{9}/g);
        if (m) m.forEach(x => phoneSet.add(x));
      }
      
      // 9) 检查元素的 innerHTML
      const innerHTML = element.innerHTML;
      if (innerHTML) {
        const dec = decodeText(innerHTML, fontMap);
        const m = dec.match(/1[3-9]\d{9}/g);
        if (m) m.forEach(x => phoneSet.add(x));
      }
      
      // 10) 检查注释节点
      const commentWalker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_COMMENT,
        null,
        false
      );
      
      let commentNode;
      while (commentNode = commentWalker.nextNode()) {
        const comment = commentNode.nodeValue;
        if (comment) {
          const dec = decodeText(comment, fontMap);
          const m = dec.match(/1[3-9]\d{9}/g);
          if (m) m.forEach(x => phoneSet.add(x));
        }
      }
      
    } catch (e) {
      console.warn('从元素提取电话号码时出错:', e);
    }
    
    return Array.from(phoneSet);
  }
  
  // 显示列表页所有房源的电话号码
  function displayListingPhones(listingPhones) {
    console.log('显示所有房源电话号码:', listingPhones);
    
    // 移除旧的电话号码显示
    document.querySelectorAll('.listing-phone-container').forEach(el => el.remove());
    
    // 所有电话号码的集合
    const allPhones = new Set();
    
    // 遍历每个房源
    listingPhones.forEach(listing => {
      if (!listing.phones || listing.phones.length === 0) return;
      
      // 将电话号码添加到集合中
      listing.phones.forEach(phone => allPhones.add(phone));
      
      // 创建电话号码显示容器
      const phoneContainer = document.createElement('div');
      phoneContainer.className = 'listing-phone-container';
      Object.assign(phoneContainer.style, {
        padding: '8px 10px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e74c3c',
        borderRadius: '5px',
        marginTop: '5px',
        marginBottom: '10px',
        fontSize: '16px',
        color: '#e74c3c',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      });
      
      // 添加电话号码
      phoneContainer.textContent = listing.phones.join(', ');
      
      // 插入到房源元素中
      listing.element.appendChild(phoneContainer);
    });
    
    // 显示汇总结果
    if (allPhones.size > 0) {
      // 创建汇总结果容器
      const summaryContainer = document.createElement('div');
      summaryContainer.id = 'phone-extract-summary';
      Object.assign(summaryContainer.style, {
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: '2147483646',
        maxWidth: '300px',
        maxHeight: '200px',
        overflowY: 'auto',
        border: '1px solid #28a745'
      });
      
      // 添加标题
      const title = document.createElement('div');
      title.textContent = '所有电话号码:';
      Object.assign(title.style, {
        fontWeight: 'bold',
        marginBottom: '10px',
        borderBottom: '1px solid #eee',
        paddingBottom: '5px'
      });
      summaryContainer.appendChild(title);
      
      // 添加电话号码列表
      const phonesList = document.createElement('div');
      Array.from(allPhones).forEach(phone => {
        const phoneItem = document.createElement('div');
        phoneItem.textContent = phone;
        Object.assign(phoneItem.style, {
          marginBottom: '5px'
        });
        phonesList.appendChild(phoneItem);
      });
      summaryContainer.appendChild(phonesList);
      
      // 添加复制按钮
      const copyButton = document.createElement('button');
      copyButton.textContent = '复制全部';
      Object.assign(copyButton.style, {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        marginTop: '10px',
        cursor: 'pointer',
        width: '100%',
        fontWeight: 'bold'
      });
      
      copyButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const text = Array.from(allPhones).join('\n');
        if (typeof GM_setClipboard !== 'undefined') {
          GM_setClipboard(text);
          alert('已复制到剪贴板');
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            alert('已复制到剪贴板');
          } catch (e) {
            alert('复制失败，请手动复制');
          }
          document.body.removeChild(textarea);
        }
      });
      
      summaryContainer.appendChild(copyButton);
      
      // 添加关闭按钮
      const closeButton = document.createElement('button');
      closeButton.textContent = '×';
      Object.assign(closeButton.style, {
        position: 'absolute',
        top: '5px',
        right: '5px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        color: '#666'
      });
      
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        summaryContainer.remove();
      });
      
      summaryContainer.appendChild(closeButton);
      
      document.body.appendChild(summaryContainer);
    }
  }

  // 从页面 style 标签里提取 base64 字体并生成映射
  async function getFontMap() {
    const map = {};
    try {
      // 查找所有可能的字体定义
      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
      let base64Font = null;
      
      // 检查内联样式
      for (const s of styles) {
        if (s.tagName === 'STYLE') {
          const m = s.textContent.match(/base64,([^
'"\)\s]+)/);
          if (m) { 
            base64Font = m[1]; 
            console.log('找到内联base64字体');
            break;
          }
        }
      }
      
      // 如果没有找到，尝试从外部CSS加载
      if (!base64Font) {
        console.log('未找到内联字体，尝试从外部CSS加载');
        for (const link of Array.from(document.querySelectorAll('link[rel="stylesheet"]'))) {
          try {
            const response = await new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: link.href,
                    onload: (res) => resolve(res),
                    onerror: (err) => reject(err)
                });
            });
      
(Content truncated due to size limit. Use page ranges or line ranges to read remaining content)