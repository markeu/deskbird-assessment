export const isAdmin = (role: string): boolean => {
  return role === 'admin';
};

export const isCreatedByUser = (bookingCreatedBy: string, userEmail: string): boolean => {
  return bookingCreatedBy !== userEmail;
};
