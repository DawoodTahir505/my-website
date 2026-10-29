import React, { useEffect, useRef } from 'react';

export const NeuralCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let targetCount = 55;
    let effectiveMaxDistance = 130;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      isSpecial: boolean;
      pulseOffset: number;
    }

    interface Pulse {
      from: Node;
      to: Node;
      progress: number;
      speed: number;
      color: string;
    }

    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -1000, y: -1000, radius: 140, active: false };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const isMobile = width < 768;
      targetCount = isMobile ? 26 : 55;
      effectiveMaxDistance = isMobile ? 95 : 130;

      createNodes();
    };

    const createNodes = () => {
      nodes = [];
      for (let i = 0; i < targetCount; i++) {
        const isSpecial = Math.random() < 0.25;
        const r = isSpecial ? 2.5 + Math.random() * 1.5 : 1.5 + Math.random();
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: r,
          baseRadius: r,
          isSpecial,
          pulseOffset: Math.random() * Math.PI * 2
        });
      }
    };

    handleResize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 1) {
            const force = (1 - dist / mouse.radius) * 0.08;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
            const spd = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (spd > 1.2) {
              node.vx *= 0.95;
              node.vy *= 0.95;
            }
          }
        }
      }

      // Edges
      const maxDistSq = effectiveMaxDistance * effectiveMaxDistance;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / effectiveMaxDistance) * 0.32;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            if (a.isSpecial || b.isSpecial) {
              ctx.strokeStyle = `rgba(129, 140, 248, ${alpha * 1.2})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();

            if (Math.random() < 0.001 && pulses.length < 12) {
              pulses.push({
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

      // Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const px = p.from.x + (p.to.x - p.from.x) * p.progress;
        const py = p.from.y + (p.to.y - p.from.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(time * 0.003 + node.pulseOffset) * 0.5 + 0.5;

        ctx.beginPath();
        const r = node.baseRadius + (node.isSpecial ? pulse * 1.2 : 0);
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);

        if (node.isSpecial) {
          ctx.fillStyle = 'rgba(168, 85, 247, 0.9)';
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 10 * pulse;
        } else {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.95)';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 4;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      render(0);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block opacity-70" />;
};
