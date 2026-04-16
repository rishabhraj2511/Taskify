export function buildLiveMemberStats(tasks, teamMembers) {
  return teamMembers.map(member => {
    const liveDone = tasks.done.filter(t => t.assignee === member.name).length;
    const liveInProgress = tasks.inprogress.filter(t => t.assignee === member.name).length;
    const liveTodo = tasks.todo.filter(t => t.assignee === member.name).length;
    const livePoints = liveDone * 10 + liveInProgress * 5;

    return {
      ...member,
      liveCompleted: liveDone,
      liveInProgress,
      liveTodo,
      livePoints,
    };
  });
}

export function getBurnoutByDeadline(tasks) {
  const activeTasks = [...tasks.todo, ...tasks.inprogress];
  
  const deadlineCounts = {};
  activeTasks.forEach(task => {
    const date = task.deadline;
    if (date) {
      deadlineCounts[date] = (deadlineCounts[date] || 0) + 1;
    }
  });

  let peakDate = null;
  let peakCount = 0;
  
  Object.entries(deadlineCounts).forEach(([date, count]) => {
    if (count > peakCount) {
      peakCount = count;
      peakDate = date;
    }
  });

  const isBurnoutRisk = peakCount >= 5;

  return {
    isBurnoutRisk,
    peakDate,
    peakCount,
    deadlineCounts,
  };
}

export function getTeamWorkload(tasks, teamMembers) {
  return teamMembers.map(member => {
    const todoCount = tasks.todo.filter(t => t.assignee === member.name).length;
    const inProgressCount = tasks.inprogress.filter(t => t.assignee === member.name).length;
    const doneCount = tasks.done.filter(t => t.assignee === member.name).length;
    
    const workload = todoCount + inProgressCount * 0.7;
    const status = workload > 5 ? 'high' : workload > 3 ? 'medium' : 'low';
    
    return {
      ...member,
      todoCount,
      inProgressCount,
      doneCount,
      workload,
      status,
    };
  });
}

export function getProductivityTrends(tasks, teamMembers) {
  const memberStats = buildLiveMemberStats(tasks, teamMembers);
  
  return memberStats.map(member => ({
    id: member.id,
    name: member.name,
    avatar: member.avatar,
    color: member.color,
    current: member.livePoints,
    previous: Math.max(0, member.livePoints - (member.liveCompleted > 0 ? 10 : 0)),
  }));
}
