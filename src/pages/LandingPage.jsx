import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { BannerAd, InContentAd } from '@/components/ads/AdSense';
import AnonymousSession from '@/lib/AnonymousSession';

export default function LandingPage() {
  const handleGetStarted = () => {
    AnonymousSession.init(null);
    window.location.href = '/TradeSelection';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">TradeBenchPrep</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGetStarted}>
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Top Banner Ad */}
      <section className="pt-8 pb-4 px-6" aria-label="Advertisement">
        <div className="max-w-6xl mx-auto">
          <BannerAd position="top" />
        </div>
      </section>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            Master Your Trade,<br />
            <span className="text-blue-600">Ace Your Exams</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate quiz and study platform for apprenticeship training. Practice questions, track your progress, and prepare with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 w-full sm:w-auto" onClick={handleGetStarted}>
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No credit card required
            </span>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
            Built specifically for apprentices preparing for their trade qualifications.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-slate-200 hover:border-blue-200 transition-colors duration-300 hover:shadow-lg">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Target className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Practice Quizzes</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Hundreds of questions organized by year and topic. Test your knowledge with realistic exam-style questions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-200 transition-colors duration-300 hover:shadow-lg">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <BookOpen className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Study Guides</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Comprehensive study materials covering all key topics in your apprenticeship curriculum.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-200 transition-colors duration-300 hover:shadow-lg">
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Zap className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Track Progress</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Monitor your improvement over time with detailed stats and performance insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-12">
            Why Choose TradeBenchPrep for Your Steamfitter Training?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Comprehensive Trade Exam Preparation</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                TradeBenchPrep provides specialized preparation for steamfitter and pipefitter apprentices at all levels. 
                Our platform covers everything from basic safety procedures to advanced pipefitting calculations, 
                ensuring you're fully prepared for your certification exams.
              </p>
              <p className="text-slate-600 leading-relaxed">
                With over 500 practice questions organized by year and topic, you can focus on specific areas 
                where you need improvement. Our questions are designed to match the format and difficulty level 
                of actual trade certification exams.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Industry-Standard Study Materials</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Our study guides and practice materials are developed by experienced steamfitters and pipefitters 
                who understand the challenges of modern trade work. We cover essential topics including rigging safety, 
                pipe threading, blueprint reading, welding procedures, and steam system installation.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you're in your first year of apprenticeship or preparing for your journeyman certification, 
                TradeBenchPrep adapts to your skill level and provides targeted practice to help you succeed.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Topics Covered</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Year 1 - Foundation</h4>
                <ul className="space-y-1">
                  <li>• Workplace Safety and OSHA Compliance</li>
                  <li>• Basic Rigging and Lifting Equipment</li>
                  <li>• Tool Identification and Usage</li>
                  <li>• Trade Mathematics and Calculations</li>
                  <li>• Blueprint Reading Fundamentals</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Year 2 - Intermediate</h4>
                <ul className="space-y-1">
                  <li>• Heat Transfer and Thermodynamics</li>
                  <li>• Pipe System Design Principles</li>
                  <li>• Advanced Rigging Techniques</li>
                  <li>• Welding and Joining Methods</li>
                  <li>• Steam System Components</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Year 3-4 - Advanced</h4>
                <ul className="space-y-1">
                  <li>• High Pressure Steam Systems</li>
                  <li>• Advanced Pipefitting Calculations</li>
                  <li>• System Troubleshooting and Maintenance</li>
                  <li>• Project Management and Planning</li>
                  <li>• Advanced Blueprint Interpretation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="py-8 px-6" aria-label="Advertisement">
        <div className="max-w-6xl mx-auto">
          <BannerAd position="bottom" />
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">TradeBenchPrep</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/Privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/Terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <span>&copy; {new Date().getFullYear()} TradeBenchPrep. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
