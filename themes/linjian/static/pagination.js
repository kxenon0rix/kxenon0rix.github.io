(() => {
  const list = document.querySelector("[data-responsive-list]");
  if (!list) return;

  const container = list.closest(".container");
  const footer = container?.querySelector(".footer");
  if (!container || !footer) return;

  let nav = container.querySelector("[data-responsive-pagination]");
  if (!nav) {
    nav = document.createElement("nav");
    nav.className = "pagination";
    nav.setAttribute("aria-label", "文章分页");
    nav.dataset.responsivePagination = "";
    list.after(nav);
  } else {
    nav.dataset.responsivePagination = "";
  }

  const itemFor = (post) => {
    const item = document.createElement("li");
    item.className = "post";
    const link = document.createElement("a");
    link.className = "post-title";
    link.href = post.url;
    link.textContent = post.title;
    const date = document.createElement("time");
    date.className = "post-date";
    date.dateTime = post.date;
    date.textContent = post.date;
    item.append(link, date);
    return item;
  };

  const link = (label, page, text) => {
    const a = document.createElement("a");
    a.href = `?p=${page + 1}`;
    a.setAttribute("aria-label", label);
    a.textContent = text;
    a.addEventListener("click", (event) => {
      event.preventDefault();
      show(page, true);
    });
    return a;
  };

  let items = [];
  let pageSize = 1;
  const requestedPage = new URLSearchParams(location.search).get("p");
  let page = Math.max(0, Number(requestedPage || list.dataset.staticPage || 1) - 1);
  let initialLayout = true;

  const fitCount = () => {
    const style = getComputedStyle(container);
    const navStyle = getComputedStyle(nav);
    const savedMargin = footer.style.marginTop;
    footer.style.marginTop = "24px";
    const top = list.getBoundingClientRect().top;
    const bottomPadding = parseFloat(style.paddingBottom) || 0;
    const footerGap = 24;
    const navSpace = nav.hidden ? 0 : nav.offsetHeight + (parseFloat(navStyle.marginTop) || 0);
    const footerSpace = footer.offsetHeight + footerGap;
    const available = Math.max(0, window.innerHeight - top - bottomPadding - navSpace - footerSpace - 8);
    footer.style.marginTop = savedMargin;

    const listStyle = getComputedStyle(list);
    const gap = parseFloat(listStyle.rowGap) || 0;
    let used = 0;
    let count = 0;
    for (const item of items) {
      const next = item.getBoundingClientRect().height + (count ? gap : 0);
      if (count && used + next > available) break;
      used += next;
      count++;
    }
    return Math.max(1, count);
  };

  const show = (nextPage, updateUrl = false) => {
    page = Math.max(0, Math.min(nextPage, Math.ceil(items.length / pageSize) - 1));
    const start = page * pageSize;
    items.forEach((item, index) => { item.hidden = index < start || index >= start + pageSize; });

    const total = Math.max(1, Math.ceil(items.length / pageSize));
    nav.replaceChildren();
    nav.hidden = total <= 1;
    if (!nav.hidden) {
      if (page > 0) nav.append(link("上一页", page - 1, "←"));
      const status = document.createElement("span");
      status.className = "page-status";
      status.setAttribute("aria-live", "polite");
      status.textContent = `${page + 1} / ${total}`;
      nav.append(status);
      if (page < total - 1) nav.append(link("下一页", page + 1, "→"));
    }

    if (updateUrl) {
      const url = new URL(location.href);
      if (page) url.searchParams.set("p", String(page + 1));
      else url.searchParams.delete("p");
      history.pushState({ page }, "", url);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const reflow = () => {
    if (!items.length) return;
    const firstVisible = initialLayout ? 0 : page * pageSize;
    items.forEach((item) => { item.hidden = false; });
    nav.hidden = false;
    const nextSize = fitCount();
    pageSize = nextSize;
    page = initialLayout ? page : Math.floor(firstVisible / pageSize);
    initialLayout = false;
    show(page);
  };

  fetch(list.dataset.indexUrl, { credentials: "same-origin" })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error("index unavailable")))
    .then((posts) => {
      if (!Array.isArray(posts) || !posts.length) return;
      list.replaceChildren(...posts.map(itemFor));
      items = Array.from(list.children);
      reflow();
      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(reflow, 100);
      }, { passive: true });
      window.addEventListener("popstate", () => show(Math.max(0, Number(new URLSearchParams(location.search).get("p") || 1) - 1)));
      if (document.fonts?.ready) document.fonts.ready.then(reflow);
    })
    .catch(() => {});
})();
