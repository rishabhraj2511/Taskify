// ─── Initial Users ─────────────────────────────────────────────────────────
export const initialUsers = [
  {
    id: 'u_manager1',
    name: 'Manager Admin',
    email: 'manager@taskify.com',
    password: 'manager123',
    role: 'MANAGER',
    avatar: 'MA',
    color: 'from-orange-500 to-red-600',
  },
];

// ─── Teams with Team Leads ─────────────────────────────────────────────────
export const initialTeams = [
  {
    id: 'team_1',
    name: 'Frontend Team',
    leaderId: null,
    leadDetails: {
      name: 'Sarah Miller',
      email: 'sarah@taskify.com',
      phone: '555-0101',
      position: 'Senior Frontend Lead',
    },
    members: ['m1', 'm2'],
    color: 'from-violet-500 to-purple-600',
    tasksCompleted: 18,
    performanceScore: 94,
    totalPoints: 2450,
  },
  {
    id: 'team_2',
    name: 'Backend Team',
    leaderId: null,
    leadDetails: {
      name: 'James Wilson',
      email: 'james@taskify.com',
      phone: '555-0102',
      position: 'Senior Backend Lead',
    },
    members: ['m3', 'm4'],
    color: 'from-blue-500 to-cyan-600',
    tasksCompleted: 15,
    performanceScore: 87,
    totalPoints: 1980,
  },
  {
    id: 'team_3',
    name: 'Full Stack Team',
    leaderId: null,
    leadDetails: {
      name: 'Emily Chen',
      email: 'emily@taskify.com',
      phone: '555-0103',
      position: 'Full Stack Lead',
    },
    members: ['m1', 'm3'],
    color: 'from-pink-500 to-rose-600',
    tasksCompleted: 21,
    performanceScore: 98,
    totalPoints: 3100,
  },
];

