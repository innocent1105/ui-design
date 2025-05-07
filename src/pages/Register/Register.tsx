import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from 'lucide-react';
import logoDarkTheme from '@/assets/logo-dark-theme.svg';
import logoLightTheme from '@/assets/logo-light-theme.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'

const Register = () => {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState(false);
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
            <p className="text-muted-foreground text-sm">Register a new account</p>
          </div>
          <form className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoFocus
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <div className="flex items-center gap-2">
              <Checkbox id="termsAndConditions" checked={termsAndConditions} onCheckedChange={checked => setTermsAndConditions(checked === true)} />
              <label htmlFor="termsAndConditions" className="text-sm font-medium select-none cursor-pointer">I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></label>
            </div>
            <Button type="submit" className="w-full" variantClassName="primary">Register</Button>
          </form>
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full" variantClassName="info" leftIcon={<FontAwesomeIcon icon={faFacebookF} />}>Sign in using Facebook</Button>
            <Button className="w-full" variantClassName="danger" leftIcon={<FontAwesomeIcon icon={faGoogle} />}>Sign in using Google</Button>
          </div>
          <div className="flex flex-col gap-1 text-sm text-center mt-2">
            <a href="/login" className="text-blue-600">Already have an account? Login</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register; 