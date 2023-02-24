import { AuthRoutePaths } from '../pages/AuthRoutePaths.enum';

/**
 * Hook para identificar paths de rotas de autenticacao.
 * Necessario para nao fazer o trigger de tentativa de login intranet nessas rotas por exemplo.
 */
export function useIsAuthRoute() {
  return {
    check: (pathname: string) => {
      const routes = [
        AuthRoutePaths.LoginPage,
        AuthRoutePaths.SignupPage,
        AuthRoutePaths.CallbackPage,
        AuthRoutePaths.LogoutPage,
        AuthRoutePaths.SsoLoginPage,
        AuthRoutePaths.ResetPasswordPage
      ];

      return routes.some((r) =>
        pathname.toLowerCase().startsWith(r.toLowerCase())
      );
    }
  };
}
