import { useState, useCallback } from "preact/hooks";

interface SearchResult {
  url: string;
  excerpt: string;
  meta: { title: string };
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      // @ts-expect-error Pagefind 在构建后注入全局对象
      const pagefind = await import("/pagefind/pagefind.js");
      const search = await pagefind.search(value);
      const items: SearchResult[] = [];
      for (const r of search.results.slice(0, 10)) {
        const data = await r.data();
        items.push({
          url: data.url,
          excerpt: data.excerpt,
          meta: data.meta as { title: string },
        });
      }
      setResults(items);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <input
        type="search"
        value={query}
        onInput={(e) => handleSearch((e.target as HTMLInputElement).value)}
        placeholder="搜索文章..."
        class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

      {loading && (
        <p class="mt-4 text-center text-sm text-gray-500">搜索中...</p>
      )}

      {searched && !loading && results.length === 0 && (
        <p class="mt-4 text-center text-sm text-gray-500">未找到相关文章</p>
      )}

      {results.length > 0 && (
        <ul class="mt-4 space-y-3">
          {results.map((r) => (
            <li>
              <a
                href={r.url}
                class="block rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <p class="font-medium text-gray-900 dark:text-white">{r.meta.title}</p>
                <p
                  class="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: r.excerpt }}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
