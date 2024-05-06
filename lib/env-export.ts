export const serverUrl = (endpoint?: string): string => {
  const url = process?.env?.NEXT_PUBLIC_SERVER_URL as string;
  if (endpoint) {
    return url + endpoint;
  }
  return url;
};
