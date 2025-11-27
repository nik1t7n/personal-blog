import { useState, useMemo } from 'react';
import { Search, Grid, List, ArrowUpDown, Calendar, Tag } from 'lucide-react';

const BlogFeed = ({ posts }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest' | 'az' | 'za'

    const filteredPosts = useMemo(() => {
        let result = [...posts];

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (post) =>
                    post.data.title.toLowerCase().includes(query) ||
                    post.data.description.toLowerCase().includes(query) ||
                    (post.data.tags && post.data.tags.some(tag => tag.toLowerCase().includes(query)))
            );
        }

        // Sort
        result.sort((a, b) => {
            switch (sortOrder) {
                case 'newest':
                    return new Date(b.data.pubDate) - new Date(a.data.pubDate);
                case 'oldest':
                    return new Date(a.data.pubDate) - new Date(b.data.pubDate);
                case 'az':
                    return a.data.title.localeCompare(b.data.title);
                case 'za':
                    return b.data.title.localeCompare(a.data.title);
                default:
                    return 0;
            }
        });

        return result;
    }, [posts, searchQuery, sortOrder]);

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                    />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    {/* Sort */}
                    <div className="relative group">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm cursor-pointer"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="az">Title (A-Z)</option>
                            <option value="za">Title (Z-A)</option>
                        </select>
                        <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                    ? 'bg-neutral-100 dark:bg-neutral-700 text-purple-600 dark:text-purple-400 shadow-sm'
                                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                                }`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                    ? 'bg-neutral-100 dark:bg-neutral-700 text-purple-600 dark:text-purple-400 shadow-sm'
                                    : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                                }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts Grid/List */}
            <div
                className={`grid gap-4 ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'
                    }`}
            >
                {filteredPosts.map((post) => (
                    <a
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="group block"
                    >
                        <article
                            className="h-full bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-sm"
                        >
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <h2 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {post.data.title}
                                    </h2>
                                    <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2 text-sm leading-relaxed mb-4">
                                        {post.data.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <time dateTime={new Date(post.data.pubDate).toISOString()}>
                                            {new Date(post.data.pubDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </time>
                                    </div>
                                    {post.data.tags && (
                                        <>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <Tag className="w-3 h-3" />
                                                <span className="uppercase tracking-wider">
                                                    {post.data.tags[0]}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </article>
                    </a>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-20 text-neutral-500">
                    <p>No posts found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default BlogFeed;
