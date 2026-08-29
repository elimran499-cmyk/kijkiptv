import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

/* A minimal history-based router — no dependency, because the project adds none.
 *
 * The important part is `Link`: it renders a real `<a href>` so the page stays
 * crawlable and "open in new tab" works, and only hijacks the click when it is
 * a plain left click. Modified clicks (cmd/ctrl/shift/alt) and middle clicks
 * fall through to the browser untouched. */

interface RouterValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} });

export const useRouter = (): RouterValue => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
};

type LinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>;

export const Link: React.FC<LinkProps> = ({ to, children, className, onNavigate, ...rest }) => {
  const { navigate } = useRouter();

  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        // Let the browser handle anything that isn't a plain left click, so
        // cmd/ctrl-click still opens a new tab.
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onNavigate?.();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
};

/** Applies a route's metadata to the document. Client-side navigation doesn't
 *  reload the page, so title/description/canonical/og have to be set by hand or
 *  every route would keep the index.html defaults. */
export const useDocumentMeta = (meta: {
  title: string;
  description: string;
  path: string;
}): void => {
  useEffect(() => {
    document.title = meta.title;

    const set = (selector: string, create: () => HTMLElement, value: string, attr: string) => {
      let el = document.head.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    set(
      'meta[name="description"]',
      () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        return m;
      },
      meta.description,
      'content',
    );

    const url = window.location.origin + meta.path;

    set(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'canonical');
        return l;
      },
      url,
      'href',
    );

    for (const [prop, value] of [
      ['og:title', meta.title],
      ['og:description', meta.description],
      ['og:url', url],
    ] as const) {
      set(
        `meta[property="${prop}"]`,
        () => {
          const m = document.createElement('meta');
          m.setAttribute('property', prop);
          return m;
        },
        value,
        'content',
      );
    }
  }, [meta.title, meta.description, meta.path]);
};

/** Props for anything that renders its own `<a>` (GlassButton, inline links)
 *  but should navigate client-side. Same modified-click rules as `Link`. */
export const useLinkProps = (to: string) => {
  const { navigate } = useRouter();
  return {
    href: to,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigate(to);
    },
  };
};

/* Each route renders one section, so that section's heading is the page's
   `h1`. On the home route the hero already owns the `h1`, so section headings
   stay `h2` there. Without this every sub-page would ship with no `h1` at
   all, which would undercut the whole point of giving them their own URLs. */
const PageHeadingContext = createContext(false);

export const PageHeadingProvider: React.FC<{ value: boolean; children: React.ReactNode }> = ({
  value,
  children,
}) => <PageHeadingContext.Provider value={value}>{children}</PageHeadingContext.Provider>;

/** 'h1' when this section is the page's subject, otherwise 'h2'. */
export const usePageHeadingTag = (): 'h1' | 'h2' =>
  useContext(PageHeadingContext) ? 'h1' : 'h2';
