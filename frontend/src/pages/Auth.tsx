'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useNavigate } from 'react-router-dom'

type AuthMode = 'signup' | 'login'

interface FormData {
  name?: string
  password: string
}
interface ApiResponse {
  userId?: string;
  error?: string;
}


export default function AuthCard() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: '',
  })
  const [userId,setUserId] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data: ApiResponse = await res.json();
  
      if (res.ok && data.userId) {
        setUserId(data.userId);
        navigate(`/${data.userId}`);
      } else {
        console.error(data.error || 'Operation failed');
      }
    } catch (err) {
      console.error('Network error', err);
    }
  };
  

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login')
  }

  return (
     <div className='flex items-center justify-center h-screen'>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{mode === 'login' ? 'Login' : 'Sign Up'}</CardTitle>
        <CardDescription>
          {mode === 'login' ? 'Enter your credentials to login' : 'Create a new account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          {/* <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div> */}
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
        </span>
        <div className="flex items-center space-x-2">
          <Label htmlFor="auth-mode">
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </Label>
          <Switch
            id="auth-mode"
            checked={mode === 'signup'}
            onCheckedChange={toggleMode}
          />
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

