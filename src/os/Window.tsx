import { useEffect, useRef, useState } from 'react';
import type { Dispatch, PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { Maximize2, Minus, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { moveRect, resizeRect, zoomedRect } from './windowManager';
import type { Bounds, DesktopAction, ResizeEdge, WindowState } from './windowManager';

const EDGES: ResizeEdge[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

interface Props {
  win: WindowState;
  focused: boolean;
  /** On narrow screens windows fill the screen and cannot be moved or resized. */
  mobile: boolean;
  bounds: Bounds;
  title: string;
  icon: LucideIcon;
  color: string;
  /** Replaces the title in the title bar, e.g. the browser's tab strip. */
  bar?: ReactNode;
  dispatch: Dispatch<DesktopAction>;
  children: ReactNode;
}

export default function Window({ win, focused, mobile, bounds, title, icon: Icon, color, bar, dispatch, children }: Props) {
  const root = useRef<HTMLElement>(null);
  const [moving, setMoving] = useState(false);
  const { id } = win;

  // Bring keyboard focus along when this window comes to the front.
  useEffect(() => {
    const el = root.current;
    if (focused && el && !el.contains(document.activeElement)) el.focus({ preventScroll: true });
  }, [focused]);

  const startGesture = (event: ReactPointerEvent<HTMLElement>, edge: ResizeEdge | 'move') => {
    if (mobile || win.zoomed || event.button !== 0) return;
    if (edge === 'move' && (event.target as HTMLElement).closest('button, [role="tab"]')) return;
    const handle = event.currentTarget;
    const start = { x: event.clientX, y: event.clientY, rect: win.rect };
    handle.setPointerCapture(event.pointerId);
    setMoving(true);
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const rect = edge === 'move' ? moveRect(start.rect, dx, dy, bounds) : resizeRect(start.rect, edge, dx, dy, bounds);
      dispatch({ type: 'rect', id, rect });
    };
    const onEnd = () => {
      setMoving(false);
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onEnd);
      handle.removeEventListener('pointercancel', onEnd);
    };
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onEnd);
    handle.addEventListener('pointercancel', onEnd);
  };

  const rect = win.zoomed ? zoomedRect(bounds) : win.rect;
  const classes = [
    'window',
    focused && 'is-focused',
    win.minimized && 'is-minimized',
    win.zoomed && 'is-zoomed',
    moving && 'is-moving',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      ref={root}
      className={classes}
      role="dialog"
      aria-label={title}
      aria-hidden={win.minimized}
      inert={win.minimized ? '' : undefined}
      tabIndex={-1}
      style={mobile ? { zIndex: win.z } : { left: rect.x, top: rect.y, width: rect.w, height: rect.h, zIndex: win.z }}
      onPointerDownCapture={() => dispatch({ type: 'focus', id })}
      onFocusCapture={() => dispatch({ type: 'focus', id })}
    >
      <header
        className={`window__bar ${bar ? 'window__bar--custom' : ''}`}
        onPointerDown={(event) => startGesture(event, 'move')}
        onDoubleClick={(event) => {
          if (!mobile && !(event.target as HTMLElement).closest('button, [role="tab"]')) dispatch({ type: 'zoom', id });
        }}
      >
        <div className="window__lights">
          <button
            type="button"
            className="window__light window__light--close"
            onClick={() => dispatch({ type: 'close', id })}
            aria-label={`Close ${title}`}
          >
            <X size={9} strokeWidth={3.5} />
          </button>
          <button
            type="button"
            className="window__light window__light--minimize"
            onClick={() => dispatch({ type: 'minimize', id })}
            aria-label={`Minimise ${title}`}
          >
            <Minus size={9} strokeWidth={3.5} />
          </button>
          <button
            type="button"
            className="window__light window__light--zoom"
            onClick={() => dispatch({ type: 'zoom', id })}
            aria-label={win.zoomed ? `Restore ${title}` : `Zoom ${title}`}
            aria-pressed={win.zoomed}
          >
            <Maximize2 size={8} strokeWidth={3.5} />
          </button>
        </div>
        {bar ?? (
          <span className="window__title">
            <Icon size={14} style={{ color }} /> {title}
          </span>
        )}
      </header>
      <div className="window__content">{children}</div>
      {!mobile &&
        !win.zoomed &&
        EDGES.map((edge) => (
          <div
            key={edge}
            className={`window__resize window__resize--${edge}`}
            onPointerDown={(event) => startGesture(event, edge)}
          />
        ))}
    </section>
  );
}
