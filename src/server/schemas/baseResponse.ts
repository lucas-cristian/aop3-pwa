export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export function buildSuccess<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

export function buildError(error: string, message?: string): ApiResponse<null> {
  return { success: false, error, message };
}
