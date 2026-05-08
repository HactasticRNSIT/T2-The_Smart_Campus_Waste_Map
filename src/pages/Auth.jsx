import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Trash2, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (action) => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    let error = null;

    if (action === 'login') {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = signInError;
    } else {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      error = signUpError;
    }

    setIsLoading(false);

    if (error) {
      toast.error(error.message || 'An error occurred during authentication');
    } else {
      toast.success(action === 'login' ? 'Logged in successfully!' : 'Registration successful!');
      // window.location.href = '/dashboard'; // Let App.jsx handle navigation
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0a0a0c] text-white overflow-hidden">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-center p-20 overflow-hidden border-r border-white/5">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-emerald-600/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40">
              <Trash2 className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-bold tracking-tight">EcoSmart</span>
          </div>
          
          <h1 className="text-6xl font-bold leading-tight mb-6 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
            Intelligence <br /> for a Cleaner <br /> Campus.
          </h1>
          
          <p className="text-xl text-gray-400 max-w-md leading-relaxed mb-12">
            The next generation of waste management starts here. Real-time monitoring, 
            automated alerts, and data-driven insights.
          </p>

          <div className="flex gap-4">
             <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">IoT Integrated</div>
             <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">AI Powered</div>
             <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">Open Source</div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Get Started</h2>
            <p className="text-gray-500">Sign in to your campus dashboard</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-white/5 rounded-xl border border-white/10 h-12">
              <TabsTrigger 
                value="login" 
                className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                Register
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-6 mt-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-gray-400">Email Address</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="name@rnsit.ac.in" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="login-password" name="password" className="text-gray-400">Password</Label>
                    <button className="text-xs text-blue-400 hover:underline">Forgot password?</button>
                  </div>
                  <Input 
                    id="login-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl"
                  />
                </div>
              </div>
              <Button 
                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 group shadow-lg shadow-blue-600/20" 
                onClick={() => handleAuth('login')} 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-6 mt-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-gray-400">Email Address</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="name@rnsit.ac.in" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" name="password" className="text-gray-400">Create Password</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 rounded-xl"
                  />
                </div>
              </div>
              <Button 
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20" 
                onClick={() => handleAuth('register')} 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create Account'}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;

