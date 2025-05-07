import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from 'lucide-react';
import logoDarkTheme from '@/assets/logo-dark-theme.svg';
import logoLightTheme from '@/assets/logo-light-theme.svg';

const ForgotPassword = () => {
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          variantClassName="light"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </div>
      <img
        src={theme === 'dark' ? logoLightTheme : logoDarkTheme}
        alt="Logo"
        className="mb-4 w-32 md:w-32 transition-all duration-200"
      />
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="flex flex-col gap-4 py-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-muted-foreground text-sm">You forgot your password? Here you can easily retrieve a new password.</p>
          </div>
          <form className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <Button type="submit" className="w-full" variantClassName="primary">Request new password</Button>
          </form>
          <div className="flex flex-col gap-1 text-sm text-center mt-2">
            <a href="/login" className="text-blue-600">Remember your password? Login</a>
            <a href="/register" className="text-blue-600">Register a new account</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword; 