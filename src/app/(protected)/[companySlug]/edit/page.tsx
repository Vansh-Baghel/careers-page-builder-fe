import CompanyEditor from "@/components/company/companyEditor";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CompanyEditorPage() {
  return (
    <ProtectedRoute>
      <CompanyEditor />
    </ProtectedRoute>
  );
}
