export const compareObjects = (obj1: any, obj2: any) => {
  const sortedKeys1 = Object.keys(obj1).sort();
  const sortedKeys2 = Object.keys(obj2).sort();

  if (sortedKeys1.length !== sortedKeys2.length) {
    return false;
  }

  for (let i = 0; i < sortedKeys1.length; i++) {
    const key = sortedKeys1[i];

    // Recursive comparison for nested objects
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!compareObjects(obj1[key], obj2[key])) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};
