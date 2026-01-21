class Cursor {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.speed = 0.15; // 环跟随速度
    this.createCursor();
    this.initEvents();
    this.render();
  }

  createCursor() {
    this.el = document.createElement('div');
    this.el.id = 'cursor';
    this.el.innerHTML = `
      <div class="cursor-dot"></div>
      <div class="cursor-ring"></div>
    `;
    document.body.appendChild(this.el);
  }

  initEvents() {
    window.addEventListener('mousemove', e => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // 点击涟漪效果
    window.addEventListener('mousedown', e => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      document.body.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });

    // 事件委托识别交互元素 (a, button, input 等)
    document.addEventListener('mouseover', e => {
      const target = e.target.closest('a, button, .recent-post-item, .clickable');
      if (target) this.el.classList.add('hover');
    });

    document.addEventListener('mouseout', e => {
      const target = e.target.closest('a, button, .recent-post-item, .clickable');
      if (target) this.el.classList.remove('hover');
    });
  }

  // 平滑线性插值
  lerp(a, b, n) {
    return (1 - n) * a + n * b;
  }

  render() {
    this.pos.x = this.lerp(this.pos.x, this.mouse.x, this.speed);
    this.pos.y = this.lerp(this.pos.y, this.mouse.y, this.speed);
    
    // 内点跟随鼠标，外环平滑延迟
    const dot = this.el.querySelector('.cursor-dot');
    const ring = this.el.querySelector('.cursor-ring');
    
    dot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
    ring.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
    
    requestAnimationFrame(() => this.render());
  }

  refresh() {
    // PJAX 切换后重置状态
    this.el.classList.remove('hover');
  }
}

// 实例化并挂载到 window 方便引用
window.cursorInstance = new Cursor();
