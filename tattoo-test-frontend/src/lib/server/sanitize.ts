import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
	'p', 'br', 'strong', 'em', 'u', 's',
	'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
	'ul', 'ol', 'li',
	'a', 'blockquote', 'span'
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
	a: ['href', 'target', 'rel'],
    '*': ['style']
};

export function sanitizeWpHtml(dirty: string): string {
	return sanitizeHtml(dirty, {
		allowedTags: ALLOWED_TAGS,
		allowedAttributes: ALLOWED_ATTRIBUTES,
		transformTags: {
			a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true)
		}
	});
}