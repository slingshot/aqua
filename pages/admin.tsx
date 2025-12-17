import { useState, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import { Lock, Plus, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';

interface Embed {
    key: string;
    target: string;
    title?: string;
    description?: string;
}

export default function AdminPage() {
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [embeds, setEmbeds] = useState<Embed[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // New embed form state
    const [newKey, setNewKey] = useState('');
    const [newTarget, setNewTarget] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [creating, setCreating] = useState(false);

    const fetchEmbeds = async (authToken: string) => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/embeds?token=${encodeURIComponent(authToken)}`);
            if (res.status === 401) {
                setIsAuthenticated(false);
                setError('Invalid token');
                return;
            }
            if (!res.ok) {
                throw new Error('Failed to fetch embeds');
            }
            const data = await res.json();
            setEmbeds(data);
            setIsAuthenticated(true);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        fetchEmbeds(token);
    };

    const handleCreateEmbed = async (e: FormEvent) => {
        e.preventDefault();
        if (!newKey || !newTarget) {
            setError('Key and Target URL are required');
            return;
        }

        setCreating(true);
        setError('');

        try {
            const res = await fetch(`/api/create?token=${encodeURIComponent(token)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key: newKey,
                    type: 'embed',
                    target: newTarget,
                    title: newTitle || undefined,
                    description: newDescription || undefined,
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Failed to create embed');
            }

            // Clear form and refresh list
            setNewKey('');
            setNewTarget('');
            setNewTitle('');
            setNewDescription('');
            await fetchEmbeds(token);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred');
        } finally {
            setCreating(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <>
                <Head>
                    <title>Admin Login</title>
                </Head>
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5" />
                                Admin Access
                            </CardTitle>
                            <CardDescription>
                                Enter your API token to access the admin panel
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <Input
                                    type="password"
                                    placeholder="API Token"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    autoFocus
                                />
                                {error && (
                                    <p className="text-sm text-destructive">{error}</p>
                                )}
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Authenticating...' : 'Login'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Admin Panel</title>
            </Head>
            <div className="min-h-screen bg-background p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Embed Manager</h1>
                        <Button
                            variant="outline"
                            onClick={() => fetchEmbeds(token)}
                            disabled={loading}
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Create New Embed */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Create New Embed
                            </CardTitle>
                            <CardDescription>
                                Add a new redirect/embed to your collection
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCreateEmbed} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="key" className="text-sm font-medium">
                                            Key (URL slug) *
                                        </label>
                                        <Input
                                            id="key"
                                            placeholder="my-redirect"
                                            value={newKey}
                                            onChange={(e) => setNewKey(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="target" className="text-sm font-medium">
                                            Target URL *
                                        </label>
                                        <Input
                                            id="target"
                                            type="url"
                                            placeholder="https://example.com"
                                            value={newTarget}
                                            onChange={(e) => setNewTarget(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="text-sm font-medium">
                                            Title (optional)
                                        </label>
                                        <Input
                                            id="title"
                                            placeholder="Page Title"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="description" className="text-sm font-medium">
                                            Description (optional)
                                        </label>
                                        <Input
                                            id="description"
                                            placeholder="Page description for meta tags"
                                            value={newDescription}
                                            onChange={(e) => setNewDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" disabled={creating}>
                                    {creating ? 'Creating...' : 'Create Embed'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Existing Embeds */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Existing Embeds</CardTitle>
                            <CardDescription>
                                {embeds.length} embed{embeds.length !== 1 ? 's' : ''} found
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {embeds.length === 0 ? (
                                <p className="text-muted-foreground text-center py-8">
                                    No embeds found. Create your first one above!
                                </p>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Key</TableHead>
                                            <TableHead>Target URL</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="w-[100px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {embeds.map((embed) => (
                                            <TableRow key={embed.key}>
                                                <TableCell className="font-mono">
                                                    /{embed.key}
                                                </TableCell>
                                                <TableCell className="max-w-[200px] truncate">
                                                    {embed.target}
                                                </TableCell>
                                                <TableCell>{embed.title || '-'}</TableCell>
                                                <TableCell className="max-w-[200px] truncate">
                                                    {embed.description || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <a
                                                            href={`/${embed.key}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
