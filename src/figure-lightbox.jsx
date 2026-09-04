import { useCallback, useEffect, useState } from "react";

// Renders markdown-produced HTML and lets any <img> inside it open in a
// simple lightbox: click to open full-size (capped to the viewport with a
// margin), click anywhere or press Escape to close. The caption shown is
// the "Figure N. ..." paragraph preceding the image in the manual, when
// one exists.
export function MarkdownWithLightbox({ html, className }) {
  const [figure, setFigure] = useState(null);

  const onClick = useCallback((e) => {
    if (e.target.tagName !== "IMG") return;
    const img = e.target;
    // The manual's caption and image share one <p> (soft line break), so
    // look at the image's own paragraph first; fall back to the previous
    // element only if the own paragraph carries no caption text.
    const isCaption = (s) => /^Figure\s+\d/i.test(s);
    const p = img.closest("p") || img;
    let caption = p.textContent.trim();
    if (!isCaption(caption)) {
      const prev = p.previousElementSibling;
      caption =
        prev && isCaption(prev.textContent.trim())
          ? prev.textContent.trim()
          : "";
    }
    setFigure({ src: img.src, alt: img.alt, caption });
  }, []);

  // The markdown lands in the DOM after the browser has already acted on any
  // hash in the URL, so an inbound link to #4.4-t2ipa-entry would otherwise
  // sit at the top of the page. Do that scroll ourselves, once.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
  }, [html]);

  useEffect(() => {
    if (!figure) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setFigure(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [figure]);

  return (
    <>
      <div
        className={["figure-lightbox-content", className]
          .filter(Boolean)
          .join(" ")}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {figure && (
        <div
          className="figure-lightbox-overlay"
          onClick={() => setFigure(null)}
        >
          <img src={figure.src} alt={figure.alt || figure.caption} />
          {figure.caption && (
            <div className="figure-lightbox-caption">{figure.caption}</div>
          )}
        </div>
      )}
    </>
  );
}
