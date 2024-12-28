

import React from 'react';
import { Play } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">BrainVault</h1>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Your Digital Second Brain for Content That Matters
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Save and organize your favorite YouTube videos, tweets, and PDFs in one place. 
              Access your curated content anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
                Start Collecting
              </button>
              <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="relative bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-16 h-16 text-indigo-600" />
            </div>
            <span className="text-gray-500">Video Demo Placeholder</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">YouTube Integration</h4>
              <p className="text-gray-600">Save videos with timestamps and notes for quick reference</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Tweet Collection</h4>
              <p className="text-gray-600">Bookmark and categorize tweets that inspire you</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">PDF Management</h4>
              <p className="text-gray-600">Store and annotate important documents</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">1</div>
              <h4 className="font-semibold mb-2">Sign Up</h4>
              <p className="text-gray-600">Create your account in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">2</div>
              <h4 className="font-semibold mb-2">Add Content</h4>
              <p className="text-gray-600">Paste links or upload files</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">3</div>
              <h4 className="font-semibold mb-2">Organize</h4>
              <p className="text-gray-600">Create collections and add tags</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">4</div>
              <h4 className="font-semibold mb-2">Access</h4>
              <p className="text-gray-600">Find everything easily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;