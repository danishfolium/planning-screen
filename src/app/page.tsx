'use-client'
import { TaskProvider } from '@/context/TaskContext';
import Table from '@/components/Table';

export default function PlanningPage() {
  return (
    <TaskProvider>
      <main className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-black">Planning Screen</h1>
        <Table />
      </main>
    </TaskProvider>
  );
}
