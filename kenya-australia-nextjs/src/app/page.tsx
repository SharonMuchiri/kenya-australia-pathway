'use client';

import { useState } from 'react';
import {
  GraduationCap,
  Calculator,
  Globe,
  FileCheck,
  Languages,
  MapPin,
  Award,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Star,
  DollarSign,
  Plane,
  Home,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Search,
  Building2,
  Shield,
} from 'lucide-react';

import {
  UserProfile,
  GSResponses,
  LanguageScores,
  Financials,
  University,
  UniversityFilter,
  Step,
} from '@/types';

import {
  UNIVERSITIES,
  VISA_CHECKLIST,
  KCSE_GRADES,
  GRADE_POINTS,
  LIVING_COST_AUD,
  TRAVEL_COST_AUD,
} from '@/lib/constants';

export default function KenyaAustraliaApp() {
  // State Management
  const [currentStep, setCurrentStep] = useState(0);
  
  const [profile, setProfile] = useState<UserProfile>({
    fullName: '',
    email: '',
    phone: '',
    county: '',
    kcseGrade: '',
    isFoundationPath: false,
  });

  const [gsResponses, setGsResponses] = useState<GSResponses>({
    returnIncentives: '',
    economicCircumstances: '',
    studyRationale: '',
    careerGoals: '',
  });

  const [languageScores, setLanguageScores] = useState<LanguageScores>({
    testType: 'IELTS',
    overall: '',
    listening: '',
    reading: '',
    writing: '',
    speaking: '',
  });

  const [financials, setFinancials] = useState<Financials>({
    selectedTuition: 35000,
    fundsAvailable: '',
  });

  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  
  const [visaChecklist, setVisaChecklist] = useState<{ [key: number]: boolean }>(
    VISA_CHECKLIST.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );

  const [universityFilter, setUniversityFilter] = useState<UniversityFilter>({
    search: '',
    regionalOnly: false,
    maxTuition: 50000,
  });

  // Steps Definition
  const steps: Step[] = [
    { id: 0, title: 'Welcome', icon: Home },
    { id: 1, title: 'KCSE Assessment', icon: GraduationCap },
    { id: 2, title: 'Genuine Student', icon: Shield },
    { id: 3, title: 'Language Score', icon: Languages },
    { id: 4, title: 'Financial Capacity', icon: Calculator },
    { id: 5, title: 'Universities', icon: Building2 },
    { id: 6, title: 'Visa Checklist', icon: FileCheck },
    { id: 7, title: 'Summary', icon: CheckCircle2 },
  ];

  // Computed Values
  const isDirectEntry = profile.kcseGrade && GRADE_POINTS[profile.kcseGrade] >= GRADE_POINTS['B+'];
  const totalFundsRequired = financials.selectedTuition + LIVING_COST_AUD + TRAVEL_COST_AUD;
  const fundsGap = totalFundsRequired - (parseFloat(financials.fundsAvailable) || 0);
  const languageThreshold = 6.0;
  const meetsLanguageReq = parseFloat(languageScores.overall) >= languageThreshold;
  const visaProgress = Object.values(visaChecklist).filter(Boolean).length;
  const mandatoryComplete = VISA_CHECKLIST.filter((i) => i.mandatory).every((i) => visaChecklist[i.id]);

  const filteredUniversities = UNIVERSITIES.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(universityFilter.search.toLowerCase()) ||
      uni.city.toLowerCase().includes(universityFilter.search.toLowerCase());
    const matchesRegional = !universityFilter.regionalOnly || uni.isRegional;
    const matchesTuition = uni.avgTuition <= universityFilter.maxTuition;
    return matchesSearch && matchesRegional && matchesTuition;
  });

  // Render current step content directly (not as components to avoid re-mounting)
  const renderStep = () => {
    const gsComplete = Object.values(gsResponses).every((v) => v.length > 50);
    const languageComplete = parseFloat(languageScores.overall) > 0;
    const financialComplete = parseFloat(financials.fundsAvailable) > 0;
    const readinessScore = [
      profile.kcseGrade ? 1 : 0,
      gsComplete ? 1 : 0,
      languageComplete && meetsLanguageReq ? 1 : 0,
      financialComplete && fundsGap <= 0 ? 1 : 0,
      mandatoryComplete ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    switch (currentStep) {
      case 0:
        // Welcome Screen
        return (
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Globe className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">Kenya → Australia</h1>
            <p className="text-lg text-slate-600 mb-2">Education Pathway App</p>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Your complete roadmap from KCSE results to landing in Australia. We&apos;ll guide you through
              every step of the journey.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 text-left border border-teal-200">
                <GraduationCap className="w-8 h-8 text-teal-600 mb-2" />
                <p className="font-semibold text-teal-800">Grade Assessment</p>
                <p className="text-sm text-teal-600">Direct or Foundation path</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-left border border-blue-200">
                <Calculator className="w-8 h-8 text-blue-600 mb-2" />
                <p className="font-semibold text-blue-800">Financial Planning</p>
                <p className="text-sm text-blue-600">Know your requirements</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-left border border-purple-200">
                <MapPin className="w-8 h-8 text-purple-600 mb-2" />
                <p className="font-semibold text-purple-800">Regional Bonus</p>
                <p className="text-sm text-purple-600">+2 years work rights</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-left border border-orange-200">
                <FileCheck className="w-8 h-8 text-orange-600 mb-2" />
                <p className="font-semibold text-orange-800">Visa Checklist</p>
                <p className="text-sm text-orange-600">Track your documents</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-md mx-auto mb-6">
              <p className="text-amber-800 text-sm">
                <strong>2026 Update:</strong> Living cost requirement is now{' '}
                <strong>A$29,710</strong> per year. Regional universities offer{' '}
                <strong>+1-2 years</strong> Post-Study Work visa.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep(1)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto hover:-translate-y-0.5"
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 1:
        // KCSE Assessment Screen
        return (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">KCSE Grade Assessment</h2>
            <p className="text-slate-600 mb-6">
              Enter your details to determine your pathway to Australian universities.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                    placeholder="+254..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">County</label>
                <input
                  type="text"
                  value={profile.county}
                  onChange={(e) => setProfile({ ...profile, county: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  placeholder="e.g., Nairobi, Mombasa, Kisumu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">KCSE Mean Grade</label>
                <div className="grid grid-cols-4 gap-2">
                  {KCSE_GRADES.map((grade) => (
                    <button
                      key={grade}
                      onClick={() =>
                        setProfile({
                          ...profile,
                          kcseGrade: grade,
                          isFoundationPath: GRADE_POINTS[grade] < GRADE_POINTS['B+'],
                        })
                      }
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        profile.kcseGrade === grade
                          ? 'bg-amber-500 text-white shadow-lg'
                          : GRADE_POINTS[grade] >= GRADE_POINTS['B+']
                          ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {profile.kcseGrade && (
              <div
                className={`rounded-xl p-5 mb-6 ${
                  isDirectEntry
                    ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200'
                    : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDirectEntry ? 'bg-teal-500' : 'bg-amber-500'
                    }`}
                  >
                    {isDirectEntry ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isDirectEntry ? 'text-teal-800' : 'text-amber-800'}`}>
                      {isDirectEntry ? '✓ Direct Bachelor Entry' : 'Foundation/Diploma Pathway'}
                    </h3>
                    <p className={`${isDirectEntry ? 'text-teal-700' : 'text-amber-700'}`}>
                      {isDirectEntry
                        ? 'Your grade qualifies you for direct entry to Australian Bachelor degrees!'
                        : 'A 1-year Foundation or Diploma program will bridge you to degree programs.'}
                    </p>
                    {!isDirectEntry && (
                      <p className="text-sm text-amber-600 mt-2">
                        Foundation programs are offered by most Australian universities and lead directly to
                        Bachelor degrees upon completion.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        // Genuine Student Screen
        return (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Genuine Student (GS) Module</h2>
            <p className="text-slate-600 mb-4">
              The GS requirement replaced the old GTE. Document your genuine reasons for studying in
              Australia.
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-800">Why this matters</p>
                  <p className="text-sm text-purple-700">
                    Immigration officers assess whether you&apos;re a genuine student with legitimate study
                    intentions. Strong responses here significantly improve visa approval chances.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Incentives to Return to Kenya
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-2">
                  What ties you back home? Family, property, job offers, community roles?
                </p>
                <textarea
                  value={gsResponses.returnIncentives}
                  onChange={(e) => setGsResponses({ ...gsResponses, returnIncentives: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all h-24 resize-none"
                  placeholder="e.g., My family owns a business in Nairobi that I plan to help expand using my Australian qualification..."
                />
                <div className="text-xs text-slate-400 text-right">
                  {gsResponses.returnIncentives.length}/500
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Economic Circumstances in Kenya
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-2">
                  How will you/your sponsor afford this? Employment, savings, assets?
                </p>
                <textarea
                  value={gsResponses.economicCircumstances}
                  onChange={(e) =>
                    setGsResponses({ ...gsResponses, economicCircumstances: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all h-24 resize-none"
                  placeholder="e.g., My father is a civil servant and has been saving for my education. We also have rental income from..."
                />
                <div className="text-xs text-slate-400 text-right">
                  {gsResponses.economicCircumstances.length}/500
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Why Study This Course in Australia?
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-2">
                  Why this specific course? Why Australia over other countries?
                </p>
                <textarea
                  value={gsResponses.studyRationale}
                  onChange={(e) => setGsResponses({ ...gsResponses, studyRationale: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all h-24 resize-none"
                  placeholder="e.g., Australia has world-leading programs in IT with practical industry placements. The course at..."
                />
                <div className="text-xs text-slate-400 text-right">
                  {gsResponses.studyRationale.length}/500
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Career Goals After Graduation
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-2">
                  How will this qualification benefit your career back in Kenya?
                </p>
                <textarea
                  value={gsResponses.careerGoals}
                  onChange={(e) => setGsResponses({ ...gsResponses, careerGoals: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all h-24 resize-none"
                  placeholder="e.g., Kenya's tech sector is growing rapidly. With an Australian IT degree, I plan to work in fintech..."
                />
                <div className="text-xs text-slate-400 text-right">
                  {gsResponses.careerGoals.length}/500
                </div>
              </div>
            </div>

            {gsComplete && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Good progress!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your responses are taking shape. Aim for specific, personal details rather than generic
                  statements.
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        // Language Score Screen
        return (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Language Proficiency</h2>
            <p className="text-slate-600 mb-6">
              Track your English test scores. Most courses require IELTS 6.0-6.5 overall.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Test Type</label>
              <div className="flex gap-2">
                {(['IELTS', 'PTE', 'TOEFL'] as const).map((test) => (
                  <button
                    key={test}
                    onClick={() => setLanguageScores({ ...languageScores, testType: test })}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      languageScores.testType === test
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {test}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Overall Score</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="9"
                  value={languageScores.overall}
                  onChange={(e) => setLanguageScores({ ...languageScores, overall: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-2xl font-bold text-center"
                  placeholder="e.g., 6.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(['listening', 'reading', 'writing', 'speaking'] as const).map((skill) => (
                  <div key={skill}>
                    <label className="block text-xs font-medium text-slate-500 mb-1 capitalize">
                      {skill}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="9"
                      value={languageScores[skill]}
                      onChange={(e) => setLanguageScores({ ...languageScores, [skill]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-center"
                      placeholder="0.0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {languageScores.overall && (
              <div
                className={`rounded-xl p-5 ${
                  meetsLanguageReq
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
                    : 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      meetsLanguageReq ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {meetsLanguageReq ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <X className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${meetsLanguageReq ? 'text-green-800' : 'text-red-800'}`}>
                      {meetsLanguageReq ? 'Meets Standard Requirement' : 'Below Standard Threshold'}
                    </h3>
                    <p className={meetsLanguageReq ? 'text-green-700' : 'text-red-700'}>
                      {meetsLanguageReq
                        ? `Your score of ${languageScores.overall} meets the 6.0 threshold for most programs.`
                        : `Most programs require 6.0 minimum. You need ${(
                            6.0 - parseFloat(languageScores.overall)
                          ).toFixed(1)} more points.`}
                    </p>
                    {!meetsLanguageReq && (
                      <p className="text-sm text-amber-600 mt-2">
                        Consider: English pathway programs (10-20 weeks) that lead into your main course.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Some courses (Nursing, Education, Health) require 6.5 overall with no
                band below 6.0. Check your specific course requirements.
              </p>
            </div>
          </div>
        );

      case 4:
        // Financial Capacity Screen
        return (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Financial Capacity Calculator</h2>
            <p className="text-slate-600 mb-6">
              Calculate the funds you need to demonstrate for your student visa.
            </p>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white mb-6">
              <p className="text-slate-400 text-sm mb-1">Total Funds Required (1 Year)</p>
              <p className="text-4xl font-bold mb-4">A${totalFundsRequired.toLocaleString()}</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Tuition (1 year)</span>
                  <span className="font-semibold">A${financials.selectedTuition.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Living costs (DHA 2026)</span>
                  <span className="font-semibold">A${LIVING_COST_AUD.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Travel allowance</span>
                  <span className="font-semibold">A${TRAVEL_COST_AUD.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Estimated Annual Tuition: A${financials.selectedTuition.toLocaleString()}
              </label>
              <input
                type="range"
                min="25000"
                max="50000"
                step="1000"
                value={financials.selectedTuition}
                onChange={(e) =>
                  setFinancials({ ...financials, selectedTuition: parseInt(e.target.value) })
                }
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>A$25,000</span>
                <span>A$50,000</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Funds You Can Demonstrate (AUD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                  A$
                </span>
                <input
                  type="number"
                  value={financials.fundsAvailable}
                  onChange={(e) => setFinancials({ ...financials, fundsAvailable: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all text-xl"
                  placeholder="0"
                />
              </div>
            </div>

            {financials.fundsAvailable && (
              <div
                className={`rounded-xl p-5 ${
                  fundsGap <= 0
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
                    : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      fundsGap <= 0 ? 'bg-green-500' : 'bg-amber-500'
                    }`}
                  >
                    {fundsGap <= 0 ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <DollarSign className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${fundsGap <= 0 ? 'text-green-800' : 'text-amber-800'}`}>
                      {fundsGap <= 0 ? '✓ Sufficient Funds' : `Gap: A$${fundsGap.toLocaleString()}`}
                    </h3>
                    <p className={fundsGap <= 0 ? 'text-green-700' : 'text-amber-700'}>
                      {fundsGap <= 0
                        ? 'Your available funds meet the visa requirement!'
                        : 'Consider scholarships, education loans, or sponsor support to bridge this gap.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">KES Equivalent (approx.)</p>
                <p className="font-bold text-slate-800">
                  KSh {(totalFundsRequired * 85).toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">USD Equivalent (approx.)</p>
                <p className="font-bold text-slate-800">
                  ${Math.round(totalFundsRequired * 0.65).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        // University Browser Screen
        return (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">University Explorer</h2>
            <p className="text-slate-600 mb-4">
              Browse Australian universities with regional PSW bonus tags.
            </p>

            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={universityFilter.search}
                  onChange={(e) => setUniversityFilter({ ...universityFilter, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                />
              </div>
              <button
                onClick={() =>
                  setUniversityFilter({ ...universityFilter, regionalOnly: !universityFilter.regionalOnly })
                }
                className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  universityFilter.regionalOnly
                    ? 'bg-teal-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Regional
              </button>
            </div>

            <div className="mb-4">
              <label className="text-sm text-slate-600">
                Max Tuition: A${universityFilter.maxTuition.toLocaleString()}
              </label>
              <input
                type="range"
                min="25000"
                max="50000"
                step="1000"
                value={universityFilter.maxTuition}
                onChange={(e) =>
                  setUniversityFilter({ ...universityFilter, maxTuition: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {filteredUniversities.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => setSelectedUniversity(selectedUniversity?.id === uni.id ? null : uni)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all ${
                    selectedUniversity?.id === uni.id
                      ? 'border-amber-500 bg-amber-50 shadow-lg'
                      : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800">{uni.name}</h3>
                      <p className="text-sm text-slate-500">
                        {uni.city}, {uni.state}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {uni.isRegional && (
                        <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Regional
                        </span>
                      )}
                      {uni.pswBonus > 0 && (
                        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3" /> +{uni.pswBonus}yr PSW
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">
                      <Star className="w-4 h-4 inline text-amber-500 mr-1" />
                      World Rank #{uni.ranking}
                    </span>
                    <span className="font-semibold text-slate-800">
                      A${uni.avgTuition.toLocaleString()}/yr
                    </span>
                  </div>

                  {selectedUniversity?.id === uni.id && (
                    <div className="mt-4 pt-4 border-t border-amber-200">
                      <p className="text-sm font-medium text-slate-700 mb-2">Popular courses:</p>
                      <div className="flex flex-wrap gap-2">
                        {uni.courses.map((course) => (
                          <span
                            key={course}
                            className="bg-white text-slate-600 text-xs px-2 py-1 rounded-lg border border-slate-200"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFinancials({ ...financials, selectedTuition: uni.avgTuition });
                        }}
                        className="mt-3 w-full bg-amber-500 text-white py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                      >
                        Use This Tuition for Calculator
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-sm text-purple-800">
                <strong>PSW Bonus Explained:</strong> Regional universities add 1-2 years to your Post-Study
                Work visa (Subclass 485). A Bachelor&apos;s graduate from Adelaide gets 4+2 = 6 years work
                rights!
              </p>
            </div>
          </div>
        );

      case 6:
        // Visa Checklist Screen
        return (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Visa Checklist</h2>
            <p className="text-slate-600 mb-4">Track your Subclass 500 Student Visa documents.</p>

            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 text-white mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-300">Progress</span>
                <span className="font-bold">
                  {visaProgress}/{VISA_CHECKLIST.length} Complete
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(visaProgress / VISA_CHECKLIST.length) * 100}%` }}
                />
              </div>
              {mandatoryComplete && (
                <p className="text-green-400 text-sm mt-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> All mandatory documents ready!
                </p>
              )}
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {VISA_CHECKLIST.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setVisaChecklist({ ...visaChecklist, [item.id]: !visaChecklist[item.id] })}
                  className={`rounded-xl border p-4 cursor-pointer transition-all ${
                    visaChecklist[item.id]
                      ? 'border-green-300 bg-green-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        visaChecklist[item.id] ? 'border-green-500 bg-green-500' : 'border-slate-300'
                      }`}
                    >
                      {visaChecklist[item.id] && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${
                            visaChecklist[item.id] ? 'text-green-800' : 'text-slate-800'
                          }`}
                        >
                          {item.item}
                        </span>
                        {item.mandatory && (
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          visaChecklist[item.id] ? 'text-green-600' : 'text-slate-500'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 7:
        // Summary Screen
        return (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Application Summary</h2>
            <p className="text-slate-600 mb-6">Your Australia study journey at a glance.</p>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white mb-6">
              <div className="text-center">
                <p className="text-amber-100 mb-1">Readiness Score</p>
                <p className="text-5xl font-bold mb-2">{readinessScore}/5</p>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-2 rounded-full ${
                        i <= readinessScore ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div
                className={`rounded-xl p-4 flex items-center justify-between ${
                  profile.kcseGrade
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap
                    className={`w-5 h-5 ${profile.kcseGrade ? 'text-green-600' : 'text-slate-400'}`}
                  />
                  <div>
                    <p className="font-medium text-slate-800">Academic Pathway</p>
                    <p className="text-sm text-slate-600">
                      {profile.kcseGrade
                        ? `${profile.kcseGrade} → ${isDirectEntry ? 'Direct Entry' : 'Foundation Year'}`
                        : 'Not assessed'}
                    </p>
                  </div>
                </div>
                {profile.kcseGrade && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              </div>

              <div
                className={`rounded-xl p-4 flex items-center justify-between ${
                  gsComplete
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Shield className={`w-5 h-5 ${gsComplete ? 'text-green-600' : 'text-slate-400'}`} />
                  <div>
                    <p className="font-medium text-slate-800">Genuine Student</p>
                    <p className="text-sm text-slate-600">
                      {gsComplete ? 'All sections completed' : 'Incomplete responses'}
                    </p>
                  </div>
                </div>
                {gsComplete && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              </div>

              <div
                className={`rounded-xl p-4 flex items-center justify-between ${
                  languageComplete && meetsLanguageReq
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Languages
                    className={`w-5 h-5 ${
                      languageComplete && meetsLanguageReq ? 'text-green-600' : 'text-slate-400'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-slate-800">Language Score</p>
                    <p className="text-sm text-slate-600">
                      {languageComplete
                        ? `${languageScores.testType} ${languageScores.overall} ${
                            meetsLanguageReq ? '✓' : '(below 6.0)'
                          }`
                        : 'Not recorded'}
                    </p>
                  </div>
                </div>
                {languageComplete && meetsLanguageReq && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>

              <div
                className={`rounded-xl p-4 flex items-center justify-between ${
                  financialComplete && fundsGap <= 0
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calculator
                    className={`w-5 h-5 ${
                      financialComplete && fundsGap <= 0 ? 'text-green-600' : 'text-slate-400'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-slate-800">Financial Capacity</p>
                    <p className="text-sm text-slate-600">
                      {financialComplete
                        ? `A$${parseFloat(financials.fundsAvailable).toLocaleString()} / A$${totalFundsRequired.toLocaleString()}`
                        : 'Not calculated'}
                    </p>
                  </div>
                </div>
                {financialComplete && fundsGap <= 0 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              </div>

              <div
                className={`rounded-xl p-4 flex items-center justify-between ${
                  mandatoryComplete
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileCheck
                    className={`w-5 h-5 ${mandatoryComplete ? 'text-green-600' : 'text-slate-400'}`}
                  />
                  <div>
                    <p className="font-medium text-slate-800">Visa Documents</p>
                    <p className="text-sm text-slate-600">
                      {visaProgress}/{VISA_CHECKLIST.length} items ready
                    </p>
                  </div>
                </div>
                {mandatoryComplete && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              </div>
            </div>

            {selectedUniversity && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-purple-800 mb-1">Selected University</p>
                <p className="font-bold text-purple-900">{selectedUniversity.name}</p>
                <p className="text-sm text-purple-700">
                  {selectedUniversity.city} • A${selectedUniversity.avgTuition.toLocaleString()}/yr
                </p>
                {selectedUniversity.pswBonus > 0 && (
                  <span className="inline-flex items-center gap-1 mt-2 bg-purple-200 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                    <Award className="w-3 h-3" /> +{selectedUniversity.pswBonus} years PSW bonus
                  </span>
                )}
              </div>
            )}

            {readinessScore >= 4 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-green-800">Ready for Takeoff!</h3>
                    <p className="text-green-700">
                      Your application looks strong. Next step: Apply to your chosen university and begin
                      the visa process.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Header */}
      {currentStep > 0 && (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-800">KE→AU</span>
              </div>
              <span className="text-sm text-slate-500">Step {currentStep} of 7</span>
            </div>

            {/* Progress Steps */}
            <div className="flex gap-1">
              {steps.slice(1).map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex-1 h-1.5 rounded-full transition-all ${
                    step.id <= currentStep ? 'bg-amber-500' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`max-w-2xl mx-auto px-4 py-6 ${currentStep > 0 ? 'pb-32 md:pb-6' : ''}`}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        {currentStep > 0 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>

            {currentStep < 7 ? (
              <button
                onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(0)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Start Over <Home className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav (Mobile) */}
      {currentStep > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 md:hidden">
          <div className="flex justify-around">
            {steps.slice(1).map((step) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                    currentStep === step.id ? 'bg-amber-100 text-amber-600' : 'text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{step.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
