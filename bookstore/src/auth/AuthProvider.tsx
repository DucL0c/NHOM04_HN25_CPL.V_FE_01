import { useEffect, useMemo, type JSX, type ReactNode } from 'react';
import { authStore } from './auth.store';

type Props = { children: ReactNode };

export default function AuthProvider({ children }: Props) {
  const user = authStore((s) => s.user);
  const accessToken = authStore((s) => s.accessToken);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'auth') window.location.reload();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo(() => ({ user, accessToken }), [user, accessToken]);
  return children as JSX.Element;
}
