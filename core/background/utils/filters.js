export function makeDomainFilter(domain) {
  domain = domain.trim();
  return domain.startsWith("||") ? domain : `||${domain}^`;;
}

export function makeKeywordFilter(keyword) {
  return keyword.trim() || null;
}
