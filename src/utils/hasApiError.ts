type APIError = {
  reason: string;
};

export function hasApiError(response: any): response is APIError {
  return response && response.reason;
}
