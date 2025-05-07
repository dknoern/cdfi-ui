export const filterUnusedCategories = ({ metrics, categories }) => {
  const usedCatIds = new Set();
  metrics.forEach((metric) => {
    usedCatIds.add(metric.parentId);
    usedCatIds.add(metric.grandParentId);
  });
  return categories.filter((category) => usedCatIds.has(category.id));
};
