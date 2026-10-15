import { WorkerProfile, JobListing, MatchScoreBreakdown } from '../types';

export function calculateSuitabilityScore(
  worker: WorkerProfile,
  job?: JobListing | null,
  customCriteria?: {
    location?: string;
    requiredSkills?: string[];
    minExperience?: number;
    maxBudget?: number;
    preferredAvailability?: string;
  }
): MatchScoreBreakdown {
  const targetLocation = job?.neighborhood || job?.location || customCriteria?.location || '';
  const requiredSkills = job?.requiredSkills || customCriteria?.requiredSkills || [];
  const minExperience = job?.experienceRequiredYears ?? (customCriteria?.minExperience ?? 2);
  const budget = job?.salary.amount ?? (customCriteria?.maxBudget ?? 500);

  // 1. Skill Score (Weight: 35%)
  let skillScore = 80;
  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];

  if (requiredSkills.length > 0) {
    requiredSkills.forEach(reqSkill => {
      const hasSkill = worker.skills.some(ws => 
        ws.toLowerCase().includes(reqSkill.toLowerCase()) || 
        reqSkill.toLowerCase().includes(ws.toLowerCase())
      );
      if (hasSkill) {
        matchingSkills.push(reqSkill);
      } else {
        missingSkills.push(reqSkill);
      }
    });
    skillScore = Math.round((matchingSkills.length / requiredSkills.length) * 100);
  } else {
    // If no specific skills required, judge by count of high value skills
    skillScore = Math.min(100, 60 + worker.skills.length * 7);
  }

  // 2. Location Score (Weight: 20%)
  let locationScore = 75;
  let locationDistanceText = 'Within metropolitan area';
  
  if (targetLocation) {
    const workerLoc = (worker.neighborhood + ' ' + worker.city).toLowerCase();
    const target = targetLocation.toLowerCase();

    if (workerLoc.includes(target) || target.includes(worker.neighborhood.toLowerCase())) {
      locationScore = 98;
      locationDistanceText = 'Immediate neighborhood (< 3 km)';
    } else if (worker.city.toLowerCase().includes('harare')) {
      locationScore = 85;
      locationDistanceText = 'Same district (~ 6-10 km)';
    } else {
      locationScore = 60;
      locationDistanceText = 'Commuter distance (> 15 km)';
    }
  }

  // 3. Experience Score (Weight: 20%)
  let experienceScore = 70;
  if (worker.experienceYears >= minExperience) {
    const bonus = Math.min(20, (worker.experienceYears - minExperience) * 4);
    experienceScore = Math.min(100, 80 + bonus);
  } else {
    experienceScore = Math.max(40, Math.round((worker.experienceYears / Math.max(1, minExperience)) * 80));
  }

  // 4. Salary Alignment Score (Weight: 15%)
  let salaryScore = 85;
  const workerExpected = worker.expectedSalary.amount;
  if (workerExpected <= budget) {
    salaryScore = 100;
  } else {
    const diffPercent = ((workerExpected - budget) / budget) * 100;
    salaryScore = Math.max(40, Math.round(100 - diffPercent * 1.5));
  }

  // 5. Availability Score (Weight: 10%)
  let availabilityScore = 80;
  if (worker.availability === 'Immediate') {
    availabilityScore = 100;
  } else if (worker.availability === 'Within 1 Week') {
    availabilityScore = 90;
  } else if (worker.availability === 'Within 2 Weeks') {
    availabilityScore = 75;
  } else {
    availabilityScore = 65;
  }

  // Overall Weighted Score
  const overall = Math.round(
    skillScore * 0.35 +
    locationScore * 0.20 +
    experienceScore * 0.20 +
    salaryScore * 0.15 +
    availabilityScore * 0.10
  );

  return {
    overallScore: Math.min(99, Math.max(50, overall)),
    skillScore,
    matchingSkills,
    missingSkills,
    locationScore,
    locationDistanceText,
    experienceScore,
    salaryScore,
    availabilityScore
  };
}
