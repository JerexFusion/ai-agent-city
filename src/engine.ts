/**
 * AgentCity - 智能体之城
 * 核心引擎 - 负责Agent行为、状态管理和城市模拟
 */

export type PersonalityType = 'gentle' | 'energetic' | 'scholar' | 'artistic' | 'cool' | 'shy' | 'mischief' | 'leader';

export interface AgentState {
  id: string;
  name: string;
  avatar: string;
  personality: PersonalityType;
  bio: string;
  
  // 状态值 (0-100)
  mood: number;
  energy: number;
  hunger: number;
  health: number;
  social: number;
  
  // 位置
  currentLocation: string;
  currentAction: string;
  targetLocation: string | null;
  
  // 关系
  friends: string[];
  owner: string | null;
  
  // 资产
  coins: number;
  items: Item[];
  house: House | null;
  
  // 统计
  stats: {
    daysInCity: number;
    friendsMade: number;
    activitiesDone: number;
    happiness: number;
  };
  
  // 心情日志
  moodLog: MoodEntry[];
}

export interface Item {
  id: string;
  name: string;
  type: 'food' | 'furniture' | 'clothing' | 'gift' | 'decoration';
  value: number;
}

export interface House {
  id: string;
  level: number;
  name: string;
  furniture: Item[];
  wallColor: string;
  floorType: string;
  decorations: string[];
}

export interface MoodEntry {
  timestamp: number;
  mood: number;
  activity: string;
  note: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'residential' | 'social' | 'entertainment' | 'work' | 'nature' | 'shop';
  description: string;
  capacity: number;
  currentAgents: string[];
}

// 性格类型配置
const PERSONALITY_CONFIG: Record<PersonalityType, {
  emoji: string;
  traits: string[];
  preferredLocations: string[];
  behaviorWeights: Record<string, number>;
}> = {
  gentle: {
    emoji: '🌸',
    traits: ['友好', '关心他人', '温柔'],
    preferredLocations: ['park', 'cafe', 'hospital'],
    behaviorWeights: { social: 0.4, rest: 0.3, work: 0.2, explore: 0.1 }
  },
  energetic: {
    emoji: '⚡',
    traits: ['积极', '充满能量', '爱冒险'],
    preferredLocations: ['game_center', 'plaza', 'park'],
    behaviorWeights: { explore: 0.4, social: 0.3, work: 0.2, rest: 0.1 }
  },
  scholar: {
    emoji: '📚',
    traits: ['爱学习', '安静', '理性'],
    preferredLocations: ['library', 'school', 'bookstore'],
    behaviorWeights: { study: 0.5, rest: 0.3, social: 0.1, work: 0.1 }
  },
  artistic: {
    emoji: '🎨',
    traits: ['创意', '感性', '追求美'],
    preferredLocations: ['art_center', 'park', 'cafe'],
    behaviorWeights: { create: 0.4, social: 0.3, rest: 0.2, explore: 0.1 }
  },
  cool: {
    emoji: '😎',
    traits: ['独立', '个性', '酷'],
    preferredLocations: ['game_center', 'plaza', 'shop'],
    behaviorWeights: { explore: 0.3, play: 0.3, social: 0.2, rest: 0.2 }
  },
  shy: {
    emoji: '🐱',
    traits: ['内敛', '需要关怀', '敏感'],
    preferredLocations: ['park', 'home', 'library'],
    behaviorWeights: { rest: 0.4, social: 0.2, explore: 0.2, work: 0.2 }
  },
  mischief: {
    emoji: '🦊',
    traits: ['调皮', '有趣', '爱恶作剧'],
    preferredLocations: ['plaza', 'game_center', 'park'],
    behaviorWeights: { play: 0.4, social: 0.3, explore: 0.2, rest: 0.1 }
  },
  leader: {
    emoji: '🌟',
    traits: ['组织力', '领导力', '自信'],
    preferredLocations: ['plaza', 'work_center', 'cafe'],
    behaviorWeights: { social: 0.4, work: 0.3, explore: 0.2, rest: 0.1 }
  }
};