// ─── Tasks ─────────────────────────────────────────────────────────────────
export const initialTasks = {
  todo: [
    {
      id: 't1',
      title: 'Complete Q2 marketing campaign design',
      priority: 'High',
      deadline: '2026-04-15',
      assignee: 'Sarah Miller',
      assigneeId: 'm1',
      teamId: 'team_1',
      projectId: 'proj_1',
      tags: ['Marketing', 'Design'],
      points: 40,
    },
    {
      id: 't2',
      title: 'Update client documentation',
      priority: 'Medium',
      deadline: '2026-04-18',
      assignee: 'James Wilson',
      assigneeId: 'm3',
      teamId: 'team_2',
      projectId: 'proj_2',
      tags: ['Docs'],
      points: 20,
    },
    {
      id: 't3',
      title: 'Fix checkout page bugs',
      priority: 'High',
      deadline: '2026-04-12',
      assignee: 'Emily Chen',
      assigneeId: 'm5',
      teamId: 'team_3',
      projectId: 'proj_1',
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
      assigneeId: 'm1',
      teamId: 'team_1',
      projectId: 'proj_1',
      tags: ['Frontend', 'Data'],
      points: 50,
    },
    {
      id: 't5',
      title: 'Integrate payment gateway',
      priority: 'Medium',
      deadline: '2026-04-25',
      assignee: 'Sofia Rodriguez',
      assigneeId: 'm4',
      teamId: 'team_2',
      projectId: 'proj_2',
      tags: ['Backend', 'Payments'],
      points: 45,
    },
    {
      id: 't6',
      title: 'Set up monitoring tools',
      priority: 'Low',
      deadline: '2026-04-22',
      assignee: 'James Wilson',
      assigneeId: 'm3',
      teamId: 'team_2',
      projectId: 'proj_2',
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
      assigneeId: 'm5',
      teamId: 'team_3',
      projectId: 'proj_1',
      tags: ['Backend', 'Auth'],
      points: 60,
    },
    {
      id: 't8',
      title: 'Company landing page update',
      priority: 'Medium',
      deadline: '2026-04-03',
      assignee: 'Sofia Rodriguez',
      assigneeId: 'm4',
      teamId: 'team_2',
      projectId: 'proj_2',
      tags: ['Design'],
      points: 40,
    },
    {
      id: 't9',
      title: 'Database optimization',
      priority: 'High',
      deadline: '2026-04-01',
      assignee: 'Sarah Miller',
      assigneeId: 'm1',
      teamId: 'team_1',
      projectId: 'proj_1',
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
    email: 'sarah@taskify.com',
    role: 'TEAM_LEAD',
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
    name: 'Alex Johnson',
    email: 'alex@taskify.com',
    role: 'TEAM_MEMBER',
    avatar: 'AJ',
    color: 'from-blue-500 to-cyan-600',
    tasksCompleted: 14,
    tasksInProgress: 2,
    contributionScore: 720,
    points: 1850,
    productivity: 85,
  },
  {
    id: 'm3',
    name: 'James Wilson',
    email: 'james@taskify.com',
    role: 'TEAM_LEAD',
    avatar: 'JW',
    color: 'from-emerald-500 to-teal-600',
    tasksCompleted: 15,
    tasksInProgress: 3,
    contributionScore: 780,
    points: 1980,
    productivity: 87,
  },
  {
    id: 'm4',
    name: 'Sofia Rodriguez',
    email: 'sofia@taskify.com',
    role: 'TEAM_MEMBER',
    avatar: 'SR',
    color: 'from-pink-500 to-rose-600',
    tasksCompleted: 17,
    tasksInProgress: 1,
    contributionScore: 850,
    points: 2200,
    productivity: 91,
  },
  {
    id: 'm5',
    name: 'Emily Chen',
    email: 'emily@taskify.com',
    role: 'TEAM_LEAD',
    avatar: 'EC',
    color: 'from-amber-500 to-orange-600',
    tasksCompleted: 21,
    tasksInProgress: 1,
    contributionScore: 1050,
    points: 3100,
    productivity: 98,
  },
  {
    id: 'm6',
    name: 'David Park',
    email: 'david@taskify.com',
    role: 'PROJECT_MANAGER',
    avatar: 'DP',
    color: 'from-indigo-500 to-blue-600',
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

export const initialProjects = [
  {
    id: 'proj_1',
    title: 'E-commerce Platform',
    description: 'Build complete e-commerce solution with payment gateway',
    createdBy: 'u_manager1',
    assignedTeamId: 'team_1',
    status: 'in-progress',
    priority: 'High',
    progress: 74,
    deadline: '2026-05-15',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'proj_2',
    title: 'Company Website Redesign',
    description: 'Complete redesign of the main company website',
    createdBy: 'u_manager1',
    assignedTeamId: 'team_2',
    status: 'in-progress',
    priority: 'Medium',
    progress: 91,
    deadline: '2026-04-25',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'proj_3',
    title: 'Mobile App v2',
    description: 'Mobile application version 2 with new features',
    createdBy: 'u_manager1',
    assignedTeamId: 'team_3',
    status: 'in-progress',
    priority: 'High',
    progress: 45,
    deadline: '2026-06-01',
    color: 'from-pink-500 to-rose-500',
  },
];

export const notifications = [
  { id: 'n1', type: 'warning', message: 'Task "Fix checkout page bugs" is due tomorrow', time: '2m ago' },
  { id: 'n2', type: 'danger', message: 'You missed deadline for "Database optimization review"', time: '1h ago' },
  { id: 'n3', type: 'info', message: 'Emily Chen completed 5 tasks today', time: '3h ago' },
  { id: 'n4', type: 'success', message: 'Weekly goal reached! 92% tasks completed', time: '5h ago' },
  { id: 'n5', type: 'warning', message: 'James has 8 tasks due this week', time: '6h ago' },
];

// ─── Initialize All Data ─────────────────────────
export function initializeAppData() {
  const existingUsers = JSON.parse(localStorage.getItem('taskify.users') || '[]');
  const existingTeams = JSON.parse(localStorage.getItem('taskify.teams') || '[]');
  const existingProjects = JSON.parse(localStorage.getItem('taskify.projects') || '[]');

  // Initialize users if empty
  if (existingUsers.length === 0) {
    localStorage.setItem('taskify.users', JSON.stringify(initialUsers));
    localStorage.setItem('taskify.teamMembers', JSON.stringify(teamMembers));
  }

  // Initialize teams if empty
  if (existingTeams.length === 0) {
    localStorage.setItem('taskify.teams', JSON.stringify(initialTeams));
  }

  // Initialize projects if empty
  if (existingProjects.length === 0) {
    localStorage.setItem('taskify.projects', JSON.stringify(initialProjects));
  }

  // Initialize tasks if empty (using correct storage key from MainLayout)
  const TASKS_STORAGE_KEY = 'taskify.tasks.v1';
  const existingTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || '{}');
  if (!existingTasks.todo || existingTasks.todo.length === 0) {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(initialTasks));
  }
}