export const Required = (value) => {
    if (value) return undefined;
    return 'Field is required';
}
export const MaxLength = (max) => (value) =>
    value && value.length > max ? `Must be ${max} characters or less` :
        undefined
