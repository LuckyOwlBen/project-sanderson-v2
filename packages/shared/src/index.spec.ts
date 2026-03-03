import { ApiResponse, User } from '@sanderson/shared';

describe('Shared Types', () => {
  it('should have ApiResponse interface with success property', () => {
    const response: ApiResponse<User> = {
      success: true,
      data: { id: 1, email: 'test@example.com', name: 'Test User' },
    };

    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
  });

  it('should have error property in ApiResponse', () => {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Something went wrong',
    };

    expect(response.success).toBe(false);
    expect(response.error).toBe('Something went wrong');
  });
});
