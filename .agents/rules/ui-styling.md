# UI & Styling Guidelines

Guidelines for writing clean, responsive, and accessible UI in this repository.

## Design System & Frameworks
- **Tailwind CSS v4** + **DaisyUI v5**
- **HeroUI v3**
- **Icons**: `lucide-react`
- **Feedback**: `react-hot-toast`

## Rules
1. **Semantic DaisyUI Elements**: Use `btn`, `btn-primary`, `btn-outline`, `navbar`, `card`, `card-body`, and `badge` classes rather than reinventing button/card primitives.
2. **Theme Consistency**: Utilize color tokens like `bg-base-100`, `bg-base-200`, `bg-base-300`, `text-base-content`, `border-base-200` to ensure smooth dark/light mode compatibility.
3. **Icons**: Use `lucide-react` with standard sizing (e.g., `className="w-5 h-5"` or `size={20}`).
4. **Interactive States**:
   - Every clickable element or button should have hover, active, and focus-visible states.
   - Async actions (such as auth submission) must display a loading spinner and disable the button to prevent duplicate clicks.
5. **Toast Notifications**: Use `toast.success(...)` and `toast.error(...)` from `react-hot-toast` for concise, user-friendly feedback.
