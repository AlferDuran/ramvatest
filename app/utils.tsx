export const formatFieldToName = (field: string) => {
  const formatted = field.replace(/([A-Z])/g, " $1");

  return (
    field
      .replace(/([A-Z])/g, " $1")
      .charAt(0)
      .toUpperCase() + formatted.slice(1)
  );
};
