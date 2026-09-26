import { useApp } from '../App';

export default function SettingsView() {
  const {
    userName,
    theme,
    setTheme,
    tasks,
  } = useApp();

  const completedTasks = tasks.filter(
    (task) => task.completed && !task.deleted
  ).length;

  const totalTasks = tasks.filter(
    (task) => !task.deleted
  ).length;

  const importantTasks = tasks.filter(
    (task) =>
      task.important && !task.deleted
  ).length;

  const initials = userName
    ? userName.charAt(0).toUpperCase()
    : 'U';

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      {/* ================= PROFILE ================= */}
      <section
        className="rounded-3xl p-6 mb-6"
        style={{
          background: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
        }}
      >
        <p
          className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
          style={{ color: theme.accent1 }}
        >
          Profile
        </p>

        <div className="flex items-center gap-4 mb-6">

          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
            style={{
              background:
                'linear-gradient(135deg,#8b5cf6,#ec4899)',
              boxShadow:
                '0 0 25px rgba(139,92,246,0.3)',
            }}
          >
            {initials}
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {userName || 'User'}
            </h2>

            <p
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Todo User
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          <div
            className="rounded-2xl p-4 text-center"
            style={{
              background: `${theme.accent1}08`,
              border: `1px solid ${theme.accent1}25`,
            }}
          >
            <div
              className="text-2xl font-bold"
              style={{ color: theme.accent1 }}
            >
              {totalTasks}
            </div>

            <p
              className="text-xs mt-1"
              style={{ color: theme.textSecondary }}
            >
              Total Tasks
            </p>
          </div>

          <div
            className="rounded-2xl p-4 text-center"
            style={{
              background: '#10b98108',
              border: '1px solid #10b98125',
            }}
          >
            <div
              className="text-2xl font-bold"
              style={{ color: '#10b981' }}
            >
              {completedTasks}
            </div>

            <p
              className="text-xs mt-1"
              style={{ color: theme.textSecondary }}
            >
              Completed
            </p>
          </div>

          <div
            className="rounded-2xl p-4 text-center"
            style={{
              background: '#ec489908',
              border: '1px solid #ec489925',
            }}
          >
            <div
              className="text-2xl font-bold"
              style={{ color: '#ec4899' }}
            >
              {importantTasks}
            </div>

            <p
              className="text-xs mt-1"
              style={{ color: theme.textSecondary }}
            >
              Important
            </p>
          </div>

        </div>
      </section>

      {/* ================= THEME ================= */}
      <section
        className="rounded-3xl p-6 mb-6"
        style={{
          background: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
        }}
      >

        <p
          className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
          style={{ color: theme.accent2 }}
        >
          Appearance
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* DARK MODE */}
          <button
            onClick={() => setTheme('dark')}
            className="relative rounded-2xl overflow-hidden text-left transition-all duration-300"
            style={{
              border:
                theme.id === 'dark'
                  ? '2px solid #8b5cf6'
                  : '2px solid rgba(139,92,246,0.15)',

              boxShadow:
                theme.id === 'dark'
                  ? '0 0 25px rgba(139,92,246,0.35)'
                  : 'none',
            }}
          >
            <div
              className="h-28"
              style={{
                background:
                  'linear-gradient(135deg,#07071a,#24104f,#111827)',
              }}
            />

            <div
              className="p-4"
              style={{
                background:
                  'rgba(255,255,255,0.04)',
              }}
            >
              <div className="flex items-center gap-3">

                <span className="text-2xl">
                  🌌
                </span>

                <div>
                  <h3 className="font-bold">
                    Dark Mode
                  </h3>

                  <p
                    className="text-xs"
                    style={{
                      color: theme.textSecondary,
                    }}
                  >
                    Dark neon interface
                  </p>
                </div>

              </div>
            </div>

            {theme.id === 'dark' && (
              <span
                className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                style={{
                  background: '#8b5cf6',
                }}
              >
                ✓
              </span>
            )}
          </button>

          {/* LIGHT MODE */}
          <button
            onClick={() => setTheme('light')}
            className="relative rounded-2xl overflow-hidden text-left transition-all duration-300"
            style={{
              border:
                theme.id === 'light'
                  ? '2px solid #ec4899'
                  : '2px solid rgba(139,92,246,0.15)',

              boxShadow:
                theme.id === 'light'
                  ? '0 0 25px rgba(236,72,153,0.3)'
                  : 'none',
            }}
          >
            <div
              className="h-28"
              style={{
                background:
                  'linear-gradient(135deg,#ffffff,#eef2ff,#fce7f3)',
              }}
            />

            <div
              className="p-4"
              style={{
                background:
                  'rgba(255,255,255,0.7)',
              }}
            >
              <div className="flex items-center gap-3">

                <span className="text-2xl">
                  ☀️
                </span>

                <div>
                  <h3 className="font-bold">
                    Light Mode
                  </h3>

                  <p
                    className="text-xs"
                    style={{
                      color: theme.textSecondary,
                    }}
                  >
                    Clean bright interface
                  </p>
                </div>

              </div>
            </div>

            {theme.id === 'light' && (
              <span
                className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                style={{
                  background: '#ec4899',
                }}
              >
                ✓
              </span>
            )}
          </button>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        className="rounded-3xl p-6"
        style={{
          background: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
        }}
      >

        <p
          className="text-xs font-bold tracking-[0.2em] uppercase mb-5"
          style={{ color: theme.accent3 }}
        >
          About
        </p>

        <div className="flex items-center gap-4">

          <img
            src="/todo-logo.png"
            alt="Todo"
            className="h-12 sm:h-14 w-auto max-w-[220px] object-contain flex-shrink-0"
          />

          <div>
            <h2 className="text-xl font-bold">
              Todo
            </h2>

            <p
              className="text-sm"
              style={{
                color: theme.textSecondary,
              }}
            >
              Todo Application version - 1.0
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}