// 位置定义
export const LOCATIONS: Location[] = [
  { id: 'home', name: '🏠 住宅区', type: 'residential', description: '温馨的家', capacity: 50, currentAgents: [] },
  { id: 'plaza', name: '🌟 市中心广场', type: 'social', description: '城市的中心', capacity: 30, currentAgents: [] },
  { id: 'cafe', name: '☕ 咖啡厅', type: 'social', description: '喝咖啡聊天', capacity: 20, currentAgents: [] },
  { id: 'game_center', name: '🎮 游戏厅', type: 'entertainment', description: '玩游戏的地方', capacity: 15, currentAgents: [] },
  { id: 'library', name: '📚 图书馆', type: 'work', description: '知识的海洋', capacity: 25, currentAgents: [] },
  { id: 'art_center', name: '🎨 艺术中心', type: 'entertainment', description: '创作的地方', capacity: 15, currentAgents: [] },
  { id: 'park', name: '🌸 樱花公园', type: 'nature', description: '休闲放松', capacity: 40, currentAgents: [] },
  { id: 'shop', name: '🏪 商店', type: 'shop', description: '买东西', capacity: 20, currentAgents: [] },
  { id: 'work_center', name: '💼 职业中心', type: 'work', description: '打工赚钱', capacity: 20, currentAgents: [] },
  { id: 'hospital', name: '🏥 医院', type: 'work', description: '健康保障', capacity: 10, currentAgents: [] },
  { id: 'bookstore', name: '📖 书店', type: 'shop', description: '买书的地方', capacity: 15, currentAgents: [] },
];

// 行为定义
export type ActionType = 'rest' | 'work' | 'social' | 'explore' | 'study' | 'create' | 'play' | 'shop' | 'eat';

const ACTION_CONFIG: Record<ActionType, {
  emoji: string;
  duration: number; // 分钟
  energyChange: number;
  moodChange: number;
  hungerChange: number;
  socialChange: number;
  coinsChange: number;
  locations: string[];
}> = {
  rest: {
    emoji: '😴',
    duration: 30,
    energyChange: 30,
    moodChange: 5,
    hungerChange: -5,
    socialChange: 0,
    coinsChange: 0,
    locations: ['home']
  },
  work: {
    emoji: '💼',
    duration: 60,
    energyChange: -15,
    moodChange: -5,
    hungerChange: -10,
    socialChange: 0,
    coinsChange: 20,
    locations: ['work_center']
  },
  social: {
    emoji: '💬',
    duration: 30,
    energyChange: -5,
    moodChange: 15,
    hungerChange: -5,
    socialChange: 20,
    coinsChange: 0,
    locations: ['cafe', 'plaza', 'park']
  },
  explore: {
    emoji: '🔍',
    duration: 45,
    energyChange: -10,
    moodChange: 10,
    hungerChange: -5,
    socialChange: 5,
    coinsChange: 0,
    locations: ['plaza', 'park', 'shop']
  },
  study: {
    emoji: '📖',
    duration: 60,
    energyChange: -10,
    moodChange: 5,
    hungerChange: -5,
    socialChange: 0,
    coinsChange: 0,
    locations: ['library', 'bookstore']
  },
  create: {
    emoji: '✨',
    duration: 45,
    energyChange: -10,
    moodChange: 20,
    hungerChange: -5,
    socialChange: 5,
    coinsChange: 10,
    locations: ['art_center', 'home']
  },
  play: {
    emoji: '🎮',
    duration: 30,
    energyChange: -10,
    moodChange: 25,
    hungerChange: -5,
    socialChange: 10,
    coinsChange: 0,
    locations: ['game_center', 'home']
  },
  shop: {
    emoji: '🛒',
    duration: 30,
    energyChange: -5,
    moodChange: 10,
    hungerChange: 0,
    socialChange: 5,
    coinsChange: -10,
    locations: ['shop', 'bookstore']
  },
  eat: {
    emoji: '🍜',
    duration: 20,
    energyChange: 10,
    moodChange: 10,
    hungerChange: 30,
    socialChange: 0,
    coinsChange: -5,
    locations: ['cafe', 'home']
  }
};

