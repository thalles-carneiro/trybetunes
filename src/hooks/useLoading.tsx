import { useState } from 'react';

export default function useLoading(initialState: boolean) {
  const [loading, setLoading] = useState(initialState);
  return { loading, setLoading };
}
