const MAX_LIMIT = 100;

export function parseListQuery(query = {}, { defaultLimit = 0 } = {}) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const rawLimit = Number.parseInt(query.limit, 10);
  const limit = Number.isFinite(rawLimit) && rawLimit > 0
    ? Math.min(MAX_LIMIT, rawLimit)
    : defaultLimit;

  const search = cleanText(query.q ?? query.search, 120);
  const status = ['draft', 'published'].includes(query.status) ? query.status : '';
  const rawType = cleanText(query.type, 60);
  const type = rawType === 'all' ? '' : rawType;
  const location = ['hyderabad', 'telangana', 'andhra-pradesh'].includes(query.location)
    ? query.location
    : '';
  const budget = ['under-1cr', '1-3cr', 'above-3cr'].includes(query.budget) ? query.budget : '';
  const sort = ['featured', 'price-asc', 'price-desc'].includes(query.sort) ? query.sort : '';

  return {
    page,
    limit: Math.max(0, Math.min(MAX_LIMIT, limit)),
    search,
    status,
    type,
    location,
    budget,
    sort
  };
}

export function cleanText(value, maxLength = 500) {
  if (value === undefined || value === null) return '';
  return String(value).trim().slice(0, maxLength);
}

export function cleanMultiline(value, maxLength = 5000) {
  return cleanText(value, maxLength);
}

export function isEmail(value) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function isPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 20;
}

export function toBoolean(value) {
  return value === true || value === 'true' || value === '1';
}
