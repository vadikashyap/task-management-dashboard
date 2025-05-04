# Task Management App

A modern React + Redux Saga based task management app with a beautiful UI, instant feedback, and robust state management.

---

## 🚀 How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd task-management
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the mock API server:**

   ```bash
   npx json-server --watch db.json --port 3001
   ```

   - This will run a fake REST API at [http://localhost:3001](http://localhost:3001).

4. **Start the React app:**
   ```bash
   npm start
   ```
   - App will be available at [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Architecture & Approach

### **1. UI Layer (src/components)**

- **TaskBoard:** Main board showing all tasks, columns, and modals.
- **TaskColumn:** Shows tasks by status (e.g., To Do, In Progress, Done).
- **TaskCard:** Individual task card with edit/delete options.
- **AddTaskModal:** Modal for adding/editing tasks.
- **DeleteWarningModal:** Confirmation modal for delete actions.
- **Loading, ErrorBox, Header:** Utility and layout components.

### **2. State Management (src/store)**

- **Redux + Redux Saga:** All task data is managed in Redux. Sagas handle async API calls and side effects.
- **Modules:** Each feature (like `task`) has its own folder with actions, reducers, sagas, and types.
- **Optimistic Updates:** Adding/editing/deleting tasks updates the UI instantly; API calls run in the background.

### **3. API Layer (src/api)**

- **taskApi:** Handles all HTTP requests to the mock server (`json-server`).

### **4. Data Flow**

- UI dispatches Redux actions (e.g., add, update, delete task).
- Sagas listen for these actions, perform API calls, and update the Redux state.
- UI components subscribe to Redux state and re-render automatically.

### **5. UX Details**

- **Delete Confirmation:** Deleting a task always shows a confirmation modal.
- **Loading State:** Only shown when fetching all tasks (not for add/edit/delete).
- **Error Handling:** Errors are shown in a user-friendly way.

---

## 📁 Folder Structure (short)

```
src/
  components/
    TaskBoard/
    TaskColumn/
    TaskCard/
    AddTaskModal/
    DeleteWarningModal/
    ...
  store/
    modules/
      task/
        actions.ts
        reducers.ts
        sagas.ts
        types.ts
        selectors.ts
    ...
  api/
    taskApi.ts
  ...
db.json
```

---

## ✨ Features

- Add, edit, and delete tasks with instant UI feedback.
- Confirmation modal before deleting any task.
- Clean, modern UI with Material UI.
- Robust state management with Redux & Saga.
- Mock backend with `json-server`.

---
