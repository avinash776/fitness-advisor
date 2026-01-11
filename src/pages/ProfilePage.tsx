import { useState } from 'react';
import { FaEnvelope, FaDumbbell, FaWeight, FaRuler, FaChartLine, FaFire, FaTrophy, FaMedal, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

interface UserProfile {
  name: string;
  email: string;
  height: number;
  weight: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}

interface ProgressData {
  date: string;
  weight: number;
  workouts: number;
  caloriesBurned: number;
}

const achievements = [
  { icon: FaTrophy, title: 'First Workout', desc: 'Completed your first workout', unlocked: true, color: 'from-yellow-500 to-amber-500' },
  { icon: FaFire, title: '7-Day Streak', desc: 'Worked out for 7 days straight', unlocked: true, color: 'from-orange-500 to-red-500' },
  { icon: FaMedal, title: 'Macro Master', desc: 'Hit your macros for 30 days', unlocked: false, color: 'from-purple-500 to-pink-500' },
  { icon: FaDumbbell, title: 'Power Lifter', desc: 'Completed 100 workouts', unlocked: false, color: 'from-blue-500 to-cyan-500' },
];

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    height: 175,
    weight: 70,
    fitnessLevel: 'intermediate',
    goals: ['Build Muscle', 'Improve Endurance']
  });

  const [progressData] = useState<ProgressData[]>([
    { date: '2024-03-01', weight: 75, workouts: 3, caloriesBurned: 1200 },
    { date: '2024-03-08', weight: 74, workouts: 4, caloriesBurned: 1500 },
    { date: '2024-03-15', weight: 73, workouts: 5, caloriesBurned: 1800 },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Workouts', value: '48', icon: FaDumbbell, color: 'from-primary-500 to-primary-600' },
    { label: 'Calories Burned', value: '12.5K', icon: FaFire, color: 'from-orange-500 to-red-500' },
    { label: 'Current Streak', value: '7 days', icon: FaChartLine, color: 'from-green-500 to-emerald-500' },
  ];

  const getFitnessLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Your Profile</span>
          </h1>
          <p className="text-gray-400 text-lg">Track your progress and manage your fitness journey</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="glass-card rounded-3xl p-8 mb-8">
            {!isEditing ? (
              <>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-4xl font-heading font-bold text-white shadow-glow-primary">
                      {profile.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 border-4 border-dark-900 flex items-center justify-center">
                      <FaDumbbell className="text-white text-xs" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <h2 className="font-heading text-2xl font-bold">{profile.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium glass ${getFitnessLevelColor(profile.fitnessLevel)}`}>
                        {profile.fitnessLevel.charAt(0).toUpperCase() + profile.fitnessLevel.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-4">
                      <FaEnvelope className="text-sm" />
                      {profile.email}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {profile.goals.map((goal, index) => (
                        <span key={index} className="px-3 py-1 rounded-full glass text-sm text-primary-400">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit Profile
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="glass rounded-xl p-4 text-center">
                    <FaRuler className="text-secondary-400 text-xl mx-auto mb-2" />
                    <div className="font-heading text-2xl font-bold">{profile.height}</div>
                    <div className="text-gray-400 text-sm">cm</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <FaWeight className="text-primary-400 text-xl mx-auto mb-2" />
                    <div className="font-heading text-2xl font-bold">{profile.weight}</div>
                    <div className="text-gray-400 text-sm">kg</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <FaChartLine className="text-green-400 text-xl mx-auto mb-2" />
                    <div className="font-heading text-2xl font-bold">-2</div>
                    <div className="text-gray-400 text-sm">kg this month</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <FaFire className="text-orange-400 text-xl mx-auto mb-2" />
                    <div className="font-heading text-2xl font-bold">22.9</div>
                    <div className="text-gray-400 text-sm">BMI</div>
                  </div>
                </div>
              </>
            ) : (
              /* Edit Form */
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="animate-scale-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-bold">Edit Profile</h2>
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setEditedProfile(profile); }}
                    className="text-gray-400 hover:text-white"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Name</label>
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="input-glass w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="input-glass w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={editedProfile.height}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, height: Number(e.target.value) }))}
                      className="input-glass w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={editedProfile.weight}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, weight: Number(e.target.value) }))}
                      className="input-glass w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Fitness Level</label>
                    <select
                      value={editedProfile.fitnessLevel}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, fitnessLevel: e.target.value as UserProfile['fitnessLevel'] }))}
                      className="select-glass w-full"
                    >
                      <option value="beginner">🌱 Beginner</option>
                      <option value="intermediate">💪 Intermediate</option>
                      <option value="advanced">🔥 Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
                    <FaSave />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setEditedProfile(profile); }}
                    className="btn-secondary flex-1 py-3"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="glass-card glass-card-hover rounded-2xl p-6 text-center">
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="text-white text-2xl" />
                  </div>
                  <div className="font-heading text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Achievements */}
          <div className="glass-card rounded-3xl p-8 mb-8">
            <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
              <FaTrophy className="text-yellow-500" />
              Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`glass rounded-xl p-4 flex items-center gap-4 transition-all ${achievement.unlocked ? '' : 'opacity-40 grayscale'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center ${achievement.unlocked ? 'animate-pulse-glow' : ''
                      }`}>
                      <Icon className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-gray-400 text-sm">{achievement.desc}</p>
                    </div>
                    {achievement.unlocked && (
                      <span className="ml-auto text-green-400 text-sm font-medium">✓ Unlocked</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress History */}
          <div className="glass-card rounded-3xl p-8">
            <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
              <FaChartLine className="text-green-500" />
              Progress History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-4 text-gray-400 font-medium">Date</th>
                    <th className="pb-4 text-gray-400 font-medium">Weight</th>
                    <th className="pb-4 text-gray-400 font-medium">Workouts</th>
                    <th className="pb-4 text-gray-400 font-medium">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.map((data, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-4">{data.date}</td>
                      <td className="py-4">
                        <span className="font-heading font-bold">{data.weight}</span>
                        <span className="text-gray-400 text-sm ml-1">kg</span>
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm">
                          {data.workouts} sessions
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-heading font-bold text-orange-400">{data.caloriesBurned.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;