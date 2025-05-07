interface WithId {
  id: any;
}

export const objects2map = <T extends WithId>(items: T[]): Map<T['id'], T> => {
  return new Map(items.map((item) => [item.id, item]));
};
