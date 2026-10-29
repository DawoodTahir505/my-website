/**
 * ====================================================================
 * ABSTRACT COMPUTATIONAL NEURAL NETWORK VISUALIZER
 * ====================================================================
 * A bespoke, high-performance HTML5 Canvas simulation representing
 * neural network graph architectures, vector embeddings, and synaptic connections.
 * 
 * Features:
 * - Ultra-lightweight, 0 external dependencies
 * - Dynamic DPR handling for crisp Retina / high-PPI displays
 * - Proximity-based synaptic connection rendering
 * - Signal impulse pulses traveling across active edge weights
 * - Gentle mouse interaction with subtle attraction / glow
 * - Battery-conscious: pauses when scrolled out of view
 * - Respects prefers-reduced-motion accessibility preference
 */

class NeuralNetworkCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.pulses = [];
    this.mouse = { x: -1000, y: -1000, radius: 140, active: false };
    this.animationFrameId = null;
    this.isVisible = true;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.config = {
      baseNodeCount: 55,
      mobileNodeCount: 26,
      maxDistance: 130,
      mobileMaxDistance: 95,
      nodeSpeed: 0.35,
      pulseProbability: 0.025,
      colors: {
        nodeBase: 'rgba(148, 163, 184, 0.7)',
        nodeActive: 'rgba(56, 189, 248, 0.95)',
        nodeAccent: 'rgba(168, 85, 247, 0.9)',
        edgeBase: 'rgba(56, 189, 248, ', // trailing alpha appended dynamically
        edgeAccent: 'rgba(129, 140, 248, ',
        pulseColor: '#38bdf8'
      }
    };

    this.init();
  }

  init() {
    this.handleResize();
    this.createNodes();
    this.bindEvents();
    this.setupIntersectionObserver();
    this.start();
  }

  handleResize() {
    const parent = this.canvas.parentElement;
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = width;
    this.height = height;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.scale(dpr, dpr);

    const isMobile = width < 768;
    this.targetCount = isMobile ? this.config.mobileNodeCount : this.config.baseNodeCount;
    this.effectiveMaxDistance = isMobile ? this.config.mobileMaxDistance : this.config.maxDistance;
  }

  createNodes() {
    this.nodes = [];
    for (let i = 0; i < this.targetCount; i++) {
      const isSpecial = Math.random() < 0.25;
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.config.nodeSpeed,
        vy: (Math.random() - 0.5) * this.config.nodeSpeed,
        radius: isSpecial ? 2.5 + Math.random() * 1.5 : 1.5 + Math.random(),
        baseRadius: isSpecial ? 2.5 + Math.random() * 1.5 : 1.5 + Math.random(),
        isSpecial: isSpecial,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
        this.createNodes();
      }, 150);
    }, { passive: true });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.active = true;
    }, { passive: true });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.active = false;
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.touches[0].clientX - rect.left;
        this.mouse.y = e.touches[0].clientY - rect.top;
        this.mouse.active = true;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.mouse.active = false;
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    }, { passive: true });

    // Accessibility motion listener
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
      if (this.prefersReducedMotion) {
        this.drawStaticFrame();
      }
    });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationFrameId && !this.prefersReducedMotion) {
            this.start();
          } else if (!this.isVisible && this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(this.canvas);
  }

  drawStaticFrame() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.renderEdges();
    this.renderNodes();
  }

  start() {
    if (this.prefersReducedMotion) {
      this.drawStaticFrame();
      return;
    }

    const animate = (time) => {
      if (!this.isVisible) return;
      this.render(time);
      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  render(time) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off boundaries
      if (node.x < 0 || node.x > this.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.height) node.vy *= -1;

      // Mouse interactive deflection / gentle attraction
      if (this.mouse.active) {
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius && dist > 1) {
          const force = (1 - dist / this.mouse.radius) * 0.08;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
          // Dampen maximum velocity
          const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          if (currentSpeed > 1.2) {
            node.vx *= 0.95;
            node.vy *= 0.95;
          }
        }
      }
    }

    this.renderEdges();
    this.updateAndRenderPulses();
    this.renderNodes(time);
  }

  renderEdges() {
    const maxDist = this.effectiveMaxDistance;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const b = this.nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * 0.32;

          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);

          if (a.isSpecial || b.isSpecial) {
            this.ctx.strokeStyle = `${this.config.colors.edgeAccent}${alpha * 1.2})`;
            this.ctx.lineWidth = 1.2;
          } else {
            this.ctx.strokeStyle = `${this.config.colors.edgeBase}${alpha})`;
            this.ctx.lineWidth = 0.8;
          }
          this.ctx.stroke();

          // Chance to spawn dynamic synaptic pulse
          if (
            Math.random() < this.config.pulseProbability * 0.04 &&
            this.pulses.length < 12
          ) {
            this.pulses.push({
              from: a,
              to: b,
              progress: 0,
              speed: 0.02 + Math.random() * 0.02,
              color: a.isSpecial ? '#a855f7' : '#38bdf8'
            });
          }
        }
      }
    }
  }

  updateAndRenderPulses() {
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        this.pulses.splice(i, 1);
        continue;
      }

      const px = p.from.x + (p.to.x - p.from.x) * p.progress;
      const py = p.from.y + (p.to.y - p.from.y) * p.progress;

      this.ctx.beginPath();
      this.ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // Reset blur for next draw
    }
  }

  renderNodes(time = 0) {
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const pulse = Math.sin(time * 0.003 + node.pulseOffset) * 0.5 + 0.5;

      this.ctx.beginPath();
      const currentRadius = node.baseRadius + (node.isSpecial ? pulse * 1.2 : 0);
      this.ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);

      if (node.isSpecial) {
        this.ctx.fillStyle = this.config.colors.nodeAccent;
        this.ctx.shadowColor = '#a855f7';
        this.ctx.shadowBlur = 10 * pulse;
      } else {
        this.ctx.fillStyle = this.config.colors.nodeActive;
        this.ctx.shadowColor = '#38bdf8';
        this.ctx.shadowBlur = 4;
      }

      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }
  }
}

// Global initialization helper
window.initNeuralCanvas = function(canvasId = 'neural-canvas') {
  if (document.getElementById(canvasId)) {
    return new NeuralNetworkCanvas(canvasId);
  }
};
