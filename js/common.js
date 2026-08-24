// サイト全体で使う共通の小さな関数をまとめたファイル

// JSONファイルを読み込んで、パースした結果を返す
async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`failed to load ${path}: ${res.status}`);
  }
  return res.json();
}

// "2026-08-24" のような日付文字列を "2026年8月24日" の形式にする
function formatDateJP(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

// HTMLとして解釈されると困る文字をエスケープする
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
