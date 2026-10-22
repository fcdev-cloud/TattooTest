const securityHeaders = {
	'X-Frame-Options': 'DENY',
	'X-XSS-Protection': '0',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Cache-Control': 'private',
	'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'Permissions-Policy': 'geolocation=(), camera=(), microphone=()',
	'X-DNS-Prefetch-Control': 'off'
};

export async function handle({ event, resolve }) {
	const response = await resolve(event);

	Object.entries(securityHeaders).forEach(([header, value]) => {
		response.headers.set(header, value);
	});

	return response;
}
