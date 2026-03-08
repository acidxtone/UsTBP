/**
 * Static quiz page: loads questions from CSV in repo (no Supabase/auth).
 *
 * Mirrors the original app’s quiz data flow:
 * - Original: Quiz.jsx uses api.entities.Question.filter({ trade, year }) with trade from
 *   user.selected_trade (code E/M/W/SF); Supabase returns questions with same shape (option_a..d,
 *   correct_answer, section, etc.). See api/supabaseClient.js Question.filter + transform.
 * - Here: trade/year come from the URL; we fetch /questions.csv and filter via
 *   getQuestionsFromCSV() which uses the same trade mapping (getTradeDbValue) and outputs
 *   the same question shape so QuestionCard and ResultsCard work unchanged.
 *
 * Route: /trades/:trade/year-:year/full-exam | /trades/:trade/year-:year/section-:sectionNum
 * Data: /questions.csv (single CSV in repo; parsed and filtered in browser)
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import QuestionCard from '@/components/quiz/QuestionCard';
import ProgressBar from '@/components/quiz/ProgressBar';
import ResultsCard from '@/components/quiz/ResultsCard';
import TradesLayout from './TradesLayout';
import { TRADES, VALID_TRADE_SLUGS } from './tradesContent';
import { parseCSV, getQuestionsFromCSV } from '@/lib/parseQuestionsCsv';
import { useAds } from '@/components/ads/AdProvider';
import { BannerAd, InContentAd } from '@/components/ads/AdSense';

export default function StaticQuizPage({ trade: tradeProp, year: yearProp, quizType: quizTypeProp }) {
  const trade = tradeProp;
  const year = yearProp;
  const quizType = quizTypeProp;
  const yearNum = year ? parseInt(String(year).replace(/^year-/, ''), 10) : null;
  const isFullExam = quizType === 'full-exam';
  const sectionNum = !isFullExam && quizType && quizType.startsWith('section-')
    ? parseInt(quizType.replace('section-', ''), 10)
    : null;

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [quizStarted, setQuizStarted] = useState(false);
  const navigate = useNavigate();
  const { setQuizMode } = useAds();

  // Hide global sticky/side ads during active Q&A; show on intro and results
  useEffect(() => {
    const inQuestionFlow = quizStarted && !quizComplete && quizQuestions.length > 0;
    setQuizMode(inQuestionFlow);
    return () => setQuizMode(false);
  }, [quizStarted, quizComplete, quizQuestions.length, setQuizMode]);

  useEffect(() => {
    if (!trade || !yearNum) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    fetch('/questions.csv')
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load questions: ${r.status}`);
        return r.text();
      })
      .then((csvText) => {
        const rows = parseCSV(csvText);
        const list = getQuestionsFromCSV(rows, {
          tradeSlug: trade,
          yearNum,
          isFullExam,
          sectionNum: sectionNum ?? 0,
        });
        setQuizQuestions(list);
        setCurrentIndex(0);
        setAnswers([]);
        setQuizComplete(false);
        setQuizStarted(false);
        setStartTime(Date.now());
      })
      .catch((err) => {
        setLoadError(err.message);
        setQuizQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [trade, yearNum, isFullExam, sectionNum]);

  if (!trade || !VALID_TRADE_SLUGS.includes(trade) || !yearNum) {
    return <Navigate to="/trades" replace />;
  }
  const config = TRADES[trade];
  if (!config || !config.years.includes(yearNum)) {
    return <Navigate to={`/trades/${trade}`} replace />;
  }
  if (!isFullExam && (sectionNum == null || Number.isNaN(sectionNum))) {
    return <Navigate to={`/trades/${trade}/year-${yearNum}`} replace />;
  }

  const currentQuestion = quizQuestions[currentIndex];
  const breadcrumb = (
    <span className="flex items-center gap-2 text-sm">
      <Link to="/trades" className="text-slate-600 hover:text-blue-600">Trades</Link>
      <span className="text-slate-400">/</span>
      <Link to={`/trades/${trade}`} className="text-slate-600 hover:text-blue-600">{config.name}</Link>
      <span className="text-slate-400">/</span>
      <Link to={`/trades/${trade}/year-${yearNum}`} className="text-slate-600 hover:text-blue-600">Year {yearNum}</Link>
      <span className="text-slate-400">/</span>
      <span className="text-slate-900 font-medium">
        {isFullExam ? 'Full Exam' : `Section ${sectionNum}`}
      </span>
    </span>
  );

  const handleAnswerSelect = (answer) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
  };

  const completeQuiz = useCallback((finalAnswers) => {
    setQuizComplete(true);
  }, []);

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (!showExplanation) {
      setShowExplanation(true);
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    const newAnswers = [...answers, {
      question_id: currentQuestion.id,
      user_answer: selectedAnswer,
      correct: isCorrect,
      section: currentQuestion.section,
    }];
    setAnswers(newAnswers);

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      completeQuiz(newAnswers);
    }
  };

  const handleExit = () => {
    if (answers.length > 0) setShowExitDialog(true);
    else navigate(`/trades/${trade}/year-${yearNum}`);
  };

  const confirmExit = () => {
    setShowExitDialog(false);
    navigate(`/trades/${trade}/year-${yearNum}`);
  };

  const noop = () => {};

  if (loading) {
    return (
      <TradesLayout breadcrumb={breadcrumb}>
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Loading questions...</p>
          </div>
        </div>
      </TradesLayout>
    );
  }

  if (loadError || quizQuestions.length === 0) {
    return (
      <TradesLayout breadcrumb={breadcrumb}>
        <div className="max-w-2xl mx-auto py-12 text-center">
          <p className="text-slate-700 font-medium mb-2">
            {loadError ? 'Could not load questions' : 'No questions available'}
          </p>
          <p className="text-slate-500 text-sm mb-6">
            {loadError || 'This quiz has no questions yet.'}
          </p>
          <Button asChild>
            <Link to={`/trades/${trade}/year-${yearNum}`}>Back to Year {yearNum}</Link>
          </Button>
        </div>
      </TradesLayout>
    );
  }

  const introText = isFullExam
    ? `This ${config.name} Year ${yearNum} full practice exam has ${quizQuestions.length} questions covering all sections of the curriculum. You can take it at your own pace. After each question you'll see whether you were correct and an explanation. At the end you'll get a score and pass/fail result (70% to pass). No sign-in required.`
    : `This quiz covers Section ${sectionNum} only: ${quizQuestions.length} questions. After each answer you'll see the correct answer and an explanation. At the end you'll get a score and can retry or try another section. No sign-in required.`;

  if (!quizStarted && quizQuestions.length > 0) {
    return (
      <TradesLayout breadcrumb={breadcrumb}>
        <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            {isFullExam
              ? `${config.name} Year ${yearNum} — Full Practice Exam`
              : `${config.name} Year ${yearNum} — Section ${sectionNum} Quiz`}
          </h1>
          <p className="text-slate-600 leading-relaxed mb-6 max-w-2xl">
            {introText}
          </p>
          <div className="mb-8">
            <div className="text-slate-500 text-sm mb-4">
              {quizQuestions.length} questions · No time limit
            </div>
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-slate-800"
              onClick={() => {
                setQuizStarted(true);
                setStartTime(Date.now());
              }}
            >
              Start quiz
            </Button>
          </div>
          <div className="mt-8">
            <InContentAd position="middle" />
          </div>
          <div className="mt-6">
            <BannerAd position="bottom" />
          </div>
        </div>
      </TradesLayout>
    );
  }

  if (quizComplete) {
    const correctCount = answers.filter((a) => a.correct).length;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const sectionScores = {};
    answers.forEach((a) => {
      if (!sectionScores[a.section]) sectionScores[a.section] = { total: 0, correct: 0 };
      sectionScores[a.section].total++;
      if (a.correct) sectionScores[a.section].correct++;
    });
    Object.keys(sectionScores).forEach((sec) => {
      sectionScores[sec].percentage =
        (sectionScores[sec].correct / sectionScores[sec].total) * 100;
    });

    return (
      <TradesLayout breadcrumb={breadcrumb}>
        <div className="max-w-4xl mx-auto py-8 px-4">
          <ResultsCard
            results={{
              score_percentage: (correctCount / answers.length) * 100,
              correct_answers: correctCount,
              total_questions: answers.length,
              time_taken_seconds: timeTaken,
              section_scores: sectionScores,
              question_results: answers,
            }}
            onRetry={() => window.location.reload()}
            onHome={() => navigate('/trades')}
            homeLabel="Trades"
            onReviewWrong={
              answers.some((r) => !r.correct)
                ? () => window.location.reload()
                : undefined
            }
          />
          <div className="mt-8">
            <InContentAd position="middle" />
          </div>
          <div className="mt-6">
            <BannerAd position="bottom" />
          </div>
        </div>
      </TradesLayout>
    );
  }

  return (
    <TradesLayout breadcrumb={breadcrumb}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={handleExit}>
                <X className="h-5 w-5" />
              </Button>
              <div className="text-sm font-medium text-slate-600">
                {currentIndex + 1} / {quizQuestions.length}
              </div>
              <div className="w-10" />
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProgressBar
            current={currentIndex + 1}
            total={quizQuestions.length}
            answers={answers}
          />
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={quizQuestions.length}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              showExplanation={showExplanation}
              onNext={handleNext}
              isBookmarked={false}
              onToggleBookmark={noop}
            />
          </AnimatePresence>
        </main>

        <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Exit Quiz?</AlertDialogTitle>
              <AlertDialogDescription>
                You&apos;ve answered {answers.length} of {quizQuestions.length} question
                {quizQuestions.length !== 1 ? 's' : ''}. Your progress will not be saved.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue Quiz</AlertDialogCancel>
              <AlertDialogAction onClick={confirmExit}>Exit</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TradesLayout>
  );
}
