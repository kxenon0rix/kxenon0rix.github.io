(function () {
  const body = document.body;
  const toast = (message) => {
    const node = document.getElementById('siteToast');
    const text = document.getElementById('toastMessage');
    if (!node || !window.bootstrap) return;
    text.textContent = message;
    bootstrap.Toast.getOrCreateInstance(node).show();
  };
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('.code-copy');
    if (!button) return;
    event.preventDefault();
    const code = button.closest('.code-block')?.querySelector('pre code');
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = '已复制';
      toast('代码已复制到剪贴板');
    } catch (_) {
      button.textContent = '复制失败';
      toast('无法访问剪贴板，请手动选择代码');
    }
    window.setTimeout(() => { button.textContent = '复制'; }, 1600);
  });
  const setTheme = (dark) => {
    body.classList.toggle('dark', dark);
    try { localStorage.setItem('journal-theme', dark ? 'dark' : 'light'); } catch (_) {}
    renderMermaid();
  };
  document.getElementById('themeToggle')?.addEventListener('click', () => setTheme(!body.classList.contains('dark')));
  document.getElementById('backTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.querySelectorAll('.page-turn-link').forEach((link) => link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !link.href || link.hash) return;
    event.preventDefault(); body.classList.add('page-turning'); setTimeout(() => { location.href = link.href; }, 220);
  }));
  document.getElementById('shareBtn')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); toast('文章链接已复制'); }
    catch (_) { toast('可以复制浏览器地址分享这篇文章'); }
  });
  document.querySelectorAll('.save-btn, #bookmarkBtn').forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault(); button.classList.toggle('saved');
    if (button.matches('#bookmarkBtn')) button.textContent = button.classList.contains('saved') ? '♥︎' : '♡︎';
    toast(button.classList.contains('saved') ? '已加入收藏' : '已取消收藏');
  }));
  const updateProgress = () => {
    const top = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.round(top / max * 100) : 0;
    const bar = document.getElementById('progressBar');
    if (bar) { bar.style.width = pct + '%'; bar.setAttribute('aria-valuenow', pct); }
    const label = document.getElementById('progressText'); if (label) label.textContent = pct + '%';
    document.getElementById('backTop')?.classList.toggle('visible', top > 350);
  };
  window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress();
  document.querySelectorAll('.demo-tabs').forEach((tabs) => {
    const panes = [...tabs.querySelectorAll('.hugo-tab')]; if (!panes.length) return;
    const nav = document.createElement('div'); nav.className = 'demo-tab-nav';
    panes.forEach((pane, index) => {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = pane.dataset.tabTitle || `选项 ${index + 1}`;
      button.classList.toggle('active', index === 0); pane.classList.add('demo-tab-pane'); pane.classList.toggle('active', index === 0);
      button.addEventListener('click', () => { nav.querySelectorAll('button').forEach((b) => b.classList.remove('active')); panes.forEach((p) => p.classList.remove('active')); button.classList.add('active'); pane.classList.add('active'); }); nav.append(button);
    });
    tabs.prepend(nav);
  });
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href')); if (!target) return;
    event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  let mermaidSources = [];
  function renderMermaid() {
    if (!window.mermaid) return;
    const dark = body.classList.contains('dark');
    document.querySelectorAll('pre.mermaid').forEach((node) => { if (!node.dataset.source) node.dataset.source = node.textContent; });
    mermaidSources = [...document.querySelectorAll('pre.mermaid')].map((node) => node.dataset.source);
    document.querySelectorAll('pre.mermaid').forEach((node, index) => { node.removeAttribute('data-processed'); node.textContent = mermaidSources[index]; });
    const labelBg = dark ? '#121a15' : '#fffdf7', labelText = dark ? '#fff7e5' : '#17251c', line = dark ? '#d0dfc5' : '#31543d';
    const mindmapPalette = dark ? {
      git0: '#527665', gitBranchLabel0: '#fff8e9',
      cScale0: '#527665', cScaleLabel0: '#fff8e9', cScale1: '#435f77', cScaleLabel1: '#fff8e9',
      cScale2: '#786044', cScaleLabel2: '#fff8e9', cScale3: '#665277', cScaleLabel3: '#fff8e9',
      cScale4: '#3e6d68', cScaleLabel4: '#fff8e9', cScale5: '#75535d', cScaleLabel5: '#fff8e9',
      cScale6: '#667145', cScaleLabel6: '#fff8e9', cScale7: '#536b7e', cScaleLabel7: '#fff8e9',
      cScale8: '#80664a', cScaleLabel8: '#fff8e9', cScale9: '#6e5b78', cScaleLabel9: '#fff8e9',
      cScale10: '#456e6b', cScaleLabel10: '#fff8e9', cScale11: '#765660', cScaleLabel11: '#fff8e9'
    } : {
      git0: '#789985', gitBranchLabel0: '#fffdf7',
      cScale0: '#789985', cScaleLabel0: '#fffdf7', cScale1: '#cbdce8', cScaleLabel1: '#203443',
      cScale2: '#efdfbd', cScaleLabel2: '#40321c', cScale3: '#dfd4e8', cScaleLabel3: '#352741',
      cScale4: '#c8e0d8', cScaleLabel4: '#1d3b36', cScale5: '#ead0d2', cScaleLabel5: '#472d32',
      cScale6: '#dfe3c7', cScaleLabel6: '#343b20', cScale7: '#cbdce8', cScaleLabel7: '#203443',
      cScale8: '#efdfbd', cScaleLabel8: '#40321c', cScale9: '#dfd4e8', cScaleLabel9: '#352741',
      cScale10: '#c8e0d8', cScaleLabel10: '#1d3b36', cScale11: '#ead0d2', cScaleLabel11: '#472d32'
    };
    mermaid.initialize({ startOnLoad: false, theme: 'base', securityLevel: 'loose', fontFamily: "'DM Sans',Arial,sans-serif", themeVariables: {
      ...mindmapPalette, useGradient: false, darkMode: dark, background: dark ? '#1b211d' : '#fffdf7', primaryColor: dark ? '#293a31' : '#edf1e9', primaryTextColor: labelText, primaryBorderColor: dark ? '#b5cfae' : '#486451', secondaryColor: dark ? '#303d34' : '#e6ece3', tertiaryColor: dark ? '#493d2d' : '#f1e6cf', lineColor: line, textColor: labelText, nodeTextColor: labelText, labelTextColor: labelText, edgeLabelBackground: labelBg, actorBkg: dark ? '#293a31' : '#edf1e9', actorBorder: dark ? '#b5cfae' : '#486451', actorTextColor: labelText, signalColor: line, signalTextColor: labelText, noteBkgColor: dark ? '#3b3424' : '#fff6df', noteTextColor: labelText, noteBorderColor: dark ? '#c2a66b' : '#9b7839'
    }, themeCSS: `.edgeLabel p{background:${labelBg}!important;color:${labelText}!important;padding:3px 7px!important;border-radius:3px;font-weight:700!important;line-height:1.3!important;white-space:nowrap!important;box-shadow:0 0 0 1px ${labelBg}} .flowchart-link{stroke:${line}!important;stroke-width:2.4px!important} .nodeLabel{color:${labelText}!important}` });
    mermaid.run({ querySelector: 'pre.mermaid' }).catch(() => {});
  }
  if (document.querySelector('pre.mermaid')) renderMermaid();
  const renderMath = () => { if (window.renderMathInElement) document.querySelectorAll('.article-content').forEach((node) => renderMathInElement(node, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\[', right: '\\]', display: true }, { left: '$', right: '$', display: false }, { left: '\\(', right: '\\)', display: false }], throwOnError: false })); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderMath, { once: true }); else renderMath();
})();
