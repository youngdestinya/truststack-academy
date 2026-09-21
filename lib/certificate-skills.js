// Concise certificate outcomes derived from the published career-track curricula.
export const certificateSkills = {
  'soc-analyst': ['Security event monitoring', 'SIEM detection and log analysis', 'Threat hunting', 'Incident triage and response'],
  'digital-forensics': ['Evidence preservation and chain of custody', 'Disk and file-system forensics', 'Memory analysis', 'Attack timeline reconstruction'],
  'threat-intelligence': ['OSINT collection and validation', 'Indicator and TTP analysis', 'Adversary tracking', 'Intelligence reporting'],
  'penetration-testing': ['Authorised reconnaissance', 'Vulnerability validation', 'Web and API security testing', 'Remediation-focused reporting'],
  'cloud-security': ['Cloud IAM hardening', 'Cloud posture assessment', 'Workload and data protection', 'Cloud detection and response'],
  'governance-grc': ['Cyber risk assessment', 'Security policy and control design', 'Privacy compliance', 'Audit evidence management'],
  'malware-analysis': ['Safe malware triage', 'Static and dynamic analysis', 'Persistence investigation', 'YARA and indicator development'],
  'security-engineering': ['Secure architecture', 'Threat modelling', 'Secure code review', 'DevSecOps automation'],
};

const trackAliases = {
  'soc analyst': 'soc-analyst',
  'soc analyst track': 'soc-analyst',
  'ethical hacking & penetration testing': 'penetration-testing',
  'ethical hacking': 'penetration-testing',
  'grc & compliance': 'governance-grc',
  'governance & grc': 'governance-grc',
  'secure app dev': 'security-engineering',
};

export function skillsForTrack(track) {
  if (typeof track !== 'string') return [];
  const key = track.trim().toLowerCase().replace(/\s+/g, ' ');
  const slug = trackAliases[key] || key.replace(/\s*&\s*/g, '-').replace(/\s+/g, '-');
  return certificateSkills[slug] || [];
}
