# Changelog

All notable changes to the `dev.antigravity.clarity` extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-11-05

### Added
- **Obsidian & Slate Surface System**:
  - Re-engineered dark mode surface hierarchy inspired by modern clean Calagopus aesthetics: base (`#0b0d12`), card (`#0f1219`), raised (`#161a23`), and overlay (`#1e232e`).
  - Added hairline borders with CSS relative opacity (`rgba(255, 255, 255, 0.08)`).
- **Dynamic Accent System**:
  - Six selectable accent presets: Cyan (`#06b6d4`), Monochrome (`#ffffff`), Violet (`#8b5cf6`), Emerald (`#10b981`), Sunset (`#f97316`), and Rose (`#f43f5e`).
- **Geometry & Micro-Interactions**:
  - Three corner radius scales: Compact (8px), Modern (14px), Rounded (18px).
  - Tactile button press physics (`translate-y-[1px]` on active click).
  - Ambient status edge glow on server cards (`lime-400` running, `amber-400` starting, `rose-500` offline).
- **Clarity Live Studio Drawer**:
  - Tabbed customizer interface: Palette & Accents, Layout & Navigation, Surfaces & Radii, and Live Custom CSS.
  - Instant live CSS rule injection into the active session without page reload.
- **Enhanced Telemetry HUD**:
  - Status glow border on server overview cards.
  - Live progress bars for CPU, RAM, Disk, and bidirectional network throughput.

## [1.0.0] - 2026-11-05

### Added
- **Core Architecture & Identity**:
  - Registered package `dev.antigravity.clarity` targeting Calagopus Panel `>=1.2.8`.
  - Canonical layout structure compatible with modern Calagopus extension standards.
  - MIT License and clean-room implementation free of third-party commercial assets or telemetry.
- **Layer A - Mantine Theme Overrides**:
  - Custom palette definitions `clarityPalette` (cyan/teal spectrum) and `clarityDarkPalette` (obsidian/slate background contrast).
  - Configured `defaultRadius: 'md'`, button, card, and modal default props.
- **Layer B - CSS Variables**:
  - Complete dark and light theme tokens in `frontend/src/app.css` strictly scoped to `:root[data-mantine-color-scheme="dark"]` and `:root[data-mantine-color-scheme="light"]`.
  - Full support for `--mantine-color-body`, `--chart-grid-color`, `--chart-tick-color`, `--chart-series-1..4`, `--color-server-status-*`, and `--font-sans`.
- **Layer C - Mantine CSS Variable Resolver**:
  - Registered optional CSS variable resolver in `frontend/src/resolver.ts` deriving high-contrast variables from `theme.colors[theme.primaryColor]`.
- **Layer D - Hookable Component Interceptors**:
  - Registered pure interceptors for `Sidebar`, `ServerContentContainer`, `AccountContentContainer`, and `AdminContentContainer`.
  - Responsive container queries adapting navigation and container layouts to fluid screen sizes (360px, 768px, 1280px).
- **Index HTML Boot Variables & MiniJinja Screen**:
  - Rust backend exposes `accent_color` and `brand_name` variables under the settings lock in `initialize_index_html`.
  - Branded MiniJinja loading screen in `frontend/src/boot.html`.
- **Layout Switcher & Studio**:
  - User-configurable navigation modes: `left-sidebar`, `top-bar`, `collapsed-drawer`.
  - User-configurable container widths: `inset`, `flush`.
  - Floating Quick-Switcher modal and toggle button.
  - Per-user synchronization using `dev.antigravity.clarity::layout` user setting key.
- **Operator Settings & Admin API**:
  - Backend `ClarityOperatorSettings` serialized and deserialized safely with fail-safe defaults.
  - Admin REST endpoints `GET` and `PUT` at `/api/admin/extensions/dev.antigravity.clarity/settings`.
  - Garde schema validation and admin activity audit logging.
  - Dedicated admin configuration UI in `frontend/src/pages/ClarityConfigurationPage.tsx`.
- **Granular Permissions & Icons**:
  - `clarity.settings-read` and `clarity.settings-write` (Admin permission group).
  - `clarity.view` and `clarity.customize` (Server permission group).
  - Custom SVG permission icons registered in Calagopus permission tree.
- **Telemetry HUD**:
  - Real-time `ServerMetricsHud` displaying CPU, memory, disk, and bidirectional network throughput on server pages.
