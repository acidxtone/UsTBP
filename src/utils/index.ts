export function createPageUrl(pageName: string) {
    if (!pageName) return '/';
    // Ensure case consistency; / is landing, Dashboard lives at /Dashboard
    const path = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    return '/' + path;
}
