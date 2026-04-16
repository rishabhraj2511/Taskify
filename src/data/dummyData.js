// ─── Tasks ─────────────────────────────────────────────────────────────────
export const initialTasks = {
  todo: [
    {
      id: 't1',
      title: 'Complete Q2 marketing campaign design',
      priority: 'High',
      deadline: '2026-04-15',
      assignee: 'Sarah Miller',
      tags: ['Marketing', 'Design'],
      points: 40,
    },
    {
      id: 't2',
      title: 'Update client documentation',
      priority: 'Medium',
      deadline: '2026-04-18',
      assignee: 'James Wilson',
      tags: ['Docs'],
      points: 20,
    },
    {
      id: 't3',
      title: 'Fix checkout page bugs',
      priority: 'High',
      deadline: '2026-04-12',
      assignee: 'Emily Chen',
      tags: ['Bug', 'E-commerce'],
      points: 35,
    },
  ],
  inprogress: [
    {
      id: 't4',
      title: 'Build customer analytics dashboard',
      priority: 'High',
      deadline: '2026-04-20',
      assignee: 'Sarah Miller',
      tags: ['Frontend', 'Data'],
      points: 50,
    },
    {
      id: 't5',
      title: 'Integrate payment gateway',
      priority: 'Medium',
      deadline: '2026-04-25',
      assignee: 'David Park',
      tags: ['Backend', 'Payments'],
      points: 45,
    },
    {
      id: 't6',
      title: 'Set up monitoring tools',
      priority: 'Low',
      deadline: '2026-04-22',
      assignee: 'James Wilson',
      tags: ['DevOps'],
      points: 30,
    },
  ],
  done: [
    {
      id: 't7',
      title: 'User authentication module',
      priority: 'High',
      deadline: '2026-04-05',
      assignee: 'Emily Chen',
      tags: ['Backend', 'Auth'],
      points: 60,
    },
    {
      id: 't8',
      title: 'Company landing page update',
      priority: 'Medium',
      deadline: '2026-04-03',
      assignee: 'David Park',
      tags: ['Design'],
      points: 40,
    },
    {
      id: 't9',
      title: 'Database optimization',
      priority: 'High',
      deadline: '2026-04-01',
      assignee: 'Sarah Miller',
      tags: ['Backend', 'DB'],
      points: 55,
    },
  ],
};

// ─── Team Members ──────────────────────────────────────────────────────────
export const teamMembers = [
  {
    id: 'm1',
    name: 'Sarah Miller',
    role: 'Frontend Lead',
    avatar: 'SM',
    color: 'from-violet-500 to-purple-600',
    tasksCompleted: 18,
    tasksInProgress: 2,
    contributionScore: 920,
    points: 2450,
    productivity: 94,
  },
  {
    id: 'm2',
    name: 'James Wilson',
    role: 'Backend Engineer',
    avatar: 'JW',
    color: 'from-blue-500 to-cyan-600',
    tasksCompleted: 15,
    tasksInProgress: 3,
    contributionScore: 780,
    points: 1980,
    productivity: 87,
  },
  {
    id: 'm3',
    name: 'Emily Chen',
    role: 'Full Stack Developer',
    avatar: 'EC',
    color: 'from-pink-500 to-rose-600',
    tasksCompleted: 21,
    tasksInProgress: 1,
    contributionScore: 1050,
    points: 3100,
    productivity: 98,
  },
  {
    id: 'm4',
    name: 'David Park',
    role: 'DevOps Engineer',
    avatar: 'DP',
    color: 'from-emerald-500 to-teal-600',
    tasksCompleted: 12,
    tasksInProgress: 2,
    contributionScore: 640,
    points: 1560,
    productivity: 79,
  },
];

// ─── Analytics Data ─────────────────────────��──────────────────────────────
export const weeklyData = [
  { day: 'Mon', completed: 8, added: 10 },
  { day: 'Tue', completed: 12, added: 9 },
  { day: 'Wed', completed: 6, added: 14 },
  { day: 'Thu', completed: 15, added: 8 },
  { day: 'Fri', completed: 10, added: 11 },
  { day: 'Sat', completed: 4, added: 3 },
  { day: 'Sun', completed: 2, added: 2 },
];

export const projectStats = [
  { name: 'E-commerce Platform', progress: 74, color: 'from-violet-500 to-purple-600', tasks: 24, team: 4 },
  { name: 'Company Website', progress: 91, color: 'from-blue-500 to-cyan-500', tasks: 18, team: 2 },
  { name: 'Mobile App v2', progress: 45, color: 'from-pink-500 to-rose-500', tasks: 32, team: 3 },
  { name: 'Admin Dashboard', progress: 28, color: 'from-amber-500 to-orange-500', tasks: 41, team: 5 },
];

export const notifications = [
  { id: 'n1', type: 'warning', message: 'Task "Fix checkout page bugs" is due tomorrow', time: '2m ago' },
  { id: 'n2', type: 'danger', message: 'You missed deadline for "Database optimization review"', time: '1h ago' },
  { id: 'n3', type: 'info', message: 'Emily Chen completed 5 tasks today', time: '3h ago' },
  { id: 'n4', type: 'success', message: 'Weekly goal reached! 92% tasks completed', time: '5h ago' },
  { id: 'n5', type: 'warning', message: 'James has 8 tasks due this week', time: '6h ago' },
];