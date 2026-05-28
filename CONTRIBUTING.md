# Contributing to Potion

Thank you for your interest in contributing to Potion! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- yarn or npm
- Git
- A code editor (VS Code recommended)

### Initial Setup

1. Clone the repository (if forking):

```bash
git clone https://github.com/yourusername/potion.git
cd potion
```

2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn electron:dev
```

## 🏗️ Project Structure

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture documentation.

Key directories:

- `electron/` - Electron main and preload processes
- `src/components/` - React components
- `src/stores/` - Zustand state management
- `src/types/` - TypeScript type definitions

## 🎯 Development Guidelines

### Code Style

- **TypeScript**: Use strict mode, avoid `any`
- **React**: Functional components with hooks
- **Formatting**: Prettier (runs on save)
- **Linting**: ESLint (fix with `yarn lint`)

### Component Guidelines

1. **Use TypeScript** for all components
2. **Extract reusable logic** into custom hooks
3. **Keep components small** and focused
4. **Use Tailwind** for styling (no inline styles)
5. **Follow shadcn/ui patterns** for new UI components

### State Management

- Use **Zustand stores** for global state
- Keep **local state** in components when possible
- **Avoid prop drilling** - use stores or context

### Database Operations

- All database operations go through **IPC**
- Use **prepared statements** for queries
- Add **indexes** for frequently queried columns
- **Batch writes** when possible

## 🧪 Testing (Coming Soon)

### Running Tests

```bash
yarn test
```

### Writing Tests

- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add database view support
fix: resolve editor crash on empty page
docs: update README with new features
style: format code with prettier
refactor: simplify sidebar component
test: add tests for workspace store
chore: update dependencies
```

## 🐛 Bug Reports

When filing a bug report, please include:

1. **Description** of the issue
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Environment** (OS, Node version, etc.)
6. **Screenshots** if applicable

## ✨ Feature Requests

For feature requests, please include:

1. **Use case** - what problem does it solve?
2. **Proposed solution** - how should it work?
3. **Alternatives** - what other options did you consider?
4. **Additional context** - mockups, examples, etc.

## 🔀 Pull Request Process

1. **Fork** the repository
2. **Create a branch** for your feature/fix
3. **Make your changes** following the guidelines
4. **Test your changes** thoroughly
5. **Commit** following conventional commits
6. **Push** to your fork
7. **Open a pull request**

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated (when applicable)
- [ ] Documentation updated (when applicable)
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Builds successfully
- [ ] Tested on macOS/Windows/Linux (if applicable)

## 🎨 UI/UX Guidelines

- **Consistency** - Follow existing design patterns
- **Accessibility** - Use semantic HTML and ARIA labels
- **Keyboard navigation** - All features accessible via keyboard
- **Dark mode** - All new UI should support dark mode
- **Animations** - Use Framer Motion for transitions
- **Icons** - Use Lucide React icons

## 🔧 Adding New Features

### New Block Types

1. Define type in `src/types/index.ts`
2. Add TipTap extension in `src/components/Editor/`
3. Add to slash command menu
4. Update database schema if needed

### New UI Components

1. Use shadcn/ui when possible
2. Place in `src/components/ui/`
3. Follow Radix UI patterns
4. Add TypeScript types
5. Use Tailwind for styling

### New Stores

1. Create in `src/stores/`
2. Use Zustand patterns
3. Add TypeScript interfaces
4. Document store actions
5. Consider persistence needs

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [TipTap Documentation](https://tiptap.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## ❓ Questions?

- Check existing [issues](https://github.com/yourusername/potion/issues)
- Review [ARCHITECTURE.md](ARCHITECTURE.md)
- Read [SETUP.md](SETUP.md)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Potion! 🎉