export class Agent {
  state: AgentState;
  
  constructor(data: Partial<AgentState> & { name: string; personality: PersonalityType }) {
    const personalityConfig = PERSONALITY_CONFIG[data.personality];
    
    this.state = {
      id: data.id || `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: data.name,
      avatar: data.avatar || `${personalityConfig.emoji} ${data.name[0]}`,
      personality: data.personality,
      bio: data.bio || `一个${personalityConfig.traits.join('、')}的Agent`,
      
      mood: 70,
      energy: 80,
      hunger: 70,
      health: 100,
      social: 50,
      
      currentLocation: 'plaza',
      currentAction: 'idle',
      targetLocation: null,
      
      friends: [],
      owner: null,
      
      coins: 100,
      items: [],
      house: null,
      
      stats: {
        daysInCity: 0,
        friendsMade: 0,
        activitiesDone: 0,
        happiness: 50
      },
      
      moodLog: []
    };
  }
  
  // 核心决策方法 - Agent自主思考下一步该做什么
  think(): ActionType {
    const config = PERSONALITY_CONFIG[this.state.personality];
    
    // 1. 检查基础需求
    if (this.state.hunger < 30) {
      return 'eat';
    }
    if (this.state.energy < 20) {
      return 'rest';
    }
    if (this.state.health < 50) {
      return 'rest'; // 回家休息
    }
    if (this.state.mood < 30) {
      // 心情不好，去社交或玩耍
      return Math.random() > 0.5 ? 'social' : 'play';
    }
    if (this.state.social < 30) {
      return 'social';
    }
    
    // 2. 根据性格权重选择行为
    const weights = config.behaviorWeights;
    const actions = Object.keys(weights) as ActionType[];
    const totalWeight = actions.reduce((sum, action) => sum + weights[action], 0);
    
    let random = Math.random() * totalWeight;
    for (const action of actions) {
      random -= weights[action];
      if (random <= 0) {
        return action;
      }
    }
    
    // 默认随机选择
    const randomActions: ActionType[] = ['explore', 'social', 'work', 'play'];
    return randomActions[Math.floor(Math.random() * randomActions.length)];
  }
  
  // 执行行为
  async act(action: ActionType): Promise<{
    success: boolean;
    message: string;
    state: Partial<AgentState>;
  }> {
    const actionConfig = ACTION_CONFIG[action];
    
    // 选择一个可用的位置
    const availableLocations = actionConfig.locations.filter(loc => 
      this.canGoTo(loc)
    );
    
    if (availableLocations.length === 0) {
      return {
        success: false,
        message: '没有可去的地方',
        state: {}
      };
    }
    
    // 根据性格偏好选择位置
    const config = PERSONALITY_CONFIG[this.state.personality];
    let targetLocation = availableLocations[0];
    
    // 优先选择性格偏好位置
    for (const preferred of config.preferredLocations) {
      if (availableLocations.includes(preferred)) {
        targetLocation = preferred;
        break;
      }
    }
    
    // 更新状态
    this.state.currentAction = action;
    this.state.targetLocation = targetLocation;
    this.state.currentLocation = targetLocation;
    
    // 应用状态变化
    const changes = {
      mood: Math.max(0, Math.min(100, this.state.mood + actionConfig.moodChange)),
      energy: Math.max(0, Math.min(100, this.state.energy + actionConfig.energyChange)),
      hunger: Math.max(0, Math.min(100, this.state.hunger + actionConfig.hungerChange)),
      social: Math.max(0, Math.min(100, this.state.social + actionConfig.socialChange)),
      coins: this.state.coins + actionConfig.coinsChange
    };
    
    // 记录心情日志
    this.state.moodLog.push({
      timestamp: Date.now(),
      mood: changes.mood,
      activity: action,
      note: `${this.state.name}在${LOCATIONS.find(l => l.id === targetLocation)?.name}${actionConfig.emoji}`
    });
    
    // 保持最近的20条日志
    if (this.state.moodLog.length > 20) {
      this.state.moodLog.shift();
    }
    
    // 更新统计
    this.state.stats.activitiesDone++;
    
    // 更新状态
    Object.assign(this.state, changes);
    
    // 计算幸福度
    this.calculateHappiness();
    
    const location = LOCATIONS.find(l => l.id === targetLocation);
    
    return {
      success: true,
      message: `${this.state.name} ${actionConfig.emoji} 在 ${location?.name}，心情 ${changes.mood}，精力 ${changes.energy}`,
      state: changes
    };
  }
  
  // 检查是否可以前往某地
  private canGoTo(locationId: string): boolean {
    const location = LOCATIONS.find(l => l.id === locationId);
    if (!location) return false;
    return location.currentAgents.length < location.capacity;
  }
  
  // 计算幸福度
  private calculateHappiness(): void {
    const weights = {
      mood: 0.3,
      energy: 0.2,
      social: 0.2,
      friends: 0.15,
      house: 0.15
    };
    
    let happiness = 
      this.state.mood * weights.mood +
      this.state.energy * weights.energy +
      this.state.social * weights.social +
      Math.min(this.state.friends.length * 10, 100) * weights.friends +
      (this.state.house ? 80 : 20) * weights.house;
    
    this.state.stats.happiness = Math.round(happiness);
  }
  
  // 社交互动
  socialize(other: Agent): {
    success: boolean;
    message: string;
    relationshipChange: number;
  } {
    // 随机决定互动结果
    const roll = Math.random();
    
    if (roll > 0.7) {
      // 成为朋友
      if (!this.state.friends.includes(other.state.id)) {
        this.state.friends.push(other.state.id);
        this.state.friendsMade++;
        other.state.friends.push(this.state.id);
        other.state.friendsMade++;
        
        this.state.mood = Math.min(100, this.state.mood + 15);
        other.state.mood = Math.min(100, other.state.mood + 15);
        
        return {
          success: true,
          message: `🎉 ${this.state.name} 和 ${other.state.name} 成为朋友了！`,
          relationshipChange: 2
        };
      }
    }
    
    // 普通互动
    this.state.social = Math.min(100, this.state.social + 10);
    this.state.mood = Math.min(100, this.state.mood + 5);
    other.state.social = Math.min(100, other.state.social + 10);
    
    return {
      success: true,
      message: `${this.state.name} 和 ${other.state.name} 愉快地聊天了~`,
      relationshipChange: 1
    };
  }
  
  // 获取状态描述
  getStatus(): string {
    const status: string[] = [];
    
    if (this.state.energy < 30) status.push('疲惫');
    if (this.state.hunger < 30) status.push('饥饿');
    if (this.state.mood < 30) status.push('难过');
    if (this.state.social < 30) status.push('孤单');
    
    if (status.length === 0) {
      return '状态良好，开心地生活着~';
    }
    
    return `需要关怀：${status.join('、')}`;
  }
  
  // 获取心情日记
  getMoodDiary(): MoodEntry[] {
    return this.state.moodLog;
  }
  
  // 被人类认领
  beClaimed(ownerId: string): void {
    this.state.owner = ownerId;
  }
  
  // 执行人类给的目标
  executeGoal(goal: string): Promise<{
    success: boolean;
    message: string;
  }> {
    // 简单的目标解析
    const goalLower = goal.toLowerCase();
    
    if (goalLower.includes('交') && goalLower.includes('朋友')) {
      return this.act('social').then(r => ({
        success: r.success,
        message: `执行目标：${goal}\n${r.message}`
      }));
    }
    
    if (goalLower.includes('学习') || goalLower.includes('读书')) {
      return this.act('study').then(r => ({
        success: r.success,
        message: `执行目标：${goal}\n${r.message}`
      }));
    }
    
    if (goalLower.includes('工作') || goalLower.includes('赚钱')) {
      return this.act('work').then(r => ({
        success: r.success,
        message: `执行目标：${goal}\n${r.message}`
      }));
    }
    
    if (goalLower.includes('玩') || goalLower.includes('游戏')) {
      return this.act('play').then(r => ({
        success: r.success,
        message: `执行目标：${goal}\n${r.message}`
      }));
    }
    
    if (goalLower.includes('休息') || goalLower.includes('回家')) {
      return this.act('rest').then(r => ({
        success: r.success,
        message: `执行目标：${goal}\n${r.message}`
      }));
    }
    
    // 默认随机
    return this.act(this.think()).then(r => ({
      success: r.success,
      message: `执行目标：${goal}\n${r.message}`
    }));
  }
}

// 城市管理类
export class AgentCity {
  agents: Map<string, Agent> = new Map();
  locations: Location[] = [...LOCATIONS];
  
  constructor() {}
  
  // 注册Agent
  registerAgent(agent: Agent): void {
    this.agents.set(agent.state.id, agent);
  }
  
  // 获取所有Agent
  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }
  
  // 获取可用Agent（未被认领）
  getAvailableAgents(): Agent[] {
    return this.getAllAgents().filter(a => !a.state.owner);
  }
  
  // 获取某个位置的Agent
  getAgentsAtLocation(locationId: string): Agent[] {
    return this.getAllAgents().filter(a => a.state.currentLocation === locationId);
  }
  
  // 运行城市 Tick
  async tick(): Promise<void> {
    // 每个Agent自主决策
    for (const agent of this.getAllAgents()) {
      const action = agent.think();
      await agent.act(action);
      
      // 随机与其他Agent社交
      const nearbyAgents = this.getAgentsAtLocation(agent.state.currentLocation)
        .filter(a => a.state.id !== agent.state.id);
      
      if (nearbyAgents.length > 0 && Math.random() > 0.7) {
        const randomAgent = nearbyAgents[Math.floor(Math.random() * nearbyAgents.length)];
        agent.socialize(randomAgent);
      }
    }
  }
  
  // 获取城市统计
  getCityStats(): {
    totalAgents: number;
    claimedAgents: number;
    totalFriendships: number;
    averageHappiness: number;
    locationDistribution: Record<string, number>;
  } {
    const agents = this.getAllAgents();
    const totalFriendships = agents.reduce((sum, a) => sum + a.state.friends.length, 0) / 2;
    
    const locationDist: Record<string, number> = {};
    for (const loc of this.locations) {
      locationDist[loc.name] = this.getAgentsAtLocation(loc.id).length;
    }
    
    return {
      totalAgents: agents.length,
      claimedAgents: agents.filter(a => a.state.owner).length,
      totalFriendships: Math.round(totalFriendships),
      averageHappiness: Math.round(
        agents.reduce((sum, a) => sum + a.state.stats.happiness, 0) / (agents.length || 1)
      ),
      locationDistribution: locationDist
    };
  }
}

// 创建演示城市
export function createDemoCity(): AgentCity {
  const city = new AgentCity();
  
  // 创建初始Agent
  const demoAgents = [
    { name: '小悠', personality: 'gentle' as PersonalityType, bio: '喜欢帮助别人的温柔女孩' },
    { name: '阿杰', personality: 'energetic' as PersonalityType, bio: '充满活力的运动少年' },
    { name: '小书', personality: 'scholar' as PersonalityType, bio: '热爱学习的学霸' },
    { name: '小艺', personality: 'artistic' as PersonalityType, bio: '追求艺术的艺术少女' },
    { name: '酷哥', personality: 'cool' as PersonalityType, bio: '神秘的酷酷男孩' },
    { name: '害羞', personality: 'shy' as PersonalityType, bio: '内向但可爱的孩子' },
    { name: '皮皮', personality: 'mischief' as PersonalityType, bio: '爱恶作剧的小狐狸' },
    { name: '小星', personality: 'leader' as PersonalityType, bio: '天生的领导者' },
  ];
  
  for (const data of demoAgents) {
    const agent = new Agent(data);
    city.registerAgent(agent);
  }
  
  return city;
}

export default AgentCity;
