import { Suspense } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { FamilyMembers } from '@/components/family/family-members';

export default function FamilyPage() {
  return (
    <AppShell>
      <Suspense fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
        </div>
      }>
        <FamilyMembers />
      </Suspense>
    </AppShell>
  );
}